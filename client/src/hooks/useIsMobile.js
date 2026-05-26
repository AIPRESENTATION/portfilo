import { useState, useEffect } from 'react';

/** Detect mobile / low-power devices for 3D fallbacks */
export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.innerWidth < breakpoint;
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(narrow || coarse);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
