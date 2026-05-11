import { normalizeMinutes } from "../../domain/time";

export const CLOCK_CENTER = 600;
export const SUN_ARC_RADIUS = 446;
export const CLOCK_VIEW_BOX = "0 0 1200 1200";
export const PLASTER_RING_WIDTH = 132;
export const PLASTER_RING_INNER_RADIUS =
  SUN_ARC_RADIUS - PLASTER_RING_WIDTH / 2;
export const PLASTER_RING_OUTER_RADIUS =
  SUN_ARC_RADIUS + PLASTER_RING_WIDTH / 2;

export function minutesToDegrees(minutes: number) {
  return (normalizeMinutes(minutes + 720) / 1440) * 360;
}

export function polarToCartesian(angleDegrees: number, radius = SUN_ARC_RADIUS) {
  const angleRadians = ((angleDegrees - 90) * Math.PI) / 180;

  return {
    x: CLOCK_CENTER + radius * Math.cos(angleRadians),
    y: CLOCK_CENTER + radius * Math.sin(angleRadians),
  };
}

export function getClockArcPath(
  startMinutes: number,
  endMinutes: number,
  radius = SUN_ARC_RADIUS,
) {
  const start = polarToCartesian(minutesToDegrees(startMinutes), radius);
  const end = polarToCartesian(minutesToDegrees(endMinutes), radius);
  const durationMinutes = normalizeMinutes(endMinutes - startMinutes);
  const largeArcFlag = durationMinutes > 720 ? 1 : 0;

  return [
    `M ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
  ].join(" ");
}

export function getRingClipPath(innerRadius: number, outerRadius: number) {
  return [
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - outerRadius}`,
    `A ${outerRadius} ${outerRadius} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + outerRadius}`,
    `A ${outerRadius} ${outerRadius} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - outerRadius}`,
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - innerRadius}`,
    `A ${innerRadius} ${innerRadius} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + innerRadius}`,
    `A ${innerRadius} ${innerRadius} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - innerRadius}`,
  ].join(" ");
}

export const PLASTER_RING_CLIP_PATH = getRingClipPath(
  PLASTER_RING_INNER_RADIUS,
  PLASTER_RING_OUTER_RADIUS,
);
