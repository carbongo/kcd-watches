import { CLOCK_CENTER, CLOCK_VIEW_BOX, SUN_ARC_RADIUS } from "./clockGeometry";

const overlayClassName = "pointer-events-none absolute inset-0 h-full w-full";

const RING_WIDTH = 132;
const INNER_BORDER_RADIUS = SUN_ARC_RADIUS - RING_WIDTH / 2;
const OUTER_BORDER_RADIUS = SUN_ARC_RADIUS + RING_WIDTH / 2;
const RING_PATH = getRingPath();

const crackPaths = [
  "M424 120c-10 19 3 31-7 48-7 12-24 12-26 29-2 13 9 19 4 31-5 13-21 15-28 28",
  "M735 111c14 15 5 32 19 47 12 13 31 9 37 25 5 14-4 25 5 38 7 10 21 11 31 18",
  "M820 148c16 11 13 28 30 39 15 9 31 2 41 15 8 11 2 24 13 34 8 8 21 7 32 12",
  "M912 232c18 4 22 22 40 25 17 3 28-9 42 0 12 8 11 22 24 29 10 5 22 1 33 4",
  "M1007 351c18-2 27 13 44 11 14-2 22-15 36-10",
  "M1047 472c17-6 30 6 46 0",
  "M1066 607c17-6 30 7 47 1",
  "M1043 744c20 0 28 16 47 15",
  "M990 853c18 6 20 24 37 31 13 5 25-3 36 7",
  "M905 955c16 11 13 29 28 40 14 10 29 3 39 16",
  "M793 1034c11 16 2 31 14 46",
  "M656 1078c5 18-8 29-4 47",
  "M520 1077c-5 18 8 29 4 47",
  "M391 1031c-12 15-4 31-17 45",
  "M281 952c-17 9-15 27-31 36-14 8-28 0-39 11",
  "M202 845c-19 3-25 20-42 23-14 2-23-9-36-3",
  "M151 718c-18-2-28 12-45 9",
  "M135 588c-18-7-31 5-48-2",
  "M152 459c-18-4-29 9-46 5",
  "M201 333c-19 1-27 17-45 18",
  "M285 228c-18 7-21 25-39 31-13 5-25-4-37 5",
  "M706 153c-13 9-28 2-38 14-8 10-2 22-11 31",
  "M875 286c-15 4-19 19-34 23-12 3-21-6-32 1",
  "M976 520c-14-6-25 5-39 0-11-4-14-17-26-19",
  "M949 752c-15-2-24 11-39 9-12-2-18-13-30-12",
  "M726 1001c-8-13-23-11-31-24-6-10 0-21-8-30",
  "M467 1005c6-14-5-25 1-38 5-11 18-13 22-24",
  "M255 761c15-2 23 11 38 8 12-2 18-15 30-15",
  "M247 502c13 7 25-3 38 4 10 6 12 19 23 23",
];

const hairlineCracks = [
  "M448 154l18-11 10 15 23-5",
  "M562 126l13 19 20-7 17 13",
  "M713 142l-19 13 8 18-16 17",
  "M848 215l-22 4-7 19-23 3",
  "M976 376l-24-6-14 14-21-8",
  "M1012 632l-23 9-2 22-22 8",
  "M929 864l-23-6-15 15-22-4",
  "M757 1004l-19-15-18 9-17-18",
  "M587 1045l-9-23-22-2-8-22",
  "M344 947l18-12-8-20 18-13",
  "M208 696l23-7 4-21 23-5",
  "M223 425l22 5 13-16 22 7",
  "M376 237l15 16 20-9 16 16",
];

