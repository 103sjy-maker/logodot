import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { insightArticles } from '@/data/insights';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return insightArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = insightArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  const prevArticle = article.prevSlug
    ? insightArticles.find((a) => a.slug === article.prevSlug)
    : null;
  const nextArticle = article.nextSlug
    ? insightArticles.find((a) => a.slug === article.nextSlug)
    : null;

  return (
    <>
      <Header />
      <main className="flex-1 pt-14 md:pt-16">
        <article className="max-w-[800px] mx-auto px-5 md:px-10 py-12 md:py-16">
          {/* Article header */}
          <div className="mb-8">
            <p className="text-sm text-brand font-medium mb-3">인사이트</p>
            <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-sm text-muted">{article.date}</p>
          </div>

          {/* Article content */}
          <div className="prose prose-sm max-w-none">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-sm text-foreground leading-loose mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Inline images */}
          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden">
              <PlaceholderImage aspectRatio="aspect-[4/3]" />
            </div>
            <div className="rounded-xl overflow-hidden">
              <PlaceholderImage aspectRatio="aspect-[4/3]" />
            </div>
          </div>

          {/* More content */}
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-foreground leading-loose mb-4">
              이처럼 로고를 변경하는 데에는 정확한 목적이 있어야 하고 목적은 브랜드의 정체성과 부합해야 한다.
            </p>
            <p className="text-sm text-foreground leading-loose mb-4">
              로고는 브랜드 인지도에 큰 영향을 미친다. 로고는 브랜드를 나타내는 &apos;얼굴&apos;과도 같다. 브랜드가 추구하는 브랜드의 정체성, 자기다움을 시각적으로 명확하게 표현할 수 있어야 한다.
              심플한 이미지로 누구나 쉽게 알아볼 수 있어야 하고 하나의 상징체계로서 브랜드의 정체성을 담고 있어야 한다. 그리고 일관성 있는 지속적인 노출을 반복시킬수록 브랜드의 정체성이 뚜렷해진다.
            </p>
          </div>
        </article>

        {/* Prev / List / Next */}
        <div className="max-w-[800px] mx-auto px-5 md:px-10 py-8 border-t border-border">
          <div className="flex items-center justify-between gap-4">
            {prevArticle ? (
              <Link
                href={`/insights/${prevArticle.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs">
                  ←
                </span>
                <span className="hidden md:inline">PREV</span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/insights"
              className="flex items-center gap-2 border border-border text-sm font-medium px-5 py-2.5 rounded hover:bg-card transition-colors"
            >
              <span className="text-xs">≡</span> 목록으로
            </Link>

            {nextArticle ? (
              <Link
                href={`/insights/${nextArticle.slug}`}
                className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand transition-colors"
              >
                <span className="hidden md:inline">NEXT</span>
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs">
                  →
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
