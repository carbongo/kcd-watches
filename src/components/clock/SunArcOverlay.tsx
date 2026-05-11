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
  "pointer-events-none absolute inset-0 h-full w-full mix-blend-color-burn blur-xl";
const nightClassName =
  "fill-none stroke-blue-950/75 stroke-[150] [stroke-linecap:round]";
const glowClassName =
  "fill-none stroke-amber-300/50 stroke-[150] [stroke-linecap:round]";
const coreClassName =
  "fill-none stroke-amber-100/100 stroke-[42] [stroke-linecap:round]";
const markerClassName = "pointer-events-none absolute inset-0 h-full w-full";
const markerCircleClassName = "fill-none stroke-amber-200/95 stroke-[4]";

const MIN_CORE_ARC_MINUTES = 60;
const MAX_CORE_ARC_MINUTES = 240;
const CORE_DAYLIGHT_RATIO = 0.4;
const SUN_EVENT_MARKER_RADIUS = 36;

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
        <SunEventHourMarkers hours={markerHours} />
      </>
    );
  }

  if (sunWindow.status === "polar-night") {
    return (
      <svg className={arcClassName} viewBox={CLOCK_VIEW_BOX} aria-hidden="true">
        <circle
          className={nightClassName}
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={SUN_ARC_RADIUS}
        />
      </svg>
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
