'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 마우스 기기에서만 활성화 (터치 디바이스 제외)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const wrap = wrapRef.current;
    const dot = dotRef.current;
    if (!wrap || !dot) return;

    const HALF = 5;   // dot 10px의 절반 — 커서 중앙 정렬
    const LERP = 0.13; // 부드러운 추적 계수 (낮을수록 더 늦게 따라옴)

    const mouse = { x: -200, y: -200 };
    const anim  = { x: -200, y: -200 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      // 처음 움직일 때만 보이게
      if (dot.style.opacity === '0') dot.style.opacity = '0.72';
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      const interactive = !!el.closest('a, button, [role="button"], input, textarea, select, label');
      dot.style.transform = interactive ? 'scale(2.4)' : 'scale(1)';
    };

    const onLeave = () => { dot.style.opacity = '0'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);

    // rAF 루프 — React 상태 없이 직접 DOM 조작해 re-render 제로
    const tick = () => {
      anim.x += (mouse.x - anim.x) * LERP;
      anim.y += (mouse.y - anim.y) * LERP;
      wrap.style.transform = `translate(${anim.x - HALF}px, ${anim.y - HALF}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      // hidden md:block — 모바일 CSS 레벨에서도 완전 제거
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="w-[10px] h-[10px] rounded-full bg-[#93D85A] transition-[transform,opacity] duration-[180ms] ease-out"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
