import styled from "@emotion/styled";

/*
  서비스 플로우 섹션.

  - 히어로에서 넘어온 고정 라임 오버레이(RevealFill, z-index:3) 위에 얹히도록 z-index:5,
    배경은 투명하게 두어 위 섹션의 라임(#bfff6b)이 그대로 이어진다.
  - 카드는 스크롤에 따라 "파일이 쌓이듯" 겹쳐 올라간다 (sticky + 단차 offset).
  - 모든 전환은 하나의 motion system(--flow-ease / --flow-dur)만 쓴다.
*/

export const Section = styled.section`
  --flow-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --flow-dur: 0.5s;
  --flow-ink: #0a0a0b;
  --flow-body: rgba(10, 10, 11, 0.72);
  --flow-muted: rgba(10, 10, 11, 0.45);
  --flow-line: rgba(10, 10, 11, 0.1);
  --flow-lime: #bfff6b;
  --flow-sticky-top: clamp(90px, 14vh, 150px);
  /* 쌓일 때 카드 사이 단차 */
  --stack-step: clamp(12px, 1.4vw, 20px);

  position: relative;
  z-index: 5;
  width: 100%;
  /* 배경은 투명 — 히어로의 고정 라임 오버레이(RevealFill, z-index:3)가 그대로 비쳐서
     스크롤에 따라 밴드가 넓어지는 연출이 이 섹션까지 이어진다.
     밴드가 아직 안 덮은 좌우는 뒤의 다크(ProcessAnimation #0a0a0b)가 보이며 대비를 만든다. */
  background: transparent;
  color: var(--flow-body);
  font-family: "Aggravo", system-ui, sans-serif;
  padding: clamp(64px, 12vh, 140px) clamp(14px, 3.5vw, 48px)
    clamp(96px, 16vh, 180px);
  box-sizing: border-box;
`;

/* 헤더 컨테이너 — 아래 Layout 과 같은 폭으로 맞춰 왼쪽 정렬선을 공유한다 */
export const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

/* ---------- Header ---------- */

export const Header = styled.header`
  max-width: 680px;
  margin: 0 0 clamp(40px, 8vh, 80px);
`;

export const Kicker = styled.p`
  margin: 0 0 18px;
  color: var(--flow-muted);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
`;

export const HeaderTitle = styled.h2`
  margin: 0 0 16px;
  color: var(--flow-ink);
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 4.6vw, 54px);
  line-height: 1.1;
  letter-spacing: -0.03em;

  span {
    color: rgba(10, 10, 11, 0.4);
  }
`;

export const HeaderSub = styled.p`
  margin: 0;
  color: var(--flow-body);
  font-size: clamp(15px, 1.4vw, 18px);
  line-height: 1.6;
`;

/* ---------- Layout: 좌측 진행 레일(화면 왼쪽에 붙음) + 가운데 카드 ---------- */

export const Layout = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: clamp(176px, 14vw, 220px) minmax(0, 1fr);
  gap: clamp(14px, 2.2vw, 32px);
  align-items: start;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
`;

export const Rail = styled.nav`
  position: sticky;
  top: clamp(120px, 24vh, 240px);
  /* 헤더/카드보다 더 왼쪽, 화면 가장자리 쪽으로 당긴다 */
  margin-left: clamp(-30px, -2.2vw, 0px);
  display: flex;
  flex-direction: column;

  @media (max-width: 960px) {
    display: none;
    margin-left: 0;
  }
`;

export const RailItem = styled.button`
  position: relative;
  appearance: none;
  border: 0;
  background: none;
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: 16px;
  padding: 15px 0;
  text-align: left;
  cursor: pointer;
  color: var(--flow-muted);
  transition: color var(--flow-dur) var(--flow-ease);

  &[data-state="active"],
  &[data-state="completed"] {
    color: var(--flow-ink);
  }

  /* 아래 항목으로 이어지는 연결선 */
  &::after {
    content: "";
    position: absolute;
    left: 13px;
    top: calc(50% + 12px);
    height: calc(100% - 24px);
    width: 2px;
    background: rgba(10, 10, 11, 0.16);
    transition: background var(--flow-dur) var(--flow-ease);
  }
  &:last-of-type::after {
    display: none;
  }
  &[data-state="completed"]::after {
    background: rgba(10, 10, 11, 0.55);
  }
`;

export const RailMark = styled.span`
  position: relative;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  z-index: 1;

  &::before {
    content: "";
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.4;
    transition:
      transform var(--flow-dur) var(--flow-ease),
      opacity var(--flow-dur) var(--flow-ease),
      box-shadow var(--flow-dur) var(--flow-ease);
  }

  [data-state="active"] &::before {
    opacity: 1;
    transform: scale(1.55);
    box-shadow: 0 0 0 5px rgba(10, 10, 11, 0.1);
  }
  [data-state="completed"] &::before {
    opacity: 1;
  }
