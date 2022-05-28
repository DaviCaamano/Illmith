import { colors } from '@colors';

//components
import Link from 'next/link';
import { UserMenu } from './';
import { Box, Flex } from '@chakra-ui/react';
import { Span } from '@components/shared';

//hooks
import { useUser } from '@hooks';
import { useDispatch } from 'react-redux';
import { useModalSlice, UserScreen } from '@contexts';
import { useRef, useState } from 'react';
import { UserMenuCornerPiece } from '@components/header/userModule/UserMenuCornerPiece';
import { useHandleOutsideClick } from '@hooks/useHandleOutsideClick';

export const UserModule = () => {
  const dispatch = useDispatch();
  const { email, username, onLoadFlag, isLoggedIn, handleLogout } = useUser(dispatch);
  const [, setModal] = useModalSlice(dispatch);
  const loggedIn = isLoggedIn();
  const name = username && username !== 'null' ? username : email ? email.split('@')[0] : null;

  const [hover, setHover] = useState<boolean>(false);
  const [antiHover, setAntiHover] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const MenuCornerRef = useRef<HTMLDivElement>(null);
  const MenuRef = useRef<HTMLDivElement>(null);
  const MenuDropdown = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(setMenuVisible, [MenuCornerRef, MenuRef, MenuDropdown]);

  return (
    <Flex id={'user-module'} h={'3.125rem'} w={['8rem', '8rem', '18.75rem']} pos={'relative'} justify={'end'}>
      <Box
        id={'navbar-user-widget'}
        pos={'relative'}
        minW={[null, '8rem', '11.25rem']}
        h={'full'}
        w={'auto'}
        textOverflow={'ellipsis'}
        fontSize={'1.25rem'}
        textAlign={'right'}
        transition={'all 0.5s'}
        cursor={'pointer'}
        boxShadow={
          hover && !antiHover
            ? '0 0 3px 3px rgba(255, 255, 255, 0.2), inset 0 0 5px 10px rgba(255, 255, 255, 0.025), ' +
              'inset 0 0 5px 20px rgba(255, 255, 255, 0.025), inset 0 0 5px 50px rgba(255, 255, 255, 0.025)'
            : '0 0 3px 3px rgba(255, 255, 255, 0.1), inset 0 0 5px 10px rgba(255, 255, 255, 0.0125), ' +
              'inset 0 0 5px 20px rgba(255, 255, 255, 0.0125), inset 0 0 5px 50px rgba(255, 255, 255, 0.0125)'
        }
        borderRadius={'0 25px 0 25px'}
        onClick={() => !loggedIn && setModal(UserScreen.login)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box
          id={'user-menu-click-handler'}
          w={'full'}
          h={'full'}
          top={0}
          left={0}
          pos={'absolute'}
          onClick={() => {
            setMenuVisible((prevState: boolean) => !prevState);
          }}
          ref={MenuRef}
          zIndex={1}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
        <UserMenuCornerPiece
          hover={hover}
          setHover={setHover}
          setAntiHover={setAntiHover}
          setMenuVisible={setMenuVisible}
          MenuCornerRef={MenuCornerRef}
        />
        {loggedIn ? (
          //If Logged in
          <UserMenu handleLogout={handleLogout} name={name} menuVisible={menuVisible} menuDropdownRef={MenuDropdown} />
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
              cursor={'pointer'}
              opacity={!email || onLoadFlag ? 1 : 0}
            >
              Login
            </Span>
          </Link>
        )}
      </Box>
    </Flex>
  );
};
