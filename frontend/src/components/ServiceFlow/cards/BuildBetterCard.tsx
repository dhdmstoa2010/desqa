import { useRef } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import type { StepState } from "../flow.data";
import { CardStage } from "../ServiceFlow.style";
import {
  Summary,
  ScoreRow,
  Ring,
  ScoreText,
  Metric,
  Cta,
  Rise,
} from "./mockup.style";

/*
  CARD 05 · Build Better
  앞 단계의 분석이 하나의 결과 화면으로 정리된다.
  이전 카드보다 조금 더 여유 있는 stagger 로 플로우 완료감을 준다.
*/
const METRICS = [
  { label: "Typography", to: "58%" },
  { label: "Spacing", to: "64%" },
  { label: "Color", to: "88%" },
];

const LIME = "#bfff6b";
const INK = "#0a0a0b";

/*
  gsap.com "Get GSAP" 버튼 hover 효과.
  커서가 들어온 모서리에서 라임 채움이 쓸려 들어오고,
  빠져나갈 땐 커서가 나간 모서리 방향으로 쓸려 나간다. 라벨 색도 함께 전환.
*/
function SweepCta({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const btn = useRef<HTMLButtonElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  const reduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 커서 위치 → 가장 가까운 모서리에서의 시작(퍼센트) 오프셋
  const edge = (e: MouseEvent) => {
    const el = btn.current;
    if (!el) return { x: 0, y: 101 };
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    if (Math.abs(px) > Math.abs(py)) return { x: px > 0 ? 101 : -101, y: 0 };
    return { x: 0, y: py > 0 ? 101 : -101 };
  };

  const enter = (e: MouseEvent) => {
    if (reduced()) return;
    const d = edge(e);
    gsap.killTweensOf([fill.current, label.current]);
    gsap.fromTo(
      fill.current,
      { xPercent: d.x, yPercent: d.y },
      { xPercent: 0, yPercent: 0, duration: 0.45, ease: "power3.out" },
    );
    gsap.to(label.current, { color: INK, duration: 0.35, ease: "power2.out" });
  };

  const leave = (e: MouseEvent) => {
    if (reduced()) return;
    const d = edge(e);
    gsap.killTweensOf([fill.current, label.current]);
    gsap.to(fill.current, {
      xPercent: d.x,
      yPercent: d.y,
      duration: 0.4,
      ease: "power3.in",
    });
    gsap.to(label.current, {
      color: LIME,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.04,
    });
  };

  return (
    <Cta
      ref={btn}
      type="button"
      onClick={onClick}
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <span className="cta-fill" ref={fill} aria-hidden="true" />
      <span className="cta-label" ref={label}>
        {children}
      </span>
    </Cta>
  );
}

export default function BuildBetterCard({
  state,
  onStart,
}: {
  state: StepState;
  onStart: () => void;
}) {
  const inView = state !== "inactive";

  return (
    <CardStage data-in={inView}>
      <Summary>
        <Rise delay={0}>
          <ScoreRow>
            <Ring viewBox="0 0 66 66">
              <circle className="track" cx="33" cy="33" r="28" />
              <circle className="val" cx="33" cy="33" r="28" />
            </Ring>
            <ScoreText>
              <b>72</b>
              <span>Design score · 3 issues to fix</span>
            </ScoreText>
          </ScoreRow>
        </Rise>

        {METRICS.map((m, i) => (
          <Rise key={m.label} delay={140 + i * 120}>
            <Metric style={{ "--to": m.to } as CSSProperties}>
              <span>{m.label}</span>
              <div className="track">
                <div className="fill" />
              </div>
            </Metric>
          </Rise>
        ))}

        <Rise delay={140 + METRICS.length * 120 + 80}>
          <SweepCta onClick={onStart}>
            Start analyzing <span aria-hidden="true">→</span>
          </SweepCta>
        </Rise>
      </Summary>
    </CardStage>
  );
}
