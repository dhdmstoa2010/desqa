import styled from "@emotion/styled";

export const Shell = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: #141416;
  overflow: hidden;

  &:focus-within {
    outline: 2px solid #bfff6b;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: #17171a;
`;

export const ToolButton = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? "rgba(191, 255, 107, 0.16)" : "transparent"};
  color: ${({ $active }) => ($active ? "#bfff6b" : "#e2e2e5")};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.12s,
    color 0.12s;

  sub {
    font-size: 9px;
    font-weight: 700;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }
`;

export const Divider = styled.span`
  width: 1px;
  height: 18px;
  margin: 0 6px;
  background: rgba(255, 255, 255, 0.12);
`;

export const Hint = styled.p`
  margin: 0;
  padding: 7px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: #17171a;
  font-size: 11.5px;
  color: #9a9aa2;
`;

export const Area = styled.div`
  position: relative;
  min-height: 200px;
  max-height: 460px;
  overflow-y: auto;
  padding: 14px 16px;
  color: #f0f0f2;
  font-size: 15.5px;
  line-height: 1.75;
  outline: none;

  &[data-empty="true"]::before {
    content: attr(data-placeholder);
    position: absolute;
    left: 16px;
    right: 16px;
    top: 14px;
    color: #9a9aa2;
    pointer-events: none;
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 1em 0 0.4em;
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
  p {
    margin: 0 0 0.7em;
  }
  a {
    color: #bfff6b;
    text-underline-offset: 2px;
  }
  s {
    color: #9a9aa2;
  }
  blockquote {
    margin: 0.7em 0;
    padding: 4px 0 4px 14px;
    border-left: 3px solid rgba(191, 255, 107, 0.5);
    color: #cfcfd4;
  }
  pre {
    margin: 0.7em 0;
    padding: 12px 14px;
    border-radius: 10px;
    background: #0d0d0e;
    border: 1px solid rgba(255, 255, 255, 0.08);
    font-family: ui-monospace, Consolas, monospace;
    font-size: 13px;
    white-space: pre-wrap;
  }
  img {
    max-width: 100%;
    border-radius: 10px;
    margin: 8px 0;
    display: block;
  }
`;
