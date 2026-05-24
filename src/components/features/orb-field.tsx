export function OrbField() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="orb orb-a"
        style={{
          left: "-10%",
          top: "-20%",
          width: "60%",
          height: "60%",
        }}
      />
      <div
        className="orb orb-b"
        style={{
          right: "-10%",
          bottom: "-20%",
          width: "55%",
          height: "55%",
        }}
      />
    </div>
  );
}
