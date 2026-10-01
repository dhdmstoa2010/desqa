import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const cardPulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 0.9; }
`;

/* 평가 기록 섹션 */
export const ReviewSection = styled.section`
  position: relative;
  background: #0a0a0b;
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  padding: clamp(56px, 10vh, 120px) clamp(16px, 4vw, 48px) 0;
`;

export const ReviewSectionInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

export const ReviewSectionTitle = styled.h2`
  margin: 0;
  font-family: system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(24px, 4vw, 40px);
  line-height: 1.3;
  letter-spacing: -0.03em;
  color: #f7f7f8;
`;

export const ReviewSectionDesc = styled.p`
  margin: 10px 0 0;
  font-size: 14px;
  color: #b9b9c0;
`;

export const ReviewGrid = styled.div`
  margin-top: clamp(28px, 4.5vh, 44px);
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

export const ReviewCard = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #17171a;
  color: #f7f7f8;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(166, 227, 233, 0.4);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export const ReviewCardHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

export const ReviewDomain = styled.span`
  min-width: 0;
  font-size: 13px;
  font-weight: 700;
  color: #d0d0d5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ReviewTime = styled.span`
  flex-shrink: 0;
  font-size: 11.5px;
  color: #8a8a92;
`;

export const ReviewScore = styled.div<{ $tone: "high" | "mid" | "low" }>`
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ $tone }) =>
    $tone === "high" ? "#a6e3e9" : $tone === "low" ? "#ff6b5c" : "#f7f7f8"};

  small {
    margin-left: 4px;
    font-size: 13px;
    font-weight: 600;
    color: #8a8a92;
  }
`;

export const ReviewSummary = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #b9b9c0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ReviewSkeleton = styled.div`
  min-height: 150px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  animation: ${cardPulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ReviewEmpty = styled.p`
  grid-column: 1 / -1;
  margin: 0;
  padding: 48px 0;
  text-align: center;
  font-size: 15px;
  color: #8a8a92;
`;

/* 게시판 섹션 */
export const BoardPromo = styled.section`
  position: relative;
  min-height: calc(100svh - 70px);
  background: #a6e3e9;
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  padding: clamp(72px, 13vh, 150px) clamp(16px, 4vw, 48px);
  box-sizing: border-box;
`;

export const BoardPromoInner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
`;

export const BoardPromoTitle = styled.h2`
  margin: 0;
  text-align: left;
  font-family: system-ui, sans-serif;
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
    transform: translateY(-2px);
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
  border: 1px solid rgba(10, 10, 11, 0.35);
  color: rgba(255, 255, 255, 0.85);
  font-size: 15px;
  font-weight: 700;
  padding: 15px 28px;
  border-radius: 999px;
  text-decoration: none;
  background: #000000;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: #0a0a0b;
    background: rgba(10, 10, 11, 0.06);
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

