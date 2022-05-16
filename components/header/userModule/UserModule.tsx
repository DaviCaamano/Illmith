import { colors } from '@colors';

//components
import Link from 'next/link';
import { UserMenuContainer } from './';
import { Box, Text } from '@chakra-ui/react';

//hooks
import { useUser } from '@hooks';
import { useDispatch } from 'react-redux';
import { useModalSlice, UserScreen } from '@contexts';

export const UserModule = () => {
  const dispatch = useDispatch();
  const { email, username, handleLogout } = useUser(dispatch);
  const [, setModal] = useModalSlice(dispatch);
  const loggedIn = email || username;
  const name = username && username !== 'null' ? username : email ? email.split('@')[0] : null;

  return (
    <Box
      id={'navbar-user-widget'}
      max-w={'20vw'}
      h={'3.625rem'}
      textOverflow={'ellipsis'}
      fontSize={'1.25rem'}
      display={'inline-block'}
      textAlign={'right'}
    >
      {loggedIn ? (
        //If Logged in
        <UserMenuContainer handleLogout={handleLogout} name={name} />
      ) : (
        //If Logged out
        <Link href={'/#'} passHref>
          <Text
            className={'logged-user-greeting'}
            position={'relative'}
            display={'inline-block'}
            fontSize={'1.375rem'}
            fontWeight={'450'}
            color={colors.text.title}
            margin={'0 1.25rem'}
            letterSpacing={'0'}
            lineHeight={'3.5625rem'}
            onClick={() => setModal(UserScreen.login)}
            cursor={'pointer'}
          >
            Login
          </Text>
        </Link>
      )}
    </Box>
  );
};
