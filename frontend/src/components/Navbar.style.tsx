import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Bar = styled.nav`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 32px;
  padding-right: 32px;
  background: #0a0a0b;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    left: 32px;
    right: 32px;
    bottom: 0;
    height: 2px;
    background: #393939;
  }
`;

export const Brand = styled(Link)`
  color: #f5f5f5;
  font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.3px;
  text-decoration: none;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Myaccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 999px;
  margin-right: -4px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    color: #b6b6b2;
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
