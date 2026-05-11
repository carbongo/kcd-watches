export const MINUTES_PER_HOUR = 60;
export const HOURS_PER_DAY = 24;
export const MINUTES_PER_DAY = HOURS_PER_DAY * MINUTES_PER_HOUR;

export interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getClockTime(date: Date): ClockTime {
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

export function normalizeMinutes(minutes: number) {
  return ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
}
