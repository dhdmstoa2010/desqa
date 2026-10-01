import { useEffect, useState } from "react";
import { fetchPostsRequest } from "../api/board";
import { listPublicReviewsRequest, type PublicReview } from "../api/review";
import { toneOf, toPost } from "../utils/board";
import type { Post } from "../types/board";
import {
  ReviewSection,
  ReviewSectionInner,
  ReviewSectionTitle,
  ReviewSectionDesc,
  ReviewGrid,
  ReviewCard,
  ReviewCardHead,
  ReviewDomain,
  ReviewTime,
  ReviewScore,
  ReviewSummary,
  ReviewSkeleton,
  ReviewEmpty,
  BoardPromo,
  BoardPromoInner,
  BoardPromoTitle,
  PromoGrid,
  PromoCard,
  PromoPanel,
  PromoThumb,
  PromoPills,
  PromoBody,
  PromoTitle,
  PromoArrow,
  PromoMeta,
  PromoSkeleton,
  PromoEmpty,
  BoardPromoActions,
  OutroSecondary,
  OutroPrimary,
} from "./styles/home.style";

const PROMO_POST_COUNT = 8;
const REVIEW_COUNT = 8;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function domainOf(u: string) {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}

function relTime(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Date.now() - then;
  const m = 60_000;
  const h = 60 * m;
  const d = 24 * h;
  if (diff < h) return `${Math.max(1, Math.round(diff / m))}분 전`;
  if (diff < d) return `${Math.round(diff / h)}시간 전`;
  if (diff < 7 * d) return `${Math.round(diff / d)}일 전`;
  return new Date(iso)
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\.$/, "");
}

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
        setPosts(rows.slice(0, PROMO_POST_COUNT).map(toPost));
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
    <>
      <ReviewSection>
        <ReviewSectionInner>
          <ReviewSectionTitle>최근 평가 기록</ReviewSectionTitle>
          <ReviewSectionDesc>
            다른 사람들이 평가받은 웹사이트를 확인해보세요.
          </ReviewSectionDesc>

          <ReviewGrid>
            {reviews === null &&
              Array.from({ length: REVIEW_COUNT }, (_, i) => (
                <ReviewSkeleton key={i} aria-hidden="true" />
              ))}

            {reviews?.length === 0 && (
              <ReviewEmpty>
                {reviewsFailed
                  ? "평가 기록을 불러오지 못했어요."
                  : "아직 평가 기록이 없어요."}
              </ReviewEmpty>
            )}

            {reviews?.map((review) => (
              <ReviewCard key={review.id} to={`/result?id=${review.id}`}>
                <ReviewCardHead>
                  <ReviewDomain>{domainOf(review.url)}</ReviewDomain>
                  <ReviewTime>{relTime(review.createdAt)}</ReviewTime>
                </ReviewCardHead>

                <ReviewScore $tone={toneOf(review.score)}>
                  {review.score}
                  <small>/100</small>
                </ReviewScore>

                <ReviewSummary>{review.verdict || review.summary}</ReviewSummary>
              </ReviewCard>
            ))}
          </ReviewGrid>
        </ReviewSectionInner>
      </ReviewSection>

      <BoardPromo>
        <BoardPromoInner>
          <BoardPromoTitle>디자인 게시판</BoardPromoTitle>

          <PromoGrid>
            {posts === null &&
              Array.from({ length: PROMO_POST_COUNT }, (_, i) => (
                <PromoSkeleton key={i} aria-hidden="true" />
              ))}

            {posts?.length === 0 && (
              <PromoEmpty>
                {loadFailed
                  ? "게시물을 불러오지 못했어요."
                  : "아직 올라온 게시물이 없어요."}
              </PromoEmpty>
            )}

            {posts?.map((post) => (
              <PromoCard key={post.id} to={`/board/${post.id}`}>
                <PromoPanel>
                  <PromoThumb>
                    {post.image ? (
                      <img src={post.image} alt="" loading="lazy" />
                    ) : (
                      <span>사진 없음</span>
                    )}
                  </PromoThumb>
                  <PromoPills>
                    <span>{post.category}</span>
                    <span data-tone={toneOf(post.score)}>
                      {post.score != null ? `${post.score} SCORE` : "평가 전"}
                    </span>
                  </PromoPills>
                </PromoPanel>

                <PromoBody>
                  <PromoTitle>{post.title}</PromoTitle>
                  <PromoArrow className="promo-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </PromoArrow>
                </PromoBody>

                <PromoMeta>
                  <b>{post.author}</b>
                  <span className="dot">·</span>
                  {post.date}
                  <span className="dot">·</span>
                  조회 {post.views}
                  <span className="dot">·</span>
                  댓글 {post.commentCount}
                </PromoMeta>
              </PromoCard>
            ))}
          </PromoGrid>

          <BoardPromoActions>
            <OutroPrimary to="/board/new">게시물 올리러 가기 →</OutroPrimary>
            <OutroSecondary to="/board">게시판 둘러보기</OutroSecondary>
          </BoardPromoActions>
        </BoardPromoInner>
      </BoardPromo>
    </>
  );
}

export default Home;
