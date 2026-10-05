import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: calc(100svh - 70px);
  background: var(--bg);
  color: var(--ink);
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
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
    rgba(192, 114, 63, 0.1) 0%,
    rgba(192, 114, 63, 0) 70%
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

/* 왼쪽: 입력 */
export const Left = styled.div`
  min-width: 0;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--display);
  font-weight: 800;
  font-size: clamp(38px, 5.4vw, 66px);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: var(--ink);

  span {
    display: block;
  }

  .en {
    font-size: 0.62em;
    line-height: 1.25;
  }

  .kr {
    color: var(--accent);
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
    color: var(--accent);
    pointer-events: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 16px 15px 34px;
  border-radius: 12px;
  border: 1px solid rgba(60, 40, 15, 0.12);
  background: var(--card);
  color: var(--ink);
  font-size: 15px;
  box-sizing: border-box;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;

  &::placeholder {
    color: var(--ink-3);
  }

  &:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(192, 114, 63, 0.16);
  }
`;

export const Button = styled.button`
  padding: 15px 26px;
  border-radius: 12px;
  border: none;
  background: var(--accent);
  color: #fff;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    opacity 0.2s;

  &:hover:not(:disabled) {
    background: var(--accent-d);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const BoardLink = styled(Link)`
  display: inline-block;
  border-radius: 12px;
  border: none;
  margin-top: 20px;
  color: var(--accent-d);
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.2s,
    opacity 0.2s;

  &:hover {
    color: var(--ink);
  }
`;


/* 오른쪽: 최근 평가 */
export const Right = styled.div`
  min-width: 0;

  @media (max-width: 940px) {
    max-width: 440px;
  }
`;

export const PanelLabel = styled.p`
  margin: 0 0 12px;
  font-family: system-ui, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--ink-3);
`;

export const ReportCard = styled(Link)`
  display: block;
  border: 1px solid rgba(60, 40, 15, 0.08);
  border-radius: 16px;
  background: var(--card);
  padding: 20px;
  text-decoration: none;
  color: inherit;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(192, 114, 63, 0.35);
    background: var(--card-deep);
  }
`;

export const EmptyCard = styled.div`
  border-radius: 16px;
  background: rgba(60, 40, 15, 0.015);
  padding: 32px 20px;
  text-align: center;

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--ink-2);
  }

  span {
    display: block;
    margin-top: 6px;
    font-size: 12.5px;
    color: var(--ink-3);
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
  border-top: 1px solid rgba(60, 40, 15, 0.06);
  transition: background 0.15s;

  &:first-of-type {
    border-top: none;
  }

  &:hover {
    background: rgba(60, 40, 15, 0.04);
  }

  &:hover .domain {
    color: var(--ink);
  }

  .domain {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--ink-2);
  }

  .date {
    flex-shrink: 0;
    font-size: 11.5px;
    color: var(--ink-3);
  }

  .score {
    flex-shrink: 0;
    width: 2ch;
    text-align: right;
    font-weight: 800;
    color: var(--accent);
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
    color: var(--ink);
    word-break: break-all;
  }

  .sub {
    margin-top: 4px;
    font-size: 12px;
    color: var(--ink-3);
  }
`;

export const ScoreBig = styled.div`
  flex-shrink: 0;
  font-weight: 800;
  font-size: 44px;
  line-height: 1;
  color: var(--accent);
  letter-spacing: -0.02em;

  small {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink-3);
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
    color: var(--ink-2);
  }

  .val {
    font-size: 12.5px;
    font-weight: 700;
    color: var(--ink);
  }

  .track {
    height: 4px;
    border-radius: 999px;
    background: rgba(60, 40, 15, 0.08);
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: 999px;
    background: var(--accent);
  }
`;

export const Notes = styled.div`
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid rgba(60, 40, 15, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;

  p {
    margin: 0;
    font-size: 12.5px;
    line-height: 1.5;
    color: var(--ink-3);
  }

  .plus b {
    color: var(--accent);
  }

  .minus b {
    color: var(--mid);
  }
`;