`;

export const RailText = styled.span`
  font-size: clamp(15px, 1.35vw, 18px);
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.15;

  small {
    display: block;
    margin-bottom: 3px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: var(--flow-muted);
  }
`;

/* 모바일: 상단에 얇게 붙는 진행 바 */
export const MobileProgress = styled.div`
  display: none;

  @media (max-width: 960px) {
    display: block;
    position: sticky;
    top: var(--flow-sticky-top);
    z-index: 6;
    margin: 0 auto clamp(24px, 5vh, 40px);
    max-width: 560px;
    padding: 10px 14px;
    border-radius: 12px;
    background: rgba(10, 10, 11, 0.9);
    backdrop-filter: blur(4px);
  }
`;

export const MobileTrack = styled.div`
  height: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;

  span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--flow-lime);
    transition: width var(--flow-dur) var(--flow-ease);
  }
`;

export const MobileMeta = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
`;

/* ---------- Cards (파일처럼 쌓이는 스택) ---------- */

/*
  모든 카드가 하나의 CardsWrap 안에서 sticky 로 고정된다.
  카드 사이 StackGap 이 스크롤 길이를 만들고,
  각 카드는 top 에 --i * --stack-step 만큼 단차를 줘서 아래 카드가 위로 살짝 삐져나온다.
  카드는 섹션이 끝날 때까지 고정된 채 겹쳐 쌓인다 (덮이는 도중 빈틈 없음).
*/
export const CardsWrap = styled.div`
  position: relative;
  width: 100%;
  /* 레일을 가리지 않는 선에서 최대한 넓게 (왼쪽 컬럼 뒤에서 시작) */
  max-width: 1080px;
  margin: 0;

  @media (prefers-reduced-motion: reduce) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

export const StackGap = styled.div`
  height: clamp(320px, 52vh, 520px);

  &[data-tail="true"] {
    height: clamp(120px, 20vh, 220px);
  }

  @media (max-width: 960px) {
    height: clamp(240px, 40vh, 380px);
  }

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

export const Card = styled.article`
  position: sticky;
  top: calc(var(--flow-sticky-top) + var(--i, 0) * var(--stack-step));
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: clamp(420px, 62vh, 580px);
  padding: clamp(22px, 2.8vw, 40px);
  border-radius: 24px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid rgba(10, 10, 11, 0.08);
  box-shadow:
    0 2px 6px rgba(10, 10, 11, 0.06),
    0 30px 60px -24px rgba(10, 10, 11, 0.28);
  overflow: hidden;
  transform-origin: 50% 0;
  transition:
    transform var(--flow-dur) var(--flow-ease),
    filter var(--flow-dur) var(--flow-ease);

  /* 위에 다른 카드가 쌓여 파묻힌 상태 — 아주 미묘하게 뒤로 */
  &[data-state="completed"] {
    transform: scale(calc(1 - var(--depth, 1) * 0.014));
    filter: blur(calc(var(--depth, 0) * 0.4px));
  }

  /* 파묻힌 정도만큼 어둡게 덮는 오버레이 */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: #0a0a0b;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--flow-dur) var(--flow-ease);
  }
  &[data-state="completed"]::after {
    opacity: calc(var(--depth, 1) * 0.05);
  }

  &[data-last="true"] {
    height: clamp(460px, 68vh, 640px);
  }

  @media (max-width: 960px) {
    height: clamp(440px, 64vh, 540px);
    /* 모바일 상단 진행 바(MobileProgress) 아래로 카드를 고정 */
    top: calc(
      var(--flow-sticky-top) + 66px + var(--i, 0) * var(--stack-step)
    );
  }

  @media (prefers-reduced-motion: reduce) {
    position: static;
    transform: none;
    filter: none;
    transition: none;

    &::after {
      display: none;
    }
    &[data-state="completed"] {
      transform: none;
      filter: none;
    }
  }
`;

export const CardHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-shrink: 0;
`;

export const CardIndex = styled.span`
  font-family: "Unbounded", system-ui, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--flow-muted);
`;

export const CardHeadText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  color: var(--flow-ink);
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(19px, 2.1vw, 26px);
  letter-spacing: -0.02em;
`;

export const CardDesc = styled.p`
  margin: 0;
  color: var(--flow-body);
  font-size: clamp(13px, 1.2vw, 15px);
  line-height: 1.55;
`;

/* 카드 내부 mockup 이 놓이는 무대 */
export const CardStage = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  border-radius: 14px;
  background: #f5f6f8;
  border: 1px solid rgba(10, 10, 11, 0.07);
  overflow: hidden;
`;
