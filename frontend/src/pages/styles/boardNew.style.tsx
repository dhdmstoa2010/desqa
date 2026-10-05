import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100svh - 70px);
  background: var(--bg);
  color: var(--ink);
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
  color: var(--ink);
`;

export const PreviewCard = styled.div`
  border: 1px solid rgba(60, 40, 15, 0.1);
  border-radius: 16px;
  background: var(--card);
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

export const PreviewThumb = styled.div`
  width: 116px;
  height: 84px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(60, 40, 15, 0.12);
  background: var(--card-deep);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--ink-3);
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
  color: var(--ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &[data-empty="true"] {
    color: var(--ink-3);
    font-weight: 600;
  }
`;

export const PreviewMeta = styled.div`
  margin-top: 8px;
  font-size: 13.5px;
  color: var(--ink);

  .dot {
    margin: 0 7px;
    opacity: 0.5;
  }
`;

export const PreviewScore = styled.div<{ $tone: "high" | "mid" | "low" }>`
  flex-shrink: 0;
  text-align: right;
  line-height: 1;
  font-family: system-ui, sans-serif;
  color: ${({ $tone }) =>
    $tone === "high" ? "var(--accent)" : $tone === "mid" ? "var(--ink)" : "var(--low)"};

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
    color: var(--ink);
  }

  .pending {
    font-size: 13px;
    letter-spacing: 0.02em;
    color: var(--ink);
  }
`;

export const PreviewFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid rgba(60, 40, 15, 0.08);
`;

export const PreviewChip = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: var(--accent);
  border-radius: 999px;
  padding: 4px 12px;
`;

export const PreviewLead = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PreviewBodyCard = styled.div`
  border: 1px solid rgba(60, 40, 15, 0.1);
  border-radius: 16px;
  background: var(--card);
  padding: 22px;
`;

export const PreviewBody = styled.div`
  margin-top: 14px;
  font-size: 14.5px;
  line-height: 1.75;
  color: var(--ink);
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
    color: var(--ink);
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
    color: var(--ink-2);
  }
  a {
    color: var(--accent);
  }
  s {
    color: var(--ink-3);
  }
  blockquote {
    margin: 0.8em 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid rgba(192, 114, 63, 0.5);
    color: var(--ink-2);
  }
  pre {
    margin: 0.8em 0;
    padding: 12px 14px;
    border-radius: 10px;
    background: var(--card-deep);
    border: 1px solid rgba(60, 40, 15, 0.08);
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
  color: var(--ink-3);
`;

export const Tips = styled.div`
  border: 1px solid rgba(60, 40, 15, 0.1);
  border-radius: 16px;
  background: var(--card);
  padding: 22px;
`;

export const TipsTitle = styled.span`
  display: block;
  margin-bottom: 14px;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: var(--ink);
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
    color: var(--ink);
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
  }
`;

export const BackTop = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 26px;
  padding: 7px 17px;
  border-radius: 999px;
  border: 1px solid rgba(60, 40, 15, 0.24);
  background: rgba(60, 40, 15, 0.04);
  font-size: 15px;
  font-weight: 700;
  color: var(--ink);
  text-decoration: none;
  transition:
    border-color 0.15s,
    background 0.15s;

  &:hover {
    border-color: rgba(192, 114, 63, 0.6);
    background: rgba(192, 114, 63, 0.08);
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(30px, 5vw, 46px);
  letter-spacing: -0.03em;
  color: var(--ink);
`;

export const Subtitle = styled.p`
  margin: 14px 0 0;
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink);
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
  color: var(--ink);

  em {
    margin-left: 6px;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    color: var(--ink-2);
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid rgba(60, 40, 15, 0.1);
  background: var(--card);
  color: var(--ink);
  font-size: 15.5px;
  box-sizing: border-box;

  &::placeholder {
    color: var(--ink-3);
  }

  &:focus {
    outline: 2px solid var(--accent);
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
  color: var(--ink-2);

  a {
    color: var(--accent);
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
  background: rgba(192, 114, 63, 0.08);
  border: 1px solid rgba(192, 114, 63, 0.2);
  font-size: 14px;
  color: var(--ink-2);

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
    ${({ $active }) => ($active ? "transparent" : "rgba(60, 40, 15, 0.16)")};
  background: ${({ $active }) => ($active ? "var(--accent)" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--ink)")};
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
    color: ${({ $active }) => ($active ? "#fff" : "var(--ink)")};
    border-color: ${({ $active }) =>
      $active ? "transparent" : "rgba(60, 40, 15, 0.36)"};
  }
`;

export const Actions = styled.div`
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Submit = styled.button`
  background: var(--accent);
  color: #fff;
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
    background: var(--accent-d);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: var(--low);
  font-size: 13.5px;
`;

export const LeadWarning = styled.p`
  margin: 0;
  color: var(--mid);
  font-size: 13.5px;
`;

export const CancelLink = styled(Link)`
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-2);
  text-decoration: none;

  &:hover {
    color: var(--ink);
  }
`;
