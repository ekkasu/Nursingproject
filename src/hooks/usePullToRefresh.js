import { useState } from 'react';

// Hook for pull-to-refresh functionality
export const usePullToRefresh = (onRefresh) => {
  const [startY, setStartY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const threshold = 150; // pixels to pull down

  const handleTouchStart = (e) => {
    const { pageY } = e.touches[0];
    setStartY(pageY);
  };

  const handleTouchMove = async (e) => {
    const { pageY } = e.touches[0];
    const pullDistance = pageY - startY;

    if (window.scrollY === 0 && pullDistance > threshold && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
    },
    refreshing,
  };
}; 