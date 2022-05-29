import { getHeaderElements } from '@utils/header';
import { colors } from '@colors';

//hooks
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useGetUser } from '@contexts';

//components
import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/react';

//types
import { NavItem } from '@interface/components/header';

export const NavbarLinks = () => {
  const { admin: isAdmin } = useGetUser();
  const navElements: NavItem[] = useMemo(() => getHeaderElements(isAdmin), [isAdmin]);
  const { pathname } = useRouter();
  return (
    <Flex
      id={'navbar-items-container'}
      justify={'center'}
      align={'center'}
      h={'full'}
      display={['none', 'none', 'flex']}
    >
      {navElements.map((NavItem: NavItem) => renderNavbarItems(NavItem, pathname))}
    </Flex>
  );
};

const renderNavbarItems = ({ external, external_same_page, name, to }: NavItem, pathname: string) => {
  const anchorTarget: string = external ? 'blank' : external_same_page ? '_self' : '';
  const isCurrentPage: boolean = to === pathname;
  return (
    <Link key={name} href={to} passHref>
      <a target={anchorTarget}>
        <Text
          pos={'relative'}
          display={'inline-block'}
          fontSize={['1rem', '1rem', '1.25rem', '1.375rem']}
          fontWeight={450}
          color={isCurrentPage ? colors.text.titleDark : colors.text.titleGrayed}
          mx={'1.25rem'}
          letterSpacing={0}
          textDecoration={!isCurrentPage ? 'none' : 'underline'}
          textDecorationThickness={'1px'}
          _hover={{ textDecoration: 'none', color: colors.text.titleDarkBright }}
        >
          {name}
        </Text>
      </a>
    </Link>
  );
};
