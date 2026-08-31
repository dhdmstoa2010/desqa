import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { meRequest } from "../api/auth";
import { useAuthStore, type AuthUser } from "../store/authStore";
import { profileColors } from "../utils/gradient";

import {
  Wrapper,
  Container,
  Cover,
  Actions,
  ActionButton,
  Header,
  Avatar,
  Identity,
  Name,
  Badge,
  Tabs,
  Tab,
  StatusText,
  ErrorText,
} from "./styles/mypage.style";

function MyPage() {
  const navigate = useNavigate();
  const storedUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");

  const colors = profileColors(
    user ? `${user.id}-${user.loginId}` : "guest",
  );

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
      <Container>
        <Cover style={{ background: colors.cover }}>
          <Actions>
            <ActionButton type="button" onClick={handleLogout}>
              로그아웃
            </ActionButton>
          </Actions>
        </Cover>

        {error && <ErrorText>{error}</ErrorText>}

        {!error && !user && <StatusText>불러오는 중...</StatusText>}

        {user && (
          <>
            <Header>
              <Avatar style={{ background: colors.avatar }}>
                {user.name.charAt(0)}
              </Avatar>
              <Identity>
                <Name>{user.name}</Name>
                <Badge>Members</Badge>
              </Identity>
            </Header>

            <Tabs>
              <Tab
                type="button"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                {user.name}'s Profile
              </Tab>
              <Tab
                type="button"
                active={activeTab === "activity"}
                onClick={() => setActiveTab("activity")}
              >
                See my activity
              </Tab>
            </Tabs>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default MyPage;
