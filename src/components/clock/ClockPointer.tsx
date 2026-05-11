import { useId } from "react";

import { ClockSvg } from "./lib/clockSvgDefs";

export function ClockPointer() {
  const svgId = useId().replace(/:/g, "");
  const pointerFillId = `${svgId}-pointer-fill`;
  const pointerShineId = `${svgId}-pointer-shine`;
  const pointerShadowId = `${svgId}-pointer-shadow`;

  return (
    <ClockSvg id="clock-pointer-svg" className="z-30">
      <defs>
        <linearGradient id={pointerFillId} x1="590" y1="93" x2="610" y2="255">
          <stop offset="0" stopColor="#fff1a2" />
          <stop offset="0.25" stopColor="#d3a226" />
          <stop offset="0.56" stopColor="#f5d25a" />
          <stop offset="1" stopColor="#8c650e" />
        </linearGradient>
        <linearGradient id={pointerShineId} x1="595" y1="93" x2="610" y2="245">
          <stop offset="0" stopColor="#fff8bd" stopOpacity="0.86" />
          <stop offset="0.48" stopColor="#fff0a0" stopOpacity="0.34" />
          <stop offset="1" stopColor="#fff0a0" stopOpacity="0" />
        </linearGradient>
        <filter
          id={pointerShadowId}
          x="560"
          y="78"
          width="80"
          height="200"
          filterUnits="userSpaceOnUse"
        >
          <feDropShadow
            dx="0"
            dy="3"
            stdDeviation="2.6"
            floodColor="#000000"
            floodOpacity="0.4"
          />
        </filter>
      </defs>

      <g filter={`url(#${pointerShadowId})`}>
        <path
          d="M590 93H610V235L600 255L590 235ZM596 93V232L600 243L604 232V93Z"
          fill={`url(#${pointerFillId})`}
          fillRule="evenodd"
          clipRule="evenodd"
        />
        <path
          d="M590 93H610V235L600 255L590 235ZM596 93V232L600 243L604 232V93Z"
          fill="none"
          stroke="#5b4308"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <path
          d="M604 94h4v140l-7 15 3-17Z"
          fill={`url(#${pointerShineId})`}
          opacity="0.9"
        />
        <path
          d="M592.5 94h2.5v138l5 11"
          fill="none"
          stroke="#ffe784"
          strokeLinecap="round"
          strokeWidth="2"
          opacity="0.58"
        />
      </g>
    </ClockSvg>
  );
}
