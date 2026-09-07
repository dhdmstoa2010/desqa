import { FLOW_STEPS, type StepState } from "../../../data/flow.data";
import {
  Rail,
  RailItem,
  RailMark,
  RailText,
  MobileProgress,
  MobileTrack,
  MobileMeta,
} from "./ServiceFlow.style";

function stateOf(i: number, active: number): StepState {
  if (i < active) return "completed";
  if (i === active) return "active";
  return "inactive";
}

export default function FlowProgress({
  active,
  onJump,
}: {
  active: number;
  onJump: (i: number) => void;
}) {
  const total = FLOW_STEPS.length;
  const pct = total > 1 ? (active / (total - 1)) * 100 : 0;
  const current = FLOW_STEPS[active];

  return (
    <>
      <MobileProgress>
        <MobileTrack>
          <span style={{ width: `${pct}%` }} />
        </MobileTrack>
        <MobileMeta>
          <span>{current.label}</span>
          <span>
            {current.index} / {String(total).padStart(2, "0")}
          </span>
        </MobileMeta>
      </MobileProgress>

      <Rail aria-label="서비스 플로우 단계">
        {FLOW_STEPS.map((step, i) => {
          const s = stateOf(i, active);
          return (
            <RailItem
              key={step.id}
              type="button"
              data-state={s}
              aria-current={s === "active" ? "step" : undefined}
              onClick={() => onJump(i)}
            >
              <RailMark />
              <RailText>
                <small>{step.index}</small>
                {step.label}
              </RailText>
            </RailItem>
          );
        })}
      </Rail>
    </>
  );
}
