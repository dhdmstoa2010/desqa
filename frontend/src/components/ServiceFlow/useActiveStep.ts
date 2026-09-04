import { useCallback, useEffect, useRef, useState } from "react";

/*
  스크롤 위치 → 현재 스택 맨 위(활성) 카드 인덱스.

  각 카드의 화면상 위치(getBoundingClientRect().top)를 보고,
  뷰포트 중앙선을 넘어 올라온 카드 중 가장 마지막(=가장 위에 쌓인) 카드를 active 로 본다.

  - passive scroll 리스너 + 가벼운 시간 스로틀(트레일링 포함) → 빠르게 스크롤해도
    계산이 밀리지 않고, 저사양 기기에서도 부담이 적다.
  - IntersectionObserver / requestAnimationFrame 에 의존하지 않아 환경을 타지 않는다.
*/
const THROTTLE_MS = 90;

export function useActiveStep(count: number) {
  const [active, setActive] = useState(0);
  const els = useRef<(HTMLElement | null)[]>([]);

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      els.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    let last = 0;
    let trailing = 0;

    const compute = () => {
      last = Date.now();
      const line = window.innerHeight * 0.5;
      let idx = 0;
      for (let i = 0; i < els.current.length; i++) {
        const el = els.current[i];
        if (el && el.getBoundingClientRect().top <= line) idx = i;
      }
      setActive((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      const now = Date.now();
      const wait = THROTTLE_MS - (now - last);
      window.clearTimeout(trailing);
      if (wait <= 0) compute();
      else trailing = window.setTimeout(compute, wait);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(trailing);
    };
  }, [count]);

  return { active, setRef };
}
