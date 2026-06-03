import Link from 'next/link';
import { LogodotLogo } from '@/components/ui/LogodotLogo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border overflow-hidden">
      {/* Figma: Foot component — 3-column info area + large wordmark, same container */}
      <div className="section-wrap">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pt-[40px] pb-[36px] md:pt-[60px] md:pb-[48px]">

          {/* Left: tagline + instagram */}
          <div className="flex flex-col gap-4 md:gap-5">
            <div>
              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[30px] tracking-[0] text-foreground">
                One dot, infinite identity.
              </p>
              <p className="text-[16px] leading-[26px] md:text-[20px] md:leading-[30px] tracking-[0] text-foreground">
                Your brand starts with one dot.
              </p>
            </div>
            <Link
              href="https://www.instagram.com/logodot.kr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-[40px] h-[40px] rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
          </div>

          {/* Middle: Office */}
          <div className="flex flex-col gap-[12px] md:gap-[15px]">
            <p className="font-logo text-[15px] md:text-[18px] leading-[22.5px] tracking-[0] text-foreground font-bold">
              Office
            </p>
            <p className="text-[14px] md:text-[18px] leading-[21px] md:leading-[21.6px] tracking-[0] text-muted-mid">
              대전광역시 유성구 유성대로 783번길 33, 4F
            </p>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col gap-[12px] md:gap-[16px]">
            <p className="font-logo text-[15px] md:text-[18px] leading-[22.5px] tracking-[0] text-foreground font-bold">
              Contact
            </p>
            <div className="flex flex-col gap-[4px]">
              <a
                href="mailto:design@logodot.kr"
                className="text-[14px] md:text-[18px] leading-[24px] md:leading-[30px] tracking-[0] text-muted-mid hover:text-brand transition-colors"
              >
                design@logodot.kr
              </a>
              <a
                href="tel:042-823-3123"
                className="text-[14px] md:text-[18px] leading-[24px] md:leading-[30px] tracking-[0] text-muted-mid hover:text-brand transition-colors"
              >
                042-823-3123
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*
       * Large wordmark — full bleed, same overflow-hidden clip as before.
       * Container AR = viewBox_w / (viewBox_h × 0.55) = 764 / 103.4 ≈ 7.39
       */}
      <div
        className="section-wrap overflow-hidden select-none pb-0"
        style={{ aspectRatio: '7.39' }}
        aria-hidden="true"
      >
        <LogodotLogo className="w-full h-auto block" />
      </div>
    </footer>
  );
}
