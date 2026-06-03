export interface PortfolioItem {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  client: string;
  service: string;
  date: string;
  thumbnail: string | null;
  descriptionKo: string;
  descriptionEn: string;
  images: PortfolioImage[];
  prevSlug?: string;
  nextSlug?: string;
}

export interface PortfolioImage {
  src: string | null;
  alt: string;
  wide?: boolean;
}

export interface InsightArticle {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  date: string;
  thumbnail: string | null;
  excerpt: string;
  content: string;
  prevSlug?: string;
  nextSlug?: string;
}

export interface Testimonial {
  title: string;
  quote: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  priceLabel: string;
  subtitle: string;
  description: string;
  features: string[];
  isBest?: boolean;
  buttonLabel: string;
  buttonVariant: 'dark' | 'green' | 'outline-dark';
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type PortfolioCategory =
  | '전체'
  | '기업·스타트업'
  | '패션·뷰티'
  | '카페·식당'
  | '스포츠·예술'
  | '병원·법률'
  | '기타';

export type InsightCategory =
  | '전체'
  | '브랜딩 기초'
  | '디자인 실무'
  | '고객 이야기'
  | '자료실';
