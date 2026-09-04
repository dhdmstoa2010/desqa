import { useEffect, useState } from "react";
import type { StepState } from "../flow.data";
import { CardStage } from "../ServiceFlow.style";
import {
  Browser,
  BrowserBar,
  Viewport,
  Skel,
  SkelRow,
  ScanLine,
  Pointer,
  AnalyzeTag,
} from "./mockup.style";

/*
  CARD 02 · Analyze
  웹사이트 미리보기 위로 스캔 라인이 흐르고,
  분석 포인터가 Typography → Color → Layout → Spacing 영역을 순서대로 훑는다.
*/
const SPOTS = [
  { label: "Typography", left: "12%", top: "12%" },
  { label: "Color", left: "58%", top: "30%" },
  { label: "Layout", left: "16%", top: "54%" },
  { label: "Spacing", left: "54%", top: "72%" },
] as const;

export default function AnalyzeCard({ state }: { state: StepState }) {
  const inView = state !== "inactive";
  const [spot, setSpot] = useState(0);

  useEffect(() => {
    if (state !== "active") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = window.setInterval(
      () => setSpot((s) => (s + 1) % SPOTS.length),
      1150,
    );
    return () => window.clearInterval(id);
  }, [state]);

  const active = SPOTS[spot];

  return (
    <CardStage data-in={inView}>
      <Browser>
        <BrowserBar>
          <i />
          <i />
          <i />
          <span />
        </BrowserBar>
        <Viewport>
          <Skel h={20} w="52%" />
          <Skel h={10} w="86%" />
          <SkelRow>
            <Skel h={64} />
            <Skel h={64} accent />
          </SkelRow>
          <Skel h={10} w="72%" />
          <Skel h={10} w="60%" />
          <SkelRow>
            <Skel h={40} />
            <Skel h={40} />
            <Skel h={40} />
          </SkelRow>

          <ScanLine />
          <Pointer style={{ left: active.left, top: active.top }} />
        </Viewport>
        <AnalyzeTag>
          <i />
          {state === "completed" ? "Analysis complete" : `Scanning · ${active.label}`}
        </AnalyzeTag>
      </Browser>
    </CardStage>
  );
}
