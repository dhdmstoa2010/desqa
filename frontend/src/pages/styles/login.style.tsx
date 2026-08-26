import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100svh;
  background: #0a0a0b;
  display: flex;
  justify-content: center;
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
  color: #f5f5f5;
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
  color: #f5f5f5;
`;

export const Input = styled.input`
  width: 100%;
  padding: 16px 18px;
  border-radius: 14px;
  border: none;
  background: #1c1c1f;
  color: #f5f5f5;
  font-size: 15px;
  box-sizing: border-box;

  &::placeholder {
    color: #7a7a7f;
  }

  &:focus {
    outline: 2px solid #4a4a4f;
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
  color: #9a9a9f;
  cursor: pointer;
  padding: 0;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 13px;
  margin: 0;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: none;
  background: #ffffff;
  color: #0a0a0b;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;

  &:hover {
    background: #e5e5e5;
  }
`;

export const Footer = styled.p`
  text-align: center;
  color: #9a9a9f;
  font-size: 14px;
  margin: 0;
`;

export const FooterLink = styled(Link)`
  color: #f5f5f5;
  font-weight: 700;
  text-decoration: none;
`;
