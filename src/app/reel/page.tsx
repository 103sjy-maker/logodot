/**
 * /reel — Instagram Reels 영상 제작 전용 페이지
 *
 * - 헤더, 푸터, 네비게이션, CTA 버튼 없음
 * - 1080 × 1920 세로형 녹화 최적화
 * - 기존 홈페이지에 영향 없음 (기존 파일 수정 없음)
 *
 * 녹화 방법:
 *   1. DevTools → 디바이스 모드 → 1080 × 1920 (세로)
 *   2. /reel 접속 후 화면 녹화 소프트웨어로 녹화
 *   3. 약 7초 녹화 → Instagram Reels 업로드
 */

import type { Metadata } from 'next';
import { ReelAnimation } from '@/components/reel/ReelAnimation';

export const metadata: Metadata = {
  title: 'Logodot Reel',
  robots: { index: false, follow: false },
};

export default function ReelPage() {
  return <ReelAnimation />;
}
