import type { Post } from "../types/board";
import { toneOf } from "../utils/board";
import { Card, Meta, PostSkeleton, Pills, Thumb, Title } from "./styles/PostCard.style";

export function PostCard({ post }: { post: Post }) {
  return (
    <Card to={`/board/${post.id}`}>
      <Thumb className="thumb">
        {post.image ? (
          <img src={post.image} alt="" loading="lazy" />
        ) : (
          <span className="empty">본문 첫 이미지</span>
        )}
        <Pills>
          <span>{post.category}</span>
          <span data-tone={post.score != null ? toneOf(post.score) : undefined}>
            {post.score != null ? `${post.score} SCORE` : "평가 전"}
          </span>
        </Pills>
      </Thumb>
      <Title>{post.title}</Title>
      <Meta>
        {post.author} · {post.date} · 조회 {post.views} · 댓글 {post.commentCount}
      </Meta>
    </Card>
  );
}

export function PostCardSkeleton() {
  return (
    <PostSkeleton aria-hidden="true">
      <div className="thumb" />
      <div className="line" />
      <div className="line short" />
    </PostSkeleton>
  );
}
