import { getClockRotationDegrees, getClockTime } from "../../domain/time";
import { getSunWindow } from "../../domain/sun";
import type { TimeZoneCity } from "../../domain/timeZones";
import { useNow } from "../../hooks/useNow";
import { CelestialMarkersOverlay } from "./CelestialMarkersOverlay";
import { ClockFace } from "./ClockFace";
import { ClockPointer } from "./ClockPointer";
import { HourLabelsOverlay } from "./HourLabelsOverlay";
import { NightOverlay } from "./NightOverlay";
import { PlasterArcBorders, PlasterArcOverlay } from "./PlasterArcOverlay";
import { SunArcOverlay } from "./SunArcOverlay";
import { TimeReadout } from "./TimeReadout";

interface ClockProps {
  city: TimeZoneCity;
}

export function Clock({ city }: ClockProps) {
  const now = useNow();
  const time = getClockTime(now, city.timeZone);
  const sunWindow = getSunWindow(now, city);
  const clockRotation = getClockRotationDegrees(time);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section
        className="relative mx-auto grid h-screen w-screen place-items-center overflow-hidden"
        aria-label="KCD Watches"
      >
        <ClockFace />

        <div
          className="absolute inset-0 z-20 m-auto h-full w-full object-contain transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${clockRotation}deg)` }}
        >
          <PlasterArcOverlay />
          <NightOverlay sunWindow={sunWindow} />
          <SunArcOverlay sunWindow={sunWindow} />
          <CelestialMarkersOverlay />
          <PlasterArcBorders />
          <HourLabelsOverlay sunWindow={sunWindow} />
        </div>

        <ClockPointer />

        <TimeReadout date={now} time={time} sunWindow={sunWindow} />
      </section>
    </main>
  );
}
