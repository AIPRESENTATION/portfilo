/** Subtle cyber grid background - professional and minimal */
const CyberGrid = ({ className = '' }) => (
  <div
    className={`pointer-events-none absolute inset-0 opacity-[0.25] ${className}`}
    aria-hidden
    style={{
      backgroundImage: `
        linear-gradient(rgba(59, 130, 246, 0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.06) 1px, transparent 1px)
      `,
      backgroundSize: '56px 56px',
      maskImage: 'radial-gradient(ellipse 75% 65% at 50% 50%, black 25%, transparent 70%)',
    }}
  />
);

export default CyberGrid;
