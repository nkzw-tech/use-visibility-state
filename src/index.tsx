import createContextHook from '@nkzw/create-context-hook';
import { useDeferredValue, useEffect, useState } from 'react';

const [VisibilityStateContext, useVisibilityStateHook] = createContextHook(
  () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const onChange = () => {
        const newState = document.visibilityState !== 'hidden';
        if (newState !== isVisible) {
          setIsVisible(newState);
        }
      };

      const setVisible = () => {
        if (!isVisible) {
          setIsVisible(true);
        }
      };

      if (document.visibilityState === 'hidden') {
        // When the system goes to sleep, sometimes the `visibilitychange` event is not fired.
        // In that case, we can use `mouseenter` or `keydown` to detect when the window is focused.
        document.addEventListener('mouseenter', setVisible);
        document.addEventListener('keydown', setVisible);
      }
      document.addEventListener('visibilitychange', onChange);
      return () => {
        document.removeEventListener('visibilitychange', onChange);
        document.removeEventListener('mouseenter', setVisible);
        document.removeEventListener('keydown', setVisible);
      };
    }, [isVisible]);

    return isVisible;
  },
);

export default function useVisibilityState(
  onVisibilityChange?: (isVisible: boolean) => void,
) {
  const isVisible = useVisibilityStateHook();
  const previousVisibility = useDeferredValue(isVisible);

  useEffect(() => {
    if (previousVisibility !== isVisible) {
      onVisibilityChange?.(isVisible);
    }
  }, [isVisible, onVisibilityChange, previousVisibility]);

  return isVisible;
}

export { VisibilityStateContext };
