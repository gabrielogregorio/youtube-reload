import { RefObject, useEffect, useState } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void = () => {},
): { clickedOutside: boolean } => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!ref?.current) {
        return;
      }

      const referencesContainTarget = (): boolean => !ref.current?.contains(event.target as Node);
      const clickedOutsideReference = (ref.current && referencesContainTarget()) || false;

      if (clickedOutsideReference) {
        onOutsideClick();
      }
      setClickedOutside(clickedOutsideReference);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref?.current]);

  return { clickedOutside };
};
