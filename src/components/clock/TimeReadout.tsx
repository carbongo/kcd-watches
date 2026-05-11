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
      <div className="flex flex-col items-center gap-[min(2.5vw,2.5vh)] text-white font-serif">
        <span className="text-[min(8vw,8vh)] leading-[min(10vw,10vh)]">
          {hours}:{minutes}
        </span>
        <hr className="border-stone-50 w-full" />
        <p className="w-full text-[min(3.8vw,3.8vh)] leading-[min(5vw,5vh)] uppercase text-amber-100/80">
          {sunLabel}
        </p>
      </div>
    </figcaption>
  );
}
