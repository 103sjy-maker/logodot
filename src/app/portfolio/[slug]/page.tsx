import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { portfolioItems } from '@/data/portfolio';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.descriptionKo?.split('\n')[0] ?? item.title,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) notFound();

  const prevItem = item.prevSlug ? portfolioItems.find((p) => p.slug === item.prevSlug) : null;
  const nextItem = item.nextSlug ? portfolioItems.find((p) => p.slug === item.nextSlug) : null;

  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">

        {/* ── Info block ── */}
        <section className="max-w-[1440px] mx-auto px-[240px] pt-[60px]">

          {/* Row 1: category badge (left) + 목록으로 (right) */}
          <div className="flex items-center justify-between mb-[24px]">
            <span className="inline-flex items-center bg-brand text-foreground text-[13px] leading-[16px] font-semibold tracking-[-0.26px] px-[14px] py-[5px] rounded-full">
              {item.category}
            </span>
            <Link
              href="/portfolio"
              className="text-[14px] leading-[17px] text-muted hover:text-foreground transition-colors"
            >
              ← 목록으로
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-[40px] leading-[50px] tracking-[-0.8px] font-bold text-foreground mb-[28px]">
            {item.title}
          </h1>

          {/* Descriptions */}
          <div className="max-w-[680px] flex flex-col gap-[18px] mb-[48px]">
            <p className="text-[16px] leading-[28px] tracking-[-0.32px] font-normal text-foreground whitespace-pre-line">
              {item.descriptionKo}
            </p>
            <p className="text-[14px] leading-[24px] tracking-[-0.28px] font-normal text-muted whitespace-pre-line">
              {item.descriptionEn}
            </p>
          </div>

          {/* Meta — Client / Service / Date */}
          <div className="border-t border-border pt-[24px] pb-[60px] flex gap-0">
            {[
              { label: 'Client', value: item.client },
              { label: 'Service', value: item.service },
              { label: 'Date', value: item.date },
            ].map((meta, i) => (
              <div
                key={meta.label}
                className={`flex flex-col gap-[6px] flex-1 ${
                  i > 0 ? 'pl-[32px] border-l border-border' : ''
                }`}
              >
                <p className="text-[11px] leading-[13px] tracking-[0.5px] font-medium text-muted uppercase">
                  {meta.label}
                </p>
                <p className="text-[15px] leading-[19px] tracking-[-0.3px] font-semibold text-foreground">
                  {meta.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Images — light gray background ── */}
        <section className="bg-card py-[60px]">
          <div className="max-w-[1440px] mx-auto px-[240px] flex flex-col gap-[12px]">

            {/* Hero (first image always full-width 16:9) */}
            <div className="w-full overflow-hidden rounded-[16px]">
              <PlaceholderImage aspectRatio="aspect-[16/9]" />
            </div>

            {/* Additional images */}
            {item.images.length > 1 && (
              <div className="grid grid-cols-2 gap-[12px]">
                {item.images.slice(1).map((img, i) =>
                  img.wide ? (
                    <div key={i} className="col-span-2 overflow-hidden rounded-[16px]">
                      <PlaceholderImage aspectRatio="aspect-[16/9]" />
                    </div>
                  ) : (
                    <div key={i} className="overflow-hidden rounded-[16px]">
                      <PlaceholderImage aspectRatio="aspect-[4/3]" />
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* ── Prev / List / Next navigation ── */}
        <div className="border-t border-border">
          <div className="max-w-[1440px] mx-auto px-[240px] py-[40px] flex items-center justify-between">

            {prevItem ? (
              <Link href={`/portfolio/${prevItem.slug}`} className="group flex flex-col gap-[4px]">
                <span className="text-[11px] text-muted tracking-[0.5px] uppercase">Prev</span>
                <span className="text-[15px] font-semibold text-foreground group-hover:text-brand transition-colors">
                  ← {prevItem.title}
                </span>
              </Link>
            ) : <div />}

            <Link
              href="/portfolio"
              className="inline-flex items-center gap-[8px] border border-border text-[13px] font-medium px-[20px] py-[9px] rounded-[8px] hover:bg-card transition-colors text-foreground"
            >
              목록으로
            </Link>

            {nextItem ? (
              <Link href={`/portfolio/${nextItem.slug}`} className="group flex flex-col gap-[4px] items-end">
                <span className="text-[11px] text-muted tracking-[0.5px] uppercase">Next</span>
                <span className="text-[15px] font-semibold text-foreground group-hover:text-brand transition-colors">
                  {nextItem.title} →
                </span>
              </Link>
            ) : <div />}

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
