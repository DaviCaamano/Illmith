//component
import { Box, Button, Flex } from '@chakra-ui/react';

//hooks
import { useCallback, useRef } from 'react';

//types
import { UserScreen } from '@contexts';
import { NewPasswordState, useHandleAutoComplete } from '@hooks';
import { PasswordInput } from '@components/user';
import { ValidatedPassword, validatePassword } from '@utils/user';

interface NewPasswordScreenProps {
  form: NewPasswordState;
  setNewPasswordError: (error: string) => void;
  setModal: (screen?: UserScreen) => void;
  handleNewPasswordSubmit: () => void;
  handleNewPasswordInput: (validatedPassword: ValidatedPassword) => void;
}
export const NewPasswordScreen = ({
  form: { password, error, passwordValidation },
  setNewPasswordError,
  setModal,
  handleNewPasswordSubmit: onSubmit,
  handleNewPasswordInput,
}: NewPasswordScreenProps) => {
  const { hasSixCharacters, hasCorrectCase, hasNumber } = passwordValidation;
  const passwordRef = useRef<HTMLInputElement>(null);

  useHandleAutoComplete(
    useCallback(
      (event: Event) => {
        if (
          // @ts-ignore
          event.target?.hasAttribute('autocompleted') &&
          passwordRef?.current?.value &&
          passwordRef?.current?.value !== password
        ) {
          handleNewPasswordInput(validatePassword(passwordRef?.current?.value));
        }
      },
      [] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );

  return (
    <Box id={'username-registration-screen'} padding={'0.9375rem 1.5625rem'} pos={'absolute'} w={'40.375rem'}>
      <Box id={'new-password-title-positioner'} pos={'relative'} w={'full'}>
        <Flex
          className={'new-password-title-row'}
          position={'absolute'}
          w={'full'}
          justify={'center'}
          align={'center'}
          mb={'1.875rem'}
          fontSize={'1.875rem'}
          fontWeight={'bolder'}
        >
          Enter a new Password
        </Flex>
      </Box>
      <Box className={'new-password-spacer'} h={'2rem'} />
      <Box id={'new-password-input-container'} pos={'relative'} h={'12rem'} w={'full'}>
        <PasswordInput
          id={'new-password-input'}
          error={error}
          setError={setNewPasswordError}
          password={password}
          handleInput={handleNewPasswordInput}
          inputRef={passwordRef}
          passwordValidation={passwordValidation}
          onSubmit={onSubmit}
        />
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
          <Button
            variant={'prompt_light'}
            width={'full'}
            height={'3rem'}
            onClick={onSubmit}
            disabled={!hasSixCharacters || !hasCorrectCase || !hasNumber}
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
