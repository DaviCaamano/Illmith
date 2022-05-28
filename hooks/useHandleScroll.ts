import { useCallback, useEffect, useState } from 'react';
import { WheelEvent } from 'react';

export const useHandleScroll = (callback: (event?: WheelEvent) => void) => {
  const handler = useCallback(
    (event?: WheelEvent) => {
      if (callback) callback(event);
    },
    [callback]
  );
  useEffect(() => {
    window.addEventListener('wheel', handler as any);
    return () => window.removeEventListener('wheel', handler as any);
  }, [handler]);
};
