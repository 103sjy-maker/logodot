import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { portfolioItems } from '@/data/portfolio';

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">
        <div className="section-wrap py-[40px] md:py-[80px]">

          {/* Page header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-[36px] md:mb-[60px] gap-[20px] md:gap-0">
            <div className="flex flex-col gap-[10px] md:gap-[16px]">
              <h1 className="text-[36px] leading-[44px] tracking-[-0.72px] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px] font-semibold text-foreground">
                Portfolio<span className="text-brand">.</span>
              </h1>
              <p className="text-[15px] leading-[22px] tracking-[-0.3px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-normal text-muted">
                로고부터 브랜드 아이덴티티까지, 로고닷의 작업들
              </p>
            </div>
            <Link
              href="/contact"
              className="self-start inline-flex items-center gap-2 border border-foreground text-foreground text-[14px] md:text-[18px] leading-[20px] md:leading-[22px] font-medium tracking-[-0.28px] md:tracking-[-0.36px] px-[20px] md:px-[40px] py-[12px] md:py-[18px] rounded-[8px] hover:bg-foreground hover:text-white transition-colors md:flex-shrink-0 md:mt-3"
            >
              프로젝트 문의하기 <span className="text-[14px] md:text-[16px]">↗</span>
            </Link>
          </div>

          {/* Portfolio grid — 1 col mobile, 3 col desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[24px] gap-y-[36px] md:gap-y-[60px]">
            {portfolioItems.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="group flex flex-col gap-[14px] md:gap-[24px]">
                <div className="relative overflow-hidden rounded-[14px] md:rounded-[20px] aspect-[456/304]">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) calc(100vw - 48px), calc((100vw - 480px) / 3)"
                    />
                  ) : (
                    <PlaceholderImage aspectRatio="aspect-[456/304]" />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                    <div className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                      <span className="text-foreground text-[20px] leading-none">+</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px] md:gap-[12px]">
                  <p className="text-[16px] leading-[24px] tracking-[-0.32px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-semibold text-foreground group-hover:text-brand transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[13px] leading-[18px] tracking-[-0.26px] md:text-[16px] md:leading-[19px] md:tracking-[-0.32px] font-medium text-muted-light">
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
