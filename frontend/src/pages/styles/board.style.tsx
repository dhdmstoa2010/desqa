import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100svh - 70px);
  background: #0a0a0b;
  color: #f7f7f8;
  padding: clamp(48px, 7vw, 96px) clamp(16px, 5vw, 72px) 120px;
  box-sizing: border-box;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

/* ── 헤더 ── */
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 40px;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(34px, 6vw, 76px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: #f7f7f8;
`;

export const TitleAccent = styled.span`
  display: block;
  color: #bfff6b;
  text-shadow: 0 0 32px rgba(191, 255, 107, 0.35);
`;

export const HeaderSide = styled.div`
  max-width: 340px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-bottom: 8px;

  @media (max-width: 720px) {
    max-width: 100%;
  }
`;

export const HeaderDesc = styled.p`
  margin: 0;
  color: #9a9aa2;
  font-size: 14px;
  line-height: 1.7;
`;

export const ShareButton = styled.button`
  align-self: flex-start;
  background: #bfff6b;
  color: #0a0a0b;
  border: none;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.2s;

  &:hover {
    background: #a6e34d;
    transform: translateY(-1px);
  }
`;

/* ── 필터 바 ── */
export const Toolbar = styled.div`
  margin-top: clamp(36px, 5vw, 56px);
  padding-top: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

export const Filters = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const FilterChip = styled.button<{ $active?: boolean }>`
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "rgba(255, 255, 255, 0.14)")};
  background: ${({ $active }) => ($active ? "#f7f7f8" : "transparent")};
  color: ${({ $active }) => ($active ? "#0a0a0b" : "#b9b9c0")};
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background 0.15s;

  &:hover {
    color: ${({ $active }) => ($active ? "#0a0a0b" : "#f7f7f8")};
    border-color: ${({ $active }) =>
      $active ? "transparent" : "rgba(172, 172, 172, 0.32)"};
  }
`;

export const Sort = styled.button`
  background: none;
  border: none;
  color: #7a7a7f;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;

  &:hover {
    color: #f7f7f8;
  }
`;

/* ── 게시물 리스트 ── */
export const List = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Empty = styled.p`
  margin: 0;
  padding: 64px 0;
  text-align: center;
  color: #6a6a70;
  font-size: 14px;
`;

/* 애니메이션되는 상세 영역 (호버 시 0fr → 1fr) */
export const Detail = styled.div`
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DetailClip = styled.div`
  overflow: hidden;
  min-height: 0;
`;

export const DetailInner = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const DetailText = styled.p`
  margin: 0;
  color: #c2c2c9;
  font-size: 13px;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const DeltaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const DeltaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: 600;
  color: #b9b9c0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 3px 8px;

  b {
    color: #bfff6b;
    font-weight: 700;
  }
`;

export const RowLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &:last-of-type {
    border-bottom: none;
  }

  &:hover .board-row {
    background: #131316;
    box-shadow: inset 0 0 0 1px rgba(145, 145, 145, 0.16);
  }

  &:hover .board-detail {
    grid-template-rows: 1fr;
  }

  &:hover .thumb {
    border-color: rgba(191, 255, 107, 0.35);
    color: #cfe8a6;
  }

  &:focus-visible {
    outline: 2px solid #bfff6b;
    outline-offset: -2px;
    border-radius: 12px;
  }
`;

export const Row = styled.article`
  position: relative;
  display: grid;
  grid-template-columns: 108px minmax(0, 1fr) auto;
  column-gap: 22px;
  align-items: start;
  padding: 20px 16px;
  border-radius: 12px;
  transition:
    background 0.25s,
    box-shadow 0.25s;

  @media (max-width: 640px) {
    grid-template-columns: 76px minmax(0, 1fr) auto;
    column-gap: 14px;
    padding: 16px 8px;
  }
`;

export const Thumb = styled.div<{ $from: string; $to: string }>`
  width: 108px;
  height: 78px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    135deg,
    ${({ $from }) => $from}66,
    ${({ $to }) => $to}66
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: #8b8b92;
  font-size: 11px;
  line-height: 1.3;
  text-align: center;
  flex-shrink: 0;
  transition:
    border-color 0.25s,
    color 0.25s;

  span:first-of-type {
    font-weight: 700;
    color: inherit;
  }
  span:last-of-type {
    text-decoration: underline;
    opacity: 0.75;
  }

  @media (max-width: 640px) {
    width: 76px;
    height: 60px;
    font-size: 9px;
  }
`;

export const Main = styled.div`
  min-width: 0;
`;

export const Domain = styled.span`
  display: block;
  font-size: 11px;
  color: #6f6f77;
  letter-spacing: 0.03em;
  margin-bottom: 6px;
`;

export const RowTitle = styled.h3`
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.45;
  color: #f2f2f4;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

export const Badge = styled.span`
  font-size: 10px;
  font-weight: 700;
  color: #0a0a0b;
  background: #bfff6b;
  border-radius: 999px;
  padding: 3px 8px;
  letter-spacing: 0.02em;
`;

export const Meta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #7a7a7f;

  b {
    color: #a9a9b0;
    font-weight: 600;
  }

  .dot {
    margin: 0 7px;
    opacity: 0.4;
  }
`;

export const Score = styled.div<{ $tone: "high" | "mid" | "low" }>`
  flex-shrink: 0;
  text-align: right;
  line-height: 1;
  font-family: "Unbounded", system-ui, sans-serif;
  color: ${({ $tone }) =>
    $tone === "high" ? "#bfff6b" : $tone === "mid" ? "#f2f2f4" : "#ff6b5c"};

  strong {
    display: block;
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  span {
    display: block;
    margin-top: 5px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.18em;
    color: #6a6a70;
  }

  @media (max-width: 640px) {
    strong {
      font-size: 24px;
    }
  }
`;
