import { Box } from '@chakra-ui/react';
import { RefObject } from 'react';
import { UserMenuItem } from '@components/header';
import { UserMenuItems, NavbarLinksItemProps } from '@interface/components/header';

interface UserMenuDropdownProps {
  handleLogout: (...args: any[]) => any;
  menuVisible: boolean;
  menuDropdownRef: RefObject<HTMLDivElement>;
}
const animationTime = 1;
export const UserMenuDropdown = ({ menuDropdownRef, menuVisible, handleLogout }: UserMenuDropdownProps) => {
  const menuItems: UserMenuItems[] = [
    {
      to: '#',
      onClick: handleLogout,
      text: 'logout',
    },
  ];
  return (
    <Box
      id={'user-dropdown-menu'}
      pos={'absolute'}
      display={menuVisible ? 'block' : 'none'}
      opacity={menuVisible ? 1 : 0}
      border={'1px black'}
      bgColor={'#282c34'}
      borderRadius={'0 0 0 50px'}
      transform={'translateY(-0.3125rem)'}
      boxShadow={'0px 1px 2px 2px rgba(0,0,0,50%)'}
      width={'14rem'}
      top={'calc(100% + 8px)'}
      right={['-2rem', '-2rem', '-30px', '0.875rem']}
      zIndex={-10}
      cursor={'pointer'}
      ref={menuDropdownRef}
      overflow={'hidden'}
      transition={'all 5s'}
      style={{ transitionDelay: 'display 0.666s' }}
    >
      {menuItems?.map(({ to, text, onClick }: Omit<NavbarLinksItemProps, 'lastItem'>, index: number) => (
        <UserMenuItem
          key={'user-menu-item-' + index}
          to={to}
          onClick={onClick}
          text={text}
          firstItem={index === 0}
          lastItem={index === menuItems.length - 1}
        />
      ))}
    </Box>
  );
};
