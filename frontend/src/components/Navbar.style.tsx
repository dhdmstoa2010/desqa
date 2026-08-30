import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Bar = styled.nav`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 32px;
  padding-right: 16px;
  background: #0a0a0b;
  border-bottom: 1px solid #1c1c1f;
  box-sizing: border-box;
`;

export const Brand = styled(Link)`
  color: #f5f5f5;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 999px;
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    background: #1c1c1f;
    opacity: 0.85;
  }
`;

export const LoginLink = styled(Link)`
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: #b8b8b8;
  }
`;