export function PlasterArcOverlay() {
  return (
    <svg
      className={overlayClassName}
      viewBox={CLOCK_VIEW_BOX}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="plaster-fill" cx="50%" cy="50%" r="55%">
          <stop offset="55%" stopColor="#f4f1df" />
          <stop offset="82%" stopColor="#ebe7d4" />
          <stop offset="100%" stopColor="#d8d1b6" />
        </radialGradient>

        <linearGradient id="plaster-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.26" />
          <stop offset="0.48" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="1" stopColor="#4a4f60" stopOpacity="0.12" />
        </linearGradient>

        <linearGradient id="gold-border" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff0a7" />
          <stop offset="0.28" stopColor="#d4a52d" />
          <stop offset="0.58" stopColor="#f7d85a" />
          <stop offset="1" stopColor="#8f6416" />
        </linearGradient>

        <clipPath id="plaster-ring-clip">
          <path d={RING_PATH} fillRule="evenodd" clipRule="evenodd" />
        </clipPath>
      </defs>

      <path d={RING_PATH} fill="url(#plaster-fill)" fillRule="evenodd" />
      <path d={RING_PATH} fill="url(#plaster-shade)" fillRule="evenodd" />

      <g clipPath="url(#plaster-ring-clip)">
        <g
          fill="none"
          stroke="#756d5c"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.25"
        >
          {crackPaths.map((path) => (
            <path key={path} d={path} strokeWidth="1.7" />
          ))}
          {hairlineCracks.map((path) => (
            <path key={path} d={path} strokeWidth="0.9" />
          ))}
        </g>
        <g
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.15"
          transform="translate(-1 -1)"
        >
          {crackPaths.map((path) => (
            <path key={path} d={path} strokeWidth="0.8" />
          ))}
        </g>
      </g>

      <g fill="none">
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={OUTER_BORDER_RADIUS}
          stroke="#68480f"
          strokeWidth="7"
          opacity="0.65"
        />
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={OUTER_BORDER_RADIUS - 2}
          stroke="url(#gold-border)"
          strokeWidth="4"
        />
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={INNER_BORDER_RADIUS}
          stroke="#68480f"
          strokeWidth="7"
          opacity="0.65"
        />
        <circle
          cx={CLOCK_CENTER}
          cy={CLOCK_CENTER}
          r={INNER_BORDER_RADIUS + 2}
          stroke="url(#gold-border)"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}

function getRingPath() {
  return [
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - OUTER_BORDER_RADIUS}`,
    `A ${OUTER_BORDER_RADIUS} ${OUTER_BORDER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + OUTER_BORDER_RADIUS}`,
    `A ${OUTER_BORDER_RADIUS} ${OUTER_BORDER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - OUTER_BORDER_RADIUS}`,
    `M ${CLOCK_CENTER} ${CLOCK_CENTER - INNER_BORDER_RADIUS}`,
    `A ${INNER_BORDER_RADIUS} ${INNER_BORDER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER + INNER_BORDER_RADIUS}`,
    `A ${INNER_BORDER_RADIUS} ${INNER_BORDER_RADIUS} 0 1 1 ${CLOCK_CENTER} ${CLOCK_CENTER - INNER_BORDER_RADIUS}`,
  ].join(" ");
}

interface CrackAnchor {
  angle: number;
  branchCount: number;
  drift: number;
  length: number;
  radiusOffset: number;
  seed: number;
  width: number;
}

interface CrackNetwork {
  branches: string[];
  main: string;
  width: number;
}

function makePlasterCrackNetworks() {
  return [
    {
      angle: 252,
      branchCount: 5,
      drift: -24,
      length: 170,
      radiusOffset: -12,
      seed: 11,
      width: 1.35,
    },
    {
      angle: 287,
      branchCount: 4,
      drift: 28,
      length: 132,
      radiusOffset: 22,
      seed: 31,
      width: 1.1,
    },
    {
      angle: 318,
      branchCount: 6,
      drift: -18,
      length: 190,
      radiusOffset: 4,
      seed: 47,
      width: 1.45,
    },
    {
      angle: 354,
      branchCount: 3,
      drift: 16,
      length: 106,
      radiusOffset: -30,
      seed: 71,
      width: 0.95,
    },
    {
      angle: 24,
      branchCount: 5,
      drift: -30,
      length: 156,
      radiusOffset: 18,
      seed: 89,
      width: 1.22,
    },
    {
      angle: 58,
      branchCount: 4,
      drift: 24,
      length: 122,
      radiusOffset: -6,
      seed: 113,
      width: 1.02,
    },
    {
      angle: 96,
      branchCount: 6,
      drift: 12,
      length: 184,
      radiusOffset: 14,
      seed: 149,
      width: 1.38,
    },
    {
      angle: 139,
      branchCount: 3,
      drift: -22,
      length: 118,
      radiusOffset: -24,
      seed: 173,
      width: 1,
    },
    {
      angle: 177,
      branchCount: 5,
      drift: 26,
      length: 164,
      radiusOffset: 26,
      seed: 211,
      width: 1.24,
    },
    {
      angle: 213,
      branchCount: 4,
      drift: -12,
      length: 128,
      radiusOffset: 2,
      seed: 263,
      width: 0.98,
    },
  ].map((anchor) => makePlasterCrackNetwork(anchor));
}

function makePlasterCrackNetwork(anchor: CrackAnchor): CrackNetwork {
  const random = createSeededRandom(anchor.seed);
  const centerAngle = degreesToRadians(anchor.angle);
  const centerRadius = clamp(
    SUN_ARC_RADIUS + anchor.radiusOffset,
    INNER_BORDER_RADIUS + 18,
    OUTER_BORDER_RADIUS - 18,
  );
  const segmentCount = randomInt(6, 10, random);
  const localPoints = Array.from({ length: segmentCount + 1 }, (_, index) => {
    const progress = index / segmentCount;
    const tangent =
      lerp(-anchor.length / 2, anchor.length / 2, progress) +
      (random() - 0.5) * 20;
    const radial =
      lerp(0, anchor.drift, progress) +
      Math.sin(progress * Math.PI * 2 + random() * 0.7) * 10 +
      (random() - 0.5) * 16;

    return { radial, tangent };
  });

  const branches = Array.from({ length: anchor.branchCount }, () => {
    const startIndex = randomInt(1, localPoints.length - 2, random);
    const startPoint = localPoints[startIndex];

    if (startPoint === undefined) {
      return "";
    }

    return makeNetworkBranch(startPoint, centerAngle, centerRadius, random);
  });

  return {
    branches,
    main: pointsToPath(
      localPoints.map((point) =>
        localToClockPoint(point, centerAngle, centerRadius),
      ),
    ),
    width: anchor.width,
  };
}

function makeNetworkBranch(
  startPoint: LocalPoint,
  centerAngle: number,
  centerRadius: number,
  random: () => number,
) {
  const points = [startPoint];
  const segmentCount = randomInt(2, 4, random);
  const tangentDirection = random() > 0.5 ? 1 : -1;
  const radialDirection = random() > 0.5 ? 1 : -1;
  let currentPoint = startPoint;

  for (let index = 0; index < segmentCount; index += 1) {
    currentPoint = {
      radial: currentPoint.radial + radialDirection * (10 + random() * 18),
      tangent:
        currentPoint.tangent +
        tangentDirection * (10 + random() * 24) +
        (random() - 0.5) * 14,
    };
    points.push(currentPoint);
  }

  return pointsToPath(
    points.map((point) => localToClockPoint(point, centerAngle, centerRadius)),
  );
}

interface LocalPoint {
  radial: number;
  tangent: number;
}

interface ClockPoint {
  x: number;
  y: number;
}

function localToClockPoint(
  { radial, tangent }: LocalPoint,
  centerAngle: number,
  centerRadius: number,
) {
  const radius = clamp(
    centerRadius + radial,
    INNER_BORDER_RADIUS + 10,
    OUTER_BORDER_RADIUS - 10,
  );

  return polarPoint(centerAngle + tangent / centerRadius, radius);
}

function pointsToPath(points: ClockPoint[]) {
  const [firstPoint, ...remainingPoints] = points;

  if (firstPoint === undefined) {
    return "";
  }

  return [
    `M${formatPoint(firstPoint.x)} ${formatPoint(firstPoint.y)}`,
    ...remainingPoints.map(
      (point) => `L${formatPoint(point.x)} ${formatPoint(point.y)}`,
    ),
  ].join(" ");
}

function polarPoint(angle: number, radius: number) {
  return {
    x: CLOCK_CENTER + Math.cos(angle) * radius,
    y: CLOCK_CENTER + Math.sin(angle) * radius,
  };
}

function degreesToRadians(degrees: number) {
  return (degrees / 180) * Math.PI;
}

function createSeededRandom(seed: number) {
  let value = seed;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;

    return value / 4294967296;
  };
}

function randomInt(min: number, max: number, random: () => number) {
  return Math.floor(lerp(min, max + 1, random()));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatPoint(value: number) {
  return value.toFixed(1);
}
