import { stateSetter } from '@utils/handleInput';
import { errorCodes } from '@error';

//hooks
import { useCallback, useRef } from 'react';
import { useHandleAutoComplete } from '@hooks';

//component
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Span } from '@components/shared';
import { InputError } from '@components/inputError';
import { Label } from '@components/shared/Label';

//types
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { UserScreen } from '@contexts';
import { LoginState } from '@hooks';

interface LoginUserScreenProps {
  form: LoginState;
  setForm: Dispatch<SetStateAction<LoginState>>;
  handleUserInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setModal: (screen?: UserScreen) => void;
  submit: () => void;
}
export const LoginScreen = ({
  form: { user, password, passwordInputError, userInputError },
  setForm,
  handleUserInput,
  handlePasswordInput,
  setModal,
  submit,
}: LoginUserScreenProps) => {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useHandleAutoComplete(
    useCallback(
      (event: Event) => {
        // @ts-ignore
        if (event.target?.hasAttribute('autocompleted')) {
          setForm((prevState: LoginState) => ({
            ...prevState,
            password: passwordRef?.current?.value || prevState.password,
          }));
        }
      },
      [setForm]
    )
  );

  const onSubmit = () => {
    if (!user || !password) {
      setForm((prevState: LoginState) => ({
        ...prevState,
        userInputError: !user ? errorCodes.Login.userFieldEmpty : prevState.userInputError,
        passwordInputError: !user ? errorCodes.Login.passwordFieldEmpty : prevState.passwordInputError,
      }));
    }
    if (!user && userRef.current) {
      userRef.current.focus();
    } else if (!password && passwordRef.current) {
      passwordRef.current.focus();
    } else {
      submit();
    }
  };

  return (
    <Box id={'login-screen'} padding={'0.9375rem 1.5625rem'} pos={'absolute'} w={'100%'}>
      <Box id={'login-title-positioner'} pos={'relative'} w={'full'}>
        <Flex
          className={'login-title-row'}
          position={'absolute'}
          top={0}
          w={'full'}
          justify={'center'}
          align={'center'}
          fontSize={'1.875rem'}
          fontWeight={'bolder'}
        >
          {'Login'}
        </Flex>
        <Box className={'login-spacer'} h={'2rem'} />
        <Box className={'input-container'} pos={'relative'}>
          <Label forHtml={'login-user-input'}>Username or Email</Label>
          <InputError
            error={userInputError}
            setError={stateSetter('userInputError', setForm)}
            style={{ marginBottom: '0.625rem' }}
          >
            <Input
              id={'login-username-input'}
              type={'email'}
              name={'email'}
              placeholder={'...'}
              value={user}
              onChange={handleUserInput}
              ref={userRef}
              variant={'modal'}
            />
          </InputError>
          <Span
            pos={'absolute'}
            fontSize={['0.875rem', '1rem', '1.125rem']}
            right={0}
            top={0}
            fontWeight={'bolder'}
            marginBottom={'15px'}
            backgroundColor={'#e3af4a'}
            backgroundImage={'linear-gradient(0deg,#e3af4a,#795b44)'}
            backgroundSize={'100%'}
            bgClip={'text'}
            cursor={'pointer'}
          >
            <a onClick={() => setModal(UserScreen.register)}>Create an Account</a>
          </Span>
        </Box>
      </Box>
      <Box id={'login-password-positioner'} pos={'relative'} w={'full'}>
        <Label forHtml={'login-password-input'}>Password</Label>
        <InputError
          error={passwordInputError}
          setError={stateSetter('passwordInputError', setForm)}
          style={{ marginBottom: '1.875rem' }}
        >
          <Input
            id={'login-password-input'}
            type={'password'}
            placeholder={'...'}
            value={password}
            onChange={handlePasswordInput}
            ref={passwordRef}
            variant={'modal'}
          />
        </InputError>
        <Flex
          pos={'absolute'}
          fontSize={['0.75rem', '0.875rem', '1rem']}
          right={0}
          top={0}
          h={'1.875rem'}
          justify={'center'}
          align={'center'}
          marginBottom={'15px'}
          textDecor={'underline'}
          color={'#0d6efd'}
          cursor={'pointer'}
        >
          <Span style={{ display: 'block' }} cursor={'pointer'} onClick={() => setModal(UserScreen.password)}>
            <a>Forgot Password</a>
          </Span>
        </Flex>
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
        <Button variant={'prompt_light'} onClick={() => setModal()} h={'full'} w={'full'} maxW={'8rem'}>
          Cancel
        </Button>
        <Box id={'login-shifting-button-container'} flex={1}>
          <Button
            variant={'prompt_light'}
            style={{ width: '100%', height: '3rem' }}
            onClick={() => onSubmit()}
            disabled={!user || !password}
          >
            <Span fontSize={['0.875rem', '0.875rem', '1rem']}>Login</Span>
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
