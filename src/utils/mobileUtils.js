import { useState, useEffect } from 'react';

// Hook to detect touch capability
export const useTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
};

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

// Image optimization utility
export const getOptimizedImageUrl = (imageUrl, width = 800) => {
  // Add your image optimization service URL here
  // Example using a hypothetical service:
  // return `https://your-image-service.com/optimize?url=${imageUrl}&width=${width}`;
  return imageUrl;
};

// Check if device is offline
export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}; 