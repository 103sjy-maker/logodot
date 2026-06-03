import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'dark' | 'green' | 'outline-dark' | 'outline-green';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  dark: 'bg-site-dark text-white hover:bg-[#333333]',
  green: 'bg-brand text-white hover:bg-[#5fa020]',
  'outline-dark': 'border border-site-dark text-site-dark hover:bg-site-dark hover:text-white',
  'outline-green': 'border border-brand text-brand hover:bg-brand hover:text-white',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function Button({
  children,
  variant = 'dark',
  size = 'md',
  className,
  href,
  type = 'button',
  onClick,
  disabled,
  fullWidth,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors duration-200 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className,
  );

  if (href) {
    return (
      <Link href={href} className={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseStyles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
