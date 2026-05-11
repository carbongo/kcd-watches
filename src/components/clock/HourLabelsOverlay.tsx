import type { SunWindow } from "../../domain/sun";
import { normalizeMinutes } from "../../domain/time";
import {
  CLOCK_VIEW_BOX,
  minutesToDegrees,
  polarToCartesian,
} from "./clockGeometry";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const overlayClassName = "pointer-events-none absolute inset-0 h-full w-full";
const textClassName =
  "font-serif text-[36px] font-bold [paint-order:stroke]";
const dayTextClassName = `${textClassName} fill-black/80`;
const nightTextClassName = `${textClassName} fill-white`;

interface HourLabelsOverlayProps {
  sunWindow: SunWindow;
}

export function HourLabelsOverlay({ sunWindow }: HourLabelsOverlayProps) {
  return (
    <svg
      className={overlayClassName}
      viewBox={CLOCK_VIEW_BOX}
      aria-hidden="true"
    >
      {HOURS.map((hour) => {
        const angle = minutesToDegrees(hour * 60);
        const position = polarToCartesian(angle);

        return (
          <text
            key={hour}
            className={
              isNightHour(sunWindow, hour)
                ? nightTextClassName
                : dayTextClassName
            }
            x={position.x}
            y={position.y}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${angle} ${position.x} ${position.y})`}
          >
            {hour === 0 ? "24" : hour}
          </text>
        );
      })}
    </svg>
  );
}

function isNightHour(sunWindow: SunWindow, hour: number) {
  if (sunWindow.status !== "normal") {
    return sunWindow.status === "polar-night";
  }

  const hourMinutes = hour * 60;
  const nightStart = sunWindow.sunsetMinutes;
  const nightDuration = normalizeMinutes(
    sunWindow.sunriseMinutes - sunWindow.sunsetMinutes,
  );

  return normalizeMinutes(hourMinutes - nightStart) < nightDuration;
}
