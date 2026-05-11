import type { ReactNode, SVGProps } from "react";

import type { SunWindow } from "../../domain/sun";
import { getTimeLabel, type ClockTime } from "../../domain/time";

interface TimeReadoutProps {
  date: Date;
  time: ClockTime;
  sunWindow: SunWindow;
}

const captionClassName =
  "absolute inset-0 z-40 m-auto grid h-1/2 w-1/2 place-items-center overflow-hidden text-center";
const readoutClassName =
  "flex flex-col items-center gap-[min(3vw,3vh)] text-white font-serif";
const smallTextClassName = "text-[min(3.5vw,3.5vh)] leading-[min(4.5vw,4.5vh)]";
const metricClassName = "flex min-w-0 flex-col items-center gap-[min(1vw,1vh)]";
const metricIconClassName =
  "h-[min(4vw,4vh)] w-[min(4vw,4vh)] text-amber-200/80";
const metricGroupClassName = "flex flex-col gap-[min(2.5vw,2.5vh)]";

export function TimeReadout({ date, time, sunWindow }: TimeReadoutProps) {
  const [hours, minutes] = getTimeLabel(time);
  const dateLabel = getDateLabel(date, sunWindow.city.timeZone);

  return (
    <figcaption className={captionClassName}>
      <div className={readoutClassName}>
        <div className="flex flex-col gap-[min(1vw,1vh)]">
          <p className={smallTextClassName}>Current time:</p>
          <span className="text-[min(12vw,12vh)] leading-[min(12vw,12vh)] text-amber-100">
            {hours}:{minutes}
          </span>
        </div>
        <hr className="border-amber-100/25 w-full" />
        <div className={metricGroupClassName}>
          <div className="flex gap-[min(2.5vw,2.5vh)]">
            <Metric icon={<SunriseIcon />} label="Sunrise">
              {sunWindow.sunriseLabel}
            </Metric>
            <Metric className="w-[min(18vw,18vh)] text-[min(2.5vw,2.5vh)]!">
              {sunWindow.city.label}
            </Metric>
            <Metric icon={<SunsetIcon />} label="Sunset">
              {sunWindow.sunsetLabel}
            </Metric>
          </div>
          <Metric icon={<CalendarIcon />} label="Today">
            {dateLabel}
          </Metric>
        </div>
      </div>
    </figcaption>
  );
}

interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  icon?: ReactNode;
  label?: string;
}

function Metric({ children, icon, label, className = "" }: MetricProps) {
  return (
    <div className={`${metricClassName} ${smallTextClassName} ${className}`}>
      {icon ? (
        <div className={metricIconClassName} aria-hidden="true">
          {icon}
        </div>
      ) : null}
      {label ? <span className="sr-only">{label}</span> : null}
      <p className="min-w-0 max-w-full truncate">{children}</p>
    </div>
  );
}

function SunriseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 15a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M3 19h18M12 3v5M5.6 8.6 4.2 7.2M18.4 8.6l1.4-1.4M8 12l4-4 4 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SunsetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 15a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <path
        d="M3 19h18M12 3v5M5.6 8.6 4.2 7.2M18.4 8.6l1.4-1.4M8 8l4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 3v4M18 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path d="M8 13h3v3H8z" fill="currentColor" />
    </svg>
  );
}

function getDateLabel(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone,
    weekday: "short",
  }).formatToParts(date);
  const weekday = getDateTimePart(parts, "weekday").toUpperCase();
  const month = getDateTimePart(parts, "month");
  const day = getDateTimePart(parts, "day");

  return `${weekday}, ${month} ${day}`;
}

function getDateTimePart(
  parts: Intl.DateTimeFormatPart[],
  type: Intl.DateTimeFormatPartTypes,
) {
  const value = parts.find((part) => part.type === type)?.value;

  if (!value) {
    throw new Error(`Missing ${type} date part.`);
  }

  return value;
}
