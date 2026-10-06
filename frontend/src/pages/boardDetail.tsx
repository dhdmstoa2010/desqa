import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { Comment, PostDetail } from "../types/board";
import { toneOf, toPostDetail } from "../utils/board";
import { useAuthStore } from "../store/authStore";
import {
  addCommentRequest,
  deletePostRequest,
  fetchPostRequest,
  reactHelpfulRequest,
} from "../api/board";
import { bodyToHtml } from "../utils/html";
import {
  Wrapper,
  TopLink,
  Banner,
  MetaRow,
  ScoreBadge,
  Title,
  Layout,
  Article,
  AuthorRow,
  Avatar,
  AuthorName,
  AuthorMeta,
  Actions,
  DeleteLink,
  ConfirmPop,
  Lead,
  BodyText,
  Reactions,
  ReactButton,
  Comments,
  CommentsTitle,
  CommentItem,
  CommentHead,
  CommentText,
  CommentForm,
  CommentInput,
  CommentSubmit,
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
  PendingTitle,
  ScoreEmpty,
  EvalLink,
  BackLink,
  ErrorText,
  NotFound,
  LoadingBlock,
} from "./styles/boardDetail.style";
import { GhostButton, PrimaryButton, TONE } from "../components/styles/shared.style";

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
      <Avatar $bg={authorColor} $muted={!isAuthor}>
        {comment.author[0]}
      </Avatar>
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

function errorMessage(err: unknown, fallback: string) {
  return axios.isAxiosError(err) ? (err.response?.data?.message ?? fallback) : fallback;
}

function BoardDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isAuthenticated);

  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!Number.isInteger(numericId)) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setLoading(false);
      setNotFound(true);
      /* eslint-enable react-hooks/set-state-in-effect */
      return;
    }
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    fetchPostRequest(numericId)
      .then((row) => {
        if (cancelled) return;
        setPost(toPostDetail(row));
      })
      .catch(() => {
        if (cancelled) return;
        setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [numericId]);

  const handleHelpful = async () => {
    if (!post) return;
    const prev = post.helpful;
    setPost({ ...post, helpful: prev + 1 });
    try {
      const { helpful } = await reactHelpfulRequest(post.id);
      setPost((p) => (p ? { ...p, helpful } : p));
    } catch {
      setPost((p) => (p ? { ...p, helpful: prev } : p));
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || commentText.trim() === "") return;
    setPosting(true);
    setCommentError(null);
    try {
      const created = await addCommentRequest(post.id, commentText.trim());
      const fresh = await fetchPostRequest(post.id);
      setPost(toPostDetail(fresh));
      setCommentText("");
      void created;
    } catch (err) {
      setCommentError(
        axios.isAxiosError(err) && err.response?.status === 401
          ? "로그인이 만료됐어요. 다시 로그인해 주세요."
          : errorMessage(err, "댓글 등록에 실패했습니다"),
      );
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;
    setDeleting(true);
    try {
      await deletePostRequest(post.id);
      navigate("/board");
    } catch {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (loading) {
    return (
      <Wrapper>
        <LoadingBlock aria-hidden="true">
          <div className="box" />
          <div className="line" />
          <div className="line short" />
        </LoadingBlock>
      </Wrapper>
    );
  }

  if (notFound || !post) {
    return (
      <Wrapper>
        <NotFound>
          <strong>존재하지 않는 게시물입니다</strong>
          <p>삭제되었거나 주소가 잘못되었습니다.</p>
          <BackLink to="/board">목록으로 돌아가기</BackLink>
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
      <TopLink to="/board">← 게시판 · {post.category}</TopLink>

      <Banner>
        {post.image ? (
          <img src={post.image} alt={`${post.title} 화면 캡처`} />
        ) : (
          "본문 첫 이미지"
        )}
      </Banner>

      <div>
        {(hasDomain || hasScore) && (
          <MetaRow>
            {hasDomain && <span>{post.domain}</span>}
            {hasScore && <ScoreBadge $tone={tone}>SCORE {post.score}</ScoreBadge>}
          </MetaRow>
        )}
        <Title style={{ marginTop: 10 }}>{post.title}</Title>
      </div>

      <Layout>
        <Article>
          <AuthorRow>
            <Avatar $bg={post.authorColor}>{post.author[0]}</Avatar>
            <div>
              <AuthorName>
                {post.author}
                {post.mine && <span>· 내 글</span>}
              </AuthorName>
              <AuthorMeta>
                {post.date} · 조회 {post.views}
              </AuthorMeta>
            </div>
            {post.mine && (
              <Actions>
                <DeleteLink
                  type="button"
                  disabled={deleting}
                  onClick={() => setConfirming((v) => !v)}
                >
                  삭제
                </DeleteLink>
                {confirming && (
                  <ConfirmPop role="alertdialog">
                    <strong>이 게시물을 삭제할까요?</strong>
                    <div>
                      <GhostButton type="button" onClick={() => setConfirming(false)}>
                        취소
                      </GhostButton>
                      <PrimaryButton
                        type="button"
                        disabled={deleting}
                        onClick={handleDelete}
                      >
                        삭제
                      </PrimaryButton>
                    </div>
                  </ConfirmPop>
                )}
              </Actions>
            )}
          </AuthorRow>

          {post.lead && <Lead>{post.lead}</Lead>}
          <BodyText dangerouslySetInnerHTML={{ __html: bodyToHtml(post.body) }} />

          <Reactions>
            <ReactButton type="button" onClick={handleHelpful}>
              도움됐어요 <b>{post.helpful}</b>
            </ReactButton>
            <ReactButton type="button">공유</ReactButton>
          </Reactions>

          <Comments>
            <CommentsTitle>
              댓글 <span>{commentCount}</span>
            </CommentsTitle>

            {post.commentList.map((c) => (
              <CommentRow
                key={c.id}
                comment={c}
                postAuthor={post.author}
                authorColor={post.authorColor}
              />
            ))}

            {isLoggedIn ? (
              <>
                <CommentForm onSubmit={handleCommentSubmit}>
                  <CommentInput
                    placeholder="댓글을 남겨 주세요"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={posting}
                  />
                  <CommentSubmit
                    type="submit"
                    disabled={posting || commentText.trim() === ""}
                  >
                    등록
                  </CommentSubmit>
                </CommentForm>
                {commentError && <ErrorText>{commentError}</ErrorText>}
              </>
            ) : (
              <CommentForm onSubmit={(e) => e.preventDefault()}>
                <CommentInput
                  placeholder="댓글을 남기려면 로그인이 필요합니다"
                  disabled
                />
                <LoginButton to="/login">로그인</LoginButton>
              </CommentForm>
            )}
          </Comments>
        </Article>

        <Aside>
          <ScoreCard>
            <Overall>OVERALL</Overall>
            {hasScore ? (
              <>
                <ScoreBig $tone={tone}>
                  <strong>{post.score}</strong>
                  <span>/100 · {TONE[tone].label}</span>
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
                <PendingTitle>평가 전</PendingTitle>
                <ScoreEmpty>
                  아직 이 화면을 평가하지 않았습니다. 평가를 받으면 점수와 항목별
                  분석이 여기에 표시됩니다.
                </ScoreEmpty>
                <EvalLink to={evalHref}>지금 평가 받기 →</EvalLink>
              </>
            )}
          </ScoreCard>

          <BackLink to="/board">← 목록으로 돌아가기</BackLink>
        </Aside>
      </Layout>
    </Wrapper>
  );
}

export default BoardDetail;
