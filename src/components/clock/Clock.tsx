import arrowImage from "data-url:../../images/arrow.png";
import clockImage from "data-url:../../images/clock.png";
import faceImage from "data-url:../../images/face.png";
import { getClockRotationDegrees, getClockTime } from "../../domain/time";
import { getSunWindow } from "../../domain/sun";
import { getTimeZoneCity } from "../../domain/timeZones";
import { useNow } from "../../hooks/useNow";
import { SunArcOverlay } from "./SunArcOverlay";
import { TimeReadout } from "./TimeReadout";

export function Clock() {
  const now = useNow();
  const time = getClockTime(now);
  const city = getTimeZoneCity();
  const sunWindow = getSunWindow(now, city);
  const clockRotation = getClockRotationDegrees(time);

  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <section className="relative mx-auto grid h-screen w-screen place-items-center overflow-hidden" aria-label="KCD Watches">
        <img className="absolute inset-0 z-10 m-auto h-full w-full object-contain" src={faceImage} alt="" aria-hidden="true" />

        <div
          className="absolute inset-0 z-20 m-auto h-full w-full object-contain transition-transform duration-1000 ease-out"
          style={{ transform: `rotate(${clockRotation}deg)` }}
        >
          <img className="absolute inset-0 h-full w-full object-contain" src={clockImage} alt="" aria-hidden="true" />
          <SunArcOverlay sunWindow={sunWindow} />
        </div>

        <img className="absolute inset-0 z-30 m-auto h-full w-full object-contain" src={arrowImage} alt="" aria-hidden="true" />

        <TimeReadout time={time} sunWindow={sunWindow} />
      </section>
    </main>
  );
}
