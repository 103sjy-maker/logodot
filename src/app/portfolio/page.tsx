import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { portfolioItems } from '@/data/portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">
        <div className="max-w-[1440px] mx-auto px-[240px] py-[80px]">

          {/* Page header */}
          <div className="flex items-start justify-between mb-[60px]">
            <div className="flex flex-col gap-[16px]">
              <h1 className="text-[60px] leading-[72px] tracking-[-1.2px] font-semibold text-foreground">
                Portfolio<span className="text-brand">.</span>
              </h1>
              <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-normal text-muted">
                로고부터 브랜드 아이덴티티까지, 로고닷의 작업들
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-foreground text-foreground text-[18px] leading-[22px] font-medium tracking-[-0.36px] px-[40px] py-[18px] rounded-[8px] hover:bg-foreground hover:text-white transition-colors flex-shrink-0 mt-3"
            >
              프로젝트 문의하기 <span className="text-[16px]">↗</span>
            </Link>
          </div>

          {/* Portfolio grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[24px] gap-y-[60px]">
            {portfolioItems.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group flex flex-col gap-[24px]">
                {/* Figma: image 456×304 r=20 */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[456/304]">
                  <PlaceholderImage aspectRatio="aspect-[456/304]" />
                  {/* Hover: + overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      <span className="text-foreground text-[20px] leading-none">+</span>
                    </div>
                  </div>
                </div>

                {/* Figma subject: VERTICAL gap=12 */}
                <div className="flex flex-col gap-[12px]">
                  {/* Figma: Pretendard 600 20px lh=28px ls=-0.4px
                      First item color=#93D85A, others #1E1E1E */}
                  <p className="text-[20px] leading-[28px] tracking-[-0.4px] font-semibold text-foreground group-hover:text-brand transition-colors">
                    {item.title}
                  </p>
                  {/* Figma: Pretendard 500 16px lh=19px ls=-0.32px color=#888888 */}
                  <p className="text-[16px] leading-[19px] tracking-[-0.32px] font-medium text-muted-light">
                    {item.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
