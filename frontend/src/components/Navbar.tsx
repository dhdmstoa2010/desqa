import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Bar, Brand, Links, NavLink, LoginLink, LogoutButton } from "./Navbar.style";
import { ProfileIcon } from "./icons";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Bar>
      <Brand to="/">desqa</Brand>
      <Links>
        {isAuthenticated ? (
          <>
            <NavLink to="/mypage" aria-label="마이페이지">
              <ProfileIcon />
            </NavLink>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <LoginLink to="/login">Login/Create Account</LoginLink>
        )}
      </Links>
    </Bar>
  );
}

export default Navbar;
