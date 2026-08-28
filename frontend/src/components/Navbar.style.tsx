import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Bar = styled.nav`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
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
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
`;

export const LogoutButton = styled.button`
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: #1c1c1f;
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2a2a2e;
  }
`;
