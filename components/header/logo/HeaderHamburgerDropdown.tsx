import { getHeaderElements } from '@utils/header';
import { NavItem } from '@interface/components/header';

//hooks
import { useMemo } from 'react';
import { useGetUser } from '@contexts';

//components
import { Box } from '@chakra-ui/react';
import { HeaderHamburgerDropdownItem } from '@components/header';

//types
import { RefObject } from 'react';

interface NavbarLinksDropdownProps {
  menuVisible: boolean;
  menuDropdownRef: RefObject<HTMLDivElement>;
}
export const HeaderHamburgerDropdown = ({ menuDropdownRef, menuVisible }: NavbarLinksDropdownProps) => {
  const { admin: isAdmin } = useGetUser();
  const navElements: NavItem[] = useMemo(() => getHeaderElements(isAdmin), [isAdmin]);

  const display = menuVisible ? 'block' : 'none';
  return (
    <Box
      id={'header-hamburger-dropdown-menu'}
      pos={'absolute'}
      display={[display, display, 'none']}
      opacity={menuVisible ? 1 : 0}
      border={'1px black'}
      bgColor={'#282c34'}
      borderBottomRightRadius={'3.125rem'}
      transform={'translateY(-0.3125rem)'}
      boxShadow={'0px 1px 2px 2px rgba(0,0,0,50%)'}
      width={'14rem'}
      top={'calc(100% + 8px)'}
      left={0}
      zIndex={-10}
      cursor={'pointer'}
      ref={menuDropdownRef}
      overflow={'hidden'}
      transition={'all 5s'}
      style={{ transitionDelay: 'display 0.666s' }}
    >
      {navElements?.map(({ to, name, external, external_same_page }: NavItem, index: number) => (
        <HeaderHamburgerDropdownItem
          key={'user-menu-item-' + index}
          to={to}
          name={name}
          external={external}
          external_same_page={external_same_page}
          firstItem={index === 0}
          lastItem={index === navElements.length - 1}
        />
      ))}
    </Box>
  );
};
