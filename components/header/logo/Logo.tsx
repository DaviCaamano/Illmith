//img
import Menu from '@icons/hamburger-menu.svg';

//hooks
import { useRef, useState } from 'react';
import { useHandleOutsideClick } from '@hooks/useHandleOutsideClick';

//component
import { HeaderHamburgerDropdown } from '@components/header';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@images/header-logo.webp';

export const Logo = () => {
  const menuDropdown = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  useHandleOutsideClick(setMenuVisible, [menuRef, menuDropdown]);
  return (
    <Flex pos={'absolute'} w={'full'} h={'full'}>
      <Flex
        id={'header-logo-module'}
        pos={['absolute', 'absolute', 'relative']}
        h={'full'}
        w={['100vw', '100vw', null]}
        align={'center'}
        left={0}
      >
        <Flex
          id={'header-hamburger-menu-button'}
          display={['flex', 'flex', 'none']}
          justify={'center'}
          align={'center'}
          h={['3.125rem', '3.125rem', '3.125rem', '5rem']}
          pt={'0.125rem'}
          pl={['1.5rem', '1.5rem', '1.5rem', '4rem']}
        >
          <Flex
            id={'header-hamburger-menu-container'}
            align={'center'}
            mr={['1.5rem', '1.5rem', '1.5rem']}
            onClick={() => {
              setMenuVisible((prevState: boolean) => !prevState);
            }}
            ref={menuRef}
          >
            <Menu id="hamburgerMenu" width={35} height={24.5} alt={'Click to see navbar links'} />
          </Flex>
        </Flex>

        <Box
          id={'logo-positioner'}
          pos={['absolute', 'absolute', 'relative']}
          left={['50%', '50%', '1rem']}
          transform={['translateX(-50%)', 'translateX(-50%)', 'translateX(0)']}
        >
          <Link href={'/'} passHref>
            <Box
              pos={'relative'}
              w={['4.8rem', '6.5rem', '6.5rem', '9.8rem']}
              h={['1.75rem', '2.1875rem', '2.1875rem', '4rem']}
            >
              <Image id={'logo-img'} src={logo} alt={''} layout={'fill'} objectFit={'cover'} priority={false} />
            </Box>
          </Link>
        </Box>
        <HeaderHamburgerDropdown menuDropdownRef={menuDropdown} menuVisible={menuVisible} />
      </Flex>
    </Flex>
  );
};
