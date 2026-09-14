import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { meRequest } from "../api/auth";
import { listReviewsRequest, type StoredReview } from "../api/review";
import { useAuthStore, type AuthUser } from "../store/authStore";
import { useBoardStore } from "../store/boardStore";
import { profileColors } from "../utils/gradient";
import { toneOf } from "../utils/board";

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
  ActivityPanel,
  ActivitySection,
  SectionHead,
  SectionTitle,
  SectionCount,
  ItemList,
  ItemRow,
  ItemMain,
  ItemTitle,
  ItemMeta,
  ScoreTag,
  EmptyRow,
} from "./styles/mypage.style";

function formatDate(iso: string): string {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getMonth() + 1)}.${p(d.getDate())}`;
}

function MyPage() {
  const navigate = useNavigate();
  const storedUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<AuthUser | null>(storedUser);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "activity">("profile");

  const [reviews, setReviews] = useState<StoredReview[] | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const posts = useBoardStore((s) => s.posts);
  const myPosts = useMemo(
    () => (user ? posts.filter((p) => p.author === user.name) : []),
    [posts, user],
  );

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

  useEffect(() => {
    if (activeTab !== "activity" || !user || reviews !== null) return;
    let cancelled = false;

    listReviewsRequest()
      .then((data) => {
        if (!cancelled) setReviews(data);
      })
      .catch(() => {
        if (!cancelled) setReviewsError("검사 기록을 불러오지 못했습니다");
      });

    return () => {
      cancelled = true;
    };
  }, [activeTab, user, reviews]);

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

            {activeTab === "activity" && (
              <ActivityPanel>
                <ActivitySection>
                  <SectionHead>
                    <SectionTitle>URL 검사 기록</SectionTitle>
                    <SectionCount>{reviews?.length ?? 0}건</SectionCount>
                  </SectionHead>

                  {reviewsError && <ErrorText>{reviewsError}</ErrorText>}
                  {!reviewsError && reviews === null && (
                    <StatusText>불러오는 중...</StatusText>
                  )}
                  {reviews && (
                    <ItemList>
                      {reviews.length === 0 && (
                        <EmptyRow>아직 검사한 URL이 없어요.</EmptyRow>
                      )}
                      {reviews.map((review) => (
                        <ItemRow key={review.id} to={`/result?id=${review.id}`}>
                          <ItemMain>
                            <ItemTitle>{review.url}</ItemTitle>
                            <ItemMeta>{formatDate(review.createdAt)}</ItemMeta>
                          </ItemMain>
                          <ScoreTag $tone={toneOf(review.score)}>
                            {review.score}
                          </ScoreTag>
                        </ItemRow>
                      ))}
                    </ItemList>
                  )}
                </ActivitySection>

                <ActivitySection>
                  <SectionHead>
                    <SectionTitle>작성한 게시물</SectionTitle>
                    <SectionCount>{myPosts.length}건</SectionCount>
                  </SectionHead>

                  <ItemList>
                    {myPosts.length === 0 && (
                      <EmptyRow>아직 작성한 게시물이 없어요.</EmptyRow>
                    )}
                    {myPosts.map((post) => (
                      <ItemRow key={post.id} to={`/board/${post.id}`}>
                        <ItemMain>
                          <ItemTitle>{post.title}</ItemTitle>
                          <ItemMeta>
                            {post.category}
                            <span className="dot">·</span>
                            {post.date}
                          </ItemMeta>
                        </ItemMain>
                        {post.score != null && (
                          <ScoreTag $tone={toneOf(post.score)}>
                            {post.score}
                          </ScoreTag>
                        )}
                      </ItemRow>
                    ))}
                  </ItemList>
                </ActivitySection>
              </ActivityPanel>
            )}
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default MyPage;
