import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100svh - 70px);
  background: #0a0a0b;
  color: #f7f7f8;
  padding: clamp(40px, 6vw, 72px) clamp(16px, 5vw, 48px) 120px;
  box-sizing: border-box;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
`;

export const Head = styled.header`
  max-width: 760px;
`;

export const Layout = styled.div`
  margin-top: clamp(28px, 4vw, 44px);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: clamp(28px, 4vw, 56px);
  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Side = styled.aside`
  position: sticky;
  top: 90px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 1000px) {
    position: static;
  }
`;

export const PreviewLabel = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #ffffff;
`;

export const PreviewCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: #111113;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PreviewRow = styled.div`
  display: grid;
  grid-template-columns: 116px minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
`;

export const PreviewThumb = styled.div<{ $from: string; $to: string }>`
  width: 116px;
  height: 84px;
  border-radius: 10px;
  overflow: hidden;
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
  color: #e2e2e5;
  font-size: 11px;
  line-height: 1.3;
  text-align: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const PreviewTitle = styled.p`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  color: #ffffff;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &[data-empty="true"] {
    color: #8b8b92;
    font-weight: 600;
  }
`;

export const PreviewMeta = styled.div`
  margin-top: 8px;
  font-size: 13.5px;
  color: #e6e6e8;

  .dot {
    margin: 0 7px;
    opacity: 0.5;
  }
`;

export const PreviewScore = styled.div<{ $tone: "high" | "mid" | "low" }>`
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
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.14em;
    color: #e6e6e8;
  }

  .pending {
    font-size: 13px;
    letter-spacing: 0.02em;
    color: #e6e6e8;
  }
`;

export const PreviewFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

export const PreviewChip = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #0a0a0b;
  background: #bfff6b;
  border-radius: 999px;
  padding: 4px 12px;
`;

export const PreviewLead = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #e2e2e5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PreviewBodyCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: #111113;
  padding: 22px;
`;

export const PreviewBody = styled.div`
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.75;
  color: #dcdce0;
  max-height: 420px;
  overflow-y: auto;

  > *:first-of-type {
    margin-top: 0;
  }
  p {
    margin: 0 0 0.8em;
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 1.2em 0 0.4em;
    line-height: 1.3;
    color: #ffffff;
    font-weight: 800;
  }
  h1 {
    font-size: 1.4em;
  }
  h2 {
    font-size: 1.24em;
  }
  h3 {
    font-size: 1.1em;
  }
  h4 {
    font-size: 1em;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #cfcfd4;
  }
  a {
    color: #bfff6b;
  }
  s {
    color: #9a9aa2;
  }
  blockquote {
    margin: 0.8em 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid rgba(191, 255, 107, 0.5);
    color: #cfcfd4;
  }
  pre {
    margin: 0.8em 0;
    padding: 12px 14px;
    border-radius: 10px;
    background: #0d0d0e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-family: ui-monospace, Consolas, monospace;
    font-size: 13px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  img {
    max-width: 100%;
    border-radius: 10px;
    margin: 8px 0;
    display: block;
  }
`;

export const PreviewEmpty = styled.p`
  margin: 14px 0 0;
  font-size: 13.5px;
  color: #9a9aa2;
`;

export const Tips = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  background: #111113;
  padding: 22px;
`;

export const TipsTitle = styled.span`
  display: block;
  margin-bottom: 14px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #ffffff;
`;

export const TipList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    position: relative;
    padding-left: 20px;
    font-size: 14.5px;
    line-height: 1.6;
    color: #e2e2e5;
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #bfff6b;
  }
`;

export const BackTop = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 26px;
  padding: 7px 17px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: rgba(255, 255, 255, 0.04);
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(191, 255, 107, 0.6);
    background: rgba(191, 255, 107, 0.08);
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 5vw, 46px);
  letter-spacing: -0.03em;
  color: #f7f7f8;
`;

export const Subtitle = styled.p`
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: #f0f0f2;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;

  em {
    margin-left: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    color: #b0b0b8;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #141416;
  color: #f5f5f5;
  font-size: 15.5px;
  box-sizing: border-box;

  &::placeholder {
    color: #9a9aa2;
  }

  &:focus {
    outline: 2px solid #bfff6b;
    outline-offset: 0;
  }
`;

export const UrlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Hint = styled.span`
  font-size: 13.5px;
  color: #d0d0d5;

  a {
    color: #bfff6b;
    font-weight: 700;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const ScoreNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  background: rgba(191, 255, 107, 0.08);
  border: 1px solid rgba(191, 255, 107, 0.2);
  font-size: 14px;
  color: #cfe8a6;

  b {
    font-weight: 800;
  }
`;

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chip = styled.button<{ $active?: boolean }>`
  border: 1px solid
    ${({ $active }) => ($active ? "transparent" : "rgba(255, 255, 255, 0.16)")};
  background: ${({ $active }) => ($active ? "#bfff6b" : "transparent")};
  color: ${({ $active }) => ($active ? "#0a0a0b" : "#e2e2e5")};
  font-size: 14.5px;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background 0.15s;

  &:hover {
    color: ${({ $active }) => ($active ? "#0a0a0b" : "#ffffff")};
    border-color: ${({ $active }) =>
      $active ? "transparent" : "rgba(255, 255, 255, 0.36)"};
  }
`;

export const Actions = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Submit = styled.button`
  background: #bfff6b;
  color: #0a0a0b;
  border: none;
  font-size: 16px;
  font-weight: 800;
  padding: 15px 30px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;

  &:hover:not(:disabled) {
    background: #a6e34d;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CancelLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  color: #d0d0d5;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`;
