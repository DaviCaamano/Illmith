import { colors } from '@colors';

//components
import Link from 'next/link';
import { UserMenu } from './';
import { Box } from '@chakra-ui/react';
import { Span } from '@components/shared';

//hooks
import { useUser } from '@hooks';
import { useDispatch } from 'react-redux';
import { useModalSlice, UserScreen } from '@contexts';
import { useCallback, useState } from 'react';

export const UserModule = () => {
  const dispatch = useDispatch();
  const { email, username, onLoadFlag, handleLogout } = useUser(dispatch);
  const [, setModal] = useModalSlice(dispatch);
  const loggedIn = email || username;
  const name = username && username !== 'null' ? username : email ? email.split('@')[0] : null;

  const [hover, setHover] = useState<boolean>(false);
  const [antiHover, setAntiHover] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const toggleMenu = useCallback(() => {
    setMenuVisible((prevState) => !prevState);
  }, [setMenuVisible]);
  return (
    <Box
      id={'navbar-user-widget'}
      max-w={'20vw'}
      minW={'11.25rem'}
      h={'3.125rem'}
      w={'auto'}
      textOverflow={'ellipsis'}
      fontSize={'1.25rem'}
      textAlign={'right'}
      opacity={onLoadFlag ? 1 : 0}
      transition={'all 0.5s'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={toggleMenu}
      cursor={'pointer'}
      boxShadow={
        hover && !antiHover
          ? '0 0 3px 3px rgba(255, 255, 255, 0.2), inset 0 0 5px 10px rgba(255, 255, 255, 0.025), ' +
            'inset 0 0 5px 20px rgba(255, 255, 255, 0.025), inset 0 0 5px 50px rgba(255, 255, 255, 0.025)'
          : '0 0 3px 3px rgba(255, 255, 255, 0.1), inset 0 0 5px 10px rgba(255, 255, 255, 0.0125), ' +
            'inset 0 0 5px 20px rgba(255, 255, 255, 0.0125), inset 0 0 5px 50px rgba(255, 255, 255, 0.0125)'
      }
      borderRadius={'0 25px 0 25px'}
    >
      {loggedIn ? (
        //If Logged in
        <UserMenu
          handleLogout={handleLogout}
          name={name}
          hover={hover && !antiHover}
          setHover={setHover}
          setAntiHover={setAntiHover}
          setMenuVisible={setMenuVisible}
          menuVisible={menuVisible}
        />
      ) : (
        //If Logged out
        <Link href={'/#'} passHref>
          <Span
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
          </Span>
        </Link>
      )}
    </Box>
  );
};
