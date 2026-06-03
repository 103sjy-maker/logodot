/* Figma: banner — 1920×800 bg=#93D85A
   pad: top/bottom=211, left/right=532
   Text: Google Sans Flex 600 70px lh=90px ls=0 color=#1E1E1E
   Button: bg=#1E1E1E r=8 pad=18,40 text=Pretendard 500 20px color=#93D85A */

import Link from 'next/link';

export function CTASection() {
  return (
    <section className="bg-brand py-16 md:py-24">
      <div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-snug">
          브랜드는 한 점에서 시작됩니다.
          <br />
          로고닷과 시작하세요.
        </h2>
        <p className="mt-4 text-sm text-muted">
          시작하기 좋은 지금,
          <br />
          그 시작이 당신의 브랜드를 결정합니다.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center gap-2 bg-foreground text-brand text-sm font-medium px-7 py-3.5 rounded hover:opacity-80 transition-opacity"
        >
          지금 한 점 찍기 <span className="text-xs">↗</span>
        </Link>
      </div>
    </section>
  );
}
