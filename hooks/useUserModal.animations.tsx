import { MutableRefObject, useEffect, useRef, useState } from 'react';

//types
import { UserScreen } from '@contexts';
import { TransformProperties } from 'framer-motion/types/motion/types';

export interface Animation {
  initial?: TransformProperties;
  animate?: TransformProperties;
  exit?: TransformProperties;
  transition: { duration: number };
}
export enum SlideDirection {
  none = 'NONE',
  left = 'LEFT',
  right = 'RIGHT',
}
export const useUserModalAnimations = (screen: UserScreen): Animation => {
  let stickyScreenRef: MutableRefObject<UserScreen> = useRef<UserScreen>(UserScreen.none);
  let [direction, setDirection] = useState<SlideDirection>(SlideDirection.left);

  /**
   * Sets the direction based on what user page the modal is showing and what page is replacing the current page.
   * For example: If a user presses Sign Up, the login_user page gets replaced by the register_user page
   * The animation for this is a slide in the LEFT direction
   */
  useEffect(() => {
    const { current: stickyScreen } = stickyScreenRef;
    if (screen !== stickyScreen) {
      stickyScreenRef.current = screen;
      setDirection(() => {
        switch (screen) {
          case UserScreen.login:
            return SlideDirection.left;
          case UserScreen.register:
            return SlideDirection.right;
          case UserScreen.password:
            return SlideDirection.right;
          default:
            return SlideDirection.left;
        }
      });
    }
  }, [screen, stickyScreenRef]);

  return {
    initial: { x: stickyScreenRef.current === UserScreen.none ? 0 : direction === SlideDirection.left ? 1000 : -1000 },
    animate: { x: 0 },
    exit: { x: screen === UserScreen.none ? 0 : direction === SlideDirection.left ? -1000 : 1000 },
    transition: { duration: 0.3333 },
  };
};
