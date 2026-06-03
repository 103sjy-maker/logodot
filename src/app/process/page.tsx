'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionLabel } from '@/components/ui/SectionLabel';

// Icon dimensions scaled to ~65% of original for Figma-accurate card sizing
const guarantees = [
  {
    title: '전문 디자이너 전담',
    description: '로고닷은 모든 프로젝트에 대해 투명한 프로세스와 결과를 보장합니다.',
    icon: { src: '/consulting.svg', width: 69, height: 56 },
  },
  {
    title: '맞춤형 브랜드 전략',
    description: '다양한 산업 경험을 가진 브랜딩 전문가가 프로젝트별 맞춤 솔루션을 제안합니다.',
    icon: { src: '/strategy.svg', width: 69, height: 69 },
  },
  {
    title: '만족도 보장 정책',
    description: '결과물이 기대에 미치지 못할 경우, 수정 및 보완을 통해 100% 만족을 목표로 합니다.',
    icon: { src: '/satisfaction.svg', width: 76, height: 74 },
  },
];

const processSteps = [
  { num: 1, title: '상담 및 의뢰서 작성', description: '브랜드 방향과 선호 스타일을 함께 정리합니다.' },
  { num: 2, title: '맞춤형 디자인 제안', description: '브랜드 컨셉과 아이디어를 바탕으로 가장 효과적인 이미지를 제안합니다.' },
  { num: 3, title: '피드백 및 수정', description: '피드백을 반영해 디자인을 다듬고 완성도를 높입니다.' },
  { num: 4, title: '최종시안 납품', description: '최종 파일(AI/PNG/PDF)과 사용 가이드를 제공합니다.' },
];

const faqs = [
  {
    q: '브랜드 콘셉트가 아직 없어요. 의뢰해도 되나요?',
    a: '물론이에요! 처음부터 명확한 브랜드를 갖고 시작하는 경우는 많지 않아요. 로고닷은 브랜드 방향을 함께 정리하는 것부터 시작합니다. 편하게 이야기만 들려주세요.',
  },
  {
    q: '원하는 느낌이 있는데, 그대로 만들 수 있나요?',
    a: '네 :) 참고 이미지, 컬러, 분위기만 알려주세요. 원하는 느낌을 반영하되 브랜드에 맞게 다듬어 차별화된 결과물로 제작해드립니다.',
  },
  {
    q: '로고 가격이 왜 이렇게 차이나나요?',
    a: '로고 가격은 결과물보다 과정의 차이에서 결정됩니다. 로고닷은 불필요한 비용은 줄이고, 브랜드 분석과 폰트 커스터마이징 등 꼭 필요한 과정에 집중합니다.',
  },
  {
    q: '디자이너와 직접 소통할 수 있나요?',
    a: '네! 브리핑부터 수정 과정까지 디자이너와 직접 소통하며 진행합니다.',
  },
  {
    q: '어떤 파일로 받을 수 있나요?',
    a: 'AI, PNG(투명 배경), PDF 파일을 제공합니다. 상표등록, 인쇄물 제작, SNS 활용 등 다양한 환경에서 바로 사용 가능합니다.',
  },
  {
    q: '수정은 얼마나 가능한가요?',
    a: '색상, 비율, 간격 등 세부 수정은 충분히 가능합니다. 콘셉트 변경이 필요한 경우에는 별도 협의 후 진행됩니다.',
  },
  {
    q: '로고 소유권은 누구에게 가나요?',
    a: '최종 납품 후 로고의 사용 권리는 100% 고객님께 귀속됩니다. 자유롭게 사용하실 수 있으며, 포트폴리오 공개를 원하지 않으실 경우 미리 말씀해주세요.',
  },
  {
    q: '의뢰 전에 상담이 가능한가요?',
    a: '네! 문의 남겨주시면 디자이너가 직접 답변드립니다. 부담 없이 편하게 연락 주세요. 1차 상담은 무료로 진행됩니다.',
  },
  {
    q: '제작 기간은 얼마나 걸리나요?',
    a: '일반적으로 5~10영업일 정도 소요됩니다. 프로젝트 규모와 수정 범위에 따라 일정은 달라질 수 있으며, 자세한 일정은 상담 시 안내드립니다.',
  },
];

