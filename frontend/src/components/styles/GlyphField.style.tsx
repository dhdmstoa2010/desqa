import styled from "@emotion/styled";

export const Field = styled.div`
  grid-area: 1 / 1;
  justify-self: center;
  width: max-content;
  font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
  font-size: clamp(4px, 1.62vw, 26px);
  line-height: 1;
  letter-spacing: 0.01em;
  user-select: none;
  cursor: crosshair;

  div {
    white-space: pre;
  }

  span {
    display: inline-block;
    transition: color 0.13s linear;
  }

  @media (prefers-reduced-motion: reduce) {
    span {
      transition: none;
    }
  }
`;
