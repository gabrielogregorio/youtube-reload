import { useEffect } from 'react';

export const useOnUnmount = (callback: () => void) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};
