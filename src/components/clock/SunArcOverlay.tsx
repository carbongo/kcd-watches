import type { SunWindow } from "../../domain/sun";
import { normalizeMinutes } from "../../domain/time";

interface SunArcOverlayProps {
  sunWindow: SunWindow;
}

const CENTER = 600;
const RADIUS = 446;
const arcClassName =
  "pointer-events-none absolute inset-0 h-full w-full mix-blend-screen";
const glowClassName =
  "fill-none stroke-amber-300/25 stroke-[113] [stroke-linecap:round]";
const coreClassName =
  "fill-none stroke-amber-400/70 stroke-[64] [stroke-linecap:round]";
const MIN_CORE_ARC_MINUTES = 60;
const MAX_CORE_ARC_MINUTES = 240;
const CORE_DAYLIGHT_RATIO = 0.4;

export function SunArcOverlay({ sunWindow }: SunArcOverlayProps) {
  if (sunWindow.status === "normal") {
    const path = getArcPath(sunWindow.sunriseMinutes, sunWindow.sunsetMinutes);
    const corePath = getZenithArcPath(
      sunWindow.sunriseMinutes,
      sunWindow.sunsetMinutes,
    );

    return (
      <svg className={arcClassName} viewBox="0 0 1200 1200" aria-hidden="true">
        <path className={glowClassName} d={path} />
        <path className={coreClassName} d={corePath} />
      </svg>
    );
  }

  if (sunWindow.status === "polar-night") {
    return null;
  }

  return (
    <svg className={arcClassName} viewBox="0 0 1200 1200" aria-hidden="true">
      <circle className={glowClassName} cx={CENTER} cy={CENTER} r={RADIUS} />
      <path className={coreClassName} d={getArcPath(540, 900)} />
    </svg>
  );
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
    `A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
  ].join(" ");
}

function minutesToDegrees(minutes: number) {
  return (normalizeMinutes(minutes + 720) / 1440) * 360;
}

function polarToCartesian(angleDegrees: number) {
  const angleRadians = ((angleDegrees - 90) * Math.PI) / 180;

  return {
    x: CENTER + RADIUS * Math.cos(angleRadians),
    y: CENTER + RADIUS * Math.sin(angleRadians),
  };
}
