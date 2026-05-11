export interface TimeZoneCity {
  label: string;
  timeZone: string;
  latitude: number;
  longitude: number;
}

const FALLBACK_CITY: TimeZoneCity = {
  label: "Almaty",
  timeZone: "Asia/Almaty",
  latitude: 43.2389,
  longitude: 76.8897,
};

// TODO: Add more cities of various longitudes and latitudes, also sort by alphabet
const TIME_ZONE_CITIES: Record<string, TimeZoneCity> = {
  "Africa/Cairo": {
    label: "Cairo",
    timeZone: "Africa/Cairo",
    latitude: 30.0444,
    longitude: 31.2357,
  },
  "America/Anchorage": {
    label: "Anchorage",
    timeZone: "America/Anchorage",
    latitude: 61.2176,
    longitude: -149.8997,
  },
  "America/Chicago": {
    label: "Chicago",
    timeZone: "America/Chicago",
    latitude: 41.8781,
    longitude: -87.6298,
  },
  "America/Denver": {
    label: "Denver",
    timeZone: "America/Denver",
    latitude: 39.7392,
    longitude: -104.9903,
  },
  "America/Los_Angeles": {
    label: "Los Angeles",
    timeZone: "America/Los_Angeles",
    latitude: 34.0522,
    longitude: -118.2437,
  },
  "America/Mexico_City": {
    label: "Mexico City",
    timeZone: "America/Mexico_City",
    latitude: 19.4326,
    longitude: -99.1332,
  },
  "America/New_York": {
    label: "New York",
    timeZone: "America/New_York",
    latitude: 40.7128,
    longitude: -74.006,
  },
  "America/Sao_Paulo": {
    label: "Sao Paulo",
    timeZone: "America/Sao_Paulo",
    latitude: -23.5558,
    longitude: -46.6396,
  },
  "Asia/Almaty": {
    label: "Almaty",
    timeZone: "Asia/Almaty",
    latitude: 43.2389,
    longitude: 76.8897,
  },
  "Asia/Dubai": {
    label: "Dubai",
    timeZone: "Asia/Dubai",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  "Asia/Hong_Kong": {
    label: "Hong Kong",
    timeZone: "Asia/Hong_Kong",
    latitude: 22.3193,
    longitude: 114.1694,
  },
  "Asia/Kolkata": {
    label: "Kolkata",
    timeZone: "Asia/Kolkata",
    latitude: 22.5726,
    longitude: 88.3639,
  },
  "Asia/Seoul": {
    label: "Seoul",
    timeZone: "Asia/Seoul",
    latitude: 37.5665,
    longitude: 126.978,
  },
  "Asia/Shanghai": {
    label: "Shanghai",
    timeZone: "Asia/Shanghai",
    latitude: 31.2304,
    longitude: 121.4737,
  },
  "Asia/Singapore": {
    label: "Singapore",
    timeZone: "Asia/Singapore",
    latitude: 1.3521,
    longitude: 103.8198,
  },
  "Asia/Tokyo": {
    label: "Tokyo",
    timeZone: "Asia/Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
  },
  "Australia/Sydney": {
    label: "Sydney",
    timeZone: "Australia/Sydney",
    latitude: -33.8688,
    longitude: 151.2093,
  },
  "Europe/Berlin": {
    label: "Berlin",
    timeZone: "Europe/Berlin",
    latitude: 52.52,
    longitude: 13.405,
  },
  "Europe/London": {
    label: "London",
    timeZone: "Europe/London",
    latitude: 51.5072,
    longitude: -0.1276,
  },
  "Europe/Moscow": {
    label: "Moscow",
    timeZone: "Europe/Moscow",
    latitude: 55.7558,
    longitude: 37.6173,
  },
  "Europe/Paris": {
    label: "Paris",
    timeZone: "Europe/Paris",
    latitude: 48.8566,
    longitude: 2.3522,
  },
  "Pacific/Auckland": {
    label: "Auckland",
    timeZone: "Pacific/Auckland",
    latitude: -36.8509,
    longitude: 174.7645,
  },
  "Pacific/Honolulu": {
    label: "Honolulu",
    timeZone: "Pacific/Honolulu",
    latitude: 21.3099,
    longitude: -157.8581,
  },
  UTC: { label: "UTC", timeZone: "UTC", latitude: 51.4769, longitude: 0 },
};

export function getResolvedTimeZone() {
  return (
    Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK_CITY.timeZone
  );
}

export function getTimeZoneCity(timeZone = getResolvedTimeZone()) {
  return TIME_ZONE_CITIES[timeZone] ?? FALLBACK_CITY;
}

export function getTimeZoneCities() {
  return Object.values(TIME_ZONE_CITIES);
}

export function isKnownTimeZoneCity(timeZone: string) {
  return timeZone in TIME_ZONE_CITIES;
}
