import styled from "@emotion/styled";
import { css } from "@emotion/react";

/* 카드 섹션 */
export const Section = styled.section`
  position: relative;
  z-index: 5;
  width: 100%;
  padding: clamp(48px, 8vh, 100px) clamp(16px, 5vw, 64px)
    clamp(56px, 10vh, 132px);
  box-sizing: border-box;
`;

export const Heading = styled.h2`
  max-width: 1160px;
  margin: 0 auto clamp(20px, 5vh, 56px);
  color: #0a0a0b;
  font-family: system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(26px, 4.8vw, 60px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  text-align: left;

  span {
    padding: 0 0.12em;
    background: #0a0a0b;
    color: #a6e3e9;
    border-radius: 4px;
  }
`;

export const Track = styled.div`
  position: relative;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  aspect-ratio: 1160 / 1650;

  @media (max-width: 900px) {
    aspect-ratio: auto;
    max-width: 520px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
`;

export const Trail = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;

  path {
    fill: none;
    stroke: #0a0a0b;
    stroke-width: 7;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke-dashoffset 0.45s ease-out;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const POS = {
  1: css`
    top: 0;
    left: 0;
  `,
  2: css`
    top: 44%;
    right: 0;
  `,
  3: css`
    top: 85%;
    left: 0;
  `,
} as const;

export const Card = styled.article<{ pos: 1 | 2 | 3 }>`
  position: absolute;
  width: clamp(300px, 46%, 524px);
  ${({ pos }) => POS[pos]}
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(24px, 2.6vw, 38px);
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid rgba(10, 10, 11, 0.14);
  background: #0a0a0b;
  overflow: hidden;
  box-shadow: 0 24px 50px -24px rgba(10, 10, 11, 0.6);

  /* 스크롤 등장 */
  opacity: 0;
  transform: translateY(40px);
  transition:
    opacity 0.55s ease,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  &.in {
    opacity: 1;
    transform: translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      120% 80% at 0% 0%,
      rgba(166, 227, 233, 0.14) 0%,
      rgba(166, 227, 233, 0) 58%
    );
    opacity: 0;
    transition: opacity 0.25s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 900px) {
    position: static;
    width: 100%;
  }
`;

export const Step = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 13px;
  border: 1px solid rgba(166, 227, 233, 0.35);
  background: rgba(166, 227, 233, 0.1);
  color: #a6e3e9;
  font-family: system-ui, sans-serif;
  font-weight: 700;
  font-size: 16px;
`;

export const CardTitle = styled.h3`
  margin: 6px 0 0;
  color: #f7f7f8;
  font-family: system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 1.8vw, 24px);
  letter-spacing: -0.02em;
`;

export const CardText = styled.p`
  margin: 0;
  color: #9a9aa2;
  font-family: system-ui, sans-serif;
  font-weight: 300;
  font-size: clamp(14px, 1.15vw, 16px);
  line-height: 1.65;
`;
