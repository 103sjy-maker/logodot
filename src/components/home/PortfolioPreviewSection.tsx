/* Figma: 포트폴리오 section — images marquee */

import { SectionLabel } from '@/components/ui/SectionLabel';
import { portfolioItems } from '@/data/portfolio';

const row1 = portfolioItems.slice(0, 6);
const row2 = portfolioItems.slice(6, 12);

function PortfolioThumb() {
  return (
    <div className="w-[200px] h-[134px] md:w-[336px] md:h-[224px] flex-shrink-0 rounded-[14px] md:rounded-[20px] bg-[#F0F0F0] flex items-center justify-center">
      <div className="flex flex-col items-start">
        <span className="text-[#AAAAAA] font-black text-[32px] md:text-[48px] leading-none">L</span>
        <span className="text-brand font-black text-[20px] md:text-[32px] leading-none">.</span>
      </div>
    </div>
  );
}

export function PortfolioPreviewSection() {
  return (
    <section className="bg-white py-[60px] md:py-[100px] overflow-hidden">

      {/* Title */}
      <div className="section-wrap mb-[40px] md:mb-[60px]">
        <div className="flex flex-col items-center text-center gap-[16px] md:gap-[20px]">
          <div className="flex flex-col gap-[10px] md:gap-[16px]">
            <SectionLabel className="text-[15px] leading-[20px] tracking-[-0.3px] md:text-[24px] md:leading-[28.8px] md:tracking-[-0.48px] font-semibold text-brand">
              로고닷의 포트폴리오
            </SectionLabel>
            <h2 className="text-[26px] leading-[33px] tracking-[-0.52px] md:text-[48px] md:leading-[57.6px] md:tracking-[-0.96px] font-bold text-foreground">
              로고부터 브랜드아이덴티티까지
            </h2>
          </div>
          <p className="text-[15px] leading-[24px] tracking-[-0.3px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-normal text-muted">
            로고에서 시작해 브랜드의 언어를 만들고, 아이덴티티까지 선명하게 완성합니다.{' '}
            <br className="hidden md:block" />
            시작점은 로고, 완성은 브랜드입니다.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolling right */}
      <div className="mb-[6px] md:mb-[8px] overflow-hidden">
        <div className="flex gap-[6px] md:gap-[8px] animate-marquee w-max px-6 md:px-[60px] lg:px-[120px] xl:px-[240px]">
          {[...row1, ...row1].map((_, i) => (
            <PortfolioThumb key={`r1-${i}`} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling left */}
      <div className="overflow-hidden">
        <div className="flex gap-[6px] md:gap-[8px] animate-marquee-reverse w-max px-6 md:px-[60px] lg:px-[120px] xl:px-[240px]">
          {[...row2, ...row2].map((_, i) => (
            <PortfolioThumb key={`r2-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
