import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: #0a0a0b;
  display: flex;
  justify-content: center;
  padding: 56px clamp(16px, 4vw, 48px) 96px;
  box-sizing: border-box;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`;

export const TargetLink = styled.a`
  color: #bfff6b;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackLink = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: transparent;
  color: #d4d4d8;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;

  &:hover {
    background: #1c1c1f;
  }
`;

/* ---------- status states ---------- */

export const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  padding: 120px 0;
  text-align: center;
`;

export const Spinner = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 3px solid rgba(191, 255, 107, 0.2);
  border-top-color: #bfff6b;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const StatusText = styled.p`
  color: #9a9a9f;
  font-size: 15px;
  margin: 0;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 15px;
  margin: 0;
`;

export const RetryButton = styled.button`
  border: none;
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 12px;
  cursor: pointer;
`;

/* ---------- overview ---------- */

export const Hero = styled.section`
  display: flex;
  gap: clamp(20px, 5vw, 48px);
  align-items: center;
  padding: 28px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #121214;

  @media (max-width: 620px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ScoreRing = styled.div<{ value: number }>`
  --value: ${({ value }) => value};
  --hue: ${({ value }) => Math.round((value / 100) * 120)};
  flex-shrink: 0;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(
    hsl(var(--hue) 80% 60%) calc(var(--value) * 1%),
    rgba(255, 255, 255, 0.08) 0
  );

  &::before {
    content: "";
    position: absolute;
    width: 132px;
    height: 132px;
    border-radius: 50%;
  }
`;

export const ScoreInner = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #121214;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  z-index: 1;
`;

export const ScoreValue = styled.span`
  color: #f7f7f8;
  font-size: 34px;
  font-weight: 800;
  font-family: "Unbounded", system-ui, sans-serif;
  line-height: 1;
`;

export const ScoreLabel = styled.span`
  color: #8a8a90;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

export const HeroBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Verdict = styled.h1`
  margin: 0;
  color: #f7f7f8;
  font-size: clamp(20px, 3vw, 26px);
  font-weight: 700;
  font-family: "Unbounded", system-ui, sans-serif;
  letter-spacing: -0.02em;
`;

export const Summary = styled.p`
  margin: 0;
  color: #b9b9c0;
  font-size: 15px;
  line-height: 1.6;
`;

/* ---------- sections ---------- */

export const SectionTitle = styled.h2`
  margin: 0 0 4px;
  color: #f7f7f8;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const CategoryCard = styled.div`
  padding: 18px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #121214;
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
  color: #f0f0f2;
  font-size: 14px;
  font-weight: 700;
`;

export const CategoryScore = styled.span`
  color: #f0f0f2;
  font-size: 14px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
`;

export const Meter = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
`;

export const MeterFill = styled.div<{ value: number }>`
  height: 100%;
  border-radius: 999px;
  width: ${({ value }) => Math.max(0, Math.min(100, value))}%;
  background: hsl(${({ value }) => Math.round((value / 100) * 120)} 80% 60%);
`;

export const CategoryComment = styled.p`
  margin: 0;
  color: #9a9aa2;
  font-size: 13px;
  line-height: 1.55;
`;

export const StrengthList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StrengthItem = styled.li`
  position: relative;
  padding-left: 22px;
  color: #c7c7cd;
  font-size: 14px;
  line-height: 1.55;

  &::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #bfff6b;
    font-weight: 700;
  }
`;

export const IssueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const IssueCard = styled.div`
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #121214;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const IssueHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SEVERITY = {
  high: { fg: "#ff6b6b", bg: "rgba(255, 107, 107, 0.14)" },
  medium: { fg: "#ffb454", bg: "rgba(255, 180, 84, 0.14)" },
  low: { fg: "#8ab4ff", bg: "rgba(138, 180, 255, 0.14)" },
} as const;

export const SeverityTag = styled.span<{ level: "high" | "medium" | "low" }>`
  flex-shrink: 0;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ level }) => SEVERITY[level].fg};
  background: ${({ level }) => SEVERITY[level].bg};
`;

export const IssueTitle = styled.span`
  color: #f0f0f2;
  font-size: 14px;
  font-weight: 700;
`;

export const IssueRow = styled.div`
  display: grid;
  grid-template-columns: 44px 1fr;
  gap: 10px;
  align-items: baseline;
`;

export const IssueRowLabel = styled.span<{ $accent?: boolean }>`
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: ${({ $accent }) => ($accent ? "#bfff6b" : "#6f6f75")};
`;

export const IssueRowText = styled.p`
  margin: 0;
  color: #c7c7cd;
  font-size: 13px;
  line-height: 1.6;
`;
