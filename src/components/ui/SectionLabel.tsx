import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/* Figma: Pretendard 600 24px lh=28.8px ls=-0.48px color=#93D85A */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        'text-[24px] leading-[28.8px] tracking-[-0.48px] font-semibold text-brand',
        className,
      )}
    >
      {children}
    </p>
  );
}
