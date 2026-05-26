import CyberGrid from '../ui/CyberGrid';
import GradientBlobs from '../ui/GradientBlobs';

/**
 * Professional mobile fallback - CSS-only hero background
 * Lightweight alternative to WebGL for mobile devices
 */
const HeroSceneFallback = () => (
  <div className="absolute inset-0 overflow-hidden bg-[#0d0f16]">
    <CyberGrid />
    <GradientBlobs variant="hero" />
    <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
    <div
      className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-cyan-400/15"
      style={{ boxShadow: '0 0 50px rgba(34, 211, 238, 0.12), inset 0 0 30px rgba(139, 92, 246, 0.08)' }}
    />
    <div
      className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-purple/8"
      style={{ animation: 'spin 24s linear infinite' }}
    />
  </div>
);

export default HeroSceneFallback;
