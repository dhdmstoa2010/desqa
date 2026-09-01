import styled from "@emotion/styled";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
  background: #0a0a0b;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px clamp(16px, 2.5vw, 44px);
  box-sizing: border-box;
`;

export const GlowAnchor = styled.div`
  position: absolute;
  left: var(--glow-x, calc(6% + 340px));
  top: var(--glow-y, calc(-25% + 340px));
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition:
    left 0.25s ease-out,
    top 0.25s ease-out;
`;

export const Glow = styled.div`
  width: 680px;
  height: 680px;
  max-width: 90vw;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 232, 59, 0.28) 0%,
    rgba(170, 59, 255, 0) 70%
  );
  will-change: transform, opacity;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 12px;
  margin-bottom: 14vh;

  @media (max-width: 1024px) {
    gap: 28px;
  }
`;

export const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #b9b9c0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
  will-change: transform, opacity;
`;

export const Title = styled.h1`
  margin: 0;
  width: max-content;
  max-width: 100%;
  color: #f7f7f8;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

export const Line = styled.span`
  display: block;
  white-space: nowrap;

  /* SplitText가 만드는 조각 */
  .word,
  .char {
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
  }
`;

export const Desc = styled.span`
  display: block;
  margin-top: -0.25em;
  text-align: left;
  font-size: clamp(24px, 19.5vw, 200px);
  line-height: 1.4;
  letter-spacing: -0.03em;
  word-spacing: 0.04em;
`;

export const SecDesc = styled.span`
  display: block;
  margin-top: -0.06em;
  margin-left: 8px;
  text-align: left;
  font-size: clamp(38px, 9.4vw, 160px);
  line-height: 0.98;
  letter-spacing: -0.03em;
`;

export const Accent = styled.span`
  color: #bfff6b;
`;

export const FormWrap = styled.div`
  width: 100%;
  max-width: 620px;
  align-self: center;
  margin-top: clamp(20px, 3.5vh, 48px);
`;

export const Form = styled.form`
  display: flex;
  gap: 10px;
  width: 100%;
  clip-path: inset(0px 0px 0px 0px);
  will-change: clip-path;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 15px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #1c1c1f;
  color: #f5f5f5;
  font-size: 15px;
  box-sizing: border-box;

  &::placeholder {
    color: #7a7a7f;
  }

  &:focus {
    outline: 2px solid #bfff6b;
    outline-offset: 0;
  }
`;

export const Button = styled.button`
  padding: 15px 24px;
  border-radius: 14px;
  border: none;
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;

  &:hover {
    background: #7aa641aa;
  }
`;
