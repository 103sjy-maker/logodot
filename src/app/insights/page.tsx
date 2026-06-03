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
        <div className="max-w-[1440px] mx-auto px-[240px] py-[80px]">

          {/* Figma: Pretendard 700 60px lh=72px ls=-1.2px */}
          <h1 className="text-[60px] leading-[72px] tracking-[-1.2px] font-semibold text-foreground mb-[12px]">
            Dot Insights<span className="text-brand">.</span>
          </h1>
          {/* Figma: Pretendard 400 20px lh=28px ls=-0.4px color=#444444 */}
          <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-normal text-muted mb-[40px]">
            브랜딩을 더 깊이 이해하는 데 필요한 모든 인사이트
          </p>

          {/* Category filter — same pill style as portfolio */}
          <div className="flex flex-wrap gap-[8px] mb-[60px]">
            {insightCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-[20px] py-[10px] text-[18px] leading-[28px] tracking-[-0.36px] font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-brand text-foreground rounded-full'
                    : 'bg-card text-inactive rounded-full hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 4-column grid (desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[24px] gap-y-[48px]">
            {filtered.map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`} className="group flex flex-col gap-[16px]">
                <div className="overflow-hidden rounded-[16px]">
                  <PlaceholderImage aspectRatio="aspect-[4/3]" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  {/* Figma: Pretendard 600 20px lh=28px */}
                  <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-semibold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                    {article.title}
                  </p>
                  {/* Figma: date — Pretendard 400 16px color=#888888 */}
                  <p className="text-[16px] leading-[19px] tracking-[-0.32px] font-normal text-muted-light">
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
