import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Bar,
  Brand,
  BrandChar,
  LeftGroup,
  Links,
  NoticeBoard,
  Notice,
  NavLink,
  Myaccount,
  LoginLink,
} from "./styles/Navbar.style";

const BRAND = "desqa.";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { pathname } = useLocation();
  const path = pathname.toLowerCase();
  const isEvaluateActive = path.startsWith("/evaluate") || path.startsWith("/result");
  const isBoardActive = path.startsWith("/board");

  return (
    <Bar>
      <LeftGroup>
        <Brand to="/" aria-label={BRAND}>
          {BRAND.split("").map((char, i) => (
            <BrandChar
              key={i}
              aria-hidden="true"
              style={{ animationDelay: `${i}s` }}
            >
              {char}
            </BrandChar>
          ))}
        </Brand>
        <NoticeBoard>
          <NavLink to="/evaluate" aria-label="Evaluate">
            <Notice $active={isEvaluateActive}>/evaluate</Notice>
          </NavLink>
          <NavLink to="/board" aria-label="Board">
            <Notice $active={isBoardActive}>/board</Notice>
          </NavLink>
        </NoticeBoard>
      </LeftGroup>
      <Links>
        {isAuthenticated ? (
          <NavLink to="/mypage" aria-label="마이페이지">
            <Myaccount>My Account</Myaccount>
          </NavLink>
        ) : (
          <LoginLink to="/login">Login/Create Account</LoginLink>
        )}
      </Links>
    </Bar>
  );
}

export default Navbar;
