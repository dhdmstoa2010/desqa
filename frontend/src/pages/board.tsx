import { useMemo, useState } from "react";
import {
  Wrapper,
  Inner,
  Header,
  Title,
  TitleAccent,
  HeaderSide,
  HeaderDesc,
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
import { CATEGORIES, POSTS, toneOf, type Category } from "../data/posts";

function Board() {
  const [active, setActive] = useState<Category>("전체");

  const visible = useMemo(
    () =>
      active === "전체" ? POSTS : POSTS.filter((p) => p.category === active),
    [active],
  );

  return (
    <Wrapper>
      <Inner>
        <Header>
          <Title>
            디자인을
            <TitleAccent>함께 살펴봅니다</TitleAccent>
          </Title>
          <HeaderSide>
            <HeaderDesc>
              타이포그래피, 여백, 컬러, 정보 위계. 화면을 공유해 주시면 어떤
              점이 아쉬운지 함께 살펴봅니다.
            </HeaderDesc>
            <ShareButton onClick={() => {}}>게시물 올리기 →</ShareButton>
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
                <Thumb className="thumb" $from={post.from} $to={post.to}>
                  <span>캡처</span>
                  <span>or browse files</span>
                </Thumb>

                <Main>
                  <Domain>{post.domain}</Domain>
                  <RowTitle>
                    {post.badge && <Badge>{post.badge}</Badge>}
                    {post.title}
                  </RowTitle>

                  <Detail className="board-detail">
                    <DetailClip>
                      <DetailInner>
                        <DetailText>{post.detail}</DetailText>
                        <DeltaRow>
                          {post.deltas.map((d) => (
                            <DeltaChip key={d.label}>
                              {d.label} <b>+{d.delta}</b>
                            </DeltaChip>
                          ))}
                        </DeltaRow>
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
                  <strong>{post.score}</strong>
                  <span>SCORE</span>
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
