import { useCallback, useEffect, useRef, useState } from "react";

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
