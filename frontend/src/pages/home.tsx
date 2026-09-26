import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import ServiceFlow from "../components/ServiceFlow";
import { fetchPostsRequest } from "../api/board";
import { toneOf, toPost } from "../utils/board";
import type { Post } from "../types/board";
import {
  Wrapper,
  RevealFill,
  RevealText,
  GlowAnchor,
  Glow,
  Content,
  Title,
  Line,
  Accent,
  Desc,
  SecDesc,
  FormWrap,
  HeroCta,
  HeroCtaGhost,
  ProcessAnimation,
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

const PROMO_POST_COUNT = 4;

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

const SCROLL_EASE = 0.12;
const FILL_DONE_AT = 0.35;

gsap.registerPlugin(useGSAP, SplitText);

function Home() {
  const container = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const reveal = useRef({
    curScroll: 0,
    tgtScroll: 0,
    raf: 0,
  });
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/evaluate");
  };

  const applyReveal = () => {
    const s = reveal.current;
    const side = (window.innerWidth / 2) * (1 - s.curScroll);
    document.documentElement.style.setProperty(
      "--reveal-clip",
      `inset(0px ${side}px 0px ${side}px)`,
    );
  };

  const paintReveal = () => {
    const s = reveal.current;
    s.curScroll += (s.tgtScroll - s.curScroll) * SCROLL_EASE;

    const settled = Math.abs(s.tgtScroll - s.curScroll) < 0.001;
    if (settled) {
      s.curScroll = s.tgtScroll;
    }
    applyReveal();
    s.raf = settled ? 0 : requestAnimationFrame(paintReveal);
  };

  const kickReveal = () => {
    if (!reveal.current.raf) {
      reveal.current.raf = requestAnimationFrame(paintReveal);
    }
  };

  useEffect(() => {
    const s = reveal.current;
    return () => {
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, []);

  // 스크롤 진행도로 채움 계산
  useEffect(() => {
    const s = reveal.current;
    const onScroll = () => {
      const flow = flowRef.current;
      const anchor = flow?.querySelector("header") ?? flow;
      const anchorTop = anchor
        ? anchor.getBoundingClientRect().top + window.scrollY
        : window.innerHeight;
      const fillEnd = Math.max(1, anchorTop - window.innerHeight * FILL_DONE_AT);
      s.tgtScroll = Math.min(1, Math.max(0, window.scrollY / fillEnd));
      s.curScroll += (s.tgtScroll - s.curScroll) * 0.2;
      applyReveal();
      kickReveal();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useGSAP(
    () => {
      const splits = [line1.current!, line2.current!].map((el) =>
        SplitText.create(el, {
          type: "words,chars",
          wordsClass: "word",
          charsClass: "char",
        }),
      );

      const line1Chars = splits[0].chars as HTMLElement[];
      const line2Chars = splits[1].chars as HTMLElement[];

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.95 },
      });

      tl.from(".hero-glow", { scale: 0.6, opacity: 0, duration: 1.7 })

        // 1줄 슬라이드 인
        .from(line1Chars, { x: -70, opacity: 0, stagger: 0.05 }, 0.5)
        // 2줄 슬라이드 인
        .from(line2Chars, { x: -70, opacity: 0, stagger: 0.05 }, "<0.35")

        // 입력창 등장
        .from(
          ".hero-form",
          { clipPath: "inset(0px 50% 0px 50%)", duration: 1.1 },
          ">-0.4",
        );

      return () => {
        splits.forEach((s) => s.revert());
      };
    },
    { scope: container },
  );

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

  return (
    <>
      <Wrapper ref={container}>
        <GlowAnchor>
          <Glow className="hero-glow" />
        </GlowAnchor>

        <Content>
          <Title>
            <Line>
              <Desc ref={line1}>Drop a link</Desc>
            </Line>
            <Line>
              <SecDesc ref={line2}>
                See the <Accent>design flaws</Accent>
              </SecDesc>
            </Line>
          </Title>
          <FormWrap>
            <HeroCta className="hero-form" to="/evaluate">
              링크 평가하러 가기 →
            </HeroCta>
          </FormWrap>
        </Content>

        <RevealText aria-hidden="true">
          <Content>
            <Title>
              <Line>
                <Desc>Drop a link</Desc>
              </Line>
              <Line>
                <SecDesc>
                  See the <Accent className="accent">design flaws</Accent>
                </SecDesc>
              </Line>
            </Title>
            <FormWrap>
              <HeroCtaGhost className="hero-form">
                링크 평가하러 가기 →
              </HeroCtaGhost>
            </FormWrap>
          </Content>
        </RevealText>
      </Wrapper>

      <RevealFill aria-hidden="true" />

      <ProcessAnimation ref={flowRef}>
        <ServiceFlow onStart={handleStart} />
      </ProcessAnimation>

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
