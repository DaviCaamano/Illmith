import { useCallback, useEffect, useRef, useState } from 'react';
import { Animation } from '@hooks';
import { UserScreen } from '@contexts';

export enum VisibleInputs {
  user = 'USER',
  pass = 'PASS',
}

export interface UserRegistrationAnimations {
  visibleInput: VisibleInputs;
  userAnimation: Animation;
  passwordAnimation: Animation;
}

export interface UseRegistrationScreenAnimationsProps {
  userInputShown: boolean;
  passwordInputShown: boolean;
  userAnimation: Animation;
  passwordAnimation: Animation;
  showUserInputs: () => void;
  showPasswordInputs: () => void;
}
export const useUserRegistrationAnimations = (screen: UserScreen): UseRegistrationScreenAnimationsProps => {
  const [{ visibleInput, userAnimation, passwordAnimation }, setVisibleInput] = useState<UserRegistrationAnimations>({
    visibleInput: VisibleInputs.user,
    userAnimation: animateUser(VisibleInputs.user, UserScreen.login),
    passwordAnimation: animatePassword(VisibleInputs.user),
  });
  const stickyVisibleRef = useRef<VisibleInputs>(VisibleInputs.user);
  useEffect(() => {
    const { current: stickVisible } = stickyVisibleRef;
    if (visibleInput !== stickVisible) {
      setVisibleInput({
        visibleInput,
        userAnimation: animateUser(visibleInput, screen),
        passwordAnimation: animatePassword(visibleInput),
      });
    }
  }, [screen, visibleInput]);
  const showUserInputs = useCallback(() => {
    setVisibleInput((prevState: UserRegistrationAnimations) => ({ ...prevState, visibleInput: VisibleInputs.user }));
  }, []);
  const showPasswordInputs = useCallback(() => {
    setVisibleInput((prevState: UserRegistrationAnimations) => ({ ...prevState, visibleInput: VisibleInputs.pass }));
  }, []);

  return {
    userAnimation,
    passwordAnimation,
    userInputShown: visibleInput === VisibleInputs.user,
    passwordInputShown: visibleInput === VisibleInputs.pass,
    showUserInputs,
    showPasswordInputs,
  };
};

const animateUser = (input: VisibleInputs, screen: UserScreen): Animation => ({
  initial: { x: screen === UserScreen.login || input === VisibleInputs.user ? 0 : -1000 },
  animate: { x: screen === UserScreen.login || input === VisibleInputs.pass ? 0 : -1000 },
  exit: { x: -1000 },
  transition: { duration: 0.3333 },
});

const animatePassword = (input: VisibleInputs): Animation => ({
  initial: { x: 1000 },
  animate: { x: input === VisibleInputs.pass ? 0 : 1000 },
  exit: { x: 1000 },
  transition: { duration: 0.3333 },
});
