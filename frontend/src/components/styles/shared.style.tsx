import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export type Tone = "high" | "mid" | "low";

export const TONE = {
  high: { fg: "var(--good)", bg: "var(--good-bg)", label: "좋음" },
  mid: { fg: "var(--mid)", bg: "var(--mid-bg)", label: "보통" },
  low: { fg: "var(--low)", bg: "var(--low-bg)", label: "낮음" },
} as const;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

export const skeletonStyle = css`
  background: var(--card-deep);
  animation: ${pulse} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Skeleton = styled.div`
  ${skeletonStyle}
  border-radius: 14px;
`;

export const hatch = css`
  background:
    repeating-linear-gradient(
      135deg,
      transparent 0 9px,
      rgba(255, 255, 255, 0.55) 9px 18px
    ),
    var(--card-deep);
`;

export const Hatch = styled.div`
  ${hatch}
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-3);
  font-size: 12px;
`;

export const EmptyBox = styled.div`
  grid-column: 1 / -1;
  min-height: 180px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  border: 1px dashed var(--ink-3);
  border-radius: 18px;
  background: var(--bg);

  strong {
    font-size: 14px;
    font-weight: 700;
    color: var(--ink);
  }

  p {
    font-size: 12.5px;
    color: var(--ink-2);
  }
`;

export const ErrorBox = styled.div`
  grid-column: 1 / -1;
  min-height: 180px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  border-radius: 18px;
  background: var(--err-bg);

  strong {
    font-size: 14px;
    font-weight: 700;
    color: var(--err-ink);
  }

  p {
    font-size: 12.5px;
    color: var(--err-ink);
  }
`;

const pillBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s,
    opacity 0.15s;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const PrimaryLink = styled(Link)`
  ${pillBase}
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;

  &:hover {
    background: var(--accent-d);
    border-color: var(--accent-d);
  }
`;

export const GhostLink = styled(Link)`
  ${pillBase}
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);

  &:hover {
    border-color: var(--ink-3);
  }
`;

export const PrimaryButton = styled.button`
  ${pillBase}
  border: 1px solid var(--accent);
  background: var(--accent);
  color: #fff;

  &:hover:not(:disabled) {
    background: var(--accent-d);
    border-color: var(--accent-d);
  }
`;

export const GhostButton = styled.button`
  ${pillBase}
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);

  &:hover:not(:disabled) {
    border-color: var(--ink-3);
  }
`;

export const ScorePill = styled.span<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: ${({ $tone }) => TONE[$tone].fg};
  background: ${({ $tone }) => TONE[$tone].bg};
`;

export const GhostAnchor = styled.a`
  ${pillBase}
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);

  &:hover {
    border-color: var(--ink-3);
  }
`;
