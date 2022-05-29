import { memo, useState } from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';
import { NavItem } from '@interface/components/header';

interface HeaderHamburgerDropdownItemProps extends NavItem {
  firstItem: boolean;
  lastItem: boolean;
}
export const HeaderHamburgerDropdownItem = memo(
  ({ external, external_same_page, name, to, firstItem, lastItem }: HeaderHamburgerDropdownItemProps): JSX.Element => {
    const [hover, setHover] = useState<boolean>(false);
    const anchorTarget: string = external ? 'blank' : external_same_page ? '_self' : '';

    return (
      <Link href={to} passHref target={anchorTarget}>
        <Box
          className={'user-menu-item'}
          width={'full'}
          borderColor={'#424750'}
          borderWidth={lastItem ? '0' : '0 0 1px 0'}
          color={'white'}
          fontSize={'1.125rem'}
          cursor={'pointer'}
          transition={'all 0.25s'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          p={'4px 4px 4px 6px'}
        >
          <Box
            px={4}
            h={'full'}
            padding={'0.3125rem 1rem'}
            bgColor={hover ? '#3b3b3b' : '#282c34'}
            borderTopLeftRadius={firstItem ? '10000px' : 0}
            borderBottomRightRadius={lastItem ? '10000px' : 0}
          >
            {name}
          </Box>
        </Box>
      </Link>
    );
  }
);
HeaderHamburgerDropdownItem.displayName = 'HeaderHamburgerDropdownItem';
