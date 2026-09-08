import { useMemo, useState } from "react";
import {
  Wrapper,
  Inner,
  Header,
  Title,
  TitleAccent,
  HeaderSide,
  ShareButton,
  Toolbar,
  Filters,
  FilterChip,
  Sort,
  List,
  Empty,
  RowLink,
  Row,
  Thumb,
  Main,
  Domain,
  RowTitle,
  Badge,
  Meta,
  Detail,
  DetailClip,
  DetailInner,
  DetailText,
  DeltaRow,
  DeltaChip,
  Score,
} from "./styles/board.style";
import { CATEGORIES, type Category } from "../types/board";
import { POSTS } from "../data/posts";
import { toneOf } from "../utils/board";
import { useBoardStore } from "../store/boardStore";

function Board() {
  const [active, setActive] = useState<Category>("전체");
  const userPosts = useBoardStore((s) => s.posts);

  const all = useMemo(() => [...userPosts, ...POSTS], [userPosts]);
  const visible = useMemo(
    () => (active === "전체" ? all : all.filter((p) => p.category === active)),
    [active, all],
  );

  return (
    <Wrapper>
      <Inner>
        <Header>
          <Title>
            Design
            <TitleAccent>Board</TitleAccent>
          </Title>
          <HeaderSide>
            <ShareButton to="/board/new">New Post →</ShareButton>
          </HeaderSide>
        </Header>

        <Toolbar>
          <Filters>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                $active={c === active}
                onClick={() => setActive(c)}
              >
                {c}
              </FilterChip>
            ))}
          </Filters>
          <Sort type="button">최신순 ↓</Sort>
        </Toolbar>

        <List>
          {visible.map((post) => (
            <RowLink key={post.id} to={`/board/${post.id}`}>
              <Row className="board-row">
                <Thumb className="thumb">
                  {post.image ? (
                    <img src={post.image} alt="" loading="lazy" />
                  ) : (
                    <span>사진 없음</span>
                  )}
                </Thumb>

                <Main>
                  {post.domain && post.domain !== "—" && (
                    <Domain>{post.domain}</Domain>
                  )}
                  <RowTitle>
                    {post.badge && <Badge>{post.badge}</Badge>}
                    {post.title}
                  </RowTitle>

                  <Detail className="board-detail">
                    <DetailClip>
                      <DetailInner>
                        <DetailText>{post.detail ?? post.lead}</DetailText>
                        {post.deltas.length > 0 && (
                          <DeltaRow>
                            {post.deltas.map((d) => (
                              <DeltaChip key={d.label}>
                                {d.label} <b>+{d.delta}</b>
                              </DeltaChip>
                            ))}
                          </DeltaRow>
                        )}
                      </DetailInner>
                    </DetailClip>
                  </Detail>

                  <Meta>
                    <b>{post.author}</b>
                    <span className="dot">·</span>
                    {post.date}
                    <span className="dot">·</span>
                    조회 {post.views}
                    <span className="dot">·</span>
                    댓글 {post.commentList.length}
                  </Meta>
                </Main>

                <Score $tone={toneOf(post.score)}>
                  {post.score != null ? (
                    <>
                      <strong>{post.score}</strong>
                      <span>SCORE</span>
                    </>
                  ) : (
                    <span className="pending">평가 전</span>
                  )}
                </Score>
              </Row>
            </RowLink>
          ))}

          {visible.length === 0 && (
            <Empty>아직 이 카테고리에 글이 없어요.</Empty>
          )}
        </List>
      </Inner>
    </Wrapper>
  );
}

export default Board;
