import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  flex: 1 0 auto;
  min-height: calc(100svh - 70px);
  overflow: hidden;
  background: #0a0a0b;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px clamp(16px, 2.5vw, 44px);
  box-sizing: border-box;
`;

export const ProcessAnimation = styled.section`
  position: relative;
  width: 100%;
  /* 고정 RevealFill(포인트 컬러 밴드)이 스크롤에 따라 이 영역까지 확장돼 배경을 만든다.
     밴드가 아직 안 덮은 구간은 이 다크 배경이 그대로 보여 히어로와 이어진다. */
  background: #0a0a0b;
`;

/* ── 게시판 홍보 섹션 ── */
export const BoardPromo = styled.section`
  position: relative;
  /* RevealFill(고정 포인트 컬러 오버레이, z-index:3)이 히어로 이후 화면을 영구히 덮으므로
     ServiceFlow와 마찬가지로 그 위에 뜨도록 z-index를 올린다. */
  z-index: 5;
  /* 히어로 리빌 밴드와 같은 하늘색 — 스크롤해 내려와도 같은 배경이 이어지는 느낌을 준다. */
  background: #a6e3e9;
  padding: clamp(72px, 13vh, 150px) clamp(16px, 5vw, 48px);
`;

export const BoardPromoInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
`;

export const BoardPromoTitle = styled.h2`
  margin: 0 auto;
  max-width: 22ch;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 4vw, 40px);
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #0a0a0b;

  span {
    color: #ffffff;
  }
`;

export const BoardPromoDesc = styled.p`
  margin: 18px auto 0;
  max-width: 46ch;
  color: rgba(10, 10, 11, 0.65);
  font-size: clamp(14px, 1.4vw, 16px);
  line-height: 1.7;
`;

/* 핀 고정 + 가로 스크럽 (gsap.com 홈 "Tools" 섹션 참고) — 데스크톱에서만 핀 고정,
   좁은 화면에서는 세로로 쌓아 일반 스크롤로 본다. */
