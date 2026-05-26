import { lazy, Suspense } from 'react';
import HeroSceneFallback from './HeroSceneFallback';

// Lazy-load WebGL hero — keeps initial bundle smaller
const HeroScene = lazy(() => import('./HeroScene'));

/**
 * Wrapper: Suspense + fallback while 3D chunk loads
 */
const HeroSceneLazy = ({ scrollY, particleCount }) => (
  <Suspense fallback={<HeroSceneFallback />}>
    <HeroScene scrollY={scrollY} particleCount={particleCount} />
  </Suspense>
);

export default HeroSceneLazy;
