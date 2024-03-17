import { useCallback, useEffect, useState } from 'react';
import { getData, storeData } from '../library';

const KEY = 'pausepopup-2024-03-17';

export const usePausePopup = () => {
  const [isOpen, setOpen] = useState<'open' | 'close'>('close');

  useEffect(() => {
    (async () => {
      const init = await getData(KEY);

      if (init === 'open' || init === 'close') {
        setOpen(init);
      } else {
        await storeData(KEY, 'open');
        setOpen('open');
      }
    })();
  }, []);

  const close = useCallback(async () => {
    await storeData(KEY, 'close');
    setOpen('close');
  }, []);

  return { isOpen: isOpen === 'open', close };
};
