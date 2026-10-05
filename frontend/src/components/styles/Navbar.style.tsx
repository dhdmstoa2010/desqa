import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export const Bar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(16px, 4vw, 48px);
  background: var(--bg);
  box-sizing: border-box;
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 28px);
`;

export const Brand = styled(Link)`
  color: var(--ink);
  font-family: var(--display);
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  text-decoration: none;
`;

export const NoticeBoard = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  white-space: nowrap;
`;

export const NavItem = styled(Link)<{ $active?: boolean }>`
  position: relative;
  padding: 4px 0;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active }) => ($active ? "var(--ink)" : "var(--ink-2)")};
  text-decoration: none;
  transition: color 0.15s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -2px;
    height: 2px;
    border-radius: 2px;
    background: var(--accent);
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: var(--ink);
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AccountLink = styled(Link)`
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: var(--accent-d);
  }
`;
