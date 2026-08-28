import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { meRequest } from "../api/auth";
import { useAuthStore, type AuthUser } from "../store/authStore";

import {
  Wrapper,
  Card,
  Title,
  Row,
  RowLabel,
  RowValue,
  StatusText,
  ErrorText,
  Logout,
} from "./styles/mypage.style";

function MyPage() {
  const navigate = useNavigate();
  const storedUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    let cancelled = false;

    meRequest()
      .then(({ user }) => {
        if (!cancelled) setUser(user);
      })
      .catch((err) => {
        if (cancelled) return;
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          logout();
          navigate("/login");
          return;
        }
        setError("사용자 정보를 불러오지 못했습니다");
      });

    return () => {
      cancelled = true;
    };
  }, [logout, navigate]);

  return (
    <Wrapper>
      <Card>
        <Title>마이페이지</Title>

        {error && <ErrorText>{error}</ErrorText>}

        {!error && !user && <StatusText>불러오는 중...</StatusText>}

        {user && (
          <>
            <Row>
              <RowLabel>이름</RowLabel>
              <RowValue>{user.name}</RowValue>
            </Row>
            <Row>
              <RowLabel>ID</RowLabel>
              <RowValue>{user.loginId}</RowValue>
            </Row>
            <Logout onClick={handleLogout}>로그아웃</Logout>
          </>
        )}
      </Card>
    </Wrapper>
  );
}

export default MyPage;
