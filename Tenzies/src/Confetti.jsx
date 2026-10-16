const COLORS = [
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
];

const confettiPieces = Array.from({ length: 64 }, (_, index) => {
  const angle = Math.random() * Math.PI * 2;
  const distance = 140 + Math.random() * 360;

  return {
    id: index,
    style: {
      "--x": `${Math.cos(angle) * distance}px`,
      "--y": `${Math.sin(angle) * distance + 180}px`,
      "--delay": `${Math.random() * 180}ms`,
      "--duration": `${1400 + Math.random() * 900}ms`,
      "--color": COLORS[index % COLORS.length],
    },
  };
});

export default function Confetti() {
  return (
    <div className="confetti-layer" aria-hidden="true">
      {confettiPieces.map((piece) => (
        <span className="confetti-piece" key={piece.id} style={piece.style} />
      ))}
    </div>
  );
}
