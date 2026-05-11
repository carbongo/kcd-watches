# AGENTS.md

Guidance for LLM agents working in this repository.

## Project

Bohemian Day Clock is a small React, TypeScript, Tailwind CSS, and Parcel app that renders a custom-drawn 24-hour clock with a medieval-inspired visual treatment. Production output is a single inlined `public/index.html` file.

## Commands

- Install: `npm install`
- Dev server: `npm run start`
- Type check: `npm run typecheck`
- Production build: `npm run build`

Run `npm run typecheck` after TypeScript or React changes. Run `npm run build` after build pipeline, asset import, or packaging changes.

## Structure

- `src/main.tsx`: React root bootstrap and global body/root classes.
- `src/app/App.tsx`: Application shell.
- `src/components/clock/`: Clock rendering components.
- `src/components/clock/lib/clockGeometry.ts`: Shared SVG coordinate, ring, arc, and hour geometry.
- `src/components/clock/lib/clockSvgDefs.tsx`: Shared SVG wrapper and reusable SVG definitions.
- `src/components/actions/`: Reusable action-menu UI components.
- `src/components/settings/`: Settings menu and city picker UI.
- `src/domain/`: Framework-independent time, sun, and timezone logic.
- `src/hooks/useNow.ts`: One-second clock tick hook.
- `src/styles/tailwind.css`: Tailwind entry file.
- `scripts/inline-output.mjs`: Inlines Parcel CSS/JS into `public/index.html` and removes sibling assets.

## Editing Rules

- Keep domain logic free of React and DOM dependencies.
- Put shared clock drawing math in `src/components/clock/lib/clockGeometry.ts`, not in individual overlays.
- Put reusable SVG wrappers/defs in `src/components/clock/lib/clockSvgDefs.tsx`.
- Avoid cross-importing one visual overlay from another. Shared helpers should move to neutral modules.
- Keep reusable action UI as separate component files under `src/components/actions/`; do not define them inside `SettingsMenu.tsx` or bundle multiple reusable components into one file.
- Preserve the standalone file build: clock visuals are rendered as SVG/React components and the build script inlines generated CSS/JS.
- When making structurally significant changes, update `AGENTS.md` in the same change and refresh `ARCHITECTURE.md` or `README.md` if their module maps, build notes, or maintainer guidance become stale.
- Do not commit generated folders such as `public/`, `dist/`, `.parcel-cache/`, or `node_modules/`.
- Use ASCII text unless a file already requires another character set.

## Review Checklist

- `npm run typecheck` passes.
- `npm run build` succeeds when packaging or asset behavior changed.
- The clock still renders with the SVG face, rotating overlay ring, fixed SVG pointer, time readout, and sun window label.
- Sunrise/sunset changes remain in `src/domain/sun.ts` or `src/domain/timeZones.ts`, with rendering code consuming the resulting `SunWindow`.
