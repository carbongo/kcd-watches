import type { SunWindow } from "../../domain/sun";
import { normalizeMinutes } from "../../domain/time";
import {
  CLOCK_CENTER,
  CLOCK_VIEW_BOX,
  SUN_ARC_RADIUS,
  minutesToDegrees,
  polarToCartesian,
} from "./clockGeometry";

interface SunArcOverlayProps {
  sunWindow: SunWindow;
}

const arcClassName =
  "pointer-events-none absolute inset-0 h-full w-full blur-xl";
const nightClassName =
  "fill-none stroke-blue-950/100 stroke-[150] [stroke-linecap:round]";
const glowClassName =
  "fill-none stroke-amber-300/50 stroke-[150] [stroke-linecap:round]";
const coreClassName =
  "fill-none stroke-amber-100/100 stroke-[42] [stroke-linecap:round]";
const markerClassName = "pointer-events-none absolute inset-0 h-full w-full";
const markerCircleClassName = "fill-none stroke-amber-200/95 stroke-[2]";
const starClassName = "pointer-events-none absolute inset-0 h-full w-full";

const MIN_CORE_ARC_MINUTES = 60;
const MAX_CORE_ARC_MINUTES = 240;
const CORE_DAYLIGHT_RATIO = 0.4;
const SUN_EVENT_MARKER_RADIUS = 36;
const NIGHT_ARC_WIDTH = 150;
const NIGHT_STAR_INNER_RADIUS = SUN_ARC_RADIUS - NIGHT_ARC_WIDTH / 2 + 18;
const NIGHT_STAR_OUTER_RADIUS = SUN_ARC_RADIUS + NIGHT_ARC_WIDTH / 2 - 18;
const NIGHT_STAR_CLIP_INNER_RADIUS = SUN_ARC_RADIUS - NIGHT_ARC_WIDTH / 2;
const NIGHT_STAR_CLIP_OUTER_RADIUS = SUN_ARC_RADIUS + NIGHT_ARC_WIDTH / 2;

export function SunArcOverlay({ sunWindow }: SunArcOverlayProps) {
  if (sunWindow.status === "normal") {
    const corePath = getZenithArcPath(
      sunWindow.sunriseMinutes,
      sunWindow.sunsetMinutes,
    );
    const nightPath = getArcPath(
      sunWindow.sunsetMinutes,
      sunWindow.sunriseMinutes,
    );
    const markerHours = getRoundedSunEventHours(
      sunWindow.sunriseMinutes,
      sunWindow.sunsetMinutes,
    );

    return (
      <>
        <svg
          className={arcClassName}
          viewBox={CLOCK_VIEW_BOX}
          aria-hidden="true"
        >
          <path className={nightClassName} d={nightPath} />
          <path className={glowClassName} d={corePath} />
          <path className={coreClassName} d={corePath} />
        </svg>
        <NightStarsOverlay
          clipPath={getNightSegmentClipPath(
            sunWindow.sunsetMinutes,
            sunWindow.sunriseMinutes,
          )}
          stars={getNightStars(
            sunWindow.sunsetMinutes,
            normalizeMinutes(
              sunWindow.sunriseMinutes - sunWindow.sunsetMinutes,
            ),
          )}
        />
        <SunEventHourMarkers hours={markerHours} />
      </>
    );
  }

  if (sunWindow.status === "polar-night") {
    return (
      <>
        <svg
          className={arcClassName}
          viewBox={CLOCK_VIEW_BOX}
          aria-hidden="true"
        >
          <circle
            className={nightClassName}
            cx={CLOCK_CENTER}
            cy={CLOCK_CENTER}
            r={SUN_ARC_RADIUS}
          />
        </svg>
        <NightStarsOverlay
          clipPath={getFullNightRingClipPath()}
          stars={getNightStars(0, 1440)}
        />
      </>
    );
  }

  const corePath = getArcPath(540, 900);

  return (
    <svg className={arcClassName} viewBox={CLOCK_VIEW_BOX} aria-hidden="true">
      <path className={glowClassName} d={corePath} />
      <path className={coreClassName} d={corePath} />
    </svg>
  );
}

interface SunEventHourMarkersProps {
  hours: number[];
}

function SunEventHourMarkers({ hours }: SunEventHourMarkersProps) {
  return (
    <svg
      className={markerClassName}
      viewBox={CLOCK_VIEW_BOX}
      aria-hidden="true"
    >
      {hours.map((hour) => {
        const position = polarToCartesian(minutesToDegrees(hour * 60));

        return (
          <circle
            key={hour}
            className={markerCircleClassName}
            cx={position.x}
            cy={position.y}
            r={SUN_EVENT_MARKER_RADIUS}
          />
        );
      })}
    </svg>
  );
}

