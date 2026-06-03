'use client';

/* Figma: 신뢰지표 section — bg=#F8F9FA */

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
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target, duration]);

  return count;
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-[4px] md:gap-[5px]">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-brand text-[14px] md:text-[16px] leading-[20px]">★</span>
      ))}
    </div>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimated(true); observer.disconnect(); }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count0 = useCountUp(stats[0].value, 1500, animated);
  const count1 = useCountUp(stats[1].value, 1300, animated);
  const count2 = useCountUp(stats[2].value, 1400, animated);
  const counts = [count0, count1, count2];

  return (
    <section ref={sectionRef} className="bg-card py-[60px] md:py-[100px] overflow-hidden">

      {/* Title + stats numbers */}
      <div className="section-wrap">

        <div className="flex flex-col gap-[12px] md:gap-[16px] items-center text-center mb-[40px] md:mb-[60px]">
          <SectionLabel className="text-[15px] leading-[20px] tracking-[-0.3px] md:text-[24px] md:leading-[28.8px] md:tracking-[-0.48px] font-semibold text-brand">
            로고닷의 신뢰지표
          </SectionLabel>
          <h2 className="text-[26px] leading-[33px] tracking-[-0.52px] md:text-[48px] md:leading-[57.6px] md:tracking-[-0.96px] font-bold text-foreground">
            브랜드 신뢰를 쌓아온 로고닷의 기록
          </h2>
        </div>

        {/* 3 stats — horizontal on mobile too, but smaller */}
        <div className="grid grid-cols-3 gap-[8px] md:flex md:items-start md:justify-center md:gap-[80px] mb-[40px] md:mb-[80px]">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-[6px] md:gap-[5px]">
              <p className="text-[12px] leading-[15px] tracking-[-0.24px] md:text-[20px] md:leading-[24px] md:tracking-[-0.4px] font-bold text-foreground text-center">
                {stat.label}
              </p>

              <div className="flex items-end gap-0 font-logo">
                <div className="relative inline-flex justify-center">
                  <span aria-hidden="true" className="invisible text-[32px] leading-[42px] md:text-[80px] md:leading-[100px] tracking-[-0.64px] md:tracking-[-1.6px] font-bold">
                    {stat.value}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center text-[32px] leading-[42px] md:text-[80px] md:leading-[100px] tracking-[-0.64px] md:tracking-[-1.6px] font-bold text-foreground tabular-nums">
                    {counts[i]}
                  </span>
                </div>
                {stat.suffix === '%' ? (
                  <span className="text-[14px] leading-[32px] md:text-[34px] md:leading-[60px] tracking-[-0.28px] md:tracking-[-0.68px] font-black text-foreground">
                    {stat.suffix}
                  </span>
                ) : (
                  <span className="text-[20px] leading-[38px] md:text-[60px] md:leading-[90px] tracking-[-0.4px] md:tracking-[-1.2px] font-medium text-foreground">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <p className="text-[11px] leading-[16px] tracking-[-0.22px] md:text-[18px] md:leading-[24px] md:tracking-[-0.36px] font-normal text-muted text-center">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial marquee */}
      <div className="overflow-hidden">
        <div className="flex gap-[16px] md:gap-[24px] animate-marquee w-max px-6 md:px-[60px] lg:px-[120px] xl:px-[240px]">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[260px] md:w-[400px] flex-shrink-0 bg-white rounded-[12px] px-[20px] py-[24px] md:px-[30px] md:py-[40px] flex flex-col gap-[12px] md:gap-[16px] overflow-hidden"
            >
              <StarRating count={t.rating} />
              <p className="text-[14px] leading-[20px] tracking-[-0.28px] md:text-[17px] md:leading-[22px] md:tracking-[-0.34px] font-bold text-foreground">
                {t.title}
              </p>
              <p className="text-[13px] leading-[20px] tracking-[-0.26px] md:text-[15px] md:leading-[24px] md:tracking-[-0.3px] font-normal text-muted">
                {t.quote}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
