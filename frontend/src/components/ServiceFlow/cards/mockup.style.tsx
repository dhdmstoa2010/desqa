import styled from "@emotion/styled";

/*
  카드 내부 mockup 공통 프리미티브.
  모든 등장 효과는 부모 CardStage 의 motion system(--flow-ease / --flow-dur)을 따른다.
  연속 애니메이션(스캔 라인 등)은 prefers-reduced-motion 에서 모두 정지한다.
*/

/* active 상태일 때 아래에서 살짝 올라오며 나타나는 요소.
   data-in / style={{ transitionDelay }} 로 stagger 를 준다. */
export const Rise = styled.div<{ delay?: number }>`
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity var(--flow-dur) var(--flow-ease),
    transform var(--flow-dur) var(--flow-ease);
  transition-delay: ${({ delay = 0 }) => delay}ms;

  [data-in="true"] & {
    opacity: 1;
    transform: none;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

export const Pad = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(16px, 3.4%, 28px);
  box-sizing: border-box;
`;

/* ---------- 브라우저 창 mockup ---------- */

export const Browser = styled.div`
  position: absolute;
  inset: clamp(16px, 4%, 30px);
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(10, 10, 11, 0.1);
  box-shadow: 0 12px 30px -16px rgba(10, 10, 11, 0.22);
  overflow: hidden;
`;

export const BrowserBar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 12px;
  border-bottom: 1px solid rgba(10, 10, 11, 0.07);
  flex-shrink: 0;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(10, 10, 11, 0.14);
  }

  span {
    margin-left: 8px;
    height: 14px;
    flex: 1;
    max-width: 200px;
    border-radius: 999px;
    background: rgba(10, 10, 11, 0.06);
  }
`;

export const Viewport = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
`;

/* 웹사이트 스켈레톤 조각들 */
export const Skel = styled.div<{ h?: number; w?: string; accent?: boolean }>`
  border-radius: 6px;
  height: ${({ h = 12 }) => h}px;
  width: ${({ w = "100%" }) => w};
  background: ${({ accent }) =>
    accent ? "rgba(123, 178, 65, 0.22)" : "rgba(10, 10, 11, 0.07)"};
  flex-shrink: 0;
`;

export const SkelRow = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;

  & > * {
    flex: 1;
  }
`;

/* ---------- CARD 01 · Upload ---------- */

export const DropZone = styled.div`
  position: absolute;
  inset: clamp(18px, 5%, 34px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  border-radius: 14px;
  border: 1.5px dashed rgba(10, 10, 11, 0.18);
  background: #ffffff;
  transition:
    border-color var(--flow-dur) var(--flow-ease),
    background var(--flow-dur) var(--flow-ease);

  &[data-uploading="true"] {
    border-color: rgba(123, 178, 65, 0.55);
    border-style: solid;
    background: rgba(123, 178, 65, 0.06);
  }
`;

export const Plus = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(10, 10, 11, 0.05);
  color: var(--flow-ink);
  font-size: 22px;
  font-weight: 300;
  line-height: 1;
  transition:
    transform var(--flow-dur) var(--flow-ease),
    background var(--flow-dur) var(--flow-ease);

  [data-uploading="true"] & {
    transform: scale(0.9);
    background: rgba(123, 178, 65, 0.16);
  }
`;

export const DropLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--flow-muted);
`;

export const UploadFile = styled.div`
  position: absolute;
  left: 50%;
  bottom: clamp(20px, 8%, 40px);
  width: min(78%, 300px);
  transform: translate(-50%, 12px);
  opacity: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(10, 10, 11, 0.1);
  box-shadow: 0 14px 30px -18px rgba(10, 10, 11, 0.3);
  transition:
    opacity var(--flow-dur) var(--flow-ease),
    transform var(--flow-dur) var(--flow-ease);

  &[data-in="true"] {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const FileMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  color: var(--flow-body);

  b {
    font-weight: 700;
    color: var(--flow-ink);
  }
`;

export const Bar = styled.div`
  height: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 11, 0.08);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    width: 0;
    border-radius: inherit;
    background: #7bb241;
    transition: width 0.9s var(--flow-ease);
  }

  &[data-fill="true"] span {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      transition: none;
    }
  }
`;

/* ---------- CARD 02 · Analyze ---------- */

export const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(123, 178, 65, 0.9),
    transparent
  );
  box-shadow: 0 0 18px 2px rgba(123, 178, 65, 0.35);
  opacity: 0;

  [data-in="true"] & {
    opacity: 1;
    animation: flowScan 3.4s var(--flow-ease) infinite;
  }

  @keyframes flowScan {
    0% {
      top: 0%;
    }
    50% {
      top: calc(100% - 2px);
    }
    100% {
      top: 0%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Pointer = styled.div`
  position: absolute;
  width: 46px;
  height: 46px;
  border-radius: 10px;
  border: 1.5px solid rgba(123, 178, 65, 0.8);
  background: rgba(123, 178, 65, 0.1);
  opacity: 0;
  transition:
    left var(--flow-dur) var(--flow-ease),
    top var(--flow-dur) var(--flow-ease),
    opacity var(--flow-dur) var(--flow-ease);

  [data-in="true"] & {
    opacity: 1;
  }
`;

export const AnalyzeTag = styled.div`
  position: absolute;
  top: 10px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 11px;
  border-radius: 999px;
  background: var(--flow-ink);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--flow-lime);
  }
`;

/* ---------- CARD 03 · Discover ---------- */

export const FindingList = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(14px, 4%, 24px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  justify-content: center;
`;

