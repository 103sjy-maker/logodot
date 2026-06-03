/* Figma: 포트폴리오 section — images marquee (list 1 & list 2) */
/* Portfolio images: 336×224 r=20 (from 01-2 frame) */

import { SectionLabel } from '@/components/ui/SectionLabel';
import { portfolioItems } from '@/data/portfolio';

const row1 = portfolioItems.slice(0, 6);
const row2 = portfolioItems.slice(6, 12);

function PortfolioThumb() {
  return (
    <div className="w-[336px] h-[224px] flex-shrink-0 rounded-[20px] bg-[#F0F0F0] flex items-center justify-center">
      <div className="flex flex-col items-start">
        <span className="text-[#AAAAAA] font-black text-[48px] leading-none">L</span>
        <span className="text-brand font-black text-[32px] leading-none">.</span>
      </div>
    </div>
  );
}

export function PortfolioPreviewSection() {
  return (
    /* No special bg — white section with marquee */
    <section className="bg-white py-[100px] overflow-hidden">
      {/* Figma stitle: VERTICAL gap=20, centre-aligned to match StatsSection */}
      <div className="max-w-[1440px] mx-auto px-[240px] mb-[60px]">
        <div className="flex flex-col items-center text-center gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <SectionLabel className="text-[24px] leading-[28.8px] tracking-[-0.48px] font-semibold text-brand">
              로고닷의 포트폴리오
            </SectionLabel>
            <h2 className="text-[48px] leading-[57.6px] tracking-[-0.96px] font-bold text-foreground">
              로고부터 브랜드아이덴티티까지
            </h2>
          </div>
          <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-normal text-muted">
            로고에서 시작해 브랜드의 언어를 만들고, 아이덴티티까지 선명하게 완성합니다.
            <br />
            시작점은 로고, 완성은 브랜드입니다.
          </p>
        </div>
      </div>

      {/* Figma list 1 — scrolling right */}
      <div className="mb-[8px] overflow-hidden">
        <div className="flex gap-[8px] animate-marquee w-max px-[240px]">
          {[...row1, ...row1].map((_, i) => (
            <PortfolioThumb key={`r1-${i}`} />
          ))}
        </div>
      </div>

      {/* Figma list 2 — scrolling left */}
      <div className="overflow-hidden">
        <div className="flex gap-[8px] animate-marquee-reverse w-max px-[240px]">
          {[...row2, ...row2].map((_, i) => (
            <PortfolioThumb key={`r2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
