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

/* 로고 글자를 1초 간격으로 하나씩 색깔 변환*/
export const BrandChar = styled.span`
  display: inline-block;
  white-space: pre;
  animation: brandGlow 7s ease-in-out infinite;

  @keyframes brandGlow {
    0%,
    100% {
      color: #f5f5f5;
    }
    6%,
    13% {
      color: #bfff6b;
    }
    20% {
      color: #f5f5f5;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NoticeBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-align: left;

  &:hover a {
    opacity: 1;
  }
`;

export const Board = styled(Link)`
  color: #f5f5f5;
`;

export const Notice = styled.div<{ $active?: boolean }>`
  position: relative;
  font-family: var(--mono);
  color: ${({ $active }) => ($active ? "#ffffff" : "#f5f5f5")};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ $active }) => ($active ? "#bfff6b" : "#bfff6b")};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    background: #bfff6b;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.2s ease;
  }
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
