// hooks/useWindowSize.ts
'use client';

import { useState, useEffect } from 'react';

export function useWindowSize() {
  // Initialize state with undefined so server and client match on initial render
  const [windowSize, setWindowSize] = useState<{ width: number | undefined }>({
    width: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({ width: window.innerWidth });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect only runs on mount

  return windowSize;
}
