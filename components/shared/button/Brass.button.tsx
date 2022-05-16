import BrassBg from '@images/background/button/brass_bg.svg';
import BrassEnd from '@images/background/button/brass_end.svg';

import { Box, Button, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

export const BrassButton = ({
  id,
  width,
  height,
  children,
}: {
  id?: string;
  width?: string;
  height?: string;
  children?: JSX.Element | JSX.Element[] | ReactNode | string;
}) => {
  return (
    <Button
      id={id}
      pos={'relative'}
      w={width ?? '142px'}
      h={height ?? 12}
      color={'white'}
      bg={`url("/images/background/button/brass_bg.svg") !important`}
      _hover={{
        outline: '2px solid black',
      }}
    >
      <Edge id={id} direction={Direction.left} />
      <Edge id={id} direction={Direction.right} />
      {children}
    </Button>
  );
};

enum Direction {
  left = 'LEFT',
  right = 'RIGHT',
}
const Edge = ({ id, direction }: { id?: string; direction: Direction }) => {
  const isLeft = direction === Direction.left;
  return (
    <Box
      id={id + (direction ? '-left--right-bg' : '-right-bg')}
      h={'full'}
      w={'2.875rem'}
      pos={'absolute'}
      left={isLeft ? '-2.875rem' : ''}
      right={!isLeft ? '-2.875rem' : ''}
      pointerEvents={'none'}
    >
      <Box h={'full'} w={'full'} overflow={'hidden'} pos={'relative'}>
        <Box
          pos={'absolute'}
          left={isLeft ? '0.875rem' : ''}
          right={!isLeft ? '0.875rem' : ''}
          bg={'red'}
          transform={'rotate(45deg)'}
          width={'2.875rem'}
          height={'3rem'}
          pointerEvents={'all'}
          overflow={'hidden'}
        >
          <Image
            src={'/images/background/button/brass_end.svg'}
            width={'full'}
            height={'full'}
            pos={'relative'}
            left={isLeft ? '-8px' : ''}
            right={!isLeft ? '-8px' : ''}
            top={isLeft ? '8px' : '-8px'}
            alt={id ? id + (isLeft ? '-left--right-bg' : '-right-bg') : 'button-left-side'}
            transform={`rotate(${isLeft ? '-45' : '135'}deg)`}
            pointerEvents={'none'}
          />
        </Box>
      </Box>
    </Box>
  );
};
