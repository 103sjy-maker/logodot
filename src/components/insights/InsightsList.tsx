'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { insightCategories } from '@/lib/insights-config';
import type { InsightMeta } from '@/lib/insights';

export function InsightsList({ articles }: { articles: InsightMeta[] }) {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered =
    activeCategory === '전체'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="section-wrap py-[40px] md:py-[80px]">

      {/* Category filter */}
      <div className="flex flex-wrap gap-[6px] md:gap-[8px] mb-[32px] md:mb-[60px]">
        {insightCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-[14px] py-[7px] md:px-[20px] md:py-[10px] text-[13px] leading-[18px] tracking-[-0.26px] md:text-[18px] md:leading-[28px] md:tracking-[-0.36px] font-semibold transition-colors rounded-full ${
              activeCategory === cat
                ? 'bg-brand text-foreground'
                : 'bg-card text-inactive hover:text-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[16px] gap-y-[32px] md:gap-x-[24px] md:gap-y-[48px]">
        {filtered.map((article) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className="group flex flex-col gap-[10px] md:gap-[16px]"
          >
            <div className="overflow-hidden rounded-[10px] md:rounded-[16px]">
              {article.thumbnail ? (
                <div className="relative aspect-[4/3]">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) calc(50vw - 32px), calc((100vw - 480px) / 4)"
                  />
                </div>
              ) : (
                <PlaceholderImage aspectRatio="aspect-[4/3]" />
              )}
            </div>
            <div className="flex flex-col gap-[5px] md:gap-[7px]">
              <p className="text-[13px] leading-[19px] tracking-[-0.26px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-semibold text-foreground group-hover:text-brand transition-colors line-clamp-2">
                {article.title}
              </p>
              {article.excerpt && (
                <p className="text-[12px] leading-[1.5] tracking-[-0.24px] md:text-[14px] md:leading-[1.5] md:tracking-[-0.28px] text-[#A0A0A0] line-clamp-2">
                  {article.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
