import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  padding: 20px 20px 64px;
  box-sizing: border-box;
`;

export const Container = styled.div`
  width: 100%;
`;

export const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 210px;
  border-radius: 16px;
  background: linear-gradient(
    100deg,
    #e8c9a0 0%,
    #d9a679 28%,
    #c0723f 55%,
    #8f9a62 100%
  );
`;

export const Actions = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 999px;
  background: rgba(249, 245, 234, 0.92);
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: var(--card);
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 0 8px;
  margin-top: -60px;
`;

export const Avatar = styled.div`
  flex-shrink: 0;
  width: 148px;
  height: 148px;
  border-radius: 50%;
  border: 4px solid var(--bg);
  background: linear-gradient(160deg, #c0723f 0%, #a55d2f 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 72px;
  font-weight: 700;
  text-transform: uppercase;
`;

export const Identity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 72px;
`;

export const Name = styled.h1`
  margin: 0;
  color: var(--ink);
  font-size: 30px;
  font-weight: 700;
  line-height: 1.1;
`;

export const Badge = styled.span`
  color: var(--ink-2);
  font-size: 15px;
  font-weight: 600;
`;

export const Stats = styled.div`
  margin-left: auto;
  display: flex;
  gap: 48px;
  padding-top: 72px;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StatLabel = styled.span`
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
`;

export const StatValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ink-2);
  font-size: 14px;
`;

export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--good);
`;

export const Tabs = styled.div`
  display: flex;
  gap: 48px;
  margin-top: 40px;
  padding: 0 8px;
  border-bottom: 1px solid var(--card);
`;

export const Tab = styled.button<{ active?: boolean }>`
  padding: 14px 4px;
  border: none;
  background: transparent;
  color: ${({ active }) => (active ? "var(--ink)" : "var(--ink-3)")};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active }) => (active ? "var(--good)" : "transparent")};
  margin-bottom: -1px;
`;

export const StatusText = styled.p`
  color: var(--ink-2);
  font-size: 14px;
  margin: 24px 0 0;
`;

export const ErrorText = styled.p`
  color: var(--low);
  font-size: 14px;
  margin: 24px 0 0;
`;

export const ActivityPanel = styled.div`
  margin-top: 32px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ActivitySection = styled.section``;

export const SectionHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 14px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--ink);
  font-size: 17px;
  font-weight: 700;
`;

export const SectionCount = styled.span`
  color: var(--ink-3);
  font-size: 13px;
  font-weight: 600;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--card);
`;

export const ItemRow = styled(Link)`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--card);
  text-decoration: none;
  color: inherit;
  transition: background 0.15s ease;

  &:hover {
    background: var(--card-deep);
  }
`;

export const ItemMain = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ItemTitle = styled.span`
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ItemMeta = styled.span`
  color: var(--ink-2);
  font-size: 12px;

  .dot {
    margin: 0 6px;
    opacity: 0.5;
  }
`;

export const ScoreTag = styled.span<{ $tone: "high" | "mid" | "low" }>`
  flex-shrink: 0;
  font-family: system-ui, sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: ${({ $tone }) =>
    $tone === "high" ? "var(--good)" : $tone === "mid" ? "var(--ink)" : "var(--low)"};
`;

export const EmptyRow = styled.p`
  margin: 0;
  padding: 28px 4px;
  color: var(--ink-3);
  font-size: 13px;
  text-align: center;
`;
