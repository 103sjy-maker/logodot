'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { LogodotLogo } from '@/components/ui/LogodotLogo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/process', label: 'Process' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-site-dark flex flex-col">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" onClick={onClose} aria-label="Logodot 홈">
          <LogodotLogo
            textColor="#FFFFFF"
            dotColor="#93D85A"
            className="h-[28px] w-auto"
            aria-hidden="true"
          />
        </Link>
        <button
          onClick={onClose}
          aria-label="메뉴 닫기"
          className="w-10 h-10 flex items-center justify-center text-white text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col items-center justify-center flex-1 gap-2">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`font-logo text-[40px] py-3 tracking-[-0.03em] transition-colors ${
                isActive ? 'text-brand' : 'text-white'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