export const BoardPromoScrollPin = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;

  @media (min-width: 900px) {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const BoardPromoFeatures = styled.div`
  display: flex;
  align-items: stretch;
  gap: clamp(16px, 2.2vw, 28px);
  width: max-content;
  padding: 8px clamp(16px, 8vw, 16vw) 8px clamp(16px, 6vw, 12vw);
  text-align: left;
  will-change: transform;

  @media (max-width: 899px) {
    width: auto;
    flex-direction: column;
    padding: 8px clamp(16px, 5vw, 48px) 0;
  }
`;

const boardPromoCardBase = css`
  position: relative;
  flex: 0 0 auto;
  width: min(400px, 80vw);
  min-height: clamp(300px, 40vh, 380px);
  padding: clamp(20px, 2.2vw, 26px);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: 899px) {
    width: auto;
    min-height: 0;
  }
`;

export const BoardPromoFeature = styled.div`
  ${boardPromoCardBase}
  border: 1px solid rgba(10, 10, 11, 0.06);
  background: #f7f7f8;
  box-shadow: 0 28px 56px -28px rgba(10, 10, 11, 0.55);
`;

/* 실제 화면 캡처를 하늘색 패널 위에 떠 있는 창처럼 보여준다 */
export const BoardPromoFeatureShot = styled.div`
  width: 100%;
  height: clamp(130px, 19vh, 170px);
  padding: 14px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: clamp(16px, 2.2vh, 22px);
  background: rgba(166, 227, 233, 0.45);

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
    border-radius: 10px;
    box-shadow: 0 14px 28px -14px rgba(10, 10, 11, 0.6);
  }
`;

/* 트랙의 마지막 카드 — 다른 카드(검정)와 반대로 밝은 카드에, 게시물 작성 화면을 미니 목업으로 보여준다 */
export const BoardPromoFinalCard = styled.div`
  ${boardPromoCardBase}
  border: 1px solid rgba(10, 10, 11, 0.06);
  background: #f7f7f8;
  box-shadow: 0 28px 56px -28px rgba(10, 10, 11, 0.55);

  @media (min-width: 900px) {
    width: min(460px, 80vw);
  }
`;

const caretBlink = keyframes`
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0; }
`;

/* 게시물 작성 화면 미니 목업 */
export const Composer = styled.div`
  width: 100%;
  margin-top: clamp(14px, 2vh, 20px);
  padding: 16px;
  box-sizing: border-box;
  border-radius: 14px;
  border: 1px solid rgba(10, 10, 11, 0.1);
  background: #ffffff;
  box-shadow: 0 10px 24px -16px rgba(10, 10, 11, 0.35);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ComposerTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ComposerChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  span {
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(10, 10, 11, 0.14);
    font-size: 11.5px;
    font-weight: 600;
    color: #55555c;
  }

  span[data-active="true"] {
    border-color: transparent;
    background: #a6e3e9;
    color: #0a0a0b;
    font-weight: 700;
  }
`;

export const ComposerScore = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  font-family: "Unbounded", system-ui, sans-serif;
  color: #0a0a0b;

  b {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  small {
    font-size: 8.5px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #77777f;
  }
`;

export const ComposerHeadline = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  color: #0a0a0b;

  &::after {
    content: "";
    display: inline-block;
    width: 2px;
    height: 1em;
    margin-left: 3px;
    vertical-align: -2px;
    background: #0a0a0b;
    animation: ${caretBlink} 1.1s steps(1) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

export const ComposerLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  i {
    display: block;
    height: 7px;
    border-radius: 4px;
    background: rgba(10, 10, 11, 0.08);
  }

  i:nth-of-type(1) {
    width: 100%;
  }
  i:nth-of-type(2) {
    width: 82%;
  }
  i:nth-of-type(3) {
    width: 56%;
  }
`;

export const BoardPromoFinalActions = styled.div`
  margin-top: auto;
  padding-top: clamp(16px, 2.6vh, 24px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export const BoardPromoFeatureNum = styled.span`
  display: inline-block;
  margin-bottom: 10px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #0a0a0b;
  font-family: "Unbounded", system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: #a6e3e9;
`;

export const BoardPromoFeatureTitle = styled.h3`
  margin: 0 0 8px;
  color: #0a0a0b;
  font-family: "Unbounded", system-ui, sans-serif;
  font-size: clamp(17px, 1.6vw, 20px);
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const BoardPromoFeatureDesc = styled.p`
  margin: 0;
  max-width: 32ch;
  color: #55555c;
  font-size: clamp(13.5px, 1.1vw, 14.5px);
  line-height: 1.6;
`;

export const OutroPrimary = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
  background: #0a0a0b;
  color: #a6e3e9;
  font-size: 15px;
  font-weight: 800;
  padding: 15px 30px;
  border-radius: 999px;
  text-decoration: none;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #1c1c20;
    transform: translateY(-1px);
  }
`;

export const OutroSecondary = styled(Link)`
  font-size: 13.5px;
  font-weight: 700;
  color: #55555c;
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-color: rgba(10, 10, 11, 0.25);
  transition:
    color 0.15s,
    text-decoration-color 0.15s;

  &:hover {
    color: #0a0a0b;
    text-decoration-color: #0a0a0b;
  }
`;

export const ScrollStage = styled.div`
  position: sticky;
  top: 70px;
  z-index: 5;
  height: calc(100svh - 70px);
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  font-family: "Unbounded", system-ui, sans-serif;
  font-size: clamp(13px, 1.6vw, 20px);
  letter-spacing: 0.04em;
  text-align: center;
`;

export const ScrollCue = styled.div`
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  color: #6a6a70;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  pointer-events: none;

  &::after {
    content: "";
    width: 1px;
    height: 36px;
    background: linear-gradient(#6a6a70, transparent);
    animation: scrollCue 1.8s ease-in-out infinite;
  }

  @keyframes scrollCue {
    0%,
    100% {
      transform: scaleY(0.4);
      transform-origin: top;
      opacity: 0.4;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
      opacity: 1;
    }
  }
`;

export const RevealFill = styled.div`
  position: fixed;
  inset: 0;
  z-index: 3;
  background: #a6e3e9;
  pointer-events: none;
  clip-path: var(--reveal-clip, inset(0 100% 0 0));
  will-change: clip-path;
`;

export const RevealText = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px clamp(16px, 2.5vw, 44px);
  box-sizing: border-box;
  pointer-events: none;
  clip-path: var(--reveal-clip, inset(0 100% 0 0));
  will-change: clip-path;

  h1,
  h1 * {
    color: #0a0a0b !important;
  }
  h1 .accent {
    color: #ffffff !important;
  }

  .hero-form {
    background: #0a0a0b;
    color: #a6e3e9;
  }
`;

export const GlowAnchor = styled.div`
  position: absolute;
  left: calc(6% + 340px);
  top: calc(-25% + 340px);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

export const Glow = styled.div`
  width: 680px;
  height: 680px;
  max-width: 90vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(227, 253, 253, 0.28) 0%,
    rgba(227, 253, 253, 0) 70%
  );
  will-change: transform, opacity;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
  margin-bottom: 3vh;

  @media (max-width: 1024px) {
    gap: 28px;
  }
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #b9b9c0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
  will-change: transform, opacity;
`;

export const Title = styled.h1`
  margin: 0;
  width: max-content;
  max-width: 100%;
  color: #f7f7f8;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Line = styled.span`
  display: block;
  white-space: nowrap;

  /* SplitText가 만드는 조각 */
  .word,
  .char {
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
  }
`;

export const Desc = styled.span`
  display: block;
  margin-top: -0.25em;
  text-align: left;
  font-size: clamp(24px, 14.5vw, 184px);
  line-height: 1.4;
  letter-spacing: -0.03em;
  word-spacing: 0.04em;
`;

export const SecDesc = styled.span`
  display: block;
  margin-top: -0.06em;
  margin-left: 8px;
  text-align: left;
  font-size: clamp(32px, 7.1vw, 126px);
  line-height: 0.98;
  letter-spacing: -0.03em;
`;

export const Accent = styled.span`
  color: #a6e3e9;
`;

export const FormWrap = styled.div`
  align-self: flex-start;
  margin-top: clamp(28px, 3.5vh, 48px);

  &:focus {
    outline: 2px solid #a6e3e9;
    outline-offset: 0;
  }
`;

const heroCta = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border-radius: 14px;
  border: none;
  background: #a6e3e9;
  color: #0a0a0b;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  clip-path: inset(0px 0px 0px 0px);
  will-change: clip-path;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #88f5ff;
    transform: translateY(-1px);
  }
`;

export const HeroCta = styled(Link)`
  ${heroCta}
`;

/* RevealText 레이어용 시각 복제 (링크 동작 없음) */
export const HeroCtaGhost = styled.span`
  ${heroCta}
`;
