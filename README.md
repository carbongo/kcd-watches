# KCD Watches

KCD Watches is a Kingdom Come: Deliverance I/II inspired 24-hour clock for the browser. It combines a static dial and pointer with SVG overlays for hour labels, day/night arcs, celestial markers, and a live local-time readout.

Not affiliated with Warhorse Studios.

![KCD Watches screenshot](https://i.imgur.com/RIS5p7X.png)

## Features

- Live 24-hour clock dial with a rotating overlay layer.
- Dynamic daylight and night arcs.
- Sunrise and sunset labels based on the browser's resolved IANA timezone.
- Framework-independent solar calculations in `src/domain`.
- Standalone production output as `public/index.html`.

## Quick Start

```sh
npm install
npm run start
```

Parcel serves the app at `http://localhost:8000`.

## Scripts

```sh
npm run start
npm run typecheck
npm run build
```

- `start`: runs the Parcel dev server.
- `typecheck`: runs TypeScript without emitting files.
- `build`: builds to `public/`, then inlines generated CSS and JS into `public/index.html`.

The built HTML file can be opened directly from the filesystem without a local server.

## Project Layout

```text
src/
  app/                 React app shell
  components/clock/    Clock renderer, SVG overlays, and shared drawing helpers
  domain/              Pure time, timezone, and solar calculations
  hooks/               React hooks
  images/              Dial and pointer assets
  styles/              Tailwind entry CSS
  index.html           Parcel HTML entry
  main.tsx             React bootstrap
scripts/
  inline-output.mjs    Single-file production output helper
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full stack and module map. See [AGENTS.md](./AGENTS.md) for maintainer and LLM-agent guidance.

## Contributing

Issues and pull requests are welcome. Keep changes focused, run `npm run typecheck`, and run `npm run build` when changing assets or build behavior.

Generated folders such as `public/`, `dist/`, `.parcel-cache/`, and `node_modules/` are intentionally ignored.

## License

ISC, as declared in [package.json](./package.json).
