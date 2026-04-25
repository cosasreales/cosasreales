"use client";

// Renders a repeating text label around a circular path using SVG textPath.
// Optionally animates a slow rotation.

interface Props {
  text: string;
  repeat?: number;
  radius?: number; // % of viewBox (100)
  size?: number; // font-size in px (rendered inside svg)
  rotate?: boolean;
  className?: string;
  opacity?: number;
}

export default function CircleText({
  text,
  repeat = 16,
  radius = 45,
  size = 11,
  rotate = false,
  className = "",
  opacity = 1,
}: Props) {
  const full = Array(repeat).fill(text).join("  ◈  ") + "  ◈  ";
  const id = `circle-path-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${rotate ? "animate-spin-slow" : ""} ${className}`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path
            id={id}
            d={`M 50,50 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>
        <text
          fill="currentColor"
          style={{ fontSize: size, letterSpacing: "0.18em" }}
          fontWeight={500}
        >
          <textPath href={`#${id}`} startOffset="0%">
            {full}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
