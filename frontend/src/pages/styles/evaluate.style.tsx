import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: calc(100svh - 70px);
  background: #0a0a0b;
  color: #f7f7f8;
  overflow: hidden;
  box-sizing: border-box;
  padding: clamp(32px, 7vh, 88px) clamp(16px, 5vw, 56px) clamp(48px, 9vh, 96px);
`;

export const Glow = styled.div`
  position: absolute;
  top: -260px;
  left: 12%;
  width: 620px;
  height: 620px;
  max-width: 80vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(191, 255, 107, 0.1) 0%,
    rgba(191, 255, 107, 0) 70%
  );
  pointer-events: none;
`;

export const Grid = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 440px);
  gap: clamp(32px, 5vw, 72px);
  align-items: center;
  min-height: calc(100svh - 70px - clamp(80px, 16vh, 184px));

  @media (max-width: 940px) {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    min-height: 0;
  }
`;

/* ───────────── 왼쪽: 입력 ───────────── */
export const Left = styled.div`
  min-width: 0;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(38px, 5.4vw, 66px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: #f7f7f8;

  span {
    display: block;
  }

  .en {
    text-transform: uppercase;
  }

  .kr {
    color: #bfff6b;
  }
`;

export const Form = styled.form`
  margin-top: clamp(28px, 4vh, 40px);
  display: flex;
  gap: 10px;
  max-width: 560px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const InputWrap = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;

  &::before {
    content: "›";
    position: absolute;
    left: 16px;
    font-size: 18px;
    font-weight: 700;
    color: #bfff6b;
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 16px 15px 34px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #101012;
  color: #f5f5f5;
  font-size: 15px;
  box-sizing: border-box;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &::placeholder {
    color: #7a7a80;
  }

  &:focus {
    outline: none;
    border-color: #bfff6b;
    box-shadow: 0 0 0 3px rgba(191, 255, 107, 0.16);
  }
`;

export const Button = styled.button`
  padding: 15px 26px;
  border-radius: 12px;
  border: none;
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    opacity 0.2s;

  &:hover:not(:disabled) {
    background: #a6e34d;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const BoardLink = styled(Link)`
  display: block;
  margin-top: 20px;
  font-size: 13.5px;
  font-weight: 700;
  color: #bfff6b;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

/* ───────────── 오른쪽: 최근 평가 ───────────── */
export const Right = styled.div`
  min-width: 0;

  @media (max-width: 940px) {
    max-width: 440px;
  }
`;

export const PanelLabel = styled.p`
  margin: 0 0 12px;
  font-family: var(--mono, ui-monospace, monospace);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #6f6f76;
`;

export const ReportCard = styled(Link)`
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: #0e0e10;
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(191, 255, 107, 0.35);
    background: #101014;
  }
`;

export const EmptyCard = styled.div`
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.015);
  padding: 32px 20px;
  text-align: center;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #cececf;
  }

  span {
    display: block;
    margin-top: 6px;
    font-size: 12.5px;
    color: #7c7c83;
  }
`;

export const RecentList = styled.div`
  margin: 8px 0 0;
  display: flex;
  flex-direction: column;
`;

export const RecentItem = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 11px 8px;
  border-radius: 8px;
  font-size: 13px;
  text-decoration: none;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  transition: background 0.15s;

  &:first-of-type {
    border-top: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }

  &:hover .domain {
    color: #ffffff;
  }

  .domain {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #cececf;
  }

  .date {
    flex-shrink: 0;
    font-size: 11.5px;
    color: #6f6f76;
  }

  .score {
    flex-shrink: 0;
    width: 2ch;
    text-align: right;
    font-weight: 800;
    color: #bfff6b;
  }
`;

export const ReportHead = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

export const ReportMeta = styled.div`
  min-width: 0;

  .domain {
    font-size: 14px;
    font-weight: 600;
    color: #ededf0;
    word-break: break-all;
  }

  .sub {
    margin-top: 4px;
    font-size: 12px;
    color: #7c7c83;
  }
`;

export const ScoreBig = styled.div`
  flex-shrink: 0;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: 44px;
  line-height: 1;
  color: #bfff6b;
  letter-spacing: -0.02em;

  small {
    font-size: 13px;
    font-weight: 600;
    color: #7c7c83;
    letter-spacing: 0;
  }
`;

export const Bars = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Bar = styled.div`
  .row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  .label {
    font-size: 12.5px;
    color: #b6b6bc;
  }

  .val {
    font-size: 12.5px;
    font-weight: 700;
    color: #f2f2f4;
  }

  .track {
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 999px;
    background: #bfff6b;
  }
`;

export const Notes = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.5;
    color: #9a9aa2;
  }

  .plus b {
    color: #bfff6b;
  }

  .minus b {
    color: #e6a15c;
  }
`;
