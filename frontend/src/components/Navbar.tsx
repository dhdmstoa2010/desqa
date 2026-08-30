import { useAuthStore } from "../store/authStore";
import { Bar, Brand, Links, NavLink, LoginLink } from "./Navbar.style";
import { ProfileIcon } from "./icons";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Bar>
      <Brand to="/">desqa</Brand>
      <Links>
        {isAuthenticated ? (
          <NavLink to="/mypage" aria-label="마이페이지">
            <ProfileIcon />
          </NavLink>
        ) : (
          <LoginLink to="/login">Login/Create Account</LoginLink>
        )}
      </Links>
    </Bar>
  );
}

export default Navbar;
