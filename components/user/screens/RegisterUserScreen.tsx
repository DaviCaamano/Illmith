//component
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { InputError } from '@components/inputError';
import { Span } from '@components/shared';

//hooks
import { useCallback, useEffect, useRef } from 'react';
import { useUserRegistrationAnimations } from '@hooks/user/useUserRegistrationAnimations';

//types
import { Dispatch, SetStateAction } from 'react';
import { UserScreen } from '@contexts';
import {
  RegisterUserError,
  RegisterUserInputHandlers,
  RegisterUserState,
  RegisterUserValidators,
  useHandleAutoComplete,
} from '@hooks';
import { validatePassword } from '@utils/user';
import { PasswordInput } from '@components/user';

const MotionDiv = motion.div;

interface RegisterUserScreenProps {
  form: RegisterUserState;
  setForm: Dispatch<SetStateAction<RegisterUserState>>;
  setModal: (screen?: UserScreen) => void;
  handleUserRegistration: () => void;
  screen: UserScreen;
  inputHandlers: RegisterUserInputHandlers;
  validators: RegisterUserValidators;
}
export const RegisterUserScreen = ({
  form: {
    username,
    email,
    password,
    subscribe,
    error: { username: usernameWarning, password: passwordWarning, email: emailWarning },
    passwordValidation,
  },
  setForm,
  setModal,
  handleUserRegistration: onSubmit,
  screen,
  inputHandlers: { handlePassword, handleInput },
  validators: { handleEmail, handleUsername },
}: RegisterUserScreenProps) => {
  const { hasSixCharacters, hasCorrectCase, hasNumber } = passwordValidation;
  const userRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { userAnimation, passwordAnimation, userInputShown, passwordInputShown, showUserInputs, showPasswordInputs } =
    useUserRegistrationAnimations(screen);

  useHandleAutoComplete(
    useCallback(
      (event: Event) => {
        // @ts-ignore
        if (event.target?.hasAttribute('autocompleted')) {
          if (passwordRef?.current?.value && passwordRef?.current?.value !== password) {
            handlePassword(validatePassword(passwordRef?.current?.value));
          } else {
            setForm((prevState: RegisterUserState) => ({
              ...prevState,
              email: emailRef?.current?.value || prevState.email,
              username: userRef?.current?.value || prevState.username,
            }));
          }
        }
      },
      [handlePassword, setForm] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );

  const setPasswordWarning = useCallback(errorSetter('password', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps
  const setEmailWarning = useCallback(errorSetter('email', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps
  const setUsernameWarning = useCallback(errorSetter('username', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps

  const disableSubmit =
    (userInputShown && !email) || (!userInputShown && (!hasSixCharacters || !hasCorrectCase || !hasNumber));

  const onSubmitClick = () => {
    if (userInputShown) {
      if (handleEmail() && handleUsername()) {
        showPasswordInputs();
      } else {
        showUserInputs();
      }
    }
    // if passwordInputShown === true
    else {
      if (!handleEmail() || !handleUsername()) {
        showUserInputs();
      } else if (validatePassword(password)) {
        onSubmit();
      }
    }
  };

  useEffect(() => {
    if ((usernameWarning || emailWarning) && passwordInputShown) {
      showUserInputs();
    } else if (passwordWarning && userInputShown) {
      showPasswordInputs();
    }
  }, [
    emailWarning,
    passwordInputShown,
    passwordWarning,
    showPasswordInputs,
    showUserInputs,
    userInputShown,
    usernameWarning,
  ]);

  return (
    <Box id={'username-registration-screen'} padding={'0.9375rem 1.5625rem'} pos={'absolute'} w={'40.375rem'}>
      <Box id={'user-registration-title-positioner'} pos={'relative'} w={'full'}>
        <Flex
          className={'user-registration-title-row'}
          position={'absolute'}
          w={'full'}
          justify={'center'}
          align={'center'}
          mb={'1.875rem'}
          fontSize={'1.875rem'}
          fontWeight={'bolder'}
        >
          {'Create an Account'}
        </Flex>
      </Box>
      <Box className={'user-registration-spacer'} h={'2rem'} />
      <Box id={'user-registration-input-container'} pos={'relative'} h={'12rem'} w={'full'}>
        <AnimatePresence>
          {userInputShown && (
            <MotionDiv
              key={'user-registration-user-inputs'}
              {...userAnimation}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <label htmlFor="user-registration-email-input" style={{ height: '1.875rem' }}>
                Email
              </label>
              <InputError error={emailWarning} setError={setEmailWarning} style={{ marginBottom: '0.625rem' }}>
                <Input
                  id={'user-registration-email-input'}
                  type={'text'}
                  name={'email'}
                  value={email}
                  onChange={handleInput}
                  ref={emailRef}
                  variant={'modal'}
                />
              </InputError>
              <label htmlFor="user-registration-username-input" style={{ height: '1.875rem' }}>
                Username (Optional)
              </label>
              <InputError error={usernameWarning} setError={setUsernameWarning}>
                <Input
                  id={'user-registration-username-input'}
                  type={'text'}
                  name={'username'}
                  value={username}
                  onChange={handleInput}
                  ref={userRef}
                  variant={'modal'}
                />
              </InputError>
              <Flex
                h={'2.375rem'}
                justify={userInputShown ? 'start' : 'center'}
                align={'center'}
                fontSize={'1.25rem'}
                color={'red'}
                px={4}
              >
                {userInputShown && (
                  <label>
                    <input type="checkbox" checked={subscribe} onChange={handleInput} name="subscribe" />
                    <Span fontSize={['0.66rem', '0.75rem', '0.875rem', '1rem']} color={'black'} fontWeight={'normal'}>
                      &nbsp; Send me Illmith news and updates
                    </Span>
                  </label>
                )}
              </Flex>
            </MotionDiv>
          )}
          {passwordInputShown && (
            <MotionDiv
              key={'user-registration-password-inputs'}
              {...passwordAnimation}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              <PasswordInput
                id={'user-registration-password-input'}
                error={passwordWarning}
                setError={setPasswordWarning}
                password={password}
                handleInput={handlePassword}
                inputRef={passwordRef}
                passwordValidation={passwordValidation}
                onSubmit={onSubmit}
              />
            </MotionDiv>
          )}
        </AnimatePresence>
      </Box>
      <Flex
        flexDir={'row'}
        gap={'0.75rem'}
        h={'5.125rem'}
        pos={'relative'}
        backgroundColor={'#f1f1f1'}
        padding={'1rem'}
        border={'1px solid white'}
      >
        <Button
          onClick={() => {
            if (userInputShown) {
              setModal(UserScreen.login);
            } else {
              showUserInputs();
            }
          }}
          variant={'prompt_light'}
          h={'full'}
          w={'full'}
          maxW={'8rem'}
        >
          {userInputShown ? 'Cancel' : 'Back'}
        </Button>
        <Box id={'login-shifting-button-container'} flex={1}>
          <Button
            variant={'prompt_light'}
            width={'full'}
            height={'3rem'}
            onClick={onSubmitClick}
            disabled={disableSubmit}
          >
            {userInputShown ? 'Next' : 'Submit'}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

const errorSetter = (
  name: keyof RegisterUserError,
  setState: Dispatch<SetStateAction<RegisterUserState>>
): ((value: string) => void) => {
  return (value: string) => {
    setState((prevState: RegisterUserState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        [name]: value,
      },
    }));
  };
};
