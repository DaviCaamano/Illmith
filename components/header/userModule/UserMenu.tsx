import { Dispatch, memo, SetStateAction } from 'react';

//hooks
import { useState, useCallback } from 'react';

//components
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { colors } from '@colors';
import { useHandleOutsideClick } from '@hooks/useHandleOutsideClick';

const SHADOW =
  '0 0 3px 3px rgba(255, 255, 255, 0.2), inset 0 0 5px 10px rgba(255, 255, 255, 0.05), ' +
  'inset 0 0 5px 20px rgba(255, 255, 255, 0.05), inset 0 0 5px 50px rgba(255, 255, 255, 0.05)';

interface UserMenuItems {
  to: string;
  onClick: (...args: any[]) => any;
  text: string;
}

interface UserMenuContainerProps {
  handleLogout: (...args: any[]) => any;
  name: string | null;
  menuVisible: boolean;
  hover: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  setHover: Dispatch<SetStateAction<boolean>>;
  setAntiHover: Dispatch<SetStateAction<boolean>>;
}

interface UserMenuItemProps {
  to: string;
  text: string;
  onClick: (...args: any[]) => any;
}

export const UserMenu = ({
  handleLogout,
  name,
  menuVisible,
  setMenuVisible,
  hover,
  setHover,
  setAntiHover,
}: UserMenuContainerProps) => {
  const menuItems: UserMenuItems[] = [
    {
      to: '#',
      onClick: handleLogout,
      text: 'logout',
    },
  ];

  const outsideClickFocusRef = useHandleOutsideClick(menuVisible, setMenuVisible);

  return (
    <Flex id={'user-menu'} h={'full'} top={0} px={1}>
      <Box w={'full'} h={'full'} pos={'relative'}>
        <TopLeftCornerPiece
          hover={hover}
          setHover={setHover}
          setAntiHover={setAntiHover}
          setMenuVisible={setMenuVisible}
        />
        <Box
          id={'user-menu-container'}
          h={'full'}
          minW={'11.25rem'}
          w={'full'}
          pl={'1rem'}
          pr={'1.5rem'}
          borderRadius={'0 1.5625rem 0 1.5625rem '}
          cursor={'pointer'}
          fnavbar-user-widget
          transition={'all 0.33s'}
          overflow={'hidden'}
        >
          <Flex id="logged-in-user" justify={'start'} align={'start'} h={'full'} flexDir={'column'}>
            <Box
              display={'block'}
              text-overflow={'ellipsis'}
              white-space={'nowrap'}
              overflow={'hidden'}
              text-align={'left'}
              marginTop={'0.1875rem'}
              color={'#ecdbab'}
              w={'full'}
              textAlign={'left'}
              fontSize={'1rem'}
            >
              Welcome,
            </Box>
            <Box
              display={'block'}
              text-overflow={'ellipsis'}
              white-space={'nowrap'}
              overflow={'hidden'}
              text-align={'left'}
              marginTop={'-0.5rem'}
              color={colors.text.title}
              textTransform={'capitalize'}
              w={'full'}
              textAlign={'right'}
              background={'-webkit-linear-gradient(#ecdbab, #c5a957), #ecdbab'}
              bgClip={'text'}
              textDecor={'transparent'}
              fontWeight={'medium'}
            >
              {name}
            </Box>
          </Flex>
          <Box
            id={'user-dropdown-menu'}
            pos={'absolute'}
            display={menuVisible ? 'block' : 'none'}
            border={'1px black'}
            bgColor={'#282c34'}
            padding={'0.1875rem 0.625rem'}
            transform={'translateY(-0.3125rem)'}
            filter={'drop-shadow(0px 4px 6px black)'}
            width={'calc(100% - 40px)'}
            top={'calc(100% + 8px)'}
            left={'-0.125rem'}
            zIndex={-10}
            cursor={'pointer'}
            ref={outsideClickFocusRef}
          >
            {menuItems
              ? menuItems.map(({ to, text, onClick }: UserMenuItemProps, index: number) => (
                  <UserMenuItem key={'user-menu-item-' + index} to={to} onClick={onClick} text={text} />
                ))
              : null}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

const UserMenuItem = memo(({ to, text, onClick }: UserMenuItemProps) => {
  const onTextClick = useCallback(
    (...args: any[]) => {
      onClick(...args);
    },
    [onClick]
  );
  return (
    <Link href={to} passHref>
      <Box
        width={'full'}
        padding={'0.3125rem'}
        border-top={'1px lightgray'}
        border-bottom={'1px lightgray'}
        color={'white'}
        px={4}
        fontSize={'1.125rem'}
        onClick={onTextClick}
        cursor={'pointer'}
        bgColor={'#282c34'}
        boxShadow={SHADOW}
        transition={'all 0.25s'}
        _hover={{
          bgColor: '#191919',
          color: 'white',
        }}
      >
        {text}
      </Box>
    </Link>
  );
});
UserMenuItem.displayName = 'UserMenuItem';

const TopLeftCornerPiece = ({
  hover,
  setHover,
  setAntiHover,
  setMenuVisible,
}: {
  hover: boolean;
  setHover: Dispatch<SetStateAction<boolean>>;
  setAntiHover: Dispatch<SetStateAction<boolean>>;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
}) => (
  <Box id={'corner-border-box-top-right'} w={'full'} h={'full'} pos={'absolute'}>
    <Box w={'full'} h={'full'} pos={'relative'}>
      <Box
        id={'header-user-menu-corner-piece-top-left'}
        h={'38px'}
        w={'38px'}
        top={'-16px'}
        left={'-28px'}
        overflow={'hidden'}
        pos={'absolute'}
        py={'0.4375rem'}
      >
        <Box
          pos={'absolute'}
          right={'14px'}
          top={'5px'}
          h={'40px'}
          w={'40px'}
          overflow={'hidden'}
          bg={hover ? '#2f343a' : '#282d33'}
          transition={'all 0.5s'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setMenuVisible((prevState: boolean) => !prevState)}
          cursor={'pointer'}
        >
          <Box
            id={'user-menu-target'}
            pos={'absolute'}
            h={'34px'}
            w={'32px'}
            top={'8px'}
            left={'8px'}
            borderRadius={'0 25px 0  0 '}
            boxShadow={
              hover
                ? 'inset 0 0 3px 3px rgba(255, 255, 255, 0.1), inset 0 0 3px 3px rgba(255, 255, 255, 0.025), ' +
                  'inset 0 0 3px 3px rgba(255, 255, 255, 0.05), inset 0 0 3px 3px rgba(255, 255, 255, 0.05)'
                : 'inset 0 0 2px 3px rgba(255, 255, 255, 0.05), inset 0 0 2px 3px rgba(255, 255, 255, 0.0125), ' +
                  'inset 0 0 2px 3px rgba(255, 255, 255, 0.0125), inset 0 0 2px 3px rgba(255, 255, 255, 0.0125)'
            }
            bg={'#20252b'}
            zIndex={2}
            cursor={'default'}
            onMouseEnter={() => setAntiHover(true)}
            onMouseLeave={() => setAntiHover(false)}
            transition={'all 0.5s'}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);
