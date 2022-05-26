import { getHeaderElements } from '@utils/header';
import { colors } from '@colors';

//types
import { HeaderItem } from '@utils/header';

//components
import { Flex } from '@chakra-ui/react';
import { Navbar } from './navbar/Navbar';
import { UserModule } from '@components/header';
import { useGetUser } from '@contexts/redux';
import { Logo } from '@components/header/Logo';

export const Header = () => {
  const { admin: isAdmin } = useGetUser();
  const navElements: HeaderItem[] = getHeaderElements(isAdmin);
  return (
    <Flex
      id={'header-root'}
      w={'full'}
      h={'3.125rem'}
      px={'5%'}
      pos={'absolute'}
      top={0}
      left={0}
      flexDir={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      fontSize={'1.125rem'}
      fontWeight={'450'}
      zIndex={10}
    >
      <Flex
        w={'full'}
        h={'full'}
        pos={'relative'}
        justify={'center'}
        align={'center'}
        flexDir={'row'}
        bgColor={colors.box.header}
        boxShadow={'0 0 3px rgb(255 255 255 / 75%)'}
        borderRadius={'0 25px  0 25px'}
      >
        <Logo />
        <Navbar headerItem={navElements} />
        <UserModule />
      </Flex>
    </Flex>
  );
};
