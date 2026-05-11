import { useId, useState } from "react";

import type { TimeZoneCity } from "../../domain/timeZones";

interface SettingsMenuProps {
  cities: TimeZoneCity[];
  selectedTimeZone: string;
  onCityChange: (timeZone: string) => void;
}

export function SettingsMenu({
  cities,
  selectedTimeZone,
  onCityChange,
}: SettingsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const citySelectId = useId();

  return (
    // TODO: Make a separate component out of this: Action
    <div className="flex flex-col items-end fixed right-3 top-3 z-50 text-white sm:right-5 sm:top-5">
      {/*TODO: Make a separate component out of this: ActionButton */}
      <button
        type="button"
        className="gap-4 items-center flex rounded px-3 py-2 text-xl text-stone-100 text-shadow-md text-shadow-stone-950/50 backdrop-blur transition hover hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-stone-400/70"
        aria-expanded={isOpen}
        aria-controls="settings-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        Settings
        {/*TODO: Below should be a label of a keystroke to press which will do the action written in onClick above*/}
        <div className="text-shadow-stone-250/50 text-shadow-md bg-stone-300 text-stone-950 text-sm font-bold w-8 h-9 content-center pl-0.5 border-b-8 border-stone-400 rounded-xs outline-stone-500 outline-1">
          G
        </div>
      </button>

      {/*TODO: Make a separate component out of this: ActionMenu*/}
      {isOpen ? (
        <div
          id="settings-menu"
          className="mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded  bg-stone-700/90 p-3 shadow-2xl backdrop-blur"
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
        </div>
      ) : null}
    </div>
  );
}
