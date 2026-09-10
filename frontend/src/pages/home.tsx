import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
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
  Outro,
  OutroTitle,
  OutroActions,
  OutroPrimary,
  OutroSecondary,
} from "./styles/home.style";

/* 커서 밴드 */
const BAND_W = 128; // 밴드 폭(px)
const EASE = 0.16; // 커서 밴드 lerp 계수 (빠르게)
const SCROLL_EASE = 0.06; // 스크롤 채움 (느리게)
const IDLE_MS = 650; // 커서가 멈춘 뒤 밴드가 접히기까지 대기

gsap.registerPlugin(useGSAP, SplitText);

function Home() {
  const container = useRef<HTMLDivElement>(null);
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
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

      <Outro>
        <OutroTitle>
          지금 만들고 있는 화면, <span>어디가 아쉬운지</span> 확인해 보세요
        </OutroTitle>
        <OutroActions>
          <OutroPrimary to="/evaluate">평가 시작하기 →</OutroPrimary>
          <OutroSecondary to="/board">게시판 둘러보기</OutroSecondary>
        </OutroActions>
      </Outro>
    </>
  );
}

export default Home;
