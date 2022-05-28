import { RefObject } from 'react';

//components
import { Box, Flex } from '@chakra-ui/react';
import { colors } from '@colors';

//types
import { UserMenuItem, UserMenuItemProps } from '@components/header';

const animationTime = 1;
interface UserMenuItems {
  to: string;
  onClick: (...args: any[]) => any;
  text: string;
}

interface UserMenuContainerProps {
  handleLogout: (...args: any[]) => any;
  name: string | null;
  menuVisible: boolean;
  menuDropdownRef: RefObject<HTMLDivElement>;
}

export const UserMenu = ({ handleLogout, name, menuVisible, menuDropdownRef }: UserMenuContainerProps) => {
  const menuItems: UserMenuItems[] = [
    {
      to: '#',
      onClick: handleLogout,
      text: 'logout',
    },
  ];

  return (
    <Flex id={'user-menu'} h={'full'} top={0} px={1}>
      <Box w={'full'} h={'full'} pos={'relative'}>
        <Box
          id={'user-menu-container'}
          h={'full'}
          minW={['5rem', '8rem', '11.25rem']}
          w={'full'}
          pl={'1rem'}
          pr={'1.5rem'}
          borderRadius={'0 1.5625rem 0 1.5625rem '}
          cursor={'pointer'}
          transition={'all 0.33s'}
          overflow={'hidden'}
        >
          <Flex id="logged-in-user" justify={'center'} align={'start'} h={'full'} flexDir={'column'} py={'0.1875rem'}>
            <Box
              display={['none', 'none', 'block']}
              text-overflow={'ellipsis'}
              white-space={'nowrap'}
              overflow={'hidden'}
              text-align={'left'}
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
              color={colors.text.title}
              textTransform={'capitalize'}
              w={'full'}
              textAlign={'right'}
              background={'-webkit-linear-gradient(#ecdbab, #c5a957), #ecdbab'}
              bgClip={'text'}
              textDecor={'transparent'}
              fontWeight={'medium'}
              lineHeight={1.2}
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
            pt={'0.625rem'}
            borderRadius={'0 0 0 50px'}
            transform={'translateY(-0.3125rem)'}
            boxShadow={'0px 1px 2px 2px rgba(255,255,255,10%)'}
            width={'calc(100% - 9px)'}
            top={'calc(100% + 8px)'}
            left={'12px'}
            zIndex={-10}
            cursor={'pointer'}
            ref={menuDropdownRef}
            overflow={'hidden'}
          >
            {menuItems?.map(({ to, text, onClick }: Omit<UserMenuItemProps, 'delay' | 'visible'>, index: number) => (
              <UserMenuItem
                visible={menuVisible}
                key={'user-menu-item-' + index}
                delay={(animationTime / menuItems.length) * index}
                to={to}
                onClick={onClick}
                text={text}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
