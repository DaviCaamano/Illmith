import { Dispatch, SetStateAction, useCallback, useEffect, useRef, RefObject, MutableRefObject } from 'react';

export const useHandleOutsideClick = (
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>
): RefObject<HTMLDivElement> => {
  const element = useRef<HTMLDivElement>(null);
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (element.current && event.target && !element.current?.contains(event.target as Node)) {
        setState(false);
      }
    },
    [setState]
  );

  // eslint-disable-next-line
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [element, handleClickOutside]);

  return element;
};
