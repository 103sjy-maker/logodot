import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  className?: string;
  aspectRatio?: string;
}

export function PlaceholderImage({ className, aspectRatio = 'aspect-[4/3]' }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        'bg-[#E8E8E8] flex items-center justify-center w-full',
        aspectRatio,
        className,
      )}
    >
      <div className="flex flex-col items-start">
        <span className="text-[#AAAAAA] font-black text-4xl leading-none">L</span>
        <span className="text-[#72C02C] font-black text-2xl leading-none">.</span>
      </div>
    </div>
  );
}
