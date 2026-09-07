import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.section`
  width: 100%;
  min-height: calc(100svh - 70px);
  background: #0a0a0b;
  color: #f7f7f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: clamp(48px, 10vh, 120px) clamp(16px, 5vw, 48px);
  box-sizing: border-box;
  text-align: center;
`;

export const Inner = styled.div`
  width: 100%;
  max-width: 620px;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: "Unbounded", system-ui, sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 5vw, 46px);
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #f7f7f8;
`;

export const Form = styled.form`
  margin-top: 36px;
  display: flex;
  gap: 10px;
  width: 100%;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #141416;
  color: #f5f5f5;
  font-size: 15.5px;
  box-sizing: border-box;

  &::placeholder {
    color: #8b8b92;
  }

  &:focus {
    outline: 2px solid #bfff6b;
    outline-offset: 0;
  }
`;

export const Button = styled.button`
  padding: 16px 28px;
  border-radius: 14px;
  border: none;
  background: #bfff6b;
  color: #0a0a0b;
  font-size: 15.5px;
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
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const Note = styled.p`
  margin: 16px 0 0;
  font-size: 12.5px;
  color: #8b8b92;
`;

export const BoardLink = styled(Link)`
  display: inline-block;
  margin-top: 40px;
  font-size: 13.5px;
  font-weight: 700;
  color: #d0d0d5;
  text-decoration: none;

  &:hover {
    color: #bfff6b;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;
