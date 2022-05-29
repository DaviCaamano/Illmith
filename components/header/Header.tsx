import { colors } from '@colors';
import { zIndices } from '@presets';

//components
import { Logo, NavbarLinks, UserModule } from './';
import { Box, Flex } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Box
      id={'header'}
      pos={'fixed'}
      top={0}
      left={[0, 0, 0, '5rem']}
      w={['full', 'full', 'full', 'calc(100% - 9rem)']}
      h={['3.125rem', '3.125rem', '3.125rem', '5rem']}
      zIndex={1}
    >
      <Flex
        id={'navbar'}
        pos={'relative'}
        width={['calc(100vw + 3.125rem)', 'calc(100vw + 3.125rem)', 'calc(100vw + 3.125rem)', 'calc(100% - 1rem)']}
        h={'full'}
        bgColor={colors.box.header}
        justify={'center'}
        align={'center'}
        borderRadius={['0 0 3.125rem 0', '0 0 3.125rem 0', '0 0 3.125rem 0', '0 5rem 5rem 0']}
        zIndex={zIndices.banner}
        boxShadow={'0 0 3px 2px rgb(0 0 0 / 75%)'}
      >
        <Logo />
        <NavbarLinks />
        <UserModule />
      </Flex>
    </Box>
  );
};