interface NightStar {
  angle: number;
  opacity: number;
  radius: number;
  size: number;
  x: number;
  y: number;
}

interface NightStarsOverlayProps {
  clipPath: string;
  stars: NightStar[];
}

function NightStarsOverlay({ clipPath, stars }: NightStarsOverlayProps) {
  return (
    <svg className={starClassName} viewBox={CLOCK_VIEW_BOX} aria-hidden="true">
      <defs>
        <clipPath id="night-stars-clip">
          <path d={clipPath} fillRule="evenodd" clipRule="evenodd" />
        </clipPath>
        <filter
          id="night-star-glow"
          x="-80%"
          y="-80%"
          width="260%"
          height="260%"
        >
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g clipPath="url(#night-stars-clip)">
        {stars.map((star) => (
          <g
            key={`${star.x}-${star.y}`}
            transform={`translate(${star.x.toFixed(3)} ${star.y.toFixed(3)}) rotate(${star.angle.toFixed(3)}) scale(${star.size.toFixed(3)})`}
            opacity={star.opacity}
            filter="url(#night-star-glow)"
          >
            <path
              d="M0 -1 L0.12 -0.28 L0.5 -0.5 L0.28 -0.12 L1 0 L0.28 0.12 L0.5 0.5 L0.12 0.28 L0 1 L-0.12 0.28 L-0.5 0.5 L-0.28 0.12 L-1 0 L-0.28 -0.12 L-0.5 -0.5 L-0.12 -0.28 Z"
              fill="#f6c744"
            />
            <path
              d="M0 -0.58 L0.07 -0.16 L0.3 -0.3 L0.16 -0.07 L0.58 0 L0.16 0.07 L0.3 0.3 L0.07 0.16 L0 0.58 L-0.07 0.16 L-0.3 0.3 L-0.16 0.07 L-0.58 0 L-0.16 -0.07 L-0.3 -0.3 L-0.07 -0.16 Z"
              fill="#fff1a6"
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

function getNightStars(startMinutes: number, durationMinutes: number) {
  const starCount = clamp(Math.round(durationMinutes / 80), 5, 18);
  const smallStarCount = starCount * 2;
  const smallStars = Array.from({ length: smallStarCount }, (_, index) =>
    makeNightStar({
      durationMinutes,
      index,
      opacityEnd: 0.82,
      opacityStart: 0.58,
      progress: (index + 0.5) / smallStarCount,
      saltOffset: 400,
      sizeEnd: 11,
      sizeStart: 6,
      startMinutes,
      totalCount: smallStarCount,
    }),
  );
  const largeStars = Array.from({ length: starCount }, (_, index) =>
    makeNightStar({
      durationMinutes,
      index,
      opacityEnd: 0.96,
      opacityStart: 0.72,
      progress: (index + 0.5) / starCount,
      saltOffset: 0,
      sizeEnd: 30,
      sizeStart: 15,
      startMinutes,
      totalCount: starCount,
    }),
  );

  return [...smallStars, ...largeStars];
}

interface NightStarOptions {
  durationMinutes: number;
  index: number;
  opacityEnd: number;
  opacityStart: number;
  progress: number;
  saltOffset: number;
  sizeEnd: number;
  sizeStart: number;
  startMinutes: number;
  totalCount: number;
}

function makeNightStar({
  durationMinutes,
  index,
  opacityEnd,
  opacityStart,
  progress,
  saltOffset,
  sizeEnd,
  sizeStart,
  startMinutes,
  totalCount,
}: NightStarOptions) {
  const angularJitter = (seededUnit(index, saltOffset + 17) - 0.5) * 0.34;
  const radialJitter = seededUnit(index, saltOffset + 41);
  const minutes = normalizeMinutes(
    startMinutes +
      durationMinutes * clamp(progress + angularJitter / totalCount, 0, 1),
  );
  const angle = minutesToDegrees(minutes);
  const radius = lerp(
    NIGHT_STAR_INNER_RADIUS,
    NIGHT_STAR_OUTER_RADIUS,
    radialJitter,
  );
  const position = polarToCartesian(angle, radius);

  return {
    angle: angle + seededUnit(index, saltOffset + 83) * 25,
    opacity: lerp(
      opacityStart,
      opacityEnd,
      seededUnit(index, saltOffset + 107),
    ),
    radius,
    size: lerp(
      sizeStart * 1.25,
      sizeEnd / 1.5,
      seededUnit(index, saltOffset + 131),
    ),
    x: position.x,
    y: position.y,
  } satisfies NightStar;
}

export function getRoundedSunEventHours(
  sunriseMinutes: number,
  sunsetMinutes: number,
) {
  return Array.from(
    new Set([getRoundedHour(sunriseMinutes), getRoundedHour(sunsetMinutes)]),
  );
}

function getRoundedHour(minutes: number) {
  return normalizeMinutes(Math.round(minutes / 60) * 60) / 60;
}

function getZenithArcPath(startMinutes: number, endMinutes: number) {
  const daylightMinutes = normalizeMinutes(endMinutes - startMinutes);
  const solarNoonMinutes = normalizeMinutes(startMinutes + daylightMinutes / 2);
  const coreArcMinutes = getCoreArcMinutes(daylightMinutes);

  return getArcPath(
    solarNoonMinutes - coreArcMinutes / 2,
    solarNoonMinutes + coreArcMinutes / 2,
  );
}

function getCoreArcMinutes(daylightMinutes: number) {
  const proportionalMinutes = daylightMinutes * CORE_DAYLIGHT_RATIO;
  const cappedMinutes = Math.min(proportionalMinutes, MAX_CORE_ARC_MINUTES);

  return Math.min(
    daylightMinutes,
    Math.max(cappedMinutes, MIN_CORE_ARC_MINUTES),
  );
}

function getArcPath(startMinutes: number, endMinutes: number) {
  const start = polarToCartesian(minutesToDegrees(startMinutes));
  const end = polarToCartesian(minutesToDegrees(endMinutes));
  const daylightMinutes = normalizeMinutes(endMinutes - startMinutes);
  const largeArcFlag = daylightMinutes > 720 ? 1 : 0;

  return [
    `M ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
    `A ${SUN_ARC_RADIUS} ${SUN_ARC_RADIUS} 0 ${largeArcFlag} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
  ].join(" ");
}

function getNightSegmentClipPath(startMinutes: number, endMinutes: number) {
  const startAngle = minutesToDegrees(startMinutes);
  const endAngle = minutesToDegrees(endMinutes);
  const outerStart = polarToCartesian(startAngle, NIGHT_STAR_CLIP_OUTER_RADIUS);
  const outerEnd = polarToCartesian(endAngle, NIGHT_STAR_CLIP_OUTER_RADIUS);
  const innerStart = polarToCartesian(startAngle, NIGHT_STAR_CLIP_INNER_RADIUS);
  const innerEnd = polarToCartesian(endAngle, NIGHT_STAR_CLIP_INNER_RADIUS);
  const nightMinutes = normalizeMinutes(endMinutes - startMinutes);
  const largeArcFlag = nightMinutes > 720 ? 1 : 0;

  return [
    `M ${outerStart.x.toFixed(3)} ${outerStart.y.toFixed(3)}`,
    `A ${NIGHT_STAR_CLIP_OUTER_RADIUS} ${NIGHT_STAR_CLIP_OUTER_RADIUS} 0 ${largeArcFlag} 1 ${outerEnd.x.toFixed(3)} ${outerEnd.y.toFixed(3)}`,
    `L ${innerEnd.x.toFixed(3)} ${innerEnd.y.toFixed(3)}`,
    `A ${NIGHT_STAR_CLIP_INNER_RADIUS} ${NIGHT_STAR_CLIP_INNER_RADIUS} 0 ${largeArcFlag} 0 ${innerStart.x.toFixed(3)} ${innerStart.y.toFixed(3)}`,
    "Z",
  ].join(" ");
}

function getFullNightRingClipPath() {
  return [
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - NIGHT_STAR_CLIP_OUTER_RADIUS}`,
    `A ${NIGHT_STAR_CLIP_OUTER_RADIUS} ${NIGHT_STAR_CLIP_OUTER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + NIGHT_STAR_CLIP_OUTER_RADIUS}`,
    `A ${NIGHT_STAR_CLIP_OUTER_RADIUS} ${NIGHT_STAR_CLIP_OUTER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - NIGHT_STAR_CLIP_OUTER_RADIUS}`,
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - NIGHT_STAR_CLIP_INNER_RADIUS}`,
    `A ${NIGHT_STAR_CLIP_INNER_RADIUS} ${NIGHT_STAR_CLIP_INNER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + NIGHT_STAR_CLIP_INNER_RADIUS}`,
    `A ${NIGHT_STAR_CLIP_INNER_RADIUS} ${NIGHT_STAR_CLIP_INNER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - NIGHT_STAR_CLIP_INNER_RADIUS}`,
  ].join(" ");
}

function seededUnit(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;

  return value - Math.floor(value);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
