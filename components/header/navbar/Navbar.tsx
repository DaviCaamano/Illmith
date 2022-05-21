//hooks
import { useRouter } from 'next/router';

//components
import Link from 'next/link';
import { Flex, Text } from '@chakra-ui/react';

//types
import { HeaderItem } from '@utils/header';
import { colors } from '@colors';

export const Navbar = ({ headerItem }: { headerItem: HeaderItem[] }) => {
  const { pathname } = useRouter();
  return (
    <Flex id={'navbar-items-container'} flex={1} justify={'center'} align={'center'} h={'full'}>
      {headerItem.map((headerItem: HeaderItem) => renderNavbarItems(headerItem, pathname))}
    </Flex>
  );
};

const renderNavbarItems = ({ external, external_same_page, name, to }: HeaderItem, pathname: string) => {
  const anchorTarget: string = external ? 'blank' : external_same_page ? '_self' : '';
  const isCurrentPage: boolean = to === pathname;
  return (
    <Link key={name} href={to} passHref>
      <a target={anchorTarget}>
        <Text
          pos={'relative'}
          display={'inline-block'}
          fontSize={'1.375rem'}
          fontWeight={450}
          color={isCurrentPage ? colors.text.title : colors.text.titleGrayed}
          mx={'1.25rem'}
          letterSpacing={0}
          textDecoration={!isCurrentPage ? 'none' : 'underline'}
          textDecorationThickness={'1px'}
          _hover={!isCurrentPage ? { textDecoration: 'none' } : {}}
        >
          {name}
        </Text>
      </a>
    </Link>
  );
};
