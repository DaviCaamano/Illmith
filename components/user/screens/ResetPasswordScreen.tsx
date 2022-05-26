import { emailRegex } from '@constants/regex/email';

//component
import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { InputError } from '@components/inputError';

//hooks
import { useRef } from 'react';

//types
import { UserScreen } from '@contexts';
import { ResetPasswordState, InputHandler } from '@hooks';

interface ResetPasswordScreenProps {
  form: ResetPasswordState;
  setResetPasswordError: (error: string) => void;
  setModal: (screen?: UserScreen) => void;
  handleResetPasswordSubmit: () => void;
  handleResetPasswordInput: InputHandler;
}
export const PasswordResetScreen = ({
  form: { email, error },
  setResetPasswordError,
  setModal,
  handleResetPasswordSubmit: onSubmit,
  handleResetPasswordInput,
}: ResetPasswordScreenProps) => {
  const emailRef = useRef<HTMLInputElement>(null);

  const disableSubmit = !email || !emailRegex.test(email);

  console.log('emailRegex.test(email)');
  console.log(emailRegex.test(email));
  return (
    <Box id={'username-registration-screen'} padding={'0.9375rem 1.5625rem'} pos={'absolute'} w={'40.375rem'}>
      <Box id={'reset-password-title-positioner'} pos={'relative'} w={'full'}>
        <Flex
          className={'reset-password-title-row'}
          position={'absolute'}
          w={'full'}
          justify={'center'}
          align={'center'}
          mb={'1.875rem'}
          fontSize={'1.875rem'}
          fontWeight={'bolder'}
        >
          Forgot your Password?
        </Flex>
      </Box>
      <Box className={'reset-password-spacer'} h={'2rem'} />
      <Box id={'reset-password-input-container'} pos={'relative'} w={'full'} mt={'2rem'}>
        <label htmlFor="reset-password-email-input" style={{ height: '1.875rem' }}>
          Enter the Email you used to Register your account
        </label>
        <InputError error={error} setError={setResetPasswordError} style={{ marginBottom: '0.625rem' }}>
          <Input
            id={'reset-password-email-input'}
            type={'text'}
            name={'email'}
            value={email}
            onChange={handleResetPasswordInput}
            ref={emailRef}
            variant={'modal'}
          />
        </InputError>
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
        <Button onClick={() => setModal(UserScreen.login)} variant={'prompt_light'} h={'full'} w={'full'} maxW={'8rem'}>
          Cancel
        </Button>
        <Box id={'login-shifting-button-container'} flex={1}>
          <Button variant={'prompt_light'} width={'full'} height={'3rem'} onClick={onSubmit} disabled={disableSubmit}>
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
