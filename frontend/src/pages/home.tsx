import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import {
  Wrapper,
  RevealLayer,
  GlowAnchor,
  Glow,
  Content,
  Title,
  Line,
  Accent,
  Desc,
  SecDesc,
  FormWrap,
  Form,
  Input,
  Button,
  ScrollCue,
  ScrollArea,
  ScrollStage,
} from "./styles/home.style";

/* 커서 밴드 */
const BAND_W = 128; // 밴드 폭(px)
const EASE = 0.16; // lerp 계수
const IDLE_MS = 650; // 커서가 멈춘 뒤 밴드가 접히기까지

gsap.registerPlugin(useGSAP, SplitText);

function Home() {
  const container = useRef<HTMLDivElement>(null);
  const glowAnchor = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const glowFloat = useRef<gsap.core.Tween | null>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const reveal = useRef({
    curX: 0,
    tgtX: 0,
    curW: 0,
    tgtW: 0,
    raf: 0,
    idle: 0,
    init: false,
  });
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const paintReveal = () => {
    const el = revealRef.current;
    const s = reveal.current;
    if (!el) {
      s.raf = 0;
      return;
    }
    s.curX += (s.tgtX - s.curX) * EASE;
    s.curW += (s.tgtW - s.curW) * EASE;

    const vw = window.innerWidth;
    const settled =
      Math.abs(s.tgtX - s.curX) < 0.4 && Math.abs(s.tgtW - s.curW) < 0.4;
    if (settled) {
      s.curX = s.tgtX;
      s.curW = s.tgtW;
    }
    const half = s.curW / 2;
    const left = Math.max(0, s.curX - half);
    const right = Math.max(0, vw - s.curX - half);
    el.style.clipPath = `inset(0px ${right}px 0px ${left}px)`;

    s.raf = settled ? 0 : requestAnimationFrame(paintReveal);
  };

  const kickReveal = () => {
    if (!reveal.current.raf) {
      reveal.current.raf = requestAnimationFrame(paintReveal);
    }
  };

  useEffect(() => {
    const s = reveal.current;
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      window.clearTimeout(s.idle);
    };
  }, []);

  useGSAP(
    () => {
      const splits = [line1.current!, line2.current!].map((el) =>
        SplitText.create(el, {
          type: "words,chars",
          wordsClass: "word",
          charsClass: "char",
        }),
      );

      const line1Chars = splits[0].chars as HTMLElement[];
      const line2Chars = splits[1].chars as HTMLElement[];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.95 },
      });

      tl.from(".hero-glow", { scale: 0.6, opacity: 0, duration: 1.7 })

        // 1줄 — 왼쪽에서 한 글자씩 슬라이드 인
        .from(
          line1Chars,
          { x: -70, opacity: 0, stagger: 0.05 },
          0.5,
        )
        // 2줄 — 같은 방향으로 이어서 슬라이드 인
        .from(
          line2Chars,
          { x: -70, opacity: 0, stagger: 0.05 },
          "<0.35",
        )

        // 입력창 — 중앙에서 양옆으로 퍼지며 등장
        .from(
          ".hero-form",
          { clipPath: "inset(0px 50% 0px 50%)", duration: 1.1 },
          ">-0.4",
        );

      glowFloat.current = gsap.to(".hero-glow", {
        y: 24,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: container },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const anchor = glowAnchor.current;
    if (!anchor) return;
    if (glowFloat.current) {
      glowFloat.current.kill();
      glowFloat.current = null;
      if (glow.current) gsap.set(glow.current, { y: 0 });
    }
    const rect = e.currentTarget.getBoundingClientRect();
    anchor.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
    anchor.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);

    // 커서를 따라 컬러 밴드가 좌우로 퍼짐
    const s = reveal.current;
    if (!s.init) {
      s.init = true;
      s.curX = e.clientX;
    }
    s.tgtX = e.clientX;
    s.tgtW = BAND_W;
    window.clearTimeout(s.idle);
    s.idle = window.setTimeout(() => {
      s.tgtW = 0;
      kickReveal();
    }, IDLE_MS);
    kickReveal();
  };

  const handleMouseLeave = () => {
    const anchor = glowAnchor.current;
    if (anchor) {
      anchor.style.removeProperty("--glow-x");
      anchor.style.removeProperty("--glow-y");
    }
    const s = reveal.current;
    window.clearTimeout(s.idle);
    s.tgtW = 0;
    kickReveal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    navigate(`/result?url=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <Wrapper
        ref={container}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <GlowAnchor ref={glowAnchor}>
          <Glow className="hero-glow" ref={glow} />
        </GlowAnchor>

        <Content>
          <Title>
            <Line>
              <Desc ref={line1}>Drop a link</Desc>
            </Line>
            <Line>
              <SecDesc ref={line2}>
                See the <Accent>design flaws</Accent>
              </SecDesc>
            </Line>
          </Title>
          <FormWrap>
            <Form className="hero-form" onSubmit={handleSubmit}>
              <Input
                type="url"
                inputMode="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <Button type="submit">Evaluate</Button>
            </Form>
          </FormWrap>
        </Content>

        {/* 커서를 따라다니는 컬러 밴드 — 아래 콘텐츠의 반전 버전 */}
        <RevealLayer ref={revealRef} aria-hidden="true">
          <Content>
            <Title>
              <Line>
                <Desc>Drop a link</Desc>
              </Line>
              <Line>
                <SecDesc>
                  See the <Accent>design flaws</Accent>
                </SecDesc>
              </Line>
            </Title>
            <FormWrap>
              <Form as="div">
                <Input
                  readOnly
                  tabIndex={-1}
                  placeholder="https://example.com"
                />
                <Button type="button" tabIndex={-1}>
                  Evaluate
                </Button>
              </Form>
            </FormWrap>
          </Content>
        </RevealLayer>

        <ScrollCue>Scroll</ScrollCue>
      </Wrapper>

      <ScrollArea>
        <ScrollStage>
          <span>URL 처리 과정 애니메이션 영역</span>
        </ScrollStage>
      </ScrollArea>
    </>
  );
}

export default Home;
