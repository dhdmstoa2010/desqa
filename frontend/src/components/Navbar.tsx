import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Bar, Brand, Links, NavLink, Greeting, LogoutButton } from "./Navbar.style";

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
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
            <Greeting>{user?.name}님 환영합니다</Greeting>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <>
            <NavLink to="/login">Log in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </Links>
    </Bar>
  );
}

export default Navbar;
