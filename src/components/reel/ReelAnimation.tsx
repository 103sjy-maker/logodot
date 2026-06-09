'use client';

/**
 * ReelAnimation — /reel 페이지 전용 Instagram Reels 영상 제작 컴포넌트
 *
 * 애니메이션 시퀀스 (총 ~7초):
 *   t=0        : 라임 (#93D85A) 배경 + 중앙 흰 점 (극소)
 *   t=400ms    : 흰 점 확장 시작 (1.2s cubic-bezier)
 *   t=1600ms   : 라임 오버레이 페이드아웃 시작 (0.5s)
 *   t=2100ms   : 오버레이 DOM 제거 → 흰 배경 노출
 *   t=2400ms   : Logodot 워드마크 페이드업
 *   t=3200ms   : "One dot." 페이드업
 *   t=4000ms   : "Infinite identity." 페이드업
 *   t=5500ms~  : 홀드 → 자연스러운 종료
 *
 * 기존 HeroSection, globals.css, 레이아웃 등 기존 파일 일체 수정 없음.
 */

import { useState, useEffect } from 'react';
import { LogodotLogo } from '@/components/ui/LogodotLogo';

export function ReelAnimation() {
  const [expanding, setExpanding]       = useState(false);
  const [overlayFading, setOverlayFading] = useState(false);
  const [overlayGone, setOverlayGone]   = useState(false);
  const [showLogo, setShowLogo]         = useState(false);
  const [showLine1, setShowLine1]       = useState(false);
  const [showLine2, setShowLine2]       = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setExpanding(true),      400),
      setTimeout(() => setOverlayFading(true), 1600),
      setTimeout(() => setOverlayGone(true),   2100),
      setTimeout(() => setShowLogo(true),      2400),
      setTimeout(() => setShowLine1(true),     3200),
      setTimeout(() => setShowLine2(true),     4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    /* 화면 전체를 덮는 컨테이너 — 흰 배경 기반 */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'none',           // 녹화 시 커서 숨김
      }}
    >

      {/* ── 라임 오버레이 + 팽창하는 흰 원 ── */}
      {!overlayGone && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#93D85A',
            opacity: overlayFading ? 0 : 1,
            transition: overlayFading ? 'opacity 0.5s ease-out' : 'none',
            pointerEvents: 'none',
            zIndex: 10,
            overflow: 'hidden',
          }}
        >
          {/* 흰 원 — 극소(0.003)에서 전체(1)로 확장 */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '300vmax',
              height: '300vmax',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              transform: `translate(-50%, -50%) scale(${expanding ? 1 : 0.003})`,
              transition: expanding
                ? 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
                : 'none',
            }}
          />
        </div>
      )}

      {/* ── 브랜드 콘텐츠 ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6vw',
          width: '100%',
          padding: '0 12vw',
        }}
      >

        {/* Logodot 워드마크 SVG */}
        <LogodotLogo
          style={{
            width: '54vw',
            maxWidth: '580px',
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? 'translateY(0)' : 'translateY(3vw)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
          aria-hidden={false}
        />

        {/* 카피라이트 */}
        <div style={{ textAlign: 'center' }}>

          {/* "One dot." */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display), "Google Sans", sans-serif',
              fontSize: 'clamp(28px, 7vw, 76px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: '#1E1E1E',
              opacity: showLine1 ? 1 : 0,
              transform: showLine1 ? 'translateY(0)' : 'translateY(2.5vw)',
              transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
            }}
          >
            One dot<span style={{ color: '#93D85A' }}>.</span>
          </p>

          {/* "Infinite identity." */}
          <p
            style={{
              margin: '0.4vw 0 0',
              fontFamily: 'var(--font-display), "Google Sans", sans-serif',
              fontSize: 'clamp(28px, 7vw, 76px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.3,
              color: '#1E1E1E',
              opacity: showLine2 ? 1 : 0,
              transform: showLine2 ? 'translateY(0)' : 'translateY(2.5vw)',
              transition: 'opacity 0.65s ease-out, transform 0.65s ease-out',
            }}
          >
            Infinite identity<span style={{ color: '#93D85A' }}>.</span>
          </p>

        </div>
      </div>
    </div>
  );
}
