import { useId, useState } from "react";

import { Action } from "../actions/Action";
import type { TimeZoneCity } from "../../domain/timeZones";

interface SettingsMenuProps {
  cities: TimeZoneCity[];
  selectedTimeZone: string;
  onCityChange: (timeZone: string) => void;
}

const SETTINGS_MENU_ID = "settings-menu";
const SETTINGS_SHORTCUT_KEY = "s";

export function SettingsMenu({
  cities,
  selectedTimeZone,
  onCityChange,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const citySelectId = useId();

  return (
    <Action
      isOpen={isOpen}
      label="Settings"
      menuId={SETTINGS_MENU_ID}
      shortcutKey={SETTINGS_SHORTCUT_KEY}
      onClick={() => setIsOpen((current) => !current)}
    >
      <label
        className="block text-[10px] uppercase tracking-[0.18em] text-amber-100/70"
        htmlFor={citySelectId}
      >
        City
      </label>
      <select
        id={citySelectId}
        className="mt-2 w-full rounded  bg-black px-3 py-2 text-sm text-amber-50 outline-none transition focus focus:ring-2 focus:ring-amber-100/40"
        value={selectedTimeZone}
        onChange={(event) => onCityChange(event.target.value)}
      >
        {cities.map((city) => (
          <option key={city.timeZone} value={city.timeZone}>
            {city.label}
          </option>
        ))}
      </select>
    </Action>
  );
}
