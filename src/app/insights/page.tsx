import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { InsightsList } from '@/components/insights/InsightsList';
import { getAllInsights } from '@/lib/insights';
import Link from 'next/link';

export default function InsightsPage() {
  const articles = getAllInsights();

  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">

        {/* Page header */}
        <div className="section-wrap pt-[40px] md:pt-[80px] pb-0">
          <h1 className="text-[32px] leading-[40px] tracking-[-0.64px] md:text-[60px] md:leading-[72px] md:tracking-[-1.2px] font-semibold text-foreground mb-[10px] md:mb-[12px]">
            Dot Insights<span className="text-brand">.</span>
          </h1>
          <p className="text-[15px] leading-[22px] tracking-[-0.3px] md:text-[20px] md:leading-[28px] md:tracking-[-0.4px] font-normal text-muted">
            브랜딩을 더 깊이 이해하는 데 필요한 모든 인사이트
          </p>
        </div>

        {/* Category filter + grid (client component) */}
        <InsightsList articles={articles} />

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
