export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getClockTime(date: Date, timeZone?: string): ClockTime {
  if (timeZone) {
    return getClockTimeInTimeZone(date, timeZone);
  }

  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
}

export function getClockRotationDegrees({ hours, minutes }: ClockTime) {
  return 180 - (hours * MINUTES_PER_HOUR + minutes) * 0.25;
}

export function getTimeLabel({ hours, minutes, seconds }: ClockTime) {
  return [
    formatTimePart(hours),
    formatTimePart(minutes),
    formatTimePart(seconds),
  ];
}

function formatTimePart(value: number) {
  return value.toString().padStart(2, "0");
}

function getClockTimeInTimeZone(date: Date, timeZone: string): ClockTime {
  const parts = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    hourCycle: "h23",
    minute: "2-digit",
    second: "2-digit",
    timeZone,
  }).formatToParts(date);

  return {
    hours: Number(getDateTimePart(parts, "hour")),
    minutes: Number(getDateTimePart(parts, "minute")),
    seconds: Number(getDateTimePart(parts, "second")),
  };
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

export function normalizeMinutes(minutes: number) {
  return ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}
