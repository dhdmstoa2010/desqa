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
  /* 다크 배경 */
  background: #0a0a0b;
`;

/* 게시판 홍보 섹션 */
export const BoardPromo = styled.section`
  position: relative;
  /* 리빌 오버레이 위로 */
  z-index: 5;
  /* 히어로 밴드와 같은 색 */
  background: #a6e3e9;
  font-family: "Aggravo", system-ui, "Segoe UI", Roboto, sans-serif;
  padding: clamp(72px, 13vh, 150px) clamp(16px, 4vw, 48px);
`;

export const BoardPromoInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

export const BoardPromoTitle = styled.h2`
  margin: 0;
  text-align: left;
  font-family: "Aggravo", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 4vw, 40px);
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #0a0a0b;
`;

export const PromoGrid = styled.div`
  margin-top: clamp(32px, 5vh, 52px);
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(12px, 1.4vw, 18px);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const PromoCard = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 12px 12px 24px;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: #17171a;
  box-shadow: 0 24px 48px -28px rgba(10, 10, 11, 0.55);
  color: #f7f7f8;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 32px 56px -26px rgba(10, 10, 11, 0.65);
  }

  &:hover .promo-arrow {
    transform: translateX(4px);
    color: #a6e3e9;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const PromoPanel = styled.div`
  padding: 12px;
  border-radius: 16px;
  background: #202024;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PromoThumb = styled.div`
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  background: #ededf0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6a6a72;
  font-size: 12px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
`;

export const PromoPills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;

  span {
    padding: 10px 8px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #2b2b30;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
    color: #e6e6e8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span[data-tone="high"] {
    color: #a6e3e9;
  }
  span[data-tone="low"] {
    color: #ff6b5c;
  }
`;

export const PromoBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 22px 12px 0;
`;

export const PromoTitle = styled.h3`
  margin: 0;
  min-height: 2.9em;
  font-size: clamp(16px, 1.3vw, 18px);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
  color: #f7f7f8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
`;

export const PromoArrow = styled.span`
  flex-shrink: 0;
  margin-top: 3px;
  color: #d0d0d5;
  transition:
    transform 0.25s ease,
    color 0.25s ease;

  svg {
    display: block;
    width: 22px;
    height: 22px;
  }
`;

export const PromoMeta = styled.p`
  margin: 14px 0 0;
  padding: 0 12px;
  font-size: 13.5px;
  color: #9a9aa2;

  b {
    font-weight: 600;
    color: #cfcfd4;
  }

  .dot {
    margin: 0 6px;
    opacity: 0.5;
  }
`;

const promoPulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.9; }
`;

export const PromoSkeleton = styled.div`
  min-height: 330px;
  border-radius: 22px;
  background: rgba(10, 10, 11, 0.12);
  animation: ${promoPulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PromoEmpty = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  padding: 48px 0;
  text-align: center;
  font-size: 15px;
  color: rgba(10, 10, 11, 0.7);
`;

export const BoardPromoActions = styled.div`
  margin-top: clamp(28px, 4.5vh, 44px);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const OutroPrimary = styled(Link)`
  background: #0a0a0b;
  color: #a6e3e9;
  font-size: 15px;
  font-weight: 800;
  padding: 16px 32px;
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
  border: 1px solid rgba(10, 10, 11, 0.35);
  color: #0a0a0b;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 28px;
  border-radius: 999px;
  text-decoration: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: #0a0a0b;
    background: rgba(10, 10, 11, 0.06);
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
  font-family: "Aggravo", system-ui, sans-serif;

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
  font-family: "Aggravo", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;

  * {
    -webkit-text-stroke-color: currentColor;
  }
`;

const heavyStroke = css`
  -webkit-text-stroke: 0.035em currentColor;
  paint-order: stroke fill;
`;

export const Line = styled.span`
  display: block;
  white-space: nowrap;

  /* SplitText 조각 */
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
  ${heavyStroke}
`;

export const SecDesc = styled.span`
  display: block;
  margin-top: -0.06em;
  margin-left: 8px;
  text-align: left;
  font-size: clamp(32px, 7.1vw, 126px);
  line-height: 0.98;
  letter-spacing: -0.03em;
  ${heavyStroke}
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
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 15px 30px;
  border: none;
  color: #a6e3e9;
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
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

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    background: #ffffff;
    transition: 0.3s;
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }


  &:hover::before,
  &:hover::after {
    width: 100%;
  }
`;

export const HeroCta = styled(Link)`
  ${heroCta}
`;

/* RevealText 레이어용 복제 */
export const HeroCtaGhost = styled.span`
  ${heroCta}
`;
