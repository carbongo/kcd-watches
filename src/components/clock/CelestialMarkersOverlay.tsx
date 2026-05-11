import {
  PLASTER_RING_CLIP_PATH,
  minutesToDegrees,
  polarToCartesian,
} from "./clockGeometry";
import { ClockSvg, GlowFilter, RingClipPath } from "./clockSvgDefs";

const MOON_HOUR = 0;
const SUN_HOUR = 12;

const moonPosition = polarToCartesian(minutesToDegrees(MOON_HOUR * 60));
const sunPosition = polarToCartesian(minutesToDegrees(SUN_HOUR * 60));
const sunRays = getPaintedSunRays(sunPosition.x, sunPosition.y, 1, 160, 24);
const sunStretchTransform = `translate(${sunPosition.x} ${sunPosition.y}) scale(1.32 0.88) translate(${-sunPosition.x} ${-sunPosition.y})`;

export function CelestialMarkersOverlay() {
  return (
    <ClockSvg>
      <defs>
        <radialGradient id="celestial-sun-fill" cx="46%" cy="38%" r="62%">
          <stop offset="0" stopColor="#ffffbb" />
          <stop offset="1" stopColor="#ffffbb" />
        </radialGradient>
        <radialGradient id="celestial-moon-fill" cx="42%" cy="34%" r="68%">
          <stop offset="0" stopColor="#aaaaaa" />
          <stop offset="0.75" stopColor="#cccccc" />
          <stop offset="1" stopColor="#ffffff" />
        </radialGradient>
        <RingClipPath id="celestial-arc-clip" path={PLASTER_RING_CLIP_PATH} />
        <GlowFilter id="celestial-sun-glow" stdDeviation={8} />
      </defs>

      <g clipPath="url(#celestial-arc-clip)">
        <g filter="url(#celestial-sun-glow)">
          <g transform={sunStretchTransform}>
            <circle
              cx={sunPosition.x}
              cy={sunPosition.y}
              r="92"
              fill="#eebb00"
              opacity="0.25"
            />
            {sunRays.map((ray) => (
              <path
                key={ray}
                d={ray}
                fill="url(#celestial-sun-fill)"
                opacity="0.65"
              />
            ))}
          </g>
          <circle
            cx={sunPosition.x}
            cy={sunPosition.y}
            r="37"
            fill="url(#celestial-sun-fill)"
          />
        </g>

        <g>
          <circle
            cx={moonPosition.x}
            cy={moonPosition.y}
            r="52"
            fill="url(#celestial-moon-fill)"
          />
          <circle
            cx={moonPosition.x - 18}
            cy={moonPosition.y - 12}
            r="7"
            fill="#8d8776"
            opacity="0.28"
          />
          <circle
            cx={moonPosition.x + 19}
            cy={moonPosition.y + 11}
            r="10"
            fill="#8d8776"
            opacity="0.2"
          />
          <circle
            cx={moonPosition.x + 11}
            cy={moonPosition.y - 21}
            r="5"
            fill="#8d8776"
            opacity="0.18"
          />
        </g>
      </g>
    </ClockSvg>
  );
}

function getPaintedSunRays(
  centerX: number,
  centerY: number,
  innerRadius: number,
  endRadius: number,
  rayCount: number,
) {
  return Array.from({ length: rayCount }, (_, index) => {
    const angle = (index / rayCount) * Math.PI * 2 - Math.PI / 2;
    const width = index % 2 === 0 ? 0.01 : 0.005;
    const wave = index % 2 === 0 ? 24 : 24;
    const length = endRadius - (index % 2) * 24;
    const innerLeft = pointOnCircle(
      centerX,
      centerY,
      innerRadius,
      angle - width,
    );
    const innerRight = pointOnCircle(
      centerX,
      centerY,
      innerRadius,
      angle + width,
    );
    const tip = pointOnCircle(centerX, centerY, length, angle + width * 0.28);
    const leftControl = pointOnCircle(
      centerX,
      centerY,
      (innerRadius + length) / 2,
      angle - width * 0.9,
    );
    const rightControl = pointOnCircle(
      centerX,
      centerY,
      (innerRadius + length) / 2,
      angle + width * 0.9,
    );
    const left = offsetAlongTangent(leftControl, angle, wave);
    const right = offsetAlongTangent(rightControl, angle, -wave);

    return [
      `M ${innerLeft.x.toFixed(3)} ${innerLeft.y.toFixed(3)}`,
      `Q ${left.x.toFixed(3)} ${left.y.toFixed(3)} ${tip.x.toFixed(3)} ${tip.y.toFixed(3)}`,
      `Q ${right.x.toFixed(3)} ${right.y.toFixed(3)} ${innerRight.x.toFixed(3)} ${innerRight.y.toFixed(3)}`,
      "Z",
    ].join(" ");
  });
}

function offsetAlongTangent(
  point: { x: number; y: number },
  angle: number,
  amount: number,
) {
  return {
    x: point.x + Math.cos(angle + Math.PI / 2) * amount,
    y: point.y + Math.sin(angle + Math.PI / 2) * amount,
  };
}

function pointOnCircle(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
) {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  };
}
