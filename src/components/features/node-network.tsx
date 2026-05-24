interface Node {
  id: number;
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  delay: number;
}

interface Edge {
  a: number;
  b: number;
  opacity: number;
}

const NODES: Node[] = [
  { id: 0, x: 50, y: 60, r: 3.5, dx: 4, dy: -5, delay: 0 },
  { id: 1, x: 130, y: 30, r: 2.5, dx: -3, dy: 4, delay: 1.2 },
  { id: 2, x: 210, y: 80, r: 4, dx: 5, dy: 3, delay: 2.4 },
  { id: 3, x: 290, y: 40, r: 2.5, dx: -4, dy: -4, delay: 0.8 },
  { id: 4, x: 100, y: 130, r: 3, dx: 3, dy: 5, delay: 3.0 },
  { id: 5, x: 180, y: 170, r: 4.5, dx: -5, dy: -3, delay: 1.6 },
  { id: 6, x: 270, y: 140, r: 2.5, dx: 4, dy: -5, delay: 2.0 },
  { id: 7, x: 60, y: 220, r: 3, dx: -3, dy: 4, delay: 0.4 },
  { id: 8, x: 150, y: 250, r: 3.5, dx: 5, dy: -4, delay: 2.8 },
  { id: 9, x: 240, y: 230, r: 2.5, dx: -4, dy: 3, delay: 1.0 },
  { id: 10, x: 320, y: 200, r: 3, dx: 3, dy: 5, delay: 2.2 },
  { id: 11, x: 30, y: 110, r: 2.5, dx: -3, dy: -4, delay: 1.8 },
];

const EDGES: Edge[] = [
  { a: 0, b: 1, opacity: 0.5 },
  { a: 0, b: 4, opacity: 0.4 },
  { a: 0, b: 11, opacity: 0.5 },
  { a: 1, b: 2, opacity: 0.6 },
  { a: 1, b: 3, opacity: 0.3 },
  { a: 2, b: 3, opacity: 0.5 },
  { a: 2, b: 5, opacity: 0.4 },
  { a: 2, b: 6, opacity: 0.5 },
  { a: 3, b: 6, opacity: 0.4 },
  { a: 4, b: 5, opacity: 0.6 },
  { a: 4, b: 7, opacity: 0.4 },
  { a: 5, b: 6, opacity: 0.5 },
  { a: 5, b: 8, opacity: 0.5 },
  { a: 6, b: 10, opacity: 0.3 },
  { a: 7, b: 8, opacity: 0.4 },
  { a: 7, b: 11, opacity: 0.5 },
  { a: 8, b: 9, opacity: 0.6 },
  { a: 9, b: 10, opacity: 0.5 },
];

export function NodeNetwork({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 360 280"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="node-violet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="node-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--violet)" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>

      {/* Edges */}
      {EDGES.map((e, i) => {
        const a = NODES[e.a];
        const b = NODES[e.b];
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edge-grad)"
            strokeWidth={0.8}
            opacity={e.opacity}
          />
        );
      })}

      {/* Nodes (with glow halo + core) */}
      {NODES.map((n) => (
        <g
          key={n.id}
          className="node"
          style={
            {
              "--dx": `${n.dx}px`,
              "--dy": `${n.dy}px`,
              animationDelay: `${n.delay}s`,
              transformOrigin: `${n.x}px ${n.y}px`,
            } as React.CSSProperties
          }
        >
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r * 4}
            fill={n.id % 3 === 0 ? "url(#node-cyan)" : "url(#node-violet)"}
            opacity={0.35}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.id % 3 === 0 ? "var(--cyan)" : "var(--violet)"}
          />
        </g>
      ))}
    </svg>
  );
}
