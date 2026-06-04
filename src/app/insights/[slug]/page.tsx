import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllInsights, getInsightBySlug } from '@/lib/insights';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllInsights().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) notFound();

  const all = getAllInsights();
  const prevArticle = article.prevSlug ? all.find((a) => a.slug === article.prevSlug) : null;
  const nextArticle = article.nextSlug ? all.find((a) => a.slug === article.nextSlug) : null;

  return (
    <>
      <Header />
      <main className="flex-1 pt-[100px]">
        <article className="max-w-[800px] mx-auto px-5 md:px-10 py-12 md:py-16">

          {/* 헤더 */}
          <div className="mb-8">
            <p className="text-sm text-brand font-medium mb-3">{article.category}</p>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
              {article.title}
            </h1>
          </div>

          {/* 커버 이미지 */}
          {article.thumbnail && (
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[12px] mb-10 bg-card">
              <Image
                src={article.thumbnail}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 40px), 720px"
                priority
              />
            </div>
          )}

          {/* 본문 — markdown → HTML */}
          <div
            className="insight-prose"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

        </article>

        {/* Prev / List / Next */}
        <div className="max-w-[800px] mx-auto px-5 md:px-10 py-8 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            {prevArticle ? (
              <Link
                href={`/insights/${prevArticle.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs flex-shrink-0">←</span>
                <span className="hidden md:inline line-clamp-1">{prevArticle.title}</span>
              </Link>
            ) : <div />}

            <Link
              href="/insights"
              className="flex-shrink-0 flex items-center gap-2 border border-border text-sm font-medium px-5 py-2.5 rounded hover:bg-card transition-colors"
            >
              <span className="text-xs">≡</span> 목록으로
            </Link>

            {nextArticle ? (
              <Link
                href={`/insights/${nextArticle.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors text-right"
              >
                <span className="hidden md:inline line-clamp-1">{nextArticle.title}</span>
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs flex-shrink-0">→</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
