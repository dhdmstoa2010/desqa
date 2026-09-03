import { useAuthStore } from "../store/authStore";
import {
  Bar,
  Brand,
  BrandChar,
  Links,
  NavLink,
  Myaccount,
  LoginLink,
} from "./styles/Navbar.style";

const BRAND = "desqa.";

function Navbar() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Bar>
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
