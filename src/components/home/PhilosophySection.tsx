/* Figma: 디자인 철학 section — bg=#141414, 1920×1105 */
/* Card: 576×304, r=20, bg=slightly lighter (visual: #1E1E1E on #141414) */

import { SectionLabel } from '@/components/ui/SectionLabel';

const cards = [
  {
    greenLabel: '정확한 이해, 명확한 결과',
    title: '잘 묻고 잘 듣는,\n투명한 소통',
    body: '로고닷은 클라이언트의 이야기를 듣는 것에서 시작합니다. 대화를 통해 방향을 정리하며, 과정마다 투명하게 소통합니다. 그래서 결과는 언제나 빠르고, 기대 이상으로 완성됩니다.',
    icon: { src: '/icon-communication.svg', width: 86, height: 70 },
  },
  {
    greenLabel: '결과로 말하는 디자인',
    title: '성과로 증명하는\n전략적 디자인',
    body: '로고닷은 단순히 보이는 형태만을 만들지 않습니다. 브랜드 성장을 위한 전략을 디자인으로 제안하고, 방향과 시장 반응을 함께 고민해 결과로 증명합니다.',
    icon: { src: '/icon-strategy.svg', width: 70, height: 60 },
  },
  {
    greenLabel: '형태 이전에 본질을 고민합니다',
    title: '형태 너머의 본질을\n담습니다',
    body: '모든 프로젝트는 대표 디자이너가 직접 설계합니다. 트렌드보다 브랜드의 정체성을 깊이 이해하는 데 집중하며, 그 핵심을 시각적으로 명확하게 표현합니다.',
    icon: { src: '/icon-essence.svg', width: 76, height: 60 },
  },
  {
    greenLabel: '안심할 수 있는 독창성',
    title: '저작권 걱정 없는\n100% 창작',
    body: '로고닷의 모든 로고는 100% 자체 제작입니다. 저작권 걱정 없이 안전하게 사용할 수 있으며, 이후 활용을 위한 가이드까지 함께 제공됩니다.',
    icon: { src: '/icon-original.svg', width: 62, height: 60 },
  },
];

export function PhilosophySection() {
  return (
    /* Figma: bg=#141414, section h=1105px */
    <section className="bg-site-dark py-[100px]">
      <div className="max-w-[1440px] mx-auto px-[240px]">

        {/* Figma title frame: VERTICAL gap=16 */}
        <div className="flex flex-col gap-[16px] items-center text-center mb-[60px]">
          {/* Figma: Pretendard 600 24px lh=28.8px ls=-0.48px color=#93D85A */}
          <SectionLabel className="text-[24px] leading-[28.8px] tracking-[-0.48px] font-semibold text-brand">
            로고닷의 디자인 철학
          </SectionLabel>
          {/* Figma: Pretendard 700 48px lh=57.6px ls=-0.96px color=#FFFFFF */}
          <h2 className="text-[48px] leading-[57.6px] tracking-[-0.96px] font-bold text-white">
            로고닷은 이렇게 일합니다
          </h2>
        </div>

        {/* Figma: 2×2 grid of banners (576×304 each, r=20) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-dark-mobile rounded-[20px] p-[40px] flex flex-col gap-[24px]"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-[12px]">
                  {/* Figma: Pretendard 600 18px lh=21.6px ls=-0.36px color=#93D85A */}
                  <p className="text-[18px] leading-[21.6px] tracking-[-0.36px] font-semibold text-brand">
                    {card.greenLabel}
                  </p>
                  {/* Figma: Pretendard 700 28px lh=33.6px ls=-0.56px color=#FFFFFF */}
                  <h3 className="text-[28px] leading-[33.6px] tracking-[-0.56px] font-bold text-white whitespace-pre-line">
                    {card.title}
                  </h3>
                </div>
                {/* Figma icon — SVG from /public, natural dimensions, aspect ratio preserved */}
                <img
                  src={card.icon.src}
                  width={card.icon.width}
                  height={card.icon.height}
                  alt=""
                  aria-hidden="true"
                  className="flex-shrink-0 mt-1"
                  draggable={false}
                />
              </div>
              {/* Figma: Pretendard 500 16px lh=24px (150%) ls=-0.32px color=#FFFFFF */}
              <p className="text-[16px] leading-[24px] tracking-[-0.32px] font-medium text-white/80">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
