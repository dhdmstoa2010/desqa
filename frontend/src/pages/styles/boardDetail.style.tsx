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
  color: #c9c9cf;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;

  svg {
    width: 30px;
    height: 30px;
    opacity: 0.85;
  }

  b {
    color: #ededf0;
    font-weight: 600;
  }

  u {
    color: #ededf0;
    text-underline-offset: 2px;
  }
`;

export const HeroShot = styled.div`
  max-width: 720px;
  margin: 0 auto clamp(28px, 4vw, 44px);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0a0a0b;
  line-height: 0;

  img {
    width: 100%;
    max-height: 460px;
    object-fit: contain;
    display: block;
  }
`;

export const HeroMeta = styled.p`
  margin: 0 0 14px;
  font-family: "Unbounded", ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: #d0d0d5;

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
  color: #d0d0d5;
`;

export const Actions = styled.div`
  margin-left: auto;
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #dedee1;
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

export const BodyText = styled.div`
  margin: 18px 0 0;
  font-size: 15px;
  line-height: 1.85;
  color: #d6d6da;

  > *:first-of-type {
    margin-top: 0;
  }

  p {
    margin: 0 0 0.9em;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 1.4em 0 0.5em;
    line-height: 1.3;
    color: #ffffff;
    font-weight: 800;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.3em;
  }
  h3 {
    font-size: 1.13em;
  }
  h4 {
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #cfcfd4;
  }

  a {
    color: #bfff6b;
    text-underline-offset: 2px;
  }

  s {
    color: #9a9aa2;
  }

  blockquote {
    margin: 1em 0;
    padding: 6px 0 6px 16px;
    border-left: 3px solid rgba(191, 255, 107, 0.5);
    color: #cfcfd4;
  }

  pre {
    margin: 1em 0;
    padding: 14px 16px;
    border-radius: 10px;
    background: #111113;
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-family: ui-monospace, Consolas, monospace;
    font-size: 13.5px;
    white-space: pre-wrap;
    word-break: break-word;
  }

  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 12px 0;
    display: block;
  }
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
  color: #d0d0d5;
  margin-bottom: 5px;

  b {
    color: #ffffff;
    font-weight: 700;
    margin-right: 8px;
  }
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 13.5px;
  line-height: 1.7;
  color: #d6d6da;
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
    color: #9a9aa2;
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
  color: #c9c9cf;
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
    color: #c9c9cf;
  }
`;

export const ScoreEmpty = styled.p`
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: #d0d0d5;
`;

export const EvalLink = styled(Link)`
  display: inline-block;
  margin-top: 14px;
  font-size: 13px;
  font-weight: 700;
  color: #bfff6b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
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
    color: #dedee1;
  }

  b {
    color: #ffffff;
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
  padding: 17px 22px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    color: #bfff6b;
    border-color: rgba(191, 255, 107, 0.55);
    background: rgba(191, 255, 107, 0.08);
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
    color: #dedee1;
    font-size: 15px;
  }
`;
