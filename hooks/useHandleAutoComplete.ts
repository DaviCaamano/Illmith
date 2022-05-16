import { useEffect } from 'react';

export const useHandleAutoComplete = (callBack: (event: Event) => any) => {
  useEffect(() => {
    document.addEventListener('onautocomplete', callBack);
    return () => window.removeEventListener('onautocomplete', callBack);
  }, [callBack]);
};
