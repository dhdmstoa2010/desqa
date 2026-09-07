import { useRef } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import type { StepState } from "../../../../data/flow.data";
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

const METRICS = [
  { label: "Typography", to: "58%" },
  { label: "Spacing", to: "64%" },
  { label: "Color", to: "88%" },
];

const LIME = "#bfff6b";
const INK = "#0a0a0b";

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
      { x: 0, y: 0, xPercent: d.x, yPercent: d.y },
      {
        x: 0,
        y: 0,
        xPercent: 0,
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
      },
    );
    gsap.to(label.current, { color: INK, duration: 0.35, ease: "power2.out" });
  };

  const leave = (e: MouseEvent) => {
    if (reduced()) return;
    const d = edge(e);
    gsap.killTweensOf([fill.current, label.current]);
    gsap.to(fill.current, {
      x: 0,
      y: 0,
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
