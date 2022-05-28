import { useCallback, useEffect, useRef, useState } from 'react';

const TIMEOUT_DURATION = 20000;
//types
import { UserScreen } from '@contexts';
import { TransformProperties } from 'framer-motion/types/motion/types';

export interface Animation {
  initial?: TransformProperties;
  animate?: TransformProperties;
  exit?: TransformProperties;
  transition: { duration: number };
}

export interface userModalErrors {
  loginError: string;
  registerError: string;
  resetPasswordError: string;
  newPasswordError: string;
  setLoginError: (x: string) => void;
  setRegisterError: (x: string) => void;
  setResetPasswordError: (x: string) => void;
  setNewPasswordError: (x: string) => void;
}
export enum SlideDirection {
  none = 'NONE',
  left = 'LEFT',
  right = 'RIGHT',
}

interface UserModalAnimationState {
  direction: SlideDirection;
  error: string;
}
export const useUserModalAnimations = (
  screen: UserScreen,
  {
    loginError,
    registerError,
    resetPasswordError,
    newPasswordError,
    setLoginError,
    setRegisterError,
    setResetPasswordError,
    setNewPasswordError,
  }: userModalErrors
): [Animation, string | undefined] => {
  /** Modal animation state */
  let stickyScreenRef = useRef<UserScreen>(UserScreen.none);
  let [state, setState] = useState<UserModalAnimationState>({
    direction: SlideDirection.left,
    error: '',
  });

  /** Error popup state */
  const interval = useRef<number | null>(null);
  const expiredError = useRef<string | null>(null);

  const cancelTimeout = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  const setNewError = useCallback(
    (newError: string) => {
      if (interval.current) {
        clearInterval(interval.current);
      }
      setState((prevState: UserModalAnimationState) => ({
        ...prevState,
        error: newError,
      }));
      setTimeout(() => {
        expiredError.current = newError;
        setState((prevState: UserModalAnimationState) => ({
          ...prevState,
          error: '',
        }));

        const stateSetter =
          screen === UserScreen.login
            ? setLoginError
            : screen === UserScreen.register
            ? setRegisterError
            : screen === UserScreen.password
            ? setResetPasswordError
            : screen === UserScreen.new_password
            ? setNewPasswordError
            : undefined;
        if (stateSetter) {
          stateSetter('');
        }
      }, TIMEOUT_DURATION);
    },
    [screen, setLoginError, setNewPasswordError, setResetPasswordError, setRegisterError]
  );

  /**
   * Sets the direction based on what user page the modal is showing and what page is replacing the current page.
   * For example: If a user presses Sign Up, the login_user page gets replaced by the register_user page
   * The animation for this is a slide in the LEFT direction
   *
   * Also remove any existing errors when the screen changes.
   */
  useEffect(() => {
    const { current: stickyScreen } = stickyScreenRef;
    if (screen !== stickyScreen) {
      stickyScreenRef.current = screen;
      setState({
        direction:
          screen === UserScreen.register || screen === UserScreen.password ? SlideDirection.right : SlideDirection.left,
        error: '',
      });
      expiredError.current = null;
      cancelTimeout();
      if (loginError && setLoginError) {
        setLoginError('');
      }
      if (registerError && setRegisterError) {
        setRegisterError('');
      }
      if (resetPasswordError && setResetPasswordError) {
        setResetPasswordError('');
      }
      if (newPasswordError && setNewPasswordError) {
        setNewPasswordError('');
      }
    }
  }, [
    cancelTimeout,
    loginError,
    newPasswordError,
    resetPasswordError,
    screen,
    setLoginError,
    setNewPasswordError,
    setResetPasswordError,
    setRegisterError,
    registerError,
  ]);

  useEffect(() => {
    const external =
      screen === UserScreen.login
        ? loginError
        : screen === UserScreen.register
        ? registerError
        : screen === UserScreen.password
        ? resetPasswordError
        : screen === UserScreen.new_password
        ? newPasswordError
        : undefined;
    const { error: internal } = state;
    const expired = expiredError.current;

    const errorUpdatedToNewValue =
      external && (internal !== external || (!internal && expired && external !== expired));
    if (errorUpdatedToNewValue) {
      setNewError(external);
    } else if (internal && !external) {
      cancelTimeout();
      setState((prevState: UserModalAnimationState) => ({
        ...prevState,
        error: '',
      }));
    }
  }, [cancelTimeout, loginError, newPasswordError, resetPasswordError, screen, setNewError, state, registerError]);
  return [
    {
      initial: {
        x: stickyScreenRef.current === UserScreen.none ? 0 : state.direction === SlideDirection.left ? 1000 : -1000,
      },
      animate: { x: 0 },
      exit: { x: screen === UserScreen.none ? 0 : state.direction === SlideDirection.left ? -1000 : 1000 },
      transition: { duration: 0.3333 },
    },
    state.error,
  ];
};
