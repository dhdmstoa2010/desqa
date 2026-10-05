import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { hatch, skeletonStyle } from "./shared.style";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(14px, 1.6vw, 20px);

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: var(--ink);
  text-decoration: none;

  &:hover .thumb {
    transform: translateY(-2px);
    box-shadow: 0 14px 24px -16px rgba(60, 40, 15, 0.45);
  }

  &:hover h3 {
    color: var(--accent-d);
  }
`;

export const Thumb = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  border-radius: 14px;
  overflow: hidden;
  ${hatch}
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }

  .empty {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    color: var(--ink-3);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const Pills = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  span {
    padding: 3px 9px;
    border-radius: 999px;
    font-size: 10.5px;
    font-weight: 700;
    background: var(--card);
    color: var(--ink);
  }

  span[data-tone="high"] {
    background: var(--good-bg);
    color: var(--good);
  }
  span[data-tone="mid"] {
    background: var(--mid-bg);
    color: var(--mid);
  }
  span[data-tone="low"] {
    background: var(--low-bg);
    color: var(--low);
  }
`;

export const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.01em;
  word-break: keep-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.15s;
`;

export const Meta = styled.p`
  margin-top: -6px;
  font-size: 11.5px;
  color: var(--ink-3);
`;

export const PostSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .thumb {
    aspect-ratio: 1 / 1;
    border-radius: 14px;
    ${skeletonStyle}
  }

  .line {
    height: 10px;
    border-radius: 6px;
    ${skeletonStyle}
  }
  .line.short {
    width: 55%;
  }
`;
