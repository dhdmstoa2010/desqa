import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { CATEGORIES, type Category, type Post } from "../types/board";
import { fetchPostsRequest } from "../api/board";
import { toPost } from "../utils/board";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { Grid } from "../components/styles/PostCard.style";
import { EmptyBox, ErrorBox, PrimaryLink } from "../components/styles/shared.style";
import { Page, Header, Title, Desc, Filters, FilterChip } from "./styles/board.style";

function Board() {
  const [active, setActive] = useState<Category>("전체");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchPostsRequest()
      .then((rows) => {
        if (cancelled) return;
        setPosts(rows.map(toPost));
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          axios.isAxiosError(err)
            ? (err.response?.data?.message ?? "잠시 후 다시 시도하세요.")
            : "잠시 후 다시 시도하세요.",
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(
    () => (active === "전체" ? posts : posts.filter((p) => p.category === active)),
    [active, posts],
  );

  return (
    <Page>
      <Header>
        <div>
          <Title>디자인 게시판</Title>
          <Desc>평가 결과를 공유하고 서로의 개선 과정을 봅니다</Desc>
        </div>
        <PrimaryLink to="/board/new">게시물 올리러 가기 →</PrimaryLink>
      </Header>

      <Filters>
        {CATEGORIES.map((c) => (
          <FilterChip key={c} $active={c === active} onClick={() => setActive(c)}>
            {c}
          </FilterChip>
        ))}
      </Filters>

      <Grid>
        {loading && Array.from({ length: 8 }, (_, i) => <PostCardSkeleton key={i} />)}

        {!loading && error && (
          <ErrorBox>
            <strong>게시물을 불러오지 못했습니다</strong>
            <p>{error}</p>
          </ErrorBox>
        )}

        {!loading && !error && visible.length === 0 && (
          <EmptyBox>
            <strong>아직 올라온 게시물이 없습니다</strong>
            <p>
              {active === "전체"
                ? "평가 결과를 첫 글로 공유해 보세요."
                : "이 카테고리에는 아직 글이 없어요."}
            </p>
          </EmptyBox>
        )}

        {!loading &&
          !error &&
          visible.map((post) => <PostCard key={post.id} post={post} />)}
      </Grid>
    </Page>
  );
}

export default Board;
