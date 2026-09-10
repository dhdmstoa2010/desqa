import { memo, useEffect, useRef, useState, type ReactNode } from "react";
import { Field } from "./styles/GlyphField.style";

const COLS = 128;
const ROWS = 21;
const N = COLS * ROWS;

const FG = "█▓▓▒██▓█▓▒█▓"; // 화살표 안쪽
const FG_SCRAMBLE = "█▓▒#@$&%*=8ΞΨ+/\\"; // 스크램블
const BG = "                     ·   ."; // 바깥쪽

/* 색 */
const C_FG = "#d6d6dc"; // 화살표 기본
const C_BG = "#33333a"; // 바깥쪽 기본
const C_INTRO_HI = "#6b6b73";
const C_INTRO_LO = "#3b3b42";
const C_HOVER_CORE = "#5c5c64"; // 커서 바로 밑
const C_HOVER_FG = "#8f8f98";

const pick = (s: string) => s[(Math.random() * s.length) | 0];

const SHAFT_HALF = 3.4 / (ROWS - 1); // 몸통 반두께
const ARROW_L = 0.02; // 화살표 왼쪽 끝
const SHAFT_R = 0.66; // 몸통 오른쪽 끝
const HEAD_BASE_X = 0.6; // 화살촉 밑변
const HEAD_TIP_X = 0.98; // 꼭짓점
const HEAD_HALF = 0.5; // 화살촉 밑변 반높이

function inArrow(c: number, r: number): boolean {
  const x = c / (COLS - 1);
  const y = r / (ROWS - 1);
  const mid = 0.5;

  // 몸통
  if (x >= ARROW_L && x < SHAFT_R && Math.abs(y - mid) < SHAFT_HALF)
    return true;

  // 화살촉: 밑변에서 꼭짓점으로 갈수록 뾰족해지는 채워진 삼각형
  if (x >= HEAD_BASE_X && x <= HEAD_TIP_X) {
    const along = (x - HEAD_BASE_X) / (HEAD_TIP_X - HEAD_BASE_X); // 0→1
    const half = HEAD_HALF * (1 - along);
    if (Math.abs(y - mid) <= half) return true;
  }
  return false;
}

interface Cell {
  ch: string;
  color: string;
  fg: boolean;
}

function makeBase(): Cell[] {
  return Array.from({ length: N }, (_, i) => {
    const fg = inArrow(i % COLS, (i / COLS) | 0);
    return {
      fg,
      ch: fg ? pick(FG) : pick(BG),
      color: fg ? C_FG : C_BG,
    };
  });
}

/* 셀 하나 */
const Glyph = memo(function Glyph({
  ch,
  color,
}: {
  ch: string;
  color: string;
}) {
  return <span style={{ color }}>{ch}</span>;
});

export default function GlyphField() {
  const [cells, setCells] = useState<Cell[]>(makeBase);
  const base = useRef<Cell[]>(cells);
  const raf = useRef(0);
  const timer = useRef(0);
  const introDone = useRef(false);
  const reduced = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const spotlight = (idx: number) => {
    const cc = idx % COLS;
    const cr = (idx / COLS) | 0;
    const R = 4;
    const next = base.current.slice();
    for (let j = 0; j < N; j++) {
      if (!base.current[j].fg) continue; // 배경(화살표 밖)엔 적용 안 함
      const dist = Math.hypot((j % COLS) - cc, (((j / COLS) | 0) - cr) * 1.9);
      if (dist > R) continue;
      const near = 1 - dist / R;
      next[j] = {
        fg: true,
        ch: pick(FG_SCRAMBLE),
        color: near > 0.5 ? C_HOVER_CORE : C_HOVER_FG,
      };
    }
    setCells(next);
  };

  const onMove = (e: React.MouseEvent) => {
    if (reduced.current || !introDone.current) return;
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cc = Math.round(((e.clientX - rect.left) / rect.width) * (COLS - 1));
    const cr = Math.round(((e.clientY - rect.top) / rect.height) * (ROWS - 1));
    const idx = Math.max(0, Math.min(N - 1, cr * COLS + cc));
    cancelAnimationFrame(raf.current);
    if (!base.current[idx]?.fg) {
      // 커서가 화살표 밖 → 원상복구
      setCells(base.current.slice());
      return;
    }
    raf.current = requestAnimationFrame(() => spotlight(idx));
  };

  const onLeave = () => {
    cancelAnimationFrame(raf.current);
    if (introDone.current) setCells(base.current.slice());
  };

  useEffect(() => {
    reduced.current = Boolean(
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    );

    if (reduced.current) {
      introDone.current = true;
      return;
    }

    // 등장 스크램블
    const t0 = performance.now();
    const intro = (now: number) => {
      const p = (now - t0) / 900;
      if (p >= 1) {
        introDone.current = true;
        setCells(base.current.slice());
        return;
      }
      setCells(
        base.current.map((cell) => {
          if (Math.random() < p) return cell;
          return {
            fg: cell.fg,
            ch: pick(FG_SCRAMBLE + BG),
            color: Math.random() < 0.32 ? C_INTRO_HI : C_INTRO_LO,
          };
        }),
      );
      raf.current = requestAnimationFrame(intro);
    };
    raf.current = requestAnimationFrame(intro);

    // 유휴 반짝임
    timer.current = window.setInterval(() => {
      if (!introDone.current) return;
      const next = base.current.slice();
      const k = Math.round(N * 0.03);
      for (let n = 0; n < k; n++) {
        const j = (Math.random() * N) | 0;
        if (!base.current[j].fg) continue;
        next[j] = {
          fg: true,
          ch: pick(FG),
          color: base.current[j].color,
        };
      }
      base.current = next;
      setCells(next);
    }, 170);

    return () => {
      cancelAnimationFrame(raf.current);
      window.clearInterval(timer.current);
    };
  }, []);

  const rows: ReactNode[] = [];
  for (let r = 0; r < ROWS; r++) {
    const rowCells: ReactNode[] = [];
    for (let c = 0; c < COLS; c++) {
      const cell = cells[r * COLS + c];
      rowCells.push(<Glyph key={c} ch={cell.ch} color={cell.color} />);
    }
    rows.push(<div key={r}>{rowCells}</div>);
  }

  return (
    <Field
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      {rows}
    </Field>
  );
}
