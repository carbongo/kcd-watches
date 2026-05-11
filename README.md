# KCD Watches
"Henry comes to see us!"

Kingdom Come: Deliverance inspired watches. 

Not affiliated with Warhorse Studios.

![KCD Watches screenshot](https://i.imgur.com/RIS5p7X.png)

The experimental build uses Parcel, React, TypeScript, Tailwind CSS, and Parcel's SWC-backed JavaScript/TypeScript transformer.

The clock now renders a dynamic sun-time arc over the rotating dial. The arc spans sunrise to sunset for the browser's resolved IANA timezone city, using local solar calculations and a timezone-to-city coordinate map in `src/domain/timeZones.ts`.

Production output is a standalone `public/index.html` file. It can be opened directly from the filesystem without a local server.

## Usage
### 1. Install dependencies
```npm i```
### 2. Start Parcel dev server
```npm run start```
### or build 
```npm run build```
### type-check
```npm run typecheck```

## Packaging
* ***src*** -- main source folder
* * ***app*** -- application shell
* * ***components*** -- React components
* * ***domain*** -- framework-independent time, timezone, and sun calculations
* * ***hooks*** -- React hooks
* * ***styles*** -- Tailwind entry and shared CSS
* * ***index.html*** -- HTML entry
* * ***main.tsx*** -- React entry
* ***package.json*** -- project info and dependencies list
* ***tsconfig.json*** -- TypeScript configuration
