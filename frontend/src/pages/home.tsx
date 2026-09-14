import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceFlow from "../components/ServiceFlow";
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
  BoardPromoScrollPin,
  BoardPromoSteps,
  BoardPromoStep,
  BoardPromoStepDot,
  BoardPromoStepLabel,
  BoardPromoFeatures,
  BoardPromoFeature,
  BoardPromoFeatureIcon,
  BoardPromoFeatureTag,
  BoardPromoFinalCard,
  BoardPromoFinalActions,
  BoardPromoFeatureNum,
  BoardPromoFeatureTitle,
  BoardPromoFeatureDesc,
  OutroPrimary,
  OutroSecondary,
} from "./styles/home.style";

function ScoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15l4.2-4.6" />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ScreenshotIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="10.5" r="1.8" />
      <path d="M21 16l-5.5-5-4 4-2-1.6L3 17" />
    </svg>
  );
}

function FeedbackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5h16v10.5H9l-4 4V5.5z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const BOARD_PROMO_FEATURES = [
  {
    num: "01",
    title: "자동 평가 점수",
    desc: "사이트 주소만 넣으면 평가 점수가 게시물에 함께 붙어요.",
    icon: ScoreIcon,
  },
  {
    num: "02",
    title: "스크린샷 & 설명",
    desc: "고민되는 화면을 캡처하고 시도해 본 것들을 함께 적어보세요.",
    icon: ScreenshotIcon,
  },
  {
    num: "03",
    title: "커뮤니티 피드백",
    desc: "다른 사람들의 댓글과 시선으로 놓친 부분을 발견해요.",
    icon: FeedbackIcon,
  },
] as const;

const BOARD_PROMO_STEP_LABELS = [
  "자동 평가 점수",
  "스크린샷 & 설명",
  "커뮤니티 피드백",
  "게시물 올리기",
];

/* 커서 밴드 */
const BAND_W = 128; // 밴드 폭(px)
const EASE = 0.16; // 커서 밴드 lerp 계수 (빠르게)
const SCROLL_EASE = 0.06; // 스크롤 채움 (느리게)
const IDLE_MS = 650; // 커서가 멈춘 뒤 밴드가 접히기까지 대기

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

