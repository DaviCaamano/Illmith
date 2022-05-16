import { getHeaderElements } from '@utils/header';
import { colors } from '@colors';

//images
import logo from '@images/header-logo.webp';

//types
import { HeaderItem } from '@utils/header';

//components
import Image from 'next/image';
import Link from 'next/link';
import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from './navbar/Navbar';
import { UserModule } from '@components/header';
import { useGetUser } from '@contexts/redux';

export const Header = () => {
  const { admin: isAdmin } = useGetUser();
  const navElements: HeaderItem[] = getHeaderElements(isAdmin);

  return (
    <Flex
      id={'header-root'}
      w={'100%'}
      h={'3.125rem'}
      py={'0.4375rem'}
      px={'5%'}
      pos={'absolute'}
      top={0}
      left={0}
      flexDir={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      fontSize={'1.125rem'}
      fontWeight={'450'}
      bgColor={colors.box.header}
      borderBottom={'lightgray 1px solid'}
      boxShadow={'0 0 10px rgb(0 0 0 / 50%)'}
    >
      <Link href={'/'} passHref>
        <Box id={'logo-container'} h={'full'} mr={'2rem'} pos={'relative'}>
          <Image
            id={'logo-img'}
            src={logo}
            alt={''}
            height={35}
            width={104}
            layout={'fixed'}
            objectFit={'cover'}
            priority={false}
          />
        </Box>
      </Link>
      <Navbar headerItem={navElements} />
      <UserModule />
    </Flex>
  );
};
