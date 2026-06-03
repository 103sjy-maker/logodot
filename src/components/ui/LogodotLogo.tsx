interface LogodotLogoProps {
  /** Fill color for "Logo" (L, o, g, o) — defaults to #1E1E1E */
  textColor?: string;
  /** Fill color for "dot" (d, o, t) — defaults to #93D85A */
  dotColor?: string;
  className?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * Logodot wordmark SVG — tight-cropped from public/logodot.svg (viewBox 0 0 1500 1000).
 * Crop region "368 410 764 188" captures exactly the letter bounds (including g descender).
 */
export function LogodotLogo({
  textColor = '#1E1E1E',
  dotColor = '#93D85A',
  className,
  style,
  'aria-hidden': ariaHidden,
}: LogodotLogoProps) {
  return (
    <svg
      viewBox="368 410 764 188"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden={ariaHidden}
    >
      {/* L */}
      <path fill={textColor} d="M373.5,555v-140h28.6v112.4h65v27.6h-93.6Z" />
      {/* o */}
      <path fill={textColor} d="M476.5,504c0-29,24-53.6,52.2-53.6s52.2,24.6,52.2,53.6-24,53.6-52.2,53.6-52.2-24.6-52.2-53.6ZM553.7,504c0-16.6-10.8-28.4-25-28.4s-25,11.8-25,28.4,10.8,28.4,25,28.4,25-11.8,25-28.4Z" />
      {/* g */}
      <path fill={textColor} d="M597.9,560.2h28c2,4,8.2,8.6,18.8,8.6,13.6,0,22.2-7.6,22.2-21v-8.2h0c-2.2,3.4-12.6,11.6-26.6,11.6-25,0-46.6-22.4-46.6-50.4s21.6-50.4,46.4-50.4c15.8,0,26.07,9.2,28.87,12.6h0v-10h25.13v94.4c0,28.2-18.2,45.6-48.8,45.6-34.8,0-45.6-24.8-47.4-32.8ZM666.9,500.8c0-15.2-10.6-26.2-23-26.2s-23,11-23,26.2,10.4,26.2,23,26.2,23-11.2,23-26.2Z" />
      {/* o */}
      <path fill={textColor} d="M711.3,504c0-29,24-53.6,52.2-53.6s52.2,24.6,52.2,53.6-24,53.6-52.2,53.6-52.2-24.6-52.2-53.6ZM788.5,504c0-16.6-10.8-28.4-25-28.4s-25,11.8-25,28.4,10.8,28.4,25,28.4,25-11.8,25-28.4Z" />
      {/* d */}
      <path fill={dotColor} d="M830.5,504c0-30.8,22.2-53.6,47.2-53.6,14.6,0,25.27,8.4,27.27,11.4h0v-46.8h27.53v140h-25.13v-10h0c-2.8,3.4-13.67,12.6-29.67,12.6-25,0-47.2-22.8-47.2-53.6ZM905.3,504c0-16.8-11.2-28.4-23.8-28.4s-23.8,11.6-23.8,28.4,11.2,28.4,23.8,28.4,23.8-11.6,23.8-28.4Z" />
      {/* o */}
      <path fill={dotColor} d="M950.7,504c0-29,24-53.6,52.2-53.6s52.2,24.6,52.2,53.6-24,53.6-52.2,53.6-52.2-24.6-52.2-53.6ZM1027.9,504c0-16.6-10.8-28.4-25-28.4s-25,11.8-25,28.4,10.8,28.4,25,28.4,25-11.8,25-28.4Z" />
      {/* t */}
      <path fill={dotColor} d="M1078.3,520.4v-43.2h-15.8v-22.2h22.67c7.8,0-3.48,15.25-3.48,7.65v-35.25h23.8v25.6h21v24.2h-21v40.4c0,9.8,5.4,14.4,14,14.4,2.6,0,5-.4,7-1.4v24.8c-2.8,1-7.6,2.2-13.8,2.2-20,0-34.4-13.8-34.4-37.2Z" />
    </svg>
  );
}
