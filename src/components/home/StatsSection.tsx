'use client';

/* Figma: 신뢰지표 section — bg=#F8F9FA, 1920×1010 */

import { useRef, useState, useEffect } from 'react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { testimonials } from '@/data/testimonials';

const stats = [
  {
    label: '완료 프로젝트',
    value: 780,
    suffix: '+',
    description: '브랜드 런칭 · 매출 상승까지 이어진 실제 사례',
  },
  {
    label: '산업군 경험',
    value: 70,
    suffix: '+',
    description: '다양한 산업군에서 제작된 로고 시안',
  },
  {
    label: '고객 만족도',
    value: 99,
    suffix: '%',
    description: '실제 후기 및 재의뢰 기준',
  },
];

// ease-out cubic — starts fast, decelerates to final value
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(easeOutCubic(progress) * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-[5px]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brand text-[16px] leading-[20px]">★</span>
      ))}
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  // Trigger once when the stats numbers enter the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Three independent count-up hooks — staggered durations for natural feel
  const count0 = useCountUp(stats[0].value, 1500, animated);
  const count1 = useCountUp(stats[1].value, 1300, animated);
  const count2 = useCountUp(stats[2].value, 1400, animated);
  const counts = [count0, count1, count2];

  return (
    <section ref={sectionRef} className="bg-card py-[100px] overflow-hidden">

      {/* Padded container — title + stats numbers */}
      <div className="max-w-[1440px] mx-auto px-[240px]">

        <div className="flex flex-col gap-[16px] items-center text-center mb-[60px]">
          <SectionLabel className="text-[24px] leading-[28.8px] tracking-[-0.48px] font-semibold text-brand">
            로고닷의 신뢰지표
          </SectionLabel>
          <h2 className="text-[48px] leading-[57.6px] tracking-[-0.96px] font-bold text-foreground">
            브랜드 신뢰를 쌓아온 로고닷의 기록
          </h2>
        </div>

        <div className="flex items-start justify-center gap-[80px] mb-[80px]">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-[5px]">
              <p className="text-[20px] leading-[24px] tracking-[-0.4px] font-bold text-foreground">
                {stat.label}
              </p>

              {/* Number + suffix — invisible placeholder prevents width shift */}
              <div className="flex items-end gap-0 font-logo">
                {/*
                 * Outer div holds the width of the final value via an invisible
                 * ghost span, so layout stays fixed as 0 → 780 counts up.
                 */}
                <div className="relative inline-flex justify-center">
                  {/* Ghost — establishes width of final value */}
                  <span
                    aria-hidden="true"
                    className="invisible text-[80px] leading-[100px] tracking-[-1.6px] font-bold"
                  >
                    {stat.value}
                  </span>
                  {/* Animated number on top */}
                  <span className="absolute inset-0 flex items-center justify-center text-[80px] leading-[100px] tracking-[-1.6px] font-bold text-foreground tabular-nums">
                    {counts[i]}
                  </span>
                </div>

                {/* Suffix — always visible, never animated */}
                {stat.suffix === '%' ? (
                  <span className="text-[34px] leading-[60px] tracking-[-0.68px] font-black text-foreground">
                    {stat.suffix}
                  </span>
                ) : (
                  <span className="text-[60px] leading-[90px] tracking-[-1.2px] font-medium text-foreground">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <p className="text-[18px] leading-[24px] tracking-[-0.36px] font-normal text-muted text-center max-w-[200px]">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial marquee — outside padded container, same pattern as Portfolio */}
      <div className="overflow-hidden">
        <div className="flex gap-[24px] animate-marquee w-max px-[240px]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[400px] flex-shrink-0 bg-white rounded-[12px] px-[30px] py-[40px] flex flex-col gap-[16px]"
            >
              <StarRating count={t.rating} />
              <p className="text-[17px] leading-[22px] tracking-[-0.34px] font-bold text-foreground">
                {t.title}
              </p>
              <p className="text-[15px] leading-[24px] tracking-[-0.3px] font-normal text-muted">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
