import { TransformProperties } from 'framer-motion/types/motion/types';

/**
 * {
 *     initial: { x: 0 },   //Position when unmounted
 *     animate: { x: 0 },   //Position it moves towards from initial after being mounted
 *     exit: { x: 0 },      //Position it moves towards from animate after being unmounted
 *   }
 */
export interface ModalAnimations {
  initial?: TransformProperties;
  animate?: TransformProperties;
  exit?: TransformProperties;
}
type UserModalAnimationKeys = 'none' | 'enterLeft' | 'enterRight' | 'exitLeft' | 'exitRight';
export const userModalAnimations: Record<UserModalAnimationKeys, ModalAnimations> = {
  none: {
    initial: { x: 0 },
    animate: { x: 0 },
    exit: { x: 0 },
  },
  enterLeft: {
    initial: { x: '-200%' },
    animate: { x: 0 },
  },
  enterRight: {
    initial: { x: '200%' },
    animate: { x: 0 },
  },
  exitLeft: {
    animate: { x: 0 },
    exit: { x: '-200%' },
  },
  exitRight: {
    animate: { x: 0 },
    exit: { x: '200%' },
  },
};
