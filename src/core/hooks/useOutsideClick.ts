import { RefObject, useEffect, useState } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void = () => {},
): { clickedOutside: boolean } => {
  const [clickedOutside, setClickedOutside] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!ref.current) {
        return;
      }

      const clickedOutsideReference = !ref.current.contains(event.target as Node);

      if (clickedOutsideReference) {
        onOutsideClick();
      }
      setClickedOutside(clickedOutsideReference);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref.current]);

  return { clickedOutside };
};
