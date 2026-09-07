import { useEffect, useState } from "react";
import type { StepState } from "../../../../data/flow.data";
import { CardStage } from "../ServiceFlow.style";
import { Compare, Pane, CompareChip, Skel, SkelRow } from "./mockup.style";

export default function ImproveCard({ state }: { state: StepState }) {
  const inView = state !== "inactive";
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (state !== "active") return;
    const id = window.setTimeout(() => setFlipped(true), 900);
    return () => window.clearTimeout(id);
  }, [state]);

  const phase: "before" | "after" =
    state === "inactive"
      ? "before"
      : flipped || state === "completed"
        ? "after"
        : "before";

  return (
    <CardStage data-in={inView}>
      <Compare data-phase={phase}>
        <CompareChip>
          <b>Before</b>
          <b>After</b>
        </CompareChip>

        <Pane data-role="before">
          <Skel h={22} w="70%" />
          <Skel h={9} w="94%" />
          <Skel h={9} w="88%" />
          <div style={{ height: 14 }} />
          <SkelRow>
            <Skel h={46} w="62%" />
            <Skel h={46} w="24%" />
          </SkelRow>
          <Skel h={9} w="80%" />
        </Pane>

        <Pane data-role="after">
          <Skel h={18} w="48%" />
          <div style={{ height: 6 }} />
          <Skel h={9} w="72%" />
          <Skel h={9} w="72%" />
          <div style={{ height: 16 }} />
          <SkelRow>
            <Skel h={44} />
            <Skel h={44} accent />
          </SkelRow>
          <div style={{ height: 6 }} />
          <Skel h={9} w="56%" />
        </Pane>
      </Compare>
    </CardStage>
  );
}
