//component
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { InputError } from '@components/inputError';
import { Span } from '@components/shared';

//hooks
import { useCallback, useEffect, useRef } from 'react';
import { useUserRegistrationAnimations } from '@hooks/user/useUserRegistrationAnimations';

//img
import Approved from '@icons/approve.svg';
import ApprovedLg from '@icons/approve-lg.svg';
import Rejected from '@icons/reject.svg';
import Neutral from '@icons/neutral.svg';

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
    error: { usernameWarning, passwordWarning, emailWarning },
    passwordValidation: { hasSixCharacters, hasCorrectCase, hasNumber },
  },
  setForm,
  setModal,
  handleUserRegistration: onSubmit,
  screen,
  inputHandlers: { handleUserRegistrationPasswordInput, handleRegistrationInput: handleInput },
  validators: { handlePassword, handleEmail, handleUsername },
}: RegisterUserScreenProps) => {
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
            handleUserRegistrationPasswordInput(passwordRef?.current?.value);
          } else {
            setForm((prevState: RegisterUserState) => ({
              ...prevState,
              email: emailRef?.current?.value || prevState.email,
              username: userRef?.current?.value || prevState.username,
            }));
          }
        }
      },
      [handleUserRegistrationPasswordInput, setForm] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );

  const passwordBullets: JSX.Element[] = [
    hasSixCharacters ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasCorrectCase ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasNumber ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasSixCharacters && hasCorrectCase && hasNumber ? (
      <ApprovedLg width={60} height={60} />
    ) : (
      <Neutral width={60} height={60} />
    ),
  ];
  const passwordBulletsColors = [
    hasSixCharacters ? 'green' : 'black',
    hasCorrectCase ? 'green' : 'black',
    hasNumber ? 'green' : 'black',
  ];

  const setPasswordWarning = useCallback(errorSetter('passwordWarning', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps
  const setEmailWarning = useCallback(errorSetter('emailWarning', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps
  const setUsernameWarning = useCallback(errorSetter('usernameWarning', setForm), [setForm]); // eslint-disable-line react-hooks/exhaustive-deps

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
      } else if (handlePassword(password)) {
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
              <label htmlFor="user-registration-password-input" style={{ height: '1.875rem' }}>
                Password
              </label>
              <InputError error={passwordWarning} setError={setPasswordWarning} style={{ marginBottom: '21px' }}>
                <Input
                  id={'user-registration-password-input'}
                  type={'password'}
                  name={'password'}
                  value={password}
                  onChange={handleUserRegistrationPasswordInput}
                  ref={passwordRef}
                  variant={'modal'}
                />
              </InputError>

              <Flex
                className={'register-user-password-requirements'}
                w={'full'}
                h={'5rem'}
                flexDir={'row'}
                align={'center'}
                justify={'center'}
                fontSize={'1rem'}
                bgColor={'#EDEDF6'}
              >
                <Flex flexDir={'column'} align={'start'} justify={'center'} flex={1} pl={'1.75rem'}>
                  <Flex
                    display={'inline-flex'}
                    width={'full'}
                    justify={'start'}
                    align={'center'}
                    color={passwordBulletsColors[0]}
                    gap={'1rem'}
                  >
                    {passwordBullets[0]} <Span ml={'0.3125rem'}>6 characters</Span>
                  </Flex>
                  <Flex
                    display={'inline-flex'}
                    width={'full'}
                    justify={'start'}
                    align={'center'}
                    color={passwordBulletsColors[0]}
                    gap={'1rem'}
                  >
                    {passwordBullets[1]} <Span ml={'0.3125rem'}>1 upper and lower case letter</Span>
                  </Flex>
                  <Flex
                    display={'inline-flex'}
                    width={'full'}
                    justify={'start'}
                    align={'center'}
                    color={passwordBulletsColors[0]}
                    gap={'1rem'}
                  >
                    {passwordBullets[2]} <Span ml={'0.3125rem'}>1 number</Span>
                  </Flex>
                </Flex>
                <Box
                  className={'divider'}
                  h={'calc(100% - 4px)'}
                  w={0.5}
                  borderWidth={0.25}
                  borderColor={'darkgray'}
                  borderStyle={'dashed'}
                  borderRadius={1}
                />
                <Flex flexDir={'column'} align={'center'} justify={'center'} flex={1}>
                  {passwordBullets[3]}
                </Flex>
              </Flex>
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
