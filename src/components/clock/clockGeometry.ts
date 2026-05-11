import { normalizeMinutes } from "../../domain/time";

export const CLOCK_CENTER = 600;
export const SUN_ARC_RADIUS = 446;
export const CLOCK_VIEW_BOX = "0 0 1200 1200";

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
