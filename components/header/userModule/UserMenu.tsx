//hooks
import { Dispatch, SetStateAction } from 'react';

//components
import { Box, Flex } from '@chakra-ui/react';

//types
import { UserMenuDropdown } from '@components/header';
import { RefObject } from 'react';

interface UserMenuContainerProps {
  handleLogout: (...args: any[]) => any;
  name: string | null;
  menuVisible: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  menuRef: RefObject<HTMLDivElement>;
  menuDropdownRef: RefObject<HTMLDivElement>;
}
export const UserMenu = ({
  handleLogout,
  name,
  menuVisible,
  setMenuVisible,
  menuRef,
  menuDropdownRef,
}: UserMenuContainerProps) => {
  return (
    <Flex
      id={'user'}
      flexDir={'row-reverse'}
      align={'center'}
      onClick={() => setMenuVisible((prevState: boolean) => !prevState)}
      ref={menuRef}
    >
      <Flex
        w={['2.5rem', '2.5rem', '2.5rem', '4.375rem']}
        h={['2.5rem', '2.5rem', '2.5rem', '4.375rem']}
        bg={'linear-gradient(-45deg, #baa24f, #816f33)'}
        textTransform={'uppercase'}
        justify={'center'}
        align={'center'}
        borderRadius={'100rem'}
        fontWeight={'bolder'}
        boxShadow={'0 2px 3px 3px rgba(0, 0, 0, 33.33%)'}
        p={['2px', '2px', '2px', '3px']}
        ml={['-1em', '-1rem', '-1rem', '-2.5rem']}
      >
        <Flex
          w={'full'}
          h={'full'}
          bg={'#20252b'}
          justify={'center'}
          align={'center'}
          borderRadius={'100rem'}
          boxShadow={'0 2px 3px 3px rgba(0, 0, 0, 33.33%)'}
        />
      </Flex>
      <Box
        w={['2.3rem', '2.3rem', '2.3rem', '3.875rem']}
        h={['2.3rem', '2.3rem', '2.3rem', '3.875rem']}
        bg={'linear-gradient(-45deg, #baa24f, #816f33)'}
        borderRadius={'100rem'}
        boxShadow={'0 2px 3px 3px rgba(0, 0, 0, 33.33%)'}
        pos={'relative'}
        left={menuVisible ? ['1.5rem', '1.5rem', '1.4rem', '1.575rem'] : 0}
        transition={'left 0.66s'}
        transitionDelay={'250ms'}
        p={'3px'}
      >
        <Box id={'username-circle-outer'} bg={'#20252b'} borderRadius={'100rem'} w={'full'} h={'full'} p={'5px'}>
          <Flex
            id={'username-circle-inner'}
            w={'full'}
            h={'full'}
            bg={'#20252b'}
            color={'#baa24f'}
            textTransform={'uppercase'}
            justify={'center'}
            align={'center'}
            borderRadius={'100rem'}
            fontSize={['1rem', '1rem', '1rem', '2rem']}
            fontWeight={'bold'}
            boxShadow={'0 2px 3px 3px rgba(0, 0, 0, 33.33%)'}
          >
            {name?.charAt(0)}
          </Flex>
        </Box>
      </Box>
      <UserMenuDropdown menuDropdownRef={menuDropdownRef} menuVisible={menuVisible} handleLogout={handleLogout} />
    </Flex>
  );
};
