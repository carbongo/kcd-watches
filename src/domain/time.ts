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
  return 180 - (hours * 60 + minutes) * 0.25;
}

function formatTimePart(value: number) {
  return value < 10 ? `0${value}` : `${value}`;
}

export function getTimeLabel({ hours, minutes, seconds }: ClockTime) {
  return [
    formatTimePart(hours),
    formatTimePart(minutes),
    formatTimePart(seconds),
  ];
}

export function normalizeMinutes(minutes: number) {
  return ((minutes % 1440) + 1440) % 1440;
}
