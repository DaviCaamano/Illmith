import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@images/header-logo.webp';

export const Logo = () => {
  const [hover, setHover] = useState<boolean>(false);
  const [antiHover, setAntiHover] = useState<boolean>(false);
  return (
    <Box id={'header-logo-module'} pos={'relative'} h={'full'} w={['8rem', '8rem', '18.75rem']}>
      <TopLeftCornerPiece hover={hover && !antiHover} setHover={setHover} setAntiHover={setAntiHover} />
      <Flex h={'full'} overflow={'hidden'} pos={'absolute'} top={0}>
        <Link href={'/'} passHref>
          <Flex
            id={'logo-container'}
            h={'full'}
            minW={['7rem', '7rem', '11.25rem']}
            px={['1rem', '1rem', '2rem']}
            justify={'center'}
            align={'center'}
            borderRadius={'0 1.5625rem 0 1.5625rem'}
            cursor={'pointer'}
            boxShadow={[
              null,
              null,
              null,
              hover && !antiHover
                ? '0 0 3px 3px rgba(255, 255, 255, 0.1), inset 0 0 5px 10px rgba(255, 255, 255, 0.025), ' +
                  'inset 0 0 5px 20px rgba(255, 255, 255, 0.025), inset 0 0 5px 50px rgba(255, 255, 255, 0.025)'
                : '0 0 3px 3px rgba(255, 255, 255, 0.2), inset 0 0 5px 10px rgba(255, 255, 255, 0.05), ' +
                  'inset 0 0 5px 20px rgba(255, 255, 255, 0.05), inset 0 0 5px 50px rgba(255, 255, 255, 0.05)',
            ]}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            transition={'all 0.5s'}
          >
            <Box pos={'relative'} w={['4.29rem', '4.29rem', '6.5rem']} h={['1.44rem', '1.44rem', '2.1875rem']}>
              <Image id={'logo-img'} src={logo} alt={''} layout={'fill'} objectFit={'cover'} priority={false} />
            </Box>
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};
const TopLeftCornerPiece = ({
  hover,
  setHover,
  setAntiHover,
}: {
  hover: boolean;
  setHover: Dispatch<SetStateAction<boolean>>;
  setAntiHover: Dispatch<SetStateAction<boolean>>;
}) => (
  <Box id={'corner-border-box-top-right'} w={'full'} h={'full'} pos={'absolute'}>
    <Box w={'full'} h={'full'} pos={'relative'}>
      <Box
        id={'header-corner-piece-top-left'}
        h={'40px'}
        w={'40px'}
        top={'-13px'}
        left={'-26px'}
        overflow={'hidden'}
        pos={'absolute'}
        py={'0.4375rem'}
        bg={'#20252b'}
      >
        <Box
          pos={'absolute'}
          right={'14px'}
          top={'5px'}
          h={'40px'}
          w={'40px'}
          overflow={'hidden'}
          bg={hover ? '#2f343a' : '#40454a'}
          transition={'all 0.5s'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          cursor={'pointer'}
        >
          <Box
            id={'target'}
            pos={'absolute'}
            h={'30'}
            w={'30px'}
            top={'8px'}
            left={'10px'}
            borderRadius={'0 25px 0  0 '}
            boxShadow={[
              null,
              '0 0 3px rgb(255 255 255 / 75%)',
              '0 0 3px rgb(255 255 255 / 75%), inset 0 0 3px rgb(255 255 255 / 50%)',
            ]}
            bg={'#19212b'}
            zIndex={2}
            cursor={'default'}
            onMouseEnter={() => setAntiHover(true)}
            onMouseLeave={() => setAntiHover(false)}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);
