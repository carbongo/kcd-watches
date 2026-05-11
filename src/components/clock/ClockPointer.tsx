import { useId } from "react";

import {
  CLOCK_CENTER,
  PLASTER_RING_INNER_RADIUS,
  PLASTER_RING_OUTER_RADIUS,
} from "./lib/clockGeometry";
import { ClockSvg } from "./lib/clockSvgDefs";

const POINTER_CENTER_X = CLOCK_CENTER;
const POINTER_OUTER_Y = CLOCK_CENTER - PLASTER_RING_OUTER_RADIUS;
const POINTER_INNER_Y = CLOCK_CENTER - PLASTER_RING_INNER_RADIUS;
const POINTER_HALF_WIDTH = 14;
const POINTER_BASE_INSET = -2;
const POINTER_HEIGHT = 36;
const OUTER_POINTER_BASE_Y = POINTER_OUTER_Y + POINTER_BASE_INSET;
const OUTER_POINTER_TIP_Y = OUTER_POINTER_BASE_Y + POINTER_HEIGHT;
const INNER_POINTER_BASE_Y = POINTER_INNER_Y - POINTER_BASE_INSET;
const INNER_POINTER_TIP_Y = INNER_POINTER_BASE_Y - POINTER_HEIGHT;

const outerPointerPath = [
  `M${POINTER_CENTER_X - POINTER_HALF_WIDTH} ${OUTER_POINTER_BASE_Y}`,
  `H${POINTER_CENTER_X + POINTER_HALF_WIDTH}`,
  `L${POINTER_CENTER_X} ${OUTER_POINTER_TIP_Y}`,
  "Z",
].join(" ");

const innerPointerPath = [
  `M${POINTER_CENTER_X - POINTER_HALF_WIDTH} ${INNER_POINTER_BASE_Y}`,
  `H${POINTER_CENTER_X + POINTER_HALF_WIDTH}`,
  `L${POINTER_CENTER_X} ${INNER_POINTER_TIP_Y}`,
  "Z",
].join(" ");

export function ClockPointer() {
  const svgId = useId().replace(/:/g, "");
  const pointerFillId = `${svgId}-pointer-fill`;
  const pointerShineId = `${svgId}-pointer-shine`;
  const pointerShadowId = `${svgId}-pointer-shadow`;

  return (
    <ClockSvg id="clock-pointer-svg" className="z-30">
      <defs>
        <linearGradient
          id={pointerFillId}
          x1={POINTER_CENTER_X}
          y1={POINTER_OUTER_Y}
          x2={POINTER_CENTER_X}
          y2={POINTER_INNER_Y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff1a2" />
          <stop offset="0.25" stopColor="#d3a226" />
          <stop offset="0.56" stopColor="#f5d25a" />
          <stop offset="1" stopColor="#8c650e" />
        </linearGradient>
        <linearGradient
          id={pointerShineId}
          x1={POINTER_CENTER_X - POINTER_HALF_WIDTH}
          y1={POINTER_OUTER_Y}
          x2={POINTER_CENTER_X + POINTER_HALF_WIDTH}
          y2={POINTER_INNER_Y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fff8bd" stopOpacity="0.86" />
          <stop offset="0.25" stopColor="#fff0a0" stopOpacity="0.55" />
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
            stdDeviation="3"
            floodColor="#000000"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      <g filter={`url(#${pointerShadowId})`}>
        <path
          d={`${outerPointerPath} ${innerPointerPath}`}
          fill={`url(#${pointerFillId})`}
        />
        <path
          d={`${outerPointerPath} ${innerPointerPath}`}
          fill="none"
          stroke="#5b4308"
          strokeLinejoin="round"
          strokeWidth="2"
          strokeOpacity={0.5}
        />
        <path
          d={`M${POINTER_CENTER_X - 3} ${OUTER_POINTER_BASE_Y + 8}L${POINTER_CENTER_X + 6} ${OUTER_POINTER_BASE_Y + 8}L${POINTER_CENTER_X + 1} ${OUTER_POINTER_TIP_Y - 5}Z`}
          fill={`url(#${pointerShineId})`}
          opacity="0.9"
        />
        <path
          d={`M${POINTER_CENTER_X - 6} ${INNER_POINTER_BASE_Y - 8}L${POINTER_CENTER_X + 3} ${INNER_POINTER_BASE_Y - 8}L${POINTER_CENTER_X - 1} ${INNER_POINTER_TIP_Y + 5}Z`}
          fill={`url(#${pointerShineId})`}
          opacity="0.56"
        />
      </g>
    </ClockSvg>
  );
}
