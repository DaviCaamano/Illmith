import { memo } from 'react';
import Exclamation from '@icons/ExclamationBox';
import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const ModalError = memo(({ error }: { error?: string }) => {
  return (
    <Box className={'modal-error-container'} w={'full'} h={'full'} pos={'absolute'} float={'left'}>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: error ? '100%' : 0 }}
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
          padding: '0.5rem 0.5rem',
          background: '#eeddb4',
          zIndex: -1,
          border: '#282c34 2px solid',
          borderTop: 0,
          borderRadius: '0 0 0.625rem 0.625rem',
        }}
      >
        <Flex h={'full'} align={'center'} justify={'center'} mr={'0.625rem'}>
          <Exclamation
            className="exclamation-svg-modal-error"
            alt="Warning!"
            style={{ fill: 'red' }}
            width={'2.5rem'}
            height={'2.5rem'}
            fillstart={'#c99d36'}
            fillend={'#c99d36'}
          />
        </Flex>
        <Text className={'modal-error-text'} w={'calc(100% - 1.375rem)'} pl={'1rem'} pr={'2rem'} fontWeight={'medium'}>
          {error}
        </Text>
      </motion.div>
    </Box>
  );
});
ModalError.displayName = 'ModalError';
