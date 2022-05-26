import { useEffect } from 'react';

/**
 * Hook detects when browsers use an auto-complete to fill in inputs and runs the callback
 * @param callBack: function | callback which runs on auto-complete
 */
export const useHandleAutoComplete = (callBack: (event: Event) => any) => {
  useEffect(() => {
    document.addEventListener('onautocomplete', callBack);
    return () => window.removeEventListener('onautocomplete', callBack);
  }, [callBack]);
};
