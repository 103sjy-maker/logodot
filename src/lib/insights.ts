import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface InsightMeta {
  slug: string;
  title: string;
  category: string;
  date: string;       // ISO: 2026-01-10 (정렬용)
  dateDisplay: string; // 표시용: 2026.01.10
  excerpt: string;
  thumbnail: string | null;
  featured?: boolean;
  prevSlug?: string;
  nextSlug?: string;
}

export interface InsightFull extends InsightMeta {
  contentHtml: string;
}

export { insightCategories } from './insights-config';

const CONTENT_DIR = path.join(process.cwd(), 'content/insights');

function resolveThumb(value: unknown): string | null {
  if (!value || typeof value !== 'string' || !value.trim()) return null;
  return value;
}

function toDisplay(date: string): string {
  return date.replace(/-/g, '.');
}

/** 전체 글 목록 — 날짜 내림차순, prev/next 자동 연결 */
export function getAllInsights(): InsightMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  const articles = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const source = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf8');
    const { data } = matter(source);
    // gray-matter가 YAML date를 JS Date 객체로 자동 파싱 → ISO 문자열로 변환
    const raw = data.date;
    const date: string = raw instanceof Date
      ? raw.toISOString().split('T')[0]
      : raw ? String(raw) : '2024-01-01';

    return {
      slug,
      title: (data.title as string) ?? '',
      category: (data.category as string) ?? '전체',
      date,
      dateDisplay: toDisplay(date),
      excerpt: (data.excerpt as string) ?? '',
      thumbnail: resolveThumb(data.thumbnail),
      featured: (data.featured as boolean) ?? false,
    };
  });

  // featured 우선, 이후 날짜 내림차순
  articles.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // prev / next 자동 연결
  return articles.map((article, idx) => ({
    ...article,
    prevSlug: idx > 0 ? articles[idx - 1].slug : undefined,
    nextSlug: idx < articles.length - 1 ? articles[idx + 1].slug : undefined,
  }));
}

/** 단일 글 — 본문 HTML 포함 */
export async function getInsightBySlug(slug: string): Promise<InsightFull | null> {
  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(source);

  const raw = await marked(content, { breaks: false });
  const contentHtml = raw.replace(/<img /g, '<img loading="lazy" ');

  const all = getAllInsights();
  const current = all.find((a) => a.slug === slug);

  const rawDate = data.date;
  const date: string = rawDate instanceof Date
    ? rawDate.toISOString().split('T')[0]
    : rawDate ? String(rawDate) : '2024-01-01';

  return {
    slug,
    title: (data.title as string) ?? '',
    category: (data.category as string) ?? '전체',
    date,
    dateDisplay: toDisplay(date),
    excerpt: (data.excerpt as string) ?? '',
    thumbnail: resolveThumb(data.thumbnail),
    contentHtml,
    prevSlug: current?.prevSlug,
    nextSlug: current?.nextSlug,
  };
}
