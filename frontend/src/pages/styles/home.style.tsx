import { css } from "@emotion/react";
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
  /* 고정 RevealFill(라임 밴드)이 스크롤에 따라 이 영역까지 확장돼 배경을 만든다.
     밴드가 아직 안 덮은 구간은 이 다크 배경이 그대로 보여 히어로와 이어진다. */
  background: #0a0a0b;
`;

/* ── 하단 마무리 CTA ── */
export const Outro = styled.section`
  position: relative;
  z-index: 1;
  background: #0a0a0b;
  padding: clamp(64px, 12vh, 140px) clamp(16px, 5vw, 48px) clamp(88px, 16vh, 168px);
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

export const OutroTitle = styled.h2`
  margin: 0 auto;
  max-width: 18ch;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 4vw, 40px);
  line-height: 1.25;
  letter-spacing: -0.03em;
  color: #f7f7f8;

  span {
    color: #bfff6b;
  }
`;

export const OutroActions = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const OutroPrimary = styled(Link)`
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 15px;
  font-weight: 800;
  padding: 15px 30px;
  border-radius: 999px;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #a6e34d;
  }
`;

export const OutroSecondary = styled(Link)`
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #f0f0f2;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 26px;
  border-radius: 999px;
  text-decoration: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(191, 255, 107, 0.6);
    background: rgba(191, 255, 107, 0.06);
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
  background: #bfff6b;
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
    color: #bfff6b;
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
    rgba(255, 232, 59, 0.28) 0%,
    rgba(170, 59, 255, 0) 70%
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
  color: #bfff6b;
`;

export const FormWrap = styled.div`
  align-self: flex-start;
  margin-top: clamp(28px, 3.5vh, 48px);

  @media (max-width: 1024px) {
    align-self: center;
  }
`;

const heroCta = css`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 17px 32px;
  border-radius: 14px;
  border: none;
  background: #bfff6b;
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
    background: #a6e34d;
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
