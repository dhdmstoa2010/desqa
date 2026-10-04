import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Bar,
  Brand,
  LeftGroup,
  Links,
  NoticeBoard,
  NavItem,
  AccountLink,
} from "./styles/Navbar.style";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();
  const isEvaluateActive = path.startsWith("/evaluate") || path.startsWith("/result");
  const isBoardActive = path.startsWith("/board");

  return (
    <Bar>
      <LeftGroup>
        <Brand to="/" aria-label="desqa">
          desqa.
        </Brand>
        <NoticeBoard>
          <NavItem to="/evaluate" $active={isEvaluateActive}>
            URL 평가
          </NavItem>
          <NavItem to="/board" $active={isBoardActive}>
            게시판
          </NavItem>
        </NoticeBoard>
      </LeftGroup>
      <Links>
        {isAuthenticated ? (
          <AccountLink to="/mypage">마이페이지</AccountLink>
        ) : (
          <AccountLink to="/login">로그인 / 회원가입</AccountLink>
        )}
      </Links>
    </Bar>
  );
}

export default Navbar;
