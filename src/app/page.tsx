import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { StatsSection } from '@/components/home/StatsSection';
import { PortfolioPreviewSection } from '@/components/home/PortfolioPreviewSection';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PhilosophySection />
        <StatsSection />
        <PortfolioPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
