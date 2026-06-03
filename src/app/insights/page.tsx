'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { insightArticles, insightCategories } from '@/data/insights';

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered =
    activeCategory === '전체'
      ? insightArticles
      : insightArticles.filter((a) => a.categorySlug === activeCategory);

  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">
        <div className="section-wrap py-[40px] md:py-[80px]">

          {/* Figma: Pretendard 700 60px lh=72px ls=-1.2px */}
          <h1 className="text-[32px] leading-[40px] tracking-[-0.64px] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px] font-semibold text-foreground mb-[10px] md:mb-[12px]">
            Dot Insights<span className="text-brand">.</span>
          </h1>
          {/* Figma: Pretendard 400 20px lh=28px ls=-0.4px color=#444444 */}
          <p className="text-[15px] leading-[22px] tracking-[-0.3px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-normal text-muted mb-[24px] md:mb-[40px]">
            브랜딩을 더 깊이 이해하는 데 필요한 모든 인사이트
          </p>

          {/* Category filter — same pill style as portfolio */}
          <div className="flex flex-wrap gap-[6px] md:gap-[8px] mb-[32px] md:mb-[60px]">
            {insightCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[14px] py-[7px] md:px-[20px] md:py-[10px] text-[13px] leading-[18px] tracking-[-0.26px] md:text-[18px] md:leading-[28px] md:tracking-[-0.36px] font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand text-foreground rounded-full'
                    : 'bg-card text-inactive rounded-full hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4-column grid (desktop), 2-column (mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[16px] gap-y-[32px] md:gap-x-[24px] md:gap-y-[48px]">
            {filtered.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group flex flex-col gap-[10px] md:gap-[16px]">
                <div className="overflow-hidden rounded-[10px] md:rounded-[16px]">
                  <PlaceholderImage aspectRatio="aspect-[4/3]" />
                </div>
                <div className="flex flex-col gap-[5px] md:gap-[8px]">
                  {/* Figma: Pretendard 600 20px lh=28px */}
                  <p className="text-[13px] leading-[19px] tracking-[-0.26px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-semibold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                    {article.title}
                  </p>
                  {/* Figma: date — Pretendard 400 16px color=#888888 */}
                  <p className="text-[11px] leading-[15px] tracking-[-0.22px] md:text-[16px] md:leading-[19px] md:tracking-[-0.32px] font-normal text-muted-light">
                    {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="bg-brand-light py-16 md:py-24">
          <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-snug">
              브랜딩에 대해 더 알고 싶으신가요?
              <br />
              막막함을 줄이고, 확실한 브랜드로 시작하세요
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 bg-site-dark text-white text-sm font-medium px-7 py-3.5 rounded hover:bg-[#333] transition-colors"
            >
              지금 시작하기 <span className="text-xs">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
