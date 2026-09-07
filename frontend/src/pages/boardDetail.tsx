import { useParams } from "react-router-dom";
import { getPost, toneOf, type Comment } from "../data/posts";
import { useBoardStore } from "../store/boardStore";
import { bodyToHtml } from "../utils/html";
import {
  Wrapper,
  Hero,
  HeroInner,
  DropZone,
  HeroShot,
  HeroMeta,
  HeroScore,
  HeroTitle,
  Body,
  BodyInner,
  Article,
  AuthorRow,
  Avatar,
  AuthorName,
  AuthorMeta,
  Actions,
  ActionButton,
  Lead,
  BodyText,
  Reactions,
  ReactButton,
  Comments,
  CommentsTitle,
  CommentItem,
  CommentAvatar,
  CommentHead,
  CommentText,
  CommentForm,
  CommentInput,
  LoginButton,
  Aside,
  ScoreCard,
  Overall,
  ScoreBig,
  Metrics,
  Metric,
  MetricHead,
  Bar,
  BarFill,
  ScoreEmpty,
  EvalLink,
  BackLink,
  NotFound,
} from "./styles/boardDetail.style";

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="8.5" cy="9.5" r="1.8" fill="currentColor" />
      <path
        d="M5 18l4.5-5 3 3L16 12l3.5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentRow({
  comment,
  postAuthor,
  authorColor,
}: {
  comment: Comment;
  postAuthor: string;
  authorColor: string;
}) {
  const isAuthor = comment.author === postAuthor;
  return (
    <CommentItem>
      <CommentAvatar
        $bg={isAuthor ? authorColor : "#33333a"}
        $fg={isAuthor ? "#0a0a0b" : "#e2e2e5"}
      >
        {comment.author[0]}
      </CommentAvatar>
      <div>
        <CommentHead>
          <b>{comment.author}</b>
          {comment.at}
        </CommentHead>
        <CommentText>{comment.text}</CommentText>
      </div>
    </CommentItem>
  );
}

function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const userPost = useBoardStore((s) =>
    s.posts.find((p) => p.id === numericId),
  );
  const post = userPost ?? getPost(numericId);

  if (!post) {
    return (
      <Wrapper>
        <NotFound>
          <p>존재하지 않는 게시물이에요.</p>
          <BackLink to="/board">목록으로 돌아가기 →</BackLink>
        </NotFound>
      </Wrapper>
    );
  }

  const tone = toneOf(post.score);
  const hasScore = post.score != null;
  const hasDomain = Boolean(post.domain && post.domain !== "—");
  const commentCount = String(post.commentList.length).padStart(2, "0");
  const evalHref =
    post.domain && post.domain !== "—"
      ? `/result?url=${encodeURIComponent(post.domain)}`
      : "/";

  return (
    <Wrapper>
      <Hero>
        <HeroInner>
          {post.image ? (
            <HeroShot>
              <img src={post.image} alt={`${post.title} 화면 캡처`} />
            </HeroShot>
          ) : (
            <DropZone>
              <ImageIcon />
              <span>{hasDomain ? <b>{post.domain}</b> : <b>화면</b>} 캡처</span>
              <u>or browse files</u>
            </DropZone>
          )}

          {(hasDomain || hasScore) && (
            <HeroMeta>
              {hasDomain && <span className="domain">{post.domain}</span>}
              {hasScore && (
                <>
                  {hasDomain && <span className="sep">·</span>}
                  SCORE <HeroScore $tone={tone}>{post.score}</HeroScore>
                </>
              )}
            </HeroMeta>
          )}
          <HeroTitle>{post.title}</HeroTitle>
        </HeroInner>
      </Hero>

      <Body>
        <BodyInner>
          <Article>
            <AuthorRow>
              <Avatar $bg={post.authorColor}>{post.author[0]}</Avatar>
              <div>
                <AuthorName>{post.author}</AuthorName>
                <AuthorMeta>
                  {post.date} · 조회 {post.views}
                </AuthorMeta>
              </div>
              <Actions>
                <ActionButton type="button">수정</ActionButton>
                <ActionButton type="button">삭제</ActionButton>
              </Actions>
            </AuthorRow>

            {post.lead && <Lead>{post.lead}</Lead>}
            <BodyText
              dangerouslySetInnerHTML={{ __html: bodyToHtml(post.body) }}
            />

            <Reactions>
              <ReactButton type="button">도움됐어요 · {post.helpful}</ReactButton>
              <ReactButton type="button">공유</ReactButton>
            </Reactions>

            <Comments>
              <CommentsTitle>
                댓글 <span>{commentCount}</span>
              </CommentsTitle>

              {post.commentList.map((c, i) => (
                <CommentRow
                  key={i}
                  comment={c}
                  postAuthor={post.author}
                  authorColor={post.authorColor}
                />
              ))}

              <CommentForm onSubmit={(e) => e.preventDefault()}>
                <CommentInput
                  placeholder="댓글을 남기려면 로그인이 필요합니다"
                  disabled
                />
                <LoginButton to="/login">로그인</LoginButton>
              </CommentForm>
            </Comments>
          </Article>

          <Aside>
            <ScoreCard>
              <Overall>OVERALL</Overall>
              {hasScore ? (
                <>
                  <ScoreBig $tone={tone}>
                    <strong>{post.score}</strong>
                    <span>/100</span>
                  </ScoreBig>
                  {post.metrics.length > 0 && (
                    <Metrics>
                      {post.metrics.map((m) => (
                        <Metric key={m.label}>
                          <MetricHead>
                            <span>{m.label}</span>
                            <b>{m.value}</b>
                          </MetricHead>
                          <Bar>
                            <BarFill $pct={m.fill} />
                          </Bar>
                        </Metric>
                      ))}
                    </Metrics>
                  )}
                </>
              ) : (
                <>
                  <ScoreEmpty>
                    아직 이 화면을 평가하지 않았어요. 평가를 받으면 점수와 항목별
                    분석이 여기에 표시됩니다.
                  </ScoreEmpty>
                  <EvalLink to={evalHref}>지금 평가 받기 →</EvalLink>
                </>
              )}
            </ScoreCard>

            <BackLink to="/board">목록으로 돌아가기 →</BackLink>
          </Aside>
        </BodyInner>
      </Body>
    </Wrapper>
  );
}

export default BoardDetail;
