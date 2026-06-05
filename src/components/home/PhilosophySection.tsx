/* 디자인 철학 section */

import { SectionLabel } from '@/components/ui/SectionLabel';

const cards = [
  {
    greenLabel: '정확한 이해, 명확한 결과',
    title: '잘 묻고 잘 듣는,\n투명한 소통',
    body: '로고닷은 클라이언트의 이야기를 듣는 것에서 시작합니다. 대화를 통해 방향을 정리하며, 과정마다 투명하게 소통합니다.',
    icon: { src: '/icon-communication.svg', width: 86, height: 70 },
  },
  {
    greenLabel: '결과로 말하는 디자인',
    title: '성과로 증명하는\n전략적 디자인',
    body: '브랜드 성장을 위한 전략을 디자인으로 제안하고, 방향과 시장 반응을 함께 고민해 결과로 증명합니다.',
    icon: { src: '/icon-strategy.svg', width: 70, height: 60 },
  },
  {
    greenLabel: '형태 이전에 본질을 고민합니다',
    title: '형태 너머의 본질을\n담습니다',
    body: '트렌드보다 브랜드의 정체성을 깊이 이해하는 데 집중하며, 그 핵심을 시각적으로 명확하게 표현합니다.',
    icon: { src: '/icon-essence.svg', width: 76, height: 60 },
  },
  {
    greenLabel: '안심할 수 있는 독창성',
    title: '저작권 걱정 없는\n100% 창작',
    body: '로고닷의 모든 로고는 100% 자체 제작입니다. 저작권 걱정 없이 안전하게 사용할 수 있으며, 이후 활용 가이드도 제공됩니다.',
    icon: { src: '/icon-original.svg', width: 62, height: 60 },
  },
];

export function PhilosophySection() {
  return (
    <section className="bg-site-dark py-[56px] md:py-[100px]">
      <div className="section-wrap">

        {/* Section header */}
        <div className="flex flex-col gap-[10px] md:gap-[16px] items-center text-center mb-[36px] md:mb-[60px]">
          <SectionLabel className="text-[13px] leading-[18px] md:text-[24px] md:leading-[28.8px] md:tracking-[-0.48px] font-semibold text-brand">
            로고닷의 디자인 철학
          </SectionLabel>
          <h2 className="text-[24px] leading-[32px] tracking-[-0.48px] md:text-[48px] md:leading-[57.6px] md:tracking-[-0.96px] font-bold text-white">
            로고닷은 이렇게 일합니다
          </h2>
        </div>

        {/* Cards — 1 col mobile, 2 col desktop */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-[16px] md:gap-[24px]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-dark-mobile rounded-[16px] md:rounded-[20px] p-[24px] md:p-[40px]"
            >
              {/*
               * Mobile layout:
               *   Row 1 — green label (left) + icon (right, 40px)
               *   Row 2 — h3 title
               *   Row 3 — body text
               *
               * Desktop layout:
               *   Row 1 — [label + h3] beside icon (right)
               *   Row 2 — body text
               */}

              {/* Mobile top row: label + icon side by side */}
              <div className="flex items-start justify-between gap-[12px] mb-[14px] md:hidden">
                <p className="text-[12px] leading-[16px] tracking-[-0.24px] font-semibold text-brand pt-[2px]">
                  {card.greenLabel}
                </p>
                <img
                  src={card.icon.src}
                  width={card.icon.width}
                  height={card.icon.height}
                  alt=""
                  aria-hidden="true"
                  className="w-[40px] h-auto flex-shrink-0"
                  draggable={false}
                />
              </div>

              {/* Mobile title */}
              <h3 className="text-[20px] leading-[28px] tracking-[-0.4px] font-bold text-white whitespace-pre-line mb-[12px] md:hidden">
                {card.title}
              </h3>

              {/* Mobile body */}
              <p className="text-[14px] leading-[22px] tracking-[-0.28px] font-normal text-white/70 md:hidden">
                {card.body}
              </p>

              {/* Desktop layout (hidden on mobile) */}
              <div className="hidden md:flex md:flex-col md:gap-[24px]">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-[12px]">
                    <p className="text-[18px] leading-[21.6px] tracking-[-0.36px] font-semibold text-brand">
                      {card.greenLabel}
                    </p>
                    <h3 className="text-[28px] leading-[33.6px] tracking-[-0.56px] font-bold text-white whitespace-pre-line">
                      {card.title}
                    </h3>
                  </div>
                  <img
                    src={card.icon.src}
                    width={card.icon.width}
                    height={card.icon.height}
                    alt=""
                    aria-hidden="true"
                    className="flex-shrink-0 mt-1"
                    style={{ width: card.icon.width, height: card.icon.height }}
                    draggable={false}
                  />
                </div>
                <p className="text-[16px] leading-[24px] tracking-[-0.32px] font-medium text-white/80">
                  {card.body}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
