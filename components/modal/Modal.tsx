import { CSSProperties, ReactNode } from 'react';

//components
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Flex } from '@chakra-ui/react';
import { ModalError } from '@components/modal/alert/ModalError';

const fadeOut = {
  opacity: 0,
  x: 0,
  y: '-2rem',
};
const fadeIn = {
  opacity: 1,
  x: 0,
  y: 0,
};

interface ModalContainerProps {
  hide: () => any;
  onBackdropClick?: () => any;
  animation?: CSSProperties;
  children?: JSX.Element | JSX.Element[] | string | ReactNode;
  height: string;
  width: string;
  zIndex?: number;
  id?: string;
  warning?: string;
}

export const Modal = ({
  hide,
  height,
  width,
  zIndex = 10000,
  children,
  warning,
  id,
  onBackdropClick = () => true,
}: ModalContainerProps) => {
  const variants = {
    fadeOut: { ...fadeOut, height, width },
    fadeIn: { ...fadeIn, height, width },
  };
  return (
    <Flex
      id={id}
      className={`modal-backdrop`}
      w={'calc(100vw - (100vw - 100%))'}
      h={'100vh'}
      position={'fixed'}
      justify={'center'}
      align={'center'}
      top={0}
      left={0}
      zIndex={zIndex}
      bgColor={children ? 'rgba(0,0,0, 0.30)' : 'none'}
      onClick={() => {
        if (onBackdropClick() && hide) {
          hide();
        }
      }}
      pointerEvents={children ? 'all' : 'none'}
    >
      <AnimatePresence>
        {children && (
          <motion.div
            className={'modal-content-animator'}
            initial={'fadeOut'}
            animate={children ? 'fadeIn' : 'fadeOut'}
            variants={variants}
            transition={{ duration: 0.3 }}
            exit={fadeOut}
          >
            <Box
              className="modal-container"
              pos={'relative'}
              zIndex={zIndex + 1}
              h={'full'}
              w={'full'}
              pointerEvents={'all'}
              padding={'1.5625rem'}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Box className={'modal-container-positioner'} pos={'relative'} w={'full'} h={'full'}>
                <ModalError error={warning} />
                <Box
                  className="modal"
                  h={'full'}
                  w={'full'}
                  pos={'relative'}
                  z-index={'101 !important'}
                  fontSize={'1.125rem'}
                  display={'block'}
                  bg={`url('/images/background/main-left.webp') left repeat-y, url('/images/background/main-right.webp') right repeat-y, white`}
                  bgSize={'20%'}
                  pointerEvents={'all'}
                  filter={'drop-shadow(0px 1px 2px rgba(0,0,0,.5))'}
                  border={'#282c34 2px solid'}
                  overflow={'hidden'}
                >
                  {children}
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};
