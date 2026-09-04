import { useEffect, useRef, useState } from "react";
import {
  Section,
  Heading,
  Track,
  Trail,
  Card,
  Step,
  CardTitle,
  CardText,
} from "./styles/Cards.style";

const STEPS = [
  {
    title: "Drop a link",
    text: "평가하고 싶은 페이지의 URL을 붙여넣기만 하면 됩니다. 설치도, 로그인 위젯도 필요 없어요.",
  },
  {
    title: "We scan the screen",
    text: "레이아웃, 타이포그래피, 색 대비, 여백, 반응형 동작을 실제 렌더링 화면 기준으로 훑습니다.",
  },
  {
    title: "See the design flaws",
    text: "우선순위가 매겨진 개선점과 그 근거를 리포트로 받아, 무엇부터 고칠지 바로 판단합니다.",
  },
] as const;

/* 카드1(좌상) → 카드2(우중) → 카드3(좌하)을 그대로 이어주는 선.
   첫 선은 카드2의 중앙을 관통하듯 지나간다.
   꺾임 없이 접선이 이어지는 완만한 곡선 2개. (viewBox 1160×1280) */
const TRAIL_D =
  "M 300 178 " +
  "C 450 340 760 470 890 650 " +
  "C 990 810 560 980 430 1105";

function Cards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>(() => STEPS.map(() => false));

  // 경로선
  useEffect(() => {
    const path = pathRef.current;
    const track = trackRef.current;
    if (!path || !track) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const draw = () => {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const startTop = vh * 0.85;
      const endTop = vh - r.height;
      const progress = Math.min(
        1,
        Math.max(0, (startTop - r.top) / (startTop - endTop)),
      );
      path.style.strokeDashoffset = `${len * (1 - progress)}`;
    };

    draw();
    window.addEventListener("scroll", draw, { passive: true });
    window.addEventListener("resize", draw);
    return () => {
      window.removeEventListener("scroll", draw);
      window.removeEventListener("resize", draw);
    };
  }, []);

  // 카드
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        setShown((prev) => {
          const next = [...prev];
          for (const e of entries) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (e.isIntersecting) next[i] = true;
            else if (e.boundingClientRect.top > 0) next[i] = false;
          }
          return next;
        });
      },
      { threshold: 0.4 },
    );
    cardRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <Section>
      <Heading>
        How <span>desqa</span> works
      </Heading>
      <Track ref={trackRef}>
        <Trail
          viewBox="0 0 1160 1280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={TRAIL_D}
            style={{ strokeDasharray: 4000, strokeDashoffset: 4000 }}
          />
        </Trail>
        {STEPS.map((step, i) => (
          <Card
            key={step.title}
            pos={(i + 1) as 1 | 2 | 3}
            data-index={i}
            className={shown[i] ? "in" : undefined}
            ref={(el: HTMLElement | null) => {
              cardRefs.current[i] = el;
            }}
          >
            <Step>{String(i + 1).padStart(2, "0")}</Step>
            <CardTitle>{step.title}</CardTitle>
            <CardText>{step.text}</CardText>
          </Card>
        ))}
      </Track>
    </Section>
  );
}

export default Cards;
