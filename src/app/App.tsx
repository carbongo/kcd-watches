import { useState } from "react";

import { Clock } from "../components/clock/Clock";
import { SettingsMenu } from "../components/settings/SettingsMenu";
import {
  getResolvedTimeZone,
  getTimeZoneCity,
  getTimeZoneCities,
  isKnownTimeZoneCity,
} from "../domain/timeZones";

const SELECTED_CITY_STORAGE_KEY = "kcd-watches.selectedTimeZone";

export function App() {
  const [selectedTimeZone, setSelectedTimeZone] = useState(getInitialTimeZone);
  const selectedCity = getTimeZoneCity(selectedTimeZone);

  function handleCityChange(timeZone: string) {
    const city = getTimeZoneCity(timeZone);

    setSelectedTimeZone(city.timeZone);
    saveSelectedTimeZone(city.timeZone);
  }

  return (
    <>
      <Clock city={selectedCity} />
      <SettingsMenu
        cities={getTimeZoneCities()}
        selectedTimeZone={selectedCity.timeZone}
        onCityChange={handleCityChange}
      />
    </>
  );
}

function getInitialTimeZone() {
  const storedTimeZone = readSelectedTimeZone();

  if (storedTimeZone && isKnownTimeZoneCity(storedTimeZone)) {
    return storedTimeZone;
  }

  return getTimeZoneCity(getResolvedTimeZone()).timeZone;
}

function readSelectedTimeZone() {
  try {
    return window.localStorage.getItem(SELECTED_CITY_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveSelectedTimeZone(timeZone: string) {
  try {
    window.localStorage.setItem(SELECTED_CITY_STORAGE_KEY, timeZone);
  } catch {
    // The clock can still render when localStorage is unavailable.
  }
}
