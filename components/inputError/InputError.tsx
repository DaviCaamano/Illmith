import { CSSProperties, useState, useEffect } from 'react';

//Components
import { Box, Flex } from '@chakra-ui/react';
import Exclamation from '@icons/ExclamationBox';

interface InputErrorContainerProps {
  error: string | null;
  setError: (warning: string) => any;
  children?: JSX.Element;
  style?: CSSProperties;
}
export const InputError = ({ children, error, setError, style }: InputErrorContainerProps) => {
  const [visible, setVisible] = useState(!!error);

  useEffect(() => {
    if (error) setVisible(true);
    const dropAlert = () => {
      setError('');
      setVisible(false);
    };
    window.addEventListener('mousedown', dropAlert);
    return () => window.removeEventListener('mousedown', dropAlert);
    // eslint-disable-next-line
  }, [error]);

  return (
    <Box className={'input-error'} position={'relative'} w={'auto'} style={style}>
      <Box
        pos={'absolute'}
        top={'calc(100% + 0.5rem)'}
        left={'50%'}
        transform={'translateX(-50%)'}
        maxW={'66.6%'}
        fontSize={'0.875rem'}
        filter={'drop-shadow(2px 4px 2px rgba(0,0,0, .25))'}
        zIndex={'120'}
        pointerEvents={'none'}
        display={visible ? 'block' : 'none'}
      >
        <Box
          className="input-error-content-container"
          position={'relative'}
          maxW={'600px'}
          height={'auto'}
          border={'1px solid darkgray'}
          padding={'10px 7px'}
          boxSizing={'border-box'}
          bgColor={'white'}
          borderRadius={'3px'}
          _after={{
            content: "''",
            position: 'absolute',
            width: '0.75rem',
            height: '0.75rem',
            borderTop: '1px solid darkgray',
            borderLeft: '1px solid darkgray',
            bgColor: 'white',
            bottom: 'calc(100% - 0.3125rem)',
            left: '5%',
            transform: 'rotate(45deg)',
            boxSizing: 'border-box',
            filter: 'none',
          }}
        >
          {error ? (
            <Flex
              className={'input-error-content'}
              position={'relative'}
              align={'center'}
              justify={'center'}
              flexDir={'row'}
              mr={'0.3125rem'}
            >
              <Flex h={'full'} align={'center'} justify={'center'} mr={'0.625rem'}>
                <Exclamation className="exclamation-svg" alt="Warning!" width={22} height={21} />
              </Flex>
              <Box>{error}</Box>
            </Flex>
          ) : null}
        </Box>
      </Box>
      {children}
    </Box>
  );
};
