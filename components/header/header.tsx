import { getHeaderElements } from '@utils/header';
import { colors } from '@colors';
import { zIndices } from '@presets';
//types
import { HeaderItem } from '@utils/header';
import { WheelEvent } from 'react';
//hooks
import { useHandleScroll } from '@hooks/useHandleScroll';
import { useRef, useState } from 'react';
import { useGetUser } from '@contexts/redux';

//img
import Mems from '@icons/mems.svg';

//components
import { Box, Flex } from '@chakra-ui/react';
import { Navbar } from './navbar/Navbar';
import { UserModule } from '@components/header';
import { Logo } from '@components/header/Logo';
import { motion } from 'framer-motion';
const MotionDiv = motion.div;

const headerHeight = 80;
export const Header = () => {
  const { admin: isAdmin } = useGetUser();
  const [open, setOpen] = useState<boolean>(true);
  const isManual = useRef<boolean>(false);
  useHandleScroll(() => {
    if (!isManual.current && !open && window.scrollY < headerHeight) {
      setOpen(true);
    } else if (!isManual.current && open && window.scrollY > headerHeight) {
      setOpen(false);
    }
  });
  const navElements: HeaderItem[] = getHeaderElements(isAdmin);
  return (
    <Box id={'header'} pos={'fixed'} top={0} left={0} w={'100%'} h={headerHeight / 16 + 'rem'} zIndex={1}>
      <Box id={'header-inner'} pos={'relative'} w={'100%'} h={'100%'}>
        <MotionDiv
          id={'header-expanding-container'}
          initial={{ x: '0%' }}
          animate={{ x: open ? '0%' : '-100%' }}
          transition={{ x: { duration: 0.3333 } }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: 'calc(100% - 18.75rem)',
            zIndex: zIndices.banner,
            boxShadow: '0 0 3px 2px rgb(0 0 0 / 75%)',
            borderRadius: '0 0 150rem 0',
          }}
        >
          <Flex
            w={'full'}
            h={'full'}
            bgColor={colors.box.header}
            justify={'center'}
            align={'space-between'}
            borderRadius={'0 0 150rem 0'}
          >
            CONTENT WOO
          </Flex>
        </MotionDiv>
        <Box
          id={'header-expander-button'}
          h={'5rem'}
          w={'5rem'}
          bg={'white'}
          pos={'absolute'}
          pl={'0.125rem'}
          pt={'0.125rem'}
          borderRadius={'0 0 5rem 0'}
          boxShadow={`inset 0 0 3px 2px rgb(0 0 0 / ${open ? '75%' : '50%'}), 0 0 3px 2px rgb(0 0 0 / 75%)`}
          onClick={() => {
            if (!isManual.current) isManual.current = true;
            setOpen((prevState: boolean) => !prevState);
          }}
          zIndex={'tooltip'}
        >
          <Mems id="mems" width={60} height={60} />
        </Box>
      </Box>
    </Box>
  );
  // return (
  //   <Flex
  //     id={'header-root'}
  //     w={'full'}
  //     h={'3.125rem'}
  //     px={'5%'}
  //     pos={'absolute'}
  //     top={0}
  //     left={0}
  //     flexDir={'row'}
  //     alignItems={'center'}
  //     justifyContent={'center'}
  //     fontSize={'1.125rem'}
  //     fontWeight={'450'}
  //     zIndex={10}
  //   >
  //     <Flex
  //       id={'header'}
  //       w={'full'}
  //       h={'full'}
  //       pos={'relative'}
  //       justify={'space-between'}
  //       align={'center'}
  //       flexDir={'row'}
  //       bgColor={colors.box.header}
  //       boxShadow={'0 0 3px rgb(255 255 255 / 75%)'}
  //       borderRadius={'0 25px  0 25px'}
  //     >
  //       <Logo />
  //       <Navbar headerItem={navElements} />
  //       <UserModule />
  //     </Flex>
  //   </Flex>
  // );
};