export const Finding = styled.div<{ tone: "warn" | "ok" }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 15px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(10, 10, 11, 0.08);
  box-shadow: 0 8px 20px -16px rgba(10, 10, 11, 0.25);

  .ic {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    display: grid;
    place-items: center;
    font-size: 12px;
    font-weight: 700;
    background: ${({ tone }) =>
      tone === "warn" ? "rgba(240, 170, 40, 0.16)" : "rgba(123, 178, 65, 0.16)"};
    color: ${({ tone }) => (tone === "warn" ? "#b7791f" : "#5a8a2c")};
  }

  .tt {
    margin: 0;
    font-size: 12px;
    font-weight: 700;
    color: var(--flow-ink);
  }

  .ds {
    margin: 2px 0 0;
    font-size: 11.5px;
    line-height: 1.4;
    color: var(--flow-muted);
  }
`;

/* ---------- CARD 04 · Improve ---------- */

export const Compare = styled.div`
  position: absolute;
  inset: clamp(16px, 4%, 30px);
  border-radius: 12px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(10, 10, 11, 0.1);
`;

export const Pane = styled.div`
  position: absolute;
  inset: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 9px;
  transition: opacity var(--flow-dur) var(--flow-ease);

  &[data-role="after"] {
    opacity: 0;
  }

  [data-phase="after"] &[data-role="before"] {
    opacity: 0;
  }
  [data-phase="after"] &[data-role="after"] {
    opacity: 1;
  }
`;

export const CompareChip = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  display: inline-flex;
  padding: 4px;
  border-radius: 999px;
  background: rgba(10, 10, 11, 0.06);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  b {
    padding: 4px 10px;
    border-radius: 999px;
    color: var(--flow-muted);
    transition:
      background var(--flow-dur) var(--flow-ease),
      color var(--flow-dur) var(--flow-ease);
  }

  [data-phase="before"] & b:first-of-type,
  [data-phase="after"] & b:last-of-type {
    background: #ffffff;
    color: var(--flow-ink);
    box-shadow: 0 2px 6px -2px rgba(10, 10, 11, 0.2);
  }
`;

/* ---------- CARD 05 · Build Better ---------- */

export const Summary = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(18px, 5%, 32px);
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  justify-content: center;
`;

export const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Ring = styled.svg`
  width: 66px;
  height: 66px;
  flex-shrink: 0;

  circle {
    fill: none;
    stroke-width: 6;
    stroke-linecap: round;
  }
  .track {
    stroke: rgba(10, 10, 11, 0.08);
  }
  .val {
    stroke: #7bb241;
    stroke-dasharray: 175.9;
    stroke-dashoffset: 175.9;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    transition: stroke-dashoffset 1s var(--flow-ease);
  }
  [data-in="true"] & .val {
    stroke-dashoffset: 46;
  }

  @media (prefers-reduced-motion: reduce) {
    .val {
      transition: none;
      stroke-dashoffset: 46;
    }
  }
`;

export const ScoreText = styled.div`
  b {
    display: block;
    font-family: "Unbounded", system-ui, sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--flow-ink);
    line-height: 1;
  }
  span {
    font-size: 11.5px;
    color: var(--flow-muted);
  }
`;

export const Metric = styled.div`
  display: grid;
  grid-template-columns: 74px 1fr;
  align-items: center;
  gap: 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--flow-body);

  .track {
    height: 6px;
    border-radius: 999px;
    background: rgba(10, 10, 11, 0.08);
    overflow: hidden;
  }
  .fill {
    height: 100%;
    width: 0;
    border-radius: inherit;
    background: #7bb241;
    transition: width 0.9s var(--flow-ease);
  }
  [data-in="true"] & .fill {
    width: var(--to, 70%);
  }

  @media (prefers-reduced-motion: reduce) {
    .fill {
      transition: none;
      width: var(--to, 70%);
    }
  }
`;

/*
  CTA — gsap.com "Get GSAP" 버튼처럼, 커서가 들어온 방향에서 라임 채움이
  쓸어 들어오고 나갈 땐 커서가 빠져나간 방향으로 쓸려 나간다. (GSAP 로 구동)
*/
export const Cta = styled.button`
  position: relative;
  align-self: flex-start;
  margin-top: 4px;
  appearance: none;
  border: 0;
  cursor: pointer;
  overflow: hidden;
  display: inline-flex;
  border-radius: 12px;
  background: var(--flow-ink);
  isolation: isolate;

  .cta-fill {
    position: absolute;
    inset: -1px;
    z-index: 0;
    background: var(--flow-lime);
    transform: translateY(101%);
    will-change: transform;
  }

  .cta-label {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 13px 22px;
    color: var(--flow-lime);
    font-family: "Unbounded", system-ui, sans-serif;
    font-size: 13px;
    font-weight: 600;
    transition: color 0.3s var(--flow-ease);
  }

  .cta-label span {
    transition: transform 0.3s var(--flow-ease);
  }
  &:hover .cta-label span {
    transform: translateX(4px);
  }

  /* 모션 최소화: 방향 스윕 없이 단순 페이드 채움 */
  @media (prefers-reduced-motion: reduce) {
    .cta-fill {
      transform: none;
      opacity: 0;
      transition: opacity 0.2s var(--flow-ease);
    }
    &:hover .cta-fill {
      opacity: 1;
    }
    &:hover .cta-label {
      color: var(--flow-ink);
    }
  }
`;
