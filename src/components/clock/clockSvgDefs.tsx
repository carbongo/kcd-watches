interface SvgDefProps {
  id: string;
}

interface RingClipPathProps extends SvgDefProps {
  path: string;
}

export function RingClipPath({ id, path }: RingClipPathProps) {
  return (
    <clipPath id={id}>
      <path d={path} fillRule="evenodd" clipRule="evenodd" />
    </clipPath>
  );
}

interface SoftBlurFilterProps extends SvgDefProps {
  stdDeviation: number;
}

export function SoftBlurFilter({ id, stdDeviation }: SoftBlurFilterProps) {
  return (
    <filter
      id={id}
      x="0"
      y="0"
      width="1200"
      height="1200"
      filterUnits="userSpaceOnUse"
    >
      <feGaussianBlur stdDeviation={stdDeviation} />
    </filter>
  );
}

interface GlowFilterProps extends SvgDefProps {
  stdDeviation: number;
}

export function GlowFilter({ id, stdDeviation }: GlowFilterProps) {
  return (
    <filter id={id} x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation={stdDeviation} result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}
