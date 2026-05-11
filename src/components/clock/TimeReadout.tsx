import type { SunWindow } from "../../domain/sun";
import { getTimeLabel, type ClockTime } from "../../domain/time";

interface TimeReadoutProps {
  time: ClockTime;
  sunWindow: SunWindow;
}

export function TimeReadout({ time, sunWindow }: TimeReadoutProps) {
  const [hours, minutes, seconds] = getTimeLabel(time);
  const sunLabel =
    sunWindow.status === "normal"
      ? `${sunWindow.city.label} ${sunWindow.sunriseLabel}-${sunWindow.sunsetLabel}`
      : `${sunWindow.city.label} ${sunWindow.sunriseLabel}`;

  return (
    <figcaption className="absolute inset-0 z-40 m-auto grid h-1/2 w-1/2 place-items-center overflow-hidden text-center">
      <div className="flex gap-1 text-[min(3.8vw,3.8vh)] leading-[min(4.5vw,4.5vh)] text-white">
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      </div>
      <p className="absolute bottom-[16%] left-1/2 w-[72%] -translate-x-1/2 text-center text-[10px] uppercase text-amber-100/80">
        {sunLabel}
      </p>
    </figcaption>
  );
}
