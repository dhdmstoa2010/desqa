import type { StepState } from "../flow.data";
import { CardStage } from "../ServiceFlow.style";
import { FindingList, Finding, Rise } from "./mockup.style";

/*
  CARD 03 · Discover
  AI 분석 결과를 카드 리스트로. 항목이 하나씩 차분하게 나타난다 (shake/bounce 없음).
*/
const FINDINGS = [
  {
    tone: "warn" as const,
    mark: "!",
    title: "Typography",
    desc: "Heading hierarchy is unclear",
  },
  {
    tone: "warn" as const,
    mark: "!",
    title: "Spacing",
    desc: "Inconsistent spacing",
  },
  {
    tone: "ok" as const,
    mark: "✓",
    title: "Color",
    desc: "Good contrast",
  },
];

export default function DiscoverCard({ state }: { state: StepState }) {
  const inView = state !== "inactive";

  return (
    <CardStage data-in={inView}>
      <FindingList>
        {FINDINGS.map((f, i) => (
          <Rise key={f.title} delay={i * 120}>
            <Finding tone={f.tone}>
              <span className="ic">{f.mark}</span>
              <div>
                <p className="tt">{f.title}</p>
                <p className="ds">{f.desc}</p>
              </div>
            </Finding>
          </Rise>
        ))}
      </FindingList>
    </CardStage>
  );
}