export default function ProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Process steps animation — activates 1→4 sequentially when section enters viewport
  const stepsRef = useRef<HTMLDivElement>(null);
  const [activeSteps, setActiveSteps] = useState(0); // 0=none, 4=all active

  useEffect(() => {
    const el = stepsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          // 700ms per step → total ~2.1s for all 4 steps
        [0, 1, 2, 3].forEach((i) =>
            setTimeout(() => setActiveSteps(i + 1), i * 700),
          );
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main className="flex-1 pt-14 md:pt-16">

        {/* Guarantee section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="text-center mb-10 md:mb-14">
              <SectionLabel className="mb-3">로고닷 품질 보장 서비스</SectionLabel>
              <h1 className="text-[28px] md:text-[36px] font-bold text-foreground mt-2 tracking-[-0.03em] leading-[1.2]">
                브랜드의 시작부터, 믿을 수 있는 결과까지
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {guarantees.map((g, i) => (
                <div key={i} className="bg-card rounded-2xl p-6 md:p-8 flex flex-col gap-4">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-foreground leading-[1.3]">{g.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{g.description}</p>
                  <div className="mt-auto pt-4 flex justify-end">
                    <img
                      src={g.icon.src}
                      width={g.icon.width}
                      height={g.icon.height}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="max-w-[1200px] mx-auto px-5 md:px-10">
            <div className="text-center mb-12 md:mb-16">
              <SectionLabel className="mb-3">디자인 프로세스</SectionLabel>
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground mt-2 tracking-[-0.03em] leading-[1.2]">
                쉽고 빠르게 4단계로 시작하세요!
              </h2>
            </div>

            {/* Steps */}
            <div className="relative" ref={stepsRef}>
              {/* Connector line — desktop only */}
              <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0 overflow-hidden">
                {/* Brand-color fill progresses as steps activate: 0→33→67→100% */}
                <div
                  className="h-full bg-brand transition-[width] duration-700 ease-out"
                  style={{ width: `${Math.max(0, (activeSteps - 1) / 3 * 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
                {processSteps.map((step, i) => {
                  const isActive = i < activeSteps;
                  return (
                    <div key={i} className="flex flex-col items-start md:items-center text-left md:text-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-brand border-brand'
                            : 'bg-white border-border text-muted'
                        }`}
                      >
                        {isActive ? (
                          /* White checkmark */
                          <svg width="14" height="11" viewBox="0 0 14 11" fill="none" aria-hidden="true">
                            <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : step.num}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{step.title}</p>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-site-dark text-white text-sm font-medium px-7 py-3.5 rounded
                           hover:bg-brand hover:text-foreground
                           transition-[background-color,color] duration-200"
              >
                서비스 알아보기
                <span className="text-xs text-white group-hover:text-foreground transition-colors duration-200">↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <div className="text-center mb-10 md:mb-14">
              <SectionLabel className="mb-3">자주 묻는 질문</SectionLabel>
              <h2 className="text-[28px] md:text-[36px] font-bold text-foreground mt-2 tracking-[-0.03em] leading-[1.2]">
                브랜드 의뢰 전, 가장 많이 물어보시는 질문
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-border">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-foreground flex items-center gap-2">
                      <span className="text-brand text-xs">Q.</span>
                      {faq.q}
                    </span>
                    <span className="text-muted text-lg flex-shrink-0">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="pb-4 pl-5">
                      <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-brand-light">
          <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-snug">
              브랜드의 시작, 한 점의 로고에서.
              <br />
              로고닷은 그 한 점을 감각적으로 설계합니다.
            </h2>
            <p className="mt-4 text-sm text-muted">
              천천히 시작해도 괜찮아요.
              <br />
              중요한 건 결국 첫걸음 입니다.
            </p>
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
