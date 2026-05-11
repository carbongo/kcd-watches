import type { SVGProps } from "react";

import { CLOCK_VIEW_BOX } from "./clockGeometry";

const clockOverlayClassName =
  "pointer-events-none absolute inset-0 h-full w-full";

export function ClockSvg({
  className = "",
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={`${clockOverlayClassName} ${className}`.trim()}
      viewBox={CLOCK_VIEW_BOX}
      aria-hidden="true"
      {...props}
    />
  );
}

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
