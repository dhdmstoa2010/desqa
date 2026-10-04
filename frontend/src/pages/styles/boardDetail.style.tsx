import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { hatch, TONE, type Tone } from "../../components/styles/shared.style";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: clamp(20px, 3vh, 32px) clamp(16px, 4vw, 48px) 96px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TopLink = styled(Link)`
  align-self: flex-start;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  text-decoration: none;

  &:hover {
    color: var(--ink);
  }
`;

export const Banner = styled.div`
  width: 100%;
  aspect-ratio: 16 / 7;
  border-radius: 20px;
  overflow: hidden;
  ${hatch}
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--ink-3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;
  }
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--ink-2);
`;

export const ScoreBadge = styled.span<{ $tone: Tone }>`
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
  color: ${({ $tone }) => TONE[$tone].fg};
  background: ${({ $tone }) => TONE[$tone].bg};
`;

export const Title = styled.h1`
  font-family: var(--display);
  font-size: clamp(24px, 3.6vw, 34px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--ink);
  word-break: keep-all;
`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: clamp(20px, 3vw, 36px);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Article = styled.article`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const AuthorRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.div<{ $bg?: string; $muted?: boolean }>`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: var(--ink);
  background: ${({ $bg, $muted }) =>
    $muted ? "var(--card-deep)" : ($bg ?? "var(--good-bg)")};
`;

export const AuthorName = styled.div`
  font-size: 12.5px;
  font-weight: 700;
  color: var(--ink);

  span {
    margin-left: 4px;
    font-weight: 500;
    color: var(--ink-3);
  }
`;

export const AuthorMeta = styled.div`
  font-size: 11px;
  color: var(--ink-3);
`;

export const Actions = styled.div`
  position: relative;
  margin-left: auto;
`;

export const DeleteLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-size: 12px;
  font-weight: 700;
  color: var(--accent-d);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

export const ConfirmPop = styled.div`
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 2;
  width: 220px;
  padding: 14px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 14px 30px -12px rgba(60, 40, 15, 0.45);
  display: flex;
  flex-direction: column;
  gap: 12px;

  strong {
    font-size: 12.5px;
    color: var(--ink);
  }

  div {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
  }
`;

export const Lead = styled.p`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.7;
  color: var(--ink);
`;

export const BodyText = styled.div`
  font-size: 14px;
  line-height: 1.85;
  color: var(--ink);

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
    color: var(--ink);
    font-weight: 800;
  }
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.25em;
  }
  h3 {
    font-size: 1.1em;
  }
  a {
    color: var(--accent-d);
    text-underline-offset: 2px;
  }
  s {
    color: var(--ink-3);
  }
  blockquote {
    margin: 1em 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid var(--accent);
    color: var(--ink-2);
  }
  pre {
    margin: 1em 0;
    padding: 14px 16px;
    border-radius: 12px;
    background: #2e261c;
    color: #f3ebd8;
    font-family: var(--mono);
    font-size: 12.5px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 8px 0;
    display: block;
  }
`;

export const Reactions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ReactButton = styled.button`
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--card);
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;

  b {
    margin-left: 4px;
  }

  &:hover {
    border-color: var(--accent);
  }
`;

export const Comments = styled.section`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentsTitle = styled.h2`
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);

  span {
    margin-left: 4px;
    font-weight: 600;
    color: var(--ink-3);
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 10px;
`;

export const CommentHead = styled.div`
  font-size: 11px;
  color: var(--ink-3);

  b {
    margin-right: 6px;
    font-size: 12px;
    color: var(--ink);
  }
`;

export const CommentText = styled.p`
  margin-top: 2px;
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--ink-2);
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 5px 5px 16px;
  border-radius: 999px;
  border: 1px solid var(--line);
  background: var(--card);
`;

export const CommentInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  font-size: 12.5px;
  color: var(--ink);

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: var(--ink-3);
  }
`;

export const CommentSubmit = styled.button`
  border: none;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const LoginButton = styled(Link)`
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 18px;
  text-decoration: none;
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: var(--low);
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: sticky;
  top: 80px;

  @media (max-width: 860px) {
    position: static;
  }
`;

export const ScoreCard = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: var(--card);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Overall = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--ink-3);
`;

export const ScoreBig = styled.div<{ $tone: Tone }>`
  display: flex;
  align-items: baseline;
  gap: 6px;
  color: ${({ $tone }) => TONE[$tone].fg};

  strong {
    font-family: var(--display);
    font-size: 56px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  span {
    font-size: 11.5px;
    color: var(--ink-3);
  }
`;

export const Metrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Metric = styled.div``;

export const MetricHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 11.5px;
  color: var(--ink-2);

  b {
    color: var(--ink);
  }
`;

export const Bar = styled.div`
  height: 4px;
  border-radius: 999px;
  background: var(--line);
  overflow: hidden;
`;

export const BarFill = styled.div<{ $pct: number }>`
  height: 100%;
  border-radius: 999px;
  width: ${({ $pct }) => $pct}%;
  background: var(--good);
`;

export const PendingTitle = styled.div`
  font-family: var(--display);
  font-size: 28px;
  font-weight: 800;
  color: var(--ink-3);
`;

export const ScoreEmpty = styled.p`
  font-size: 12px;
  line-height: 1.65;
  color: var(--ink-2);
`;

export const EvalLink = styled(Link)`
  align-self: flex-start;
  padding: 9px 18px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: var(--accent-d);
  }
`;

export const BackLink = styled(Link)`
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-2);
  text-decoration: none;

  &:hover {
    color: var(--ink);
  }
`;

export const NotFound = styled.div`
  margin-top: 40px;
  min-height: 260px;
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  border: 1px dashed var(--ink-3);
  border-radius: 20px;

  strong {
    font-size: 14px;
    color: var(--ink);
  }

  p {
    font-size: 12.5px;
    color: var(--ink-2);
  }

  a {
    margin-top: 8px;
    padding: 8px 16px;
    border-radius: 999px;
    border: 1px solid var(--line);
    background: var(--card);
    font-size: 12.5px;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
  }
`;

export const LoadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .box {
    height: 220px;
    border-radius: 20px;
    background: var(--card-deep);
  }
  .line {
    height: 12px;
    border-radius: 6px;
    background: var(--card-deep);
  }
  .line.short {
    width: 40%;
  }
`;
