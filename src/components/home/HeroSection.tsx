'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

/*
 * Animation sequence:
 *   t=0      : Overlay (fixed z-50) covers viewport — lime green #93D85A
 *   t=400ms  : White circle begins expanding from center
 *   t=1500ms : Circle fills viewport → 'hero-done' dispatched → Header turns white
 *   t=1600ms : Overlay begins fading out (500ms)
 *   t=2100ms : Overlay removed from DOM
 *   t=2200ms : Typewriter starts — "One dot.\ninfinite identity." character by character
 *   t≈3950ms : Typing complete → subtitle + button fade-up
 */

/* Character arrays for typewriter — each entry carries its brand-color flag */
const LINE1: { ch: string; brand?: true }[] = [
  { ch: 'O' }, { ch: 'n' }, { ch: 'e' }, { ch: ' ' },
  { ch: 'd' }, { ch: 'o' }, { ch: 't' }, { ch: '.', brand: true },
];
const LINE2: { ch: string; brand?: true }[] = [
  { ch: 'i' }, { ch: 'n' }, { ch: 'f' }, { ch: 'i' }, { ch: 'n' },
  { ch: 'i' }, { ch: 't' }, { ch: 'e' }, { ch: ' ' }, { ch: 'i' },
  { ch: 'd' }, { ch: 'e' }, { ch: 'n' }, { ch: 't' }, { ch: 'i' },
  { ch: 't' }, { ch: 'y' }, { ch: '.', brand: true },
];
const TOTAL_CHARS = LINE1.length + LINE2.length; // 26

export function HeroSection() {
  const [expanding, setExpanding] = useState(false);
  const [overlayFading, setOverlayFading] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [typing, setTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);

  /* ── Main animation sequence ── */
  useEffect(() => {
    const t1 = setTimeout(() => setExpanding(true), 400);
    const t2 = setTimeout(() => window.dispatchEvent(new Event('hero-done')), 1500);
    const t3 = setTimeout(() => setOverlayFading(true), 1600);
    const t4 = setTimeout(() => setOverlayGone(true), 2100);
    const t5 = setTimeout(() => setTyping(true), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, []);

  /* ── Typewriter — each charIndex change chains the next timeout ── */
  useEffect(() => {
    if (!typing) return;
    if (charIndex >= TOTAL_CHARS) {
      // Typing done — fade-up subtitle after short pause
      const t = setTimeout(() => setShowSubtitle(true), 350);
      return () => clearTimeout(t);
    }
    // 150ms pause at line break, 60ms per normal char
    const delay = charIndex === LINE1.length ? 150 : 60;
    const t = setTimeout(() => setCharIndex(i => i + 1), delay);
    return () => clearTimeout(t);
  }, [typing, charIndex]);

  /* ── Derived state for rendering ── */
  const typedLine1 = LINE1.slice(0, Math.min(charIndex, LINE1.length));
  const typedLine2 = charIndex > LINE1.length
    ? LINE2.slice(0, charIndex - LINE1.length)
    : [];
  const cursorActive = typing && charIndex < TOTAL_CHARS;
  // Cursor sits on line 1 while typing line 1, then jumps to line 2
  const cursorOnLine1 = cursorActive && charIndex <= LINE1.length;
  const cursorOnLine2 = cursorActive && charIndex > LINE1.length;

  return (
    <>
      {/* ── Full-viewport animation overlay — above header (z-40) ── */}
      {!overlayGone && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[50] overflow-hidden"
          style={{
            backgroundColor: '#93D85A',
            opacity: overlayFading ? 0 : 1,
            transition: overlayFading ? 'opacity 0.5s ease-out' : 'none',
            pointerEvents: overlayFading ? 'none' : 'auto',
          }}
        >
          {/* Expanding white circle */}
          <div
            className="absolute left-1/2 top-1/2 rounded-full bg-white"
            style={{
              width: '300vmax',
              height: '300vmax',
              transform: `translate(-50%, -50%) scale(${expanding ? 1 : 0.0032})`,
              transition: expanding ? 'transform 1.1s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            }}
          />
        </div>
      )}

      {/*
       * Hero section — full viewport, content centered.
       * pt-[60px]/pt-[100px] offsets the fixed header so the visual
       * center of the remaining space aligns with the content.
       */}
      <section className="relative w-full min-h-[100svh] flex items-center justify-center bg-white pt-[60px] md:pt-[100px]">
        <div className="flex flex-col items-center text-center gap-[32px] md:gap-[44px] px-[24px] md:px-[60px] lg:px-[120px] max-w-[1440px] w-full mx-auto">

          {/*
           * h1 — <br> is always in DOM so 2-line height is established immediately,
           * preventing layout shift as characters are typed.
           */}
          <h1
            className="font-logo font-[600]
                       text-[42px] leading-[50px] tracking-[-0.01em]
                       md:text-[80px] md:leading-[90px] md:tracking-[0]
                       text-foreground"
          >
            {/* Line 1 */}
            {typedLine1.map(({ ch, brand }, i) =>
              brand
                ? <span key={i} className="text-brand">{ch}</span>
                : <span key={i}>{ch}</span>
            )}
            {/* Blinking cursor on line 1 */}
            {cursorOnLine1 && (
              <span
                aria-hidden="true"
                className="inline-block w-[3px] md:w-[4px] h-[0.85em] bg-foreground ml-[1px] align-middle animate-cursor"
              />
            )}

            <br />

            {/* Line 2 */}
            {typedLine2.map(({ ch, brand }, i) =>
              brand
                ? <span key={`l2-${i}`} className="text-brand">{ch}</span>
                : <span key={`l2-${i}`}>{ch}</span>
            )}
            {/* Blinking cursor on line 2 */}
            {cursorOnLine2 && (
              <span
                aria-hidden="true"
                className="inline-block w-[3px] md:w-[4px] h-[0.85em] bg-foreground ml-[1px] align-middle animate-cursor"
              />
            )}
          </h1>

          {/* Subtitle + CTA — fade-up after typing completes */}
          <div
            className="flex flex-col items-center gap-[24px] md:gap-[30px]"
            style={{
              opacity: showSubtitle ? 1 : 0,
              transform: showSubtitle ? 'translateY(0)' : 'translateY(22px)',
              transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
            }}
          >
            <p className="text-[18px] leading-[28px] tracking-[-0.36px]
                          md:text-[24px] md:leading-[29px] md:tracking-[-0.48px]
                          font-normal text-muted">
              로고의 한 점에서 브랜드가 시작됩니다.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-[12px] md:gap-[20px]
                         bg-foreground text-white
                         hover:bg-brand hover:text-foreground
                         text-[16px] md:text-[20px] leading-[24px]
                         font-medium tracking-[-0.4px]
                         px-[32px] md:px-[40px] py-[16px] md:py-[18px]
                         rounded-[8px] transition-[background-color,color] duration-200 w-fit"
            >
              지금 시작하기
              <span className="text-brand group-hover:text-foreground transition-colors duration-200">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
