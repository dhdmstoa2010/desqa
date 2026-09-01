import styled from "@emotion/styled";

export const Wrapper = styled.section`
  position: relative;
  width: 100%;
  flex: 1 0 auto;
  min-height: calc(100svh - 70px);
  overflow: hidden;
  background: #0a0a0b;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px clamp(16px, 2.5vw, 44px);
  box-sizing: border-box;
`;

/* 히어로 아래 — URL 처리 과정 애니메이션이 들어올 스크롤 영역 */
export const ScrollArea = styled.section`
  position: relative;
  width: 100%;
  min-height: 200vh;
  background: #0a0a0b;
  border-top: 1px solid #1c1c1f;
`;

export const ScrollStage = styled.div`
  position: sticky;
  top: 70px;
  height: calc(100svh - 70px);
  display: grid;
  place-items: center;
  padding: 24px;
  box-sizing: border-box;
  color: #4c4c55;
  font-family: "Unbounded", system-ui, sans-serif;
  font-size: clamp(13px, 1.6vw, 20px);
  letter-spacing: 0.04em;
  text-align: center;

  & > span {
    padding: 14px 22px;
    border: 1px dashed #2c2c33;
    border-radius: 12px;
  }
`;

export const ScrollCue = styled.div`
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
  color: #6a6a70;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  pointer-events: none;

  &::after {
    content: "";
    width: 1px;
    height: 36px;
    background: linear-gradient(#6a6a70, transparent);
    animation: scrollCue 1.8s ease-in-out infinite;
  }

  @keyframes scrollCue {
    0%,
    100% {
      transform: scaleY(0.4);
      transform-origin: top;
      opacity: 0.4;
    }
    50% {
      transform: scaleY(1);
      transform-origin: top;
      opacity: 1;
    }
  }
`;

/* 커서를 따라다니는 컬러 밴드 (specia1ne 스타일 reveal) */
export const RevealLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 80px clamp(16px, 2.5vw, 44px);
  box-sizing: border-box;
  background: #bfff6b;
  overflow: hidden;
  pointer-events: none;
  clip-path: inset(0 100% 0 0);
  will-change: clip-path;

  /* 밴드 안에서는 글자를 어둡게 반전 */
  h1,
  h1 * {
    color: #0a0a0b !important;
  }

  input {
    background: rgba(0, 0, 0, 0.08);
    border-color: rgba(0, 0, 0, 0.28);
    color: #0a0a0b;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }

  button {
    background: #0a0a0b;
    color: #bfff6b;
  }
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
