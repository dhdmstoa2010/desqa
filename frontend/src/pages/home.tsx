import { useEffect, useState } from "react";
import { fetchPostsRequest } from "../api/board";
import { listPublicReviewsRequest, type PublicReview } from "../api/review";
import { toneOf, toPost } from "../utils/board";
import { domainOf, relTime } from "../utils/format";
import type { Post } from "../types/board";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import { Grid as PostGrid } from "../components/styles/PostCard.style";
import {
  EmptyBox,
  ErrorBox,
  GhostLink,
  PrimaryLink,
  TONE,
} from "../components/styles/shared.style";
import {
  Page,
  Section,
  SectionHead,
  SectionTitle,
  SectionDesc,
  Legend,
  HeadActions,
  ReviewGrid,
  ReviewCard,
  ToneTag,
  ReviewScore,
  ReviewSummary,
  ReviewFoot,
  ReviewSkeleton,
} from "./styles/home.style";

const POST_COUNT = 8;
const REVIEW_COUNT = 8;

function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reviews, setReviews] = useState<PublicReview[] | null>(null);
  const [reviewsFailed, setReviewsFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchPostsRequest()
      .then((rows) => {
        if (cancelled) return;
        setPosts(rows.slice(0, POST_COUNT).map(toPost));
      })
      .catch(() => {
        if (cancelled) return;
        setPosts([]);
        setLoadFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    listPublicReviewsRequest()
      .then((rows) => {
        if (cancelled) return;
        setReviews(rows.slice(0, REVIEW_COUNT));
      })
      .catch(() => {
        if (cancelled) return;
        setReviews([]);
        setReviewsFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Page>
      <Section>
        <SectionHead>
          <div>
            <SectionTitle>최근 평가 기록</SectionTitle>
            <SectionDesc>
              공개 평가 {reviews?.length ?? 0}건 · 블록을 누르면 리포트로 이동
            </SectionDesc>
          </div>
          <Legend>
            <span style={{ "--c": "var(--good)" } as React.CSSProperties}>
              <i />
              80+ 좋음
            </span>
            <span style={{ "--c": "var(--mid)" } as React.CSSProperties}>
              <i />
              65–79 보통
            </span>
            <span style={{ "--c": "var(--low)" } as React.CSSProperties}>
              <i />
              64 이하 낮음
            </span>
          </Legend>
        </SectionHead>

        <ReviewGrid>
          {reviews === null &&
            Array.from({ length: 4 }, (_, i) => (
              <ReviewSkeleton key={i} aria-hidden="true" />
            ))}

          {reviews?.length === 0 &&
            (reviewsFailed ? (
              <ErrorBox>
                <strong>평가 기록을 불러오지 못했습니다</strong>
                <p>네트워크 상태를 확인한 뒤 새로고침하세요.</p>
              </ErrorBox>
            ) : (
              <EmptyBox>
                <strong>아직 공개된 평가가 없습니다</strong>
                <p>첫 번째로 URL을 평가해 보세요.</p>
                <GhostLink to="/evaluate">URL 평가하기</GhostLink>
              </EmptyBox>
            ))}

          {reviews?.map((review) => {
            const tone = toneOf(review.score);
            return (
              <ReviewCard key={review.id} to={`/result?id=${review.id}`}>
                <ToneTag $tone={tone}>{TONE[tone].label}</ToneTag>
                <ReviewScore $tone={tone}>{review.score}</ReviewScore>
                <ReviewSummary>{review.verdict || review.summary}</ReviewSummary>
                <ReviewFoot>
                  <b>{domainOf(review.url)}</b>
                  <span>{relTime(review.createdAt)}</span>
                </ReviewFoot>
              </ReviewCard>
            );
          })}
        </ReviewGrid>
      </Section>

      <Section>
        <SectionHead>
          <div>
            <SectionTitle>디자인 게시판</SectionTitle>
            <SectionDesc>평가 결과를 공유하고 서로의 개선 과정을 봅니다</SectionDesc>
          </div>
          <HeadActions>
            <GhostLink to="/board">게시판 둘러보기</GhostLink>
            <PrimaryLink to="/board/new">게시물 올리러 가기 →</PrimaryLink>
          </HeadActions>
        </SectionHead>

        <PostGrid>
          {posts === null &&
            Array.from({ length: 4 }, (_, i) => <PostCardSkeleton key={i} />)}

          {posts?.length === 0 &&
            (loadFailed ? (
              <ErrorBox>
                <strong>게시물을 불러오지 못했습니다</strong>
                <p>잠시 후 다시 시도하세요.</p>
              </ErrorBox>
            ) : (
              <EmptyBox>
                <strong>아직 올라온 게시물이 없습니다</strong>
                <p>평가 결과를 첫 글로 공유해 보세요.</p>
              </EmptyBox>
            ))}

          {posts?.map((post) => <PostCard key={post.id} post={post} />)}
        </PostGrid>
      </Section>
    </Page>
  );
}

export default Home;