function Home() {
  const container = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const scrollPin = useRef<HTMLDivElement>(null);
  const scrollTrack = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const reveal = useRef({
    curX: 0,
    tgtX: 0,
    curW: 0,
    tgtW: 0,
    curScroll: 0,
    tgtScroll: 0,
    raf: 0,
    idle: 0,
    init: false,
  });
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/evaluate");
  };

  const applyReveal = () => {
    const s = reveal.current;
    const vw = window.innerWidth;
    const half = s.curW / 2;
    const fill = 1 - s.curScroll;
    const left = Math.max(0, (s.curX - half) * fill);
    const right = Math.max(0, (vw - s.curX - half) * fill);
    document.documentElement.style.setProperty(
      "--reveal-clip",
      `inset(0px ${right}px 0px ${left}px)`,
    );
  };

  const paintReveal = () => {
    const s = reveal.current;
    s.curX += (s.tgtX - s.curX) * EASE;
    s.curW += (s.tgtW - s.curW) * EASE;
    s.curScroll += (s.tgtScroll - s.curScroll) * SCROLL_EASE;

    const settled =
      Math.abs(s.tgtX - s.curX) < 0.4 &&
      Math.abs(s.tgtW - s.curW) < 0.4 &&
      Math.abs(s.tgtScroll - s.curScroll) < 0.001;
    if (settled) {
      s.curX = s.tgtX;
      s.curW = s.tgtW;
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
      s.raf = 0; // StrictMode 재마운트 시 kickReveal 이 다시 돌 수 있게 초기화
      window.clearTimeout(s.idle);
    };
  }, []);

  // 스크롤 진행도(0→1)를 tgtScroll로 정함
  useEffect(() => {
    const s = reveal.current;
    const onScroll = () => {
      // 커서를 아직 안 움직였으면 화면 중앙에서 대칭
      if (!s.init) s.curX = window.innerWidth / 2;
      const hero = container.current;
      const heroExit = hero
        ? (hero.offsetTop + hero.offsetHeight) * 1.4
        : window.innerHeight;
      s.tgtScroll =
        heroExit > 0 ? Math.min(1, Math.max(0, window.scrollY / heroExit)) : 0;
      // 스크롤 이벤트에서도 조금씩 전진
      s.curScroll += (s.tgtScroll - s.curScroll) * 0.2;
      applyReveal();
      kickReveal(); // 스크롤이 멈춘 뒤 남은 이징은 rAF 가 마무리
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // applyReveal / kickReveal 은 ref 만 참조하므로 재구독 불필요
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

        // 1줄  왼쪽에서 한 글자씩 슬라이드 인
        .from(line1Chars, { x: -70, opacity: 0, stagger: 0.05 }, 0.5)
        // 2줄  같은 방향으로 이어서 슬라이드 인
        .from(line2Chars, { x: -70, opacity: 0, stagger: 0.05 }, "<0.35")

        // 입력창  중앙에서 양옆으로 퍼지며 등장
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

  // 게시판 홍보 카드: 데스크톱에서 섹션을 화면에 고정하고 가로로 스크럽 (gsap.com 홈 참고)
  useGSAP(
    () => {
      const pin = scrollPin.current;
      const track = scrollTrack.current;
      if (!pin || !track) return;

      const mm = gsap.matchMedia();
      const lastIndex = BOARD_PROMO_STEP_LABELS.length - 1;

      mm.add("(min-width: 900px)", () => {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.to(track, { x: () => -distance(), ease: "none" });
        const trigger = ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          animation: tween,
          onUpdate: (self) => {
            setActiveCard(Math.round(self.progress * lastIndex));
          },
        });

        return () => {
          trigger.kill();
          tween.kill();
        };
      });

      // 커스텀 웹폰트(Unbounded 등)가 늦게 로드되며 문서 높이가 바뀌면
      // 이미 계산된 트리거 시작/끝 지점이 어긋나므로, 폰트 로드 완료 후 다시 계산한다.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: scrollPin },
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const s = reveal.current;
    if (!s.init) {
      s.init = true;
      s.curX = e.clientX;
    }
    s.tgtX = e.clientX;
    s.tgtW = BAND_W;
    window.clearTimeout(s.idle);
    s.idle = window.setTimeout(() => {
      s.tgtW = 0;
      kickReveal();
    }, IDLE_MS);
    kickReveal();
  };

  const handleMouseLeave = () => {
    const s = reveal.current;
    window.clearTimeout(s.idle);
    s.tgtW = 0;
    kickReveal();
  };

  return (
    <>
      <Wrapper
        ref={container}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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

      <ProcessAnimation>
        <ServiceFlow onStart={handleStart} />
      </ProcessAnimation>

      <BoardPromo>
        <BoardPromoInner>
          <BoardPromoTitle>
            만든 화면을 <span>커뮤니티</span>에 올려보세요
            <br />
          </BoardPromoTitle>
        </BoardPromoInner>

        <BoardPromoScrollPin ref={scrollPin}>
          <BoardPromoSteps>
            {BOARD_PROMO_STEP_LABELS.map((label, i) => (
              <BoardPromoStep
                key={label}
                data-active={i === activeCard}
                data-done={i < activeCard}
              >
                <BoardPromoStepDot>
                  {String(i + 1).padStart(2, "0")}
                </BoardPromoStepDot>
                <BoardPromoStepLabel>{label}</BoardPromoStepLabel>
              </BoardPromoStep>
            ))}
          </BoardPromoSteps>

          <BoardPromoFeatures ref={scrollTrack}>
            {BOARD_PROMO_FEATURES.map((f) => (
              <BoardPromoFeature key={f.num}>
                <BoardPromoFeatureIcon>
                  <f.icon />
                </BoardPromoFeatureIcon>
                <BoardPromoFeatureNum>STEP {f.num}</BoardPromoFeatureNum>
                <BoardPromoFeatureTitle>{f.title}</BoardPromoFeatureTitle>
                <BoardPromoFeatureDesc>{f.desc}</BoardPromoFeatureDesc>
                <BoardPromoFeatureTag>{f.num}</BoardPromoFeatureTag>
              </BoardPromoFeature>
            ))}
            <BoardPromoFinalCard>
              <BoardPromoFeatureIcon>
                <ArrowIcon />
              </BoardPromoFeatureIcon>
              <BoardPromoFeatureNum>STEP 04</BoardPromoFeatureNum>
              <BoardPromoFeatureTitle>
                지금 바로 시작해보세요
              </BoardPromoFeatureTitle>
              <BoardPromoFeatureDesc>
                화면을 올리고 다른 사람들의 피드백을 받아보세요.
              </BoardPromoFeatureDesc>
              <BoardPromoFinalActions>
                <OutroPrimary to="/board/new">
                  게시물 올리러 가기 →
                </OutroPrimary>
                <OutroSecondary to="/board">게시판 둘러보기</OutroSecondary>
              </BoardPromoFinalActions>
            </BoardPromoFinalCard>
          </BoardPromoFeatures>
        </BoardPromoScrollPin>
      </BoardPromo>
    </>
  );
}

export default Home;
