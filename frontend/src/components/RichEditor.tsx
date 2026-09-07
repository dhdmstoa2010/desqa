import { useEffect, useRef, useState } from "react";
import { fileToCompressedDataUrl } from "../utils/image";
import {
  Shell,
  Toolbar,
  ToolButton,
  Divider,
  Area,
  Hint,
} from "./styles/RichEditor.style";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const BLOCK_TAGS = /^(P|DIV|H[1-6]|PRE|BLOCKQUOTE|LI)$/;

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
      <path
        d="M5 17l4.5-4.5 3 3L16 12l3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RichEditor({ value, onChange, placeholder }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeBlock, setActiveBlock] = useState("");
  const [empty, setEmpty] = useState(true);

  // 초기값만 주입 (제어형으로 매 입력마다 innerHTML을 갈면 커서가 튄다)
  useEffect(() => {
    try {
      // Enter 로 <div>가 아니라 <p>가 생기게 → formatBlock 이 줄 단위로 동작
      document.execCommand("defaultParagraphSeparator", false, "p");
    } catch {
      /* 일부 브라우저 미지원 */
    }
    if (ref.current) {
      ref.current.innerHTML = value || "<p><br></p>";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 에디터 루트에 <p> 없이 떠도는 텍스트/인라인 노드를 <p>로 감싼다
  const normalize = () => {
    const root = ref.current;
    if (!root) return;
    let wrap: HTMLParagraphElement | undefined;
    for (const n of [...root.childNodes]) {
      const el = n.nodeType === 1 ? (n as HTMLElement) : null;
      if (el && (BLOCK_TAGS.test(el.tagName) || el.tagName === "IMG")) {
        wrap = undefined;
        continue;
      }
      if (n.nodeType === 3 && !n.textContent?.trim()) continue;
      if (!wrap) {
        wrap = document.createElement("p");
        root.insertBefore(wrap, n);
      }
      wrap.appendChild(n);
    }
  };

  const emit = () => {
    normalize();
    const el = ref.current;
    setEmpty(!el?.textContent?.trim() && !el?.querySelector("img"));
    onChange(el?.innerHTML ?? "");
  };

  const closestBlock = (): HTMLElement | null => {
    const root = ref.current;
    let node = window.getSelection()?.anchorNode as Node | null;
    while (node && node !== root) {
      if (node.nodeType === 1 && BLOCK_TAGS.test((node as HTMLElement).tagName)) {
        return node as HTMLElement;
      }
      node = node.parentNode;
    }
    return null;
  };

  const syncActive = () => setActiveBlock(closestBlock()?.tagName ?? "");

  const inline = (command: string) => {
    ref.current?.focus();
    document.execCommand(command, false);
    emit();
  };

  // 블록 버튼은 토글: 이미 그 태그면 문단(<p>)으로 되돌린다 → "빠져나가기"
  const block = (tag: string) => {
    ref.current?.focus();
    const current = closestBlock()?.tagName ?? "";
    const target = current === tag.toUpperCase() ? "p" : tag;
    document.execCommand("formatBlock", false, `<${target}>`);
    emit();
    syncActive();
  };

  const addLink = () => {
    const url = window.prompt("링크 주소를 입력하세요", "https://");
    if (!url) return;
    ref.current?.focus();
    document.execCommand("createLink", false, url);
    emit();
  };

  const addImage = async (file: File | null | undefined) => {
    if (!file) return;
    try {
      const src = await fileToCompressedDataUrl(file);
      ref.current?.focus();
      document.execCommand("insertHTML", false, `<img src="${src}" alt="" />`);
      emit();
    } catch {
      /* 잘못된 파일 무시 */
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  // 캐럿이 블록의 맨 끝/맨 앞에 있는지
  const caretAtEdge = (blk: HTMLElement, edge: "start" | "end"): boolean => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !sel.isCollapsed) return false;
    const r = sel.getRangeAt(0);
    const probe = document.createRange();
    probe.selectNodeContents(blk);
    if (edge === "end") {
      probe.setStart(r.endContainer, r.endOffset);
    } else {
      probe.setEnd(r.startContainer, r.startOffset);
    }
    // 캐럿과 블록 경계 사이에 남은 내용이 없으면(공백/줄바꿈만) 경계로 본다
    return probe.toString().replace(/\s/g, "") === "";
  };

  const placeCaret = (el: HTMLElement, edge: "start" | "end") => {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(edge === "start");
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  };

  const escapeBlock = (blk: HTMLElement, dir: "up" | "down") => {
    const sibling = (
      dir === "down" ? blk.nextElementSibling : blk.previousElementSibling
    ) as HTMLElement | null;
    let target = sibling;
    if (
      !target ||
      target.tagName === "PRE" ||
      target.tagName === "BLOCKQUOTE"
    ) {
      target = document.createElement("p");
      target.innerHTML = "<br>";
      if (dir === "down") blk.after(target);
      else blk.before(target);
    }
    placeCaret(target, dir === "down" ? "start" : "end");
    // 블록 끝에 Enter로 생겼던 빈 줄 정리
    if (blk.lastChild?.nodeType === 3) {
      blk.lastChild.textContent =
        blk.lastChild.textContent?.replace(/\n+$/, "") ?? "";
    }
    emit();
    syncActive();
  };

  // 코드블록 / 인용문에서 아래(위) 방향키·Enter 로 블록 밖으로 나간다
  const onKeyDown = (e: React.KeyboardEvent) => {
    const blk = closestBlock();
    if (!blk || (blk.tagName !== "PRE" && blk.tagName !== "BLOCKQUOTE")) return;

    if (e.key === "ArrowDown" && caretAtEdge(blk, "end")) {
      e.preventDefault();
      escapeBlock(blk, "down");
    } else if (e.key === "ArrowUp" && caretAtEdge(blk, "start")) {
      e.preventDefault();
      escapeBlock(blk, "up");
    } else if (e.key === "Enter" && !e.shiftKey && caretAtEdge(blk, "end")) {
      // 마지막 줄이 비어 있을 때만 (내용이 있으면 그냥 줄바꿈)
      const text = blk.textContent ?? "";
      if (text === "" || /\n\s*$/.test(text)) {
        e.preventDefault();
        escapeBlock(blk, "down");
      }
    }
  };

  const noBlur = (e: React.MouseEvent) => e.preventDefault();

  return (
    <Shell>
      <Toolbar>
        {([1, 2, 3, 4] as const).map((n) => (
          <ToolButton
            key={n}
            type="button"
            title={`제목 ${n}`}
            $active={activeBlock === `H${n}`}
            onMouseDown={noBlur}
            onClick={() => block(`h${n}`)}
          >
            H<sub>{n}</sub>
          </ToolButton>
        ))}

        <Divider />

        <ToolButton
          type="button"
          title="굵게"
          onMouseDown={noBlur}
          onClick={() => inline("bold")}
        >
          <b>B</b>
        </ToolButton>
        <ToolButton
          type="button"
          title="기울임"
          onMouseDown={noBlur}
          onClick={() => inline("italic")}
        >
          <i>I</i>
        </ToolButton>
        <ToolButton
          type="button"
          title="취소선"
          onMouseDown={noBlur}
          onClick={() => inline("strikeThrough")}
        >
          <s>S</s>
        </ToolButton>

        <Divider />

        <ToolButton
          type="button"
          title="인용 (다시 누르거나 ↓ 방향키로 빠져나가기)"
          $active={activeBlock === "BLOCKQUOTE"}
          onMouseDown={noBlur}
          onClick={() => block("blockquote")}
        >
          <span aria-hidden="true">&rdquo;</span>
        </ToolButton>
        <ToolButton type="button" title="링크" onMouseDown={noBlur} onClick={addLink}>
          <LinkIcon />
        </ToolButton>
        <ToolButton
          type="button"
          title="이미지"
          onMouseDown={noBlur}
          onClick={() => fileRef.current?.click()}
        >
          <ImageIcon />
        </ToolButton>
        <ToolButton
          type="button"
          title="코드블록 (다시 누르거나 ↓ 방향키로 빠져나가기)"
          $active={activeBlock === "PRE"}
          onMouseDown={noBlur}
          onClick={() => block("pre")}
        >
          {"<>"}
        </ToolButton>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => void addImage(e.target.files?.[0])}
        />
      </Toolbar>

      <Area
        ref={ref}
        contentEditable
        role="textbox"
        aria-multiline="true"
        data-placeholder={placeholder}
        data-empty={empty}
        onInput={emit}
        onBlur={emit}
        onKeyDown={onKeyDown}
        onKeyUp={syncActive}
        onMouseUp={syncActive}
      />

      {(activeBlock === "PRE" || activeBlock === "BLOCKQUOTE") && (
        <Hint>
          {activeBlock === "PRE" ? "코드블록" : "인용문"} 안이에요 — ↓ 방향키
          또는 툴바 버튼을 다시 눌러 빠져나갈 수 있어요.
        </Hint>
      )}
    </Shell>
  );
}

export default RichEditor;
