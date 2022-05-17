import { Box, Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Exclamation from '@icons/exclamation-box.svg';
import { motion } from 'framer-motion';

export const ModalError = ({ children }: { children: ReactNode | JSX.Element | JSX.Element[] | string }) => {
  return (
    <Box className={'modal-error-container'} w={'full'} h={'full'} pos={'absolute'} float={'left'}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: children ? '100%' : 0 }}
        exit={{ y: 0 }}
        style={{
          display: 'flex',
          position: 'absolute',
          bottom: '0',
          left: 0,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'start',
          flexDirection: 'row',
          padding: '1rem 0.75rem',
          background: 'rgb(254, 215, 215)',
          zIndex: 50,
          border: '#282c34 2px solid',
          borderTop: 0,
          borderRadius: '0 0 0.625rem 0.625rem',
        }}
      >
        <Flex h={'full'} align={'center'} justify={'center'} mr={'0.625rem'}>
          <Exclamation className="exclamation-svg-modal-error" alt="Warning!" width={22} height={21} layout={'fixed'} />
        </Flex>
        <Text className={'modal-error-text'} w={'calc(100% - 1.375rem)'} pl={'1rem'} pr={'2rem'}>
          {children}
        </Text>
      </motion.div>
    </Box>
  );
};
