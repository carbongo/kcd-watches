# AGENTS.md

Guidance for LLM agents working in this repository.

## Project

KCD Watches is a small React, TypeScript, Tailwind CSS, and Parcel app that renders a Kingdom Come: Deliverance inspired clock. Production output is a single inlined `public/index.html` file.

## Commands

- Install: `npm install`
- Dev server: `npm run start`
- Type check: `npm run typecheck`
- Production build: `npm run build`

Run `npm run typecheck` after TypeScript or React changes. Run `npm run build` after build pipeline, asset import, or packaging changes.

## Structure

- `src/main.tsx`: React root bootstrap and global body/root classes.
- `src/app/App.tsx`: Application shell.
- `src/components/clock/`: Clock rendering components and SVG helpers.
- `src/components/clock/clockGeometry.ts`: Shared SVG coordinate, ring, arc, and hour geometry.
- `src/components/clock/clockSvgDefs.tsx`: Shared SVG wrapper and reusable SVG definitions.
- `src/components/settings/`: Settings and reusable action-menu UI components.
- `src/domain/`: Framework-independent time, sun, and timezone logic.
- `src/hooks/useNow.ts`: One-second clock tick hook.
- `src/images/`: Dial and arrow PNG assets, imported as Parcel data URLs.
- `src/styles/tailwind.css`: Tailwind entry file.
- `scripts/inline-output.mjs`: Inlines Parcel CSS/JS into `public/index.html` and removes sibling assets.

## Editing Rules

- Keep domain logic free of React and DOM dependencies.
- Put shared clock drawing math in `clockGeometry.ts`, not in individual overlays.
- Put reusable SVG wrappers/defs in `clockSvgDefs.tsx`.
- Avoid cross-importing one visual overlay from another. Shared helpers should move to neutral modules.
- Keep reusable settings/action UI as separate component files under `src/components/settings/`; do not define them inside `SettingsMenu.tsx` or bundle multiple reusable components into one file.
- Preserve the standalone file build: image imports use `data-url:` and the build script inlines generated CSS/JS.
- Do not commit generated folders such as `public/`, `dist/`, `.parcel-cache/`, or `node_modules/`.
- Use ASCII text unless a file already requires another character set.

## Review Checklist

- `npm run typecheck` passes.
- `npm run build` succeeds when packaging or asset behavior changed.
- The clock still renders with the face image, rotating overlay ring, fixed pointer image, time readout, and sun window label.
- Sunrise/sunset changes remain in `src/domain/sun.ts` or `src/domain/timeZones.ts`, with rendering code consuming the resulting `SunWindow`.
