import styled from "@emotion/styled";
import { Link } from "react-router-dom";

type Tone = "high" | "mid" | "low";

const toneColor = (t: Tone) =>
  t === "high" ? "#bfff6b" : t === "mid" ? "#f2f2f4" : "#ff6b5c";

export const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100svh - 70px);
  background: #0a0a0b;
  color: #f7f7f8;
  box-sizing: border-box;
`;

/* ── 상단 히어로 ── */
export const Hero = styled.header`
  position: relative;
  padding: clamp(40px, 7vw, 88px) clamp(16px, 5vw, 72px) clamp(32px, 4vw, 52px);
  background:
    repeating-linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.028) 0,
      rgba(255, 255, 255, 0.028) 1px,
      transparent 1px,
      transparent 11px
    ),
    #0d0d0e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`;

export const HeroInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

export const DropZone = styled.div`
  width: 168px;
  margin: 0 auto clamp(28px, 4vw, 44px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #7c7c84;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;

  svg {
    width: 30px;
    height: 30px;
    opacity: 0.7;
  }

  b {
    color: #9a9aa2;
    font-weight: 600;
  }

  u {
    color: #9a9aa2;
    text-underline-offset: 2px;
  }
`;

export const HeroMeta = styled.p`
  margin: 0 0 14px;
  font-family: "Unbounded", ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #6f6f77;

  .domain {
    color: #bfff6b;
    font-weight: 600;
  }

  .sep {
    margin: 0 8px;
    opacity: 0.5;
  }
`;

export const HeroScore = styled.span<{ $tone: Tone }>`
  color: ${({ $tone }) => toneColor($tone)};
  font-weight: 700;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  max-width: 15ch;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 5.4vw, 60px);
  line-height: 1.12;
  letter-spacing: -0.03em;
  color: #f7f7f8;
`;

/* ── 본문 영역 ── */
export const Body = styled.div`
  padding: clamp(36px, 5vw, 64px) clamp(16px, 5vw, 72px) 120px;
`;

export const BodyInner = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: clamp(28px, 5vw, 64px);
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Article = styled.article`
  min-width: 0;
`;

export const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Avatar = styled.span<{ $bg: string }>`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: ${({ $bg }) => $bg};
  color: #0a0a0b;
  font-weight: 800;
  font-size: 15px;
  text-transform: uppercase;
`;

export const AuthorName = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #ededf0;
`;

export const AuthorMeta = styled.span`
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #7a7a7f;
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #b9b9c0;
  font-size: 12px;
  font-weight: 600;
  padding: 7px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover {
    color: #f7f7f8;
    border-color: rgba(255, 255, 255, 0.36);
  }
`;

export const Lead = styled.p`
  margin: 26px 0 0;
  font-size: clamp(16px, 2vw, 19px);
  font-weight: 700;
  line-height: 1.6;
  color: #f2f2f4;
`;

export const BodyText = styled.p`
  margin: 18px 0 0;
  font-size: 15px;
  line-height: 1.85;
  color: #a7a7ae;
  white-space: pre-wrap;
`;

export const Reactions = styled.div`
  margin-top: 32px;
  display: flex;
  gap: 10px;
`;

export const ReactButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #cfcfd5;
  font-size: 13px;
  font-weight: 600;
  padding: 9px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(191, 255, 107, 0.5);
    background: rgba(191, 255, 107, 0.06);
  }
`;

/* ── 댓글 ── */
export const Comments = styled.section`
  margin-top: 44px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const CommentsTitle = styled.h2`
  margin: 0 0 20px;
  font-size: 15px;
  font-weight: 700;
  color: #ededf0;

  span {
    margin-left: 8px;
    color: #bfff6b;
    font-size: 13px;
  }
`;

export const CommentItem = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  padding: 16px 0;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

export const CommentAvatar = styled.span<{ $bg: string; $fg: string }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const CommentHead = styled.div`
  font-size: 12px;
  color: #7a7a7f;
  margin-bottom: 5px;

  b {
    color: #c7c7cd;
    font-weight: 700;
    margin-right: 8px;
  }
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: #a7a7ae;
`;

export const CommentForm = styled.form`
  margin-top: 18px;
  display: flex;
  gap: 10px;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #141416;
  color: #f5f5f5;
  font-size: 13px;

  &::placeholder {
    color: #6f6f77;
  }
`;

export const LoginButton = styled(Link)`
  flex-shrink: 0;
  display: inline-grid;
  place-items: center;
  padding: 0 22px;
  border-radius: 12px;
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.2s;

  &:hover {
    background: #a6e34d;
  }

  @media (max-width: 520px) {
    padding: 12px 22px;
  }
`;

/* ── 사이드바 ── */
export const Aside = styled.aside`
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: 900px) {
    position: static;
  }
`;

export const ScoreCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 16px;
  background: #141416;
  padding: 22px 22px 24px;
`;

export const Overall = styled.span`
  display: block;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #6a6a70;
`;

export const ScoreBig = styled.div<{ $tone: Tone }>`
  margin-top: 10px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-family: "Unbounded", system-ui, sans-serif;

  strong {
    font-size: 46px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: ${({ $tone }) => toneColor($tone)};
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #6a6a70;
  }
`;

export const Metrics = styled.div`
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Metric = styled.div``;

export const MetricHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 7px;
  font-size: 12.5px;

  span {
    color: #b1b1b8;
  }

  b {
    color: #f2f2f4;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
`;

export const Bar = styled.div`
  height: 4px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.max(4, Math.min(100, $pct))}%;
  border-radius: 999px;
  background: linear-gradient(90deg, #8fd94a, #bfff6b);
`;

export const BackLink = styled(Link)`
  display: block;
  padding: 15px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #d0d0d6;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover {
    color: #bfff6b;
    border-color: rgba(191, 255, 107, 0.45);
  }
`;

/* ── 미존재 ── */
export const NotFound = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 120px 24px;
  text-align: center;

  p {
    margin: 0 0 20px;
    color: #9a9aa2;
    font-size: 15px;
  }
`;
