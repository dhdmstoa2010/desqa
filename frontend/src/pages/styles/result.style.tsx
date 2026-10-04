import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { TONE, type Tone } from "../../components/styles/shared.style";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  padding: clamp(20px, 3vh, 32px) clamp(16px, 4vw, 48px) 96px;
  box-sizing: border-box;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
`;

export const BackLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  color: var(--ink-2);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--ink);
  }
`;

export const TargetLink = styled.a`
  color: var(--ink-2);
  font-size: 12px;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    color: var(--accent-d);
  }
`;

/* 상태 */
export const Status = styled.div`
  align-self: center;
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border-radius: 20px;
  background: var(--card);
`;

export const StatusCenter = styled(Status)`
  align-items: center;
  justify-content: center;
  min-height: 220px;
  text-align: center;
`;

export const ErrorCard = styled(Status)`
  background: var(--err-bg);
  align-items: flex-start;
`;

export const StatusText = styled.p`
  font-size: 12.5px;
  color: var(--ink-2);
`;

export const ErrorTag = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--ink-2);
  background: var(--mid-bg);
`;

export const ErrorTitle = styled.h2`
  font-size: 16px;
  font-weight: 800;
  color: var(--err-ink);
`;

export const ErrorSub = styled.p`
  font-size: 12.5px;
  line-height: 1.6;
  color: var(--err-ink);
`;

export const Spinner = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 8px solid var(--line);
  border-top-color: var(--ink-3);
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 3s;
  }
`;

export const ProgressHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-size: 13px;

  b {
    font-weight: 800;
    color: var(--ink);
  }

  span {
    font-size: 12px;
    color: var(--ink-2);
  }
`;

export const ProgressBar = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 4px;

  i {
    height: 4px;
    border-radius: 4px;
    background: var(--line);
  }
  i[data-state="done"] {
    background: var(--accent);
  }
  i[data-state="now"] {
    background: var(--accent-soft);
  }
`;

export const StepList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12.5px;
  color: var(--ink-2);

  li[data-state="now"] {
    font-weight: 800;
    color: var(--ink);
  }
  li[data-state="todo"] {
    color: var(--ink-3);
  }
  li::before {
    display: inline-block;
    width: 1.4em;
  }
  li[data-state="done"]::before {
    content: "✓";
  }
  li[data-state="now"]::before {
    content: "●";
  }
  li[data-state="todo"]::before {
    content: "○";
  }
`;

export const StatusHint = styled.p`
  font-size: 11.5px;
  color: var(--ink-3);
`;

export const RetryButton = styled.button`
  border: none;
  background: var(--accent);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 9px 20px;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background: var(--accent-d);
  }
`;

/* 요약 */
export const Hero = styled.section`
  display: flex;
  align-items: center;
  gap: clamp(24px, 5vw, 56px);

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ScoreRing = styled.div<{ value: number; $tone: Tone }>`
  --value: ${({ value }) => value};
  position: relative;
  flex-shrink: 0;
  width: 156px;
  height: 156px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(
    ${({ $tone }) => TONE[$tone].fg} calc(var(--value) * 1%),
    var(--line) 0
  );
`;

export const ScoreInner = styled.div`
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const ScoreValue = styled.span<{ $tone: Tone }>`
  font-family: var(--display);
  font-size: 56px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: ${({ $tone }) => TONE[$tone].fg};
`;

export const ScoreLabel = styled.span`
  font-size: 10.5px;
  color: var(--ink-3);
`;

export const HeroBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const Verdict = styled.h1`
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: var(--ink);
  word-break: keep-all;
`;

export const Summary = styled.p`
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--ink-2);
`;

export const HeroActions = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

/* 섹션 */
export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SectionTitle = styled.h2`
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-family: var(--display);
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: var(--ink);

  small {
    font-family: var(--sans);
    font-size: 11px;
    font-weight: 500;
    color: var(--ink-3);
    letter-spacing: 0;
  }
`;

export const CategoryGrid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CategoryCard = styled.div`
  padding: 14px 16px 16px;
  border-radius: 14px;
  background: var(--card);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CategoryHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
`;

export const CategoryName = styled.span`
  font-size: 11.5px;
  font-weight: 700;
  color: var(--ink);
`;

export const CategoryScore = styled.span<{ $tone: Tone }>`
  font-family: var(--display);
  font-size: 22px;
  font-weight: 900;
  line-height: 1;
  color: ${({ $tone }) => TONE[$tone].fg};
`;

export const Meter = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: var(--line);
  overflow: hidden;
`;

export const MeterFill = styled.div<{ value: number; $tone: Tone }>`
  height: 100%;
  border-radius: 999px;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
  background: ${({ $tone }) => TONE[$tone].fg};
`;

export const CategoryComment = styled.p`
  font-size: 11px;
  line-height: 1.55;
  color: var(--ink-2);
`;

export const StrengthList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const StrengthItem = styled.li`
  position: relative;
  padding: 14px 16px 14px 34px;
  border-radius: 12px;
  background: var(--good-bg);
  color: var(--ink);
  font-size: 11.5px;
  line-height: 1.55;

  &::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 19px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--good);
  }
`;

export const IssueColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(16px, 3vw, 32px);
  align-items: start;

  @media (max-width: 860px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const IssueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const IssueCard = styled.div`
  padding: 14px 16px 16px;
  border-radius: 14px;
  background: var(--card);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const IssueHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 2px;
`;

const SEVERITY = {
  high: { fg: "var(--low)", bg: "var(--low-bg)" },
  medium: { fg: "var(--mid)", bg: "var(--mid-bg)" },
  low: { fg: "var(--ink-2)", bg: "var(--card-deep)" },
} as const;

export const SeverityTag = styled.span<{ level: "high" | "medium" | "low" }>`
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 800;
  color: ${({ level }) => SEVERITY[level].fg};
  background: ${({ level }) => SEVERITY[level].bg};
`;

export const IssueTitle = styled.span`
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
`;

export const IssueRow = styled.div`
  display: grid;
  grid-template-columns: 32px 1fr;
  gap: 10px;
  align-items: baseline;
`;

export const IssueRowLabel = styled.span<{ $accent?: boolean }>`
  font-size: 10.5px;
  font-weight: 700;
  color: ${({ $accent }) => ($accent ? "var(--accent-d)" : "var(--ink-3)")};
`;

export const IssueRowText = styled.p`
  font-size: 11.5px;
  line-height: 1.6;
  color: var(--ink-2);
`;

/* 공유 배너 */
export const ShareToBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 22px 26px;
  border-radius: 20px;
  background: var(--accent-soft);

  strong {
    display: block;
    font-size: 14px;
    font-weight: 800;
    color: var(--ink);
  }

  p {
    margin-top: 4px;
    font-size: 11.5px;
    color: var(--ink-2);
  }
`;

export const ShareToBoardLink = styled(Link)`
  flex-shrink: 0;
  background: var(--accent);
  color: #fff;
  font-size: 12px;
  font-weight: 800;
  padding: 10px 18px;
  border-radius: 999px;
  text-decoration: none;

  &:hover {
    background: var(--accent-d);
  }
`;
