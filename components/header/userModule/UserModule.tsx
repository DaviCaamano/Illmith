import { colors } from '@colors';

//components
import Link from 'next/link';
import { UserMenu } from './';
import { Flex } from '@chakra-ui/react';
import { Span } from '@components/shared';

//hooks
import { useUser } from '@hooks';
import { useDispatch } from 'react-redux';
import { useModalSlice, UserScreen } from '@contexts';
import { useRef, useState } from 'react';
import { useHandleOutsideClick } from '@hooks/useHandleOutsideClick';

export const UserModule = () => {
  const dispatch = useDispatch();
  const { email, username, onLoadFlag, isLoggedIn, handleLogout } = useUser(dispatch);
  const [, setModal] = useModalSlice(dispatch);
  const loggedIn = isLoggedIn();
  const name = username && username !== 'null' ? username : email ? email.split('@')[0] : null;
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const MenuCornerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuDropdown = useRef<HTMLDivElement>(null);
  useHandleOutsideClick(setMenuVisible, [MenuCornerRef, menuRef, menuDropdown]);

  return (
    <Flex
      id={'user-module'}
      h={'full'}
      pos={'absolute'}
      right={['4.125rem', '4.625rem', '5.125rem', '1rem']}
      justify={'end'}
    >
      <Flex
        id={'navbar-user-widget'}
        pos={'relative'}
        h={'full'}
        w={'auto'}
        align={'center'}
        textOverflow={'ellipsis'}
        fontSize={'1.25rem'}
        textAlign={'right'}
        transition={'all 0.5s'}
        cursor={'pointer'}
        borderRadius={'0 25px 0 25px'}
        onClick={() => !loggedIn && setModal(UserScreen.login)}
      >
        {loggedIn ? (
          //If Logged in
          <UserMenu
            handleLogout={handleLogout}
            name={name}
            menuVisible={menuVisible}
            setMenuVisible={setMenuVisible}
            menuRef={menuRef}
            menuDropdownRef={menuDropdown}
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
              color={colors.text.titleDark}
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
      </Flex>
    </Flex>
  );
};
