import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import {
  Wrapper,
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
} from "./styles/home.style";

gsap.registerPlugin(useGSAP, SplitText);

function Home() {
  const container = useRef<HTMLDivElement>(null);
  const glowAnchor = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const glowFloat = useRef<gsap.core.Tween | null>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

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
  };

  const handleMouseLeave = () => {
    const anchor = glowAnchor.current;
    if (!anchor) return;
    anchor.style.removeProperty("--glow-x");
    anchor.style.removeProperty("--glow-y");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) return;
    navigate(`/result?url=${encodeURIComponent(trimmed)}`);
  };

  return (
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
    </Wrapper>
  );
}

export default Home;
