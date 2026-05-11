# Architecture

KCD Watches is a client-only clock app. It renders a game-inspired 24-hour dial with a rotating SVG overlay, local time, and a computed daylight window for the browser's resolved timezone.

## Stack

- React 19 for UI composition.
- TypeScript 6 with strict checking for application and domain code.
- Tailwind CSS 4 for utility styling.
- Parcel 2 for development, asset handling, and production bundling.
- PostCSS through `@tailwindcss/postcss`.
- Browser `Intl.DateTimeFormat` APIs for timezone resolution and local formatting.

## Runtime Flow

1. `src/index.html` loads `src/main.tsx`.
2. `src/main.tsx` validates the `#root` element, applies global layout classes, and renders `App`.
3. `App` renders `Clock`.
4. `Clock` uses `useNow()` to tick once per second.
5. The current `Date` is converted into:
   - `ClockTime` from `src/domain/time.ts`
   - a browser-resolved `TimeZoneCity` from `src/domain/timeZones.ts`
   - a `SunWindow` from `src/domain/sun.ts`
6. Clock overlays render against the shared 1200 x 1200 SVG coordinate system from `src/components/clock/lib/clockGeometry.ts`.

## Source Layout

### `src/domain`

Pure TypeScript logic with no React imports:

- `time.ts`: Clock time extraction, time labels, day/hour constants, and minute normalization.
- `sun.ts`: Sunrise/sunset calculation using the NOAA-style official zenith formula. It returns normal, polar-day, or polar-night sun windows.
- `timeZones.ts`: Small mapping from IANA timezone IDs to representative city coordinates, with Almaty as fallback.

### `src/components/clock`

The visual clock is split into focused overlays:

- `Clock.tsx`: Composes the SVG face, rotating overlay layers, fixed pointer, and the readout.
- `ClockFace.tsx`: Draws the dark textured dial face as SVG.
- `ClockPointer.tsx`: Draws the fixed gold pointer as SVG.
- `PlasterArcOverlay.tsx`: Draws the plaster ring and gold borders.
- `NightOverlay.tsx`: Draws night arc glow and deterministic star marks.
- `SunArcOverlay.tsx`: Draws daylight zenith glow and sunrise/sunset hour markers.
- `CelestialMarkersOverlay.tsx`: Draws fixed sun and moon markers on the ring.
- `HourLabelsOverlay.tsx`: Draws 24-hour labels and colors them by daylight state.
- `TimeReadout.tsx`: Shows current time and the resolved city sunrise/sunset label.
- `lib/clockGeometry.ts`: Shared polar coordinate math, ring paths, arc paths, and rounded sun-event hour helpers.
- `lib/clockSvgDefs.tsx`: Shared `ClockSvg` wrapper plus reusable clip path and filter definitions.

### `src/components/settings`

Settings and action-menu UI is split into reusable, one-component files:

- `SettingsMenu.tsx`: Composes the city picker and keyboard shortcut behavior.
- `Action.tsx`: Positions an action group.
- `ActionButton.tsx`: Renders a reusable action trigger.
- `ActionShortcutKey.tsx`: Renders the visual keyboard key label used by action triggers.
- `ActionMenu.tsx`: Renders the reusable floating action menu panel.

### Assets and Styles

- `src/styles/tailwind.css` imports Tailwind and is the single CSS entry.
- `src/types/assets.d.ts` declares CSS imports for TypeScript.

### Build Output

`npm run build` runs Parcel into `public/`, then `scripts/inline-output.mjs` replaces generated CSS and JS references with inline `<style>` and `<script>` tags. It also removes generated sibling assets, leaving a standalone `public/index.html`.

Generated folders are ignored by git.

## Design Constraints

- The face and pointer are separate SVG components in the clock layer.
- The animated clock layer rotates as one absolute-positioned group over the fixed face.
- Visual overlays should share geometry helpers to keep the 1200 x 1200 coordinate system consistent.
- Reusable settings/action UI components should live in separate component files, not inside `SettingsMenu.tsx` or bundled together in a multi-component file.
- Domain calculations should stay testable without a browser renderer.
