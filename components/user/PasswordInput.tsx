//hooks
import { useCallback } from 'react';

//images
import Approved from '@icons/approve.svg';
import Rejected from '@icons/reject.svg';

//components
import { Box, Flex, Input } from '@chakra-ui/react';
import { InputError } from '@components/inputError';
import { Span } from '@components/shared';
import Image from 'next/image';
//types
import { validatePassword, PasswordValidation, ValidatedPassword } from '@utils/user';
import { ChangeEvent, RefObject } from 'react';
import { handleEnterPress } from '@utils/handleInput';

interface PasswordInputProps {
  id: string;
  error: string | null;
  setError: (value: string) => void;
  password: string;
  handleInput: (validatedPassword: ValidatedPassword) => any;
  inputRef: RefObject<HTMLInputElement>;
  passwordValidation: PasswordValidation;
  onSubmit: Function;
}
export const PasswordInput = ({
  id,
  error,
  setError,
  password,
  handleInput,
  inputRef,
  passwordValidation: { hasSixCharacters, hasCorrectCase, hasNumber },
  onSubmit,
}: PasswordInputProps) => {
  const handleInputCallback = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => handleInput(validatePassword(event.target.value)),
    [handleInput]
  );

  const passwordBullets: JSX.Element[] = [
    hasSixCharacters ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasCorrectCase ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasNumber ? <Approved width={20} height={20} /> : <Rejected width={20} height={20} />,
    hasSixCharacters && hasCorrectCase && hasNumber ? (
      <Image width={60} height={60} src={'/icons/approve-lg.svg'} alt={'password meets requirements'} />
    ) : (
      <Image width={60} height={60} src={'/icons/mems.svg'} alt={'password does not meet requirements'} />
    ),
  ];

  const passwordBulletsColors = [
    hasSixCharacters ? 'green' : 'black',
    hasCorrectCase ? 'green' : 'black',
    hasNumber ? 'green' : 'black',
  ];

  return (
    <>
      <label htmlFor="user-registration-password-input" style={{ height: '1.875rem' }}>
        Password
      </label>
      <InputError error={error} setError={setError} style={{ marginBottom: '21px' }}>
        <Input
          id={id}
          type={'password'}
          name={'password'}
          value={password}
          onChange={handleInputCallback}
          ref={inputRef}
          variant={'modal'}
          onKeyDown={handleEnterPress(onSubmit)}
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
    </>
  );
};
