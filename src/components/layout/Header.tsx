'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MobileMenu } from './MobileMenu';
import { LogodotLogo } from '@/components/ui/LogodotLogo';

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Tracks whether the hero animation has completed (home page only)
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    const handler = () => setHeroAnimated(true);
    window.addEventListener('hero-done', handler);
    return () => window.removeEventListener('hero-done', handler);
  }, []);

  // Reset when navigating away from home so animation replays on return
  useEffect(() => {
    if (pathname !== '/') setHeroAnimated(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const headerBg = isHome && !heroAnimated
    ? 'bg-brand'
    : 'bg-white border-b border-border';
  // On green header (pre-animation), make "dot" dark so it's visible against green bg
  const logoDotFill = isHome && !heroAnimated ? '#1E1E1E' : '#93D85A';
  const navColor = isHome && !heroAnimated
    ? 'text-foreground hover:opacity-70'
    : 'text-foreground hover:text-brand';
  const navActiveColor = isHome && !heroAnimated ? 'text-foreground opacity-60' : 'text-brand';
  const hamburgerColor = '#1E1E1E';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 ${headerBg}`}>
        {/* Responsive padding: 24px mobile → 240px desktop  */}
        <div className="section-wrap flex items-center justify-between h-[60px] md:h-[100px]">

          {/* Logo */}
          <Link href="/" aria-label="Logodot 홈">
            <LogodotLogo
              dotColor={logoDotFill}
              className="h-[28px] md:h-[36px] w-auto"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop nav — Figma: Google Sans Flex 600 18px, gap 80px */}
          <nav className="hidden md:flex items-center gap-[80px]">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[18px] font-semibold leading-[22.5px] tracking-[0] transition-opacity ${
                    isActive ? navActiveColor : navColor
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <rect y="0"  width="20" height="1.8" rx="0.9" fill={hamburgerColor} />
              <rect y="6"  width="20" height="1.8" rx="0.9" fill={hamburgerColor} />
              <rect y="12" width="20" height="1.8" rx="0.9" fill={hamburgerColor} />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
