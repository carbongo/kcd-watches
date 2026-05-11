import { normalizeMinutes } from "./time";
import type { TimeZoneCity } from "./timeZones";

export type SunWindow =
  | {
      status: "normal";
      city: TimeZoneCity;
      sunriseMinutes: number;
      sunsetMinutes: number;
      sunriseLabel: string;
      sunsetLabel: string;
    }
  | {
      status: "polar-day" | "polar-night";
      city: TimeZoneCity;
      sunriseLabel: string;
      sunsetLabel: string;
    };

interface ZonedDateParts {
  year: number;
  month: number;
  day: number;
}

const OFFICIAL_ZENITH_DEGREES = 90.833;

export function getSunWindow(date: Date, city: TimeZoneCity): SunWindow {
  const localDate = getZonedDateParts(date, city.timeZone);
  const sunriseUtc = getSunEventUtc(localDate, city, "sunrise");
  const sunsetUtc = getSunEventUtc(localDate, city, "sunset");

  if (sunriseUtc === "never" || sunsetUtc === "never") {
    return {
      status: "polar-night",
      city,
      sunriseLabel: "none",
      sunsetLabel: "none"
    };
  }

  if (sunriseUtc === "always" || sunsetUtc === "always") {
    return {
      status: "polar-day",
      city,
      sunriseLabel: "all day",
      sunsetLabel: "all day"
    };
  }

  const sunriseMinutes = getMinutesInTimeZone(sunriseUtc, city.timeZone);
  const sunsetMinutes = getMinutesInTimeZone(sunsetUtc, city.timeZone);

  return {
    status: "normal",
    city,
    sunriseMinutes,
    sunsetMinutes,
    sunriseLabel: formatTimeInTimeZone(sunriseUtc, city.timeZone),
    sunsetLabel: formatTimeInTimeZone(sunsetUtc, city.timeZone)
  };
}

function getSunEventUtc(date: ZonedDateParts, city: TimeZoneCity, event: "sunrise" | "sunset") {
  const dayOfYear = getDayOfYear(date);
  const longitudeHour = city.longitude / 15;
  const approximateTime = dayOfYear + ((event === "sunrise" ? 6 : 18) - longitudeHour) / 24;
  const meanAnomaly = 0.9856 * approximateTime - 3.289;
  const trueLongitude = normalizeDegrees(
    meanAnomaly +
      1.916 * sinDeg(meanAnomaly) +
      0.02 * sinDeg(2 * meanAnomaly) +
      282.634
  );
  const rightAscension = getRightAscension(trueLongitude);
  const sinDeclination = 0.39782 * sinDeg(trueLongitude);
  const cosDeclination = Math.cos(Math.asin(sinDeclination));
  const cosHourAngle =
    (cosDeg(OFFICIAL_ZENITH_DEGREES) - sinDeclination * sinDeg(city.latitude)) /
    (cosDeclination * cosDeg(city.latitude));

  if (cosHourAngle > 1) {
    return "never";
  }

  if (cosHourAngle < -1) {
    return "always";
  }

  const localHourAngle =
    event === "sunrise"
      ? (360 - acosDeg(cosHourAngle)) / 15
      : acosDeg(cosHourAngle) / 15;
  const localMeanTime = localHourAngle + rightAscension - 0.06571 * approximateTime - 6.622;
  const utcHour = normalizeHours(localMeanTime - longitudeHour);
  const utcMinutes = Math.round(utcHour * 60);

  return new Date(Date.UTC(date.year, date.month - 1, date.day, 0, utcMinutes));
}

function getRightAscension(trueLongitude: number) {
  const roughAscension = normalizeDegrees(atanDeg(0.91764 * tanDeg(trueLongitude)));
  const longitudeQuadrant = Math.floor(trueLongitude / 90) * 90;
  const ascensionQuadrant = Math.floor(roughAscension / 90) * 90;

  return (roughAscension + longitudeQuadrant - ascensionQuadrant) / 15;
}

function getZonedDateParts(date: Date, timeZone: string): ZonedDateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "2-digit",
    timeZone,
    year: "numeric"
  }).formatToParts(date);

  return {
    year: Number(getPart(parts, "year")),
    month: Number(getPart(parts, "month")),
    day: Number(getPart(parts, "day"))
  };
}

function getDayOfYear({ year, month, day }: ZonedDateParts) {
  const start = Date.UTC(year, 0, 0);
  const current = Date.UTC(year, month - 1, day);

  return Math.floor((current - start) / 86_400_000);
}

function getMinutesInTimeZone(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone
  }).formatToParts(date);

  return normalizeMinutes(Number(getPart(parts, "hour")) * 60 + Number(getPart(parts, "minute")));
}

function formatTimeInTimeZone(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone
  }).format(date);
}

function getPart(parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) {
  const value = parts.find((part) => part.type === type)?.value;

  if (!value) {
    throw new Error(`Missing ${type} date part.`);
  }

  return value;
}

function normalizeDegrees(value: number) {
  return ((value % 360) + 360) % 360;
}

function normalizeHours(value: number) {
  return ((value % 24) + 24) % 24;
}

function sinDeg(value: number) {
  return Math.sin(toRadians(value));
}

function cosDeg(value: number) {
  return Math.cos(toRadians(value));
}

function tanDeg(value: number) {
  return Math.tan(toRadians(value));
}

function acosDeg(value: number) {
  return toDegrees(Math.acos(value));
}

function atanDeg(value: number) {
  return toDegrees(Math.atan(value));
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function toDegrees(value: number) {
  return (value * 180) / Math.PI;
}
