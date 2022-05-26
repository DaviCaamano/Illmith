import { Dispatch, SetStateAction, useCallback, useEffect, RefObject } from 'react';

export const useHandleOutsideClick = (
  setState: Dispatch<SetStateAction<boolean>>,
  toggleMenuRefs: RefObject<HTMLDivElement>[] | RefObject<HTMLDivElement>
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => clickIsOutsideRefs(toggleMenuRefs, event) && setState(false),
    [setState, toggleMenuRefs]
  );

  // eslint-disable-next-line
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);
};

//determines if the array of refs (or single ref) was clicked outside of
const clickIsOutsideRefs = (ref: RefObject<HTMLDivElement>[] | RefObject<HTMLDivElement>, event: MouseEvent) =>
  !(Array.isArray(ref) ? ref : [ref])
    .map((currentRef: RefObject<HTMLDivElement>) => currentRef.current?.contains(event.target as Node))
    .reduce((prev?: boolean, current?: boolean) => prev || current);
