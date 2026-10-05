import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  background: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 64px 24px;
  box-sizing: border-box;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const Title = styled.h1`
  color: var(--ink);
  font-size: 28px;
  font-weight: 700;
  margin: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
  background: var(--card);
  color: var(--ink);
  font-size: 15px;
  box-sizing: border-box;

  &::placeholder {
    color: var(--ink-3);
  }

  &:focus {
    outline: 2px solid var(--accent);
  }
`;

export const PasswordField = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding-right: 48px;
  }
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 16px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--ink-2);
  cursor: pointer;
  padding: 0;
`;

export const ErrorText = styled.p`
  color: var(--low);
  font-size: 13px;
  margin: 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: var(--accent);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: var(--accent-d);
  }
`;

export const Footer = styled.p`
  text-align: center;
  color: var(--ink-2);
  font-size: 14px;
  margin: 0;
`;

export const FooterLink = styled(Link)`
  color: var(--ink);
  font-weight: 700;
  text-decoration: none;
`;
