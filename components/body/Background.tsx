import { Box } from '@chakra-ui/react';
import background from '@images/background/body-background.webp';
import { colors } from '@colors';

export const Background = () => (
  <>
    <Box
      id={'body-bg-left'}
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      pointerEvents={'none'}
      bg={`url("/images/background/body-background.webp") repeat-y`}
      bgAttachment={'scroll'}
      zIndex={-1000000}
    />
    <Box
      id={'body-bg-right'}
      pos={'absolute'}
      w={'100%'}
      h={'100%'}
      pointerEvents={'none'}
      bg={`url("/images/background/body-background.webp") repeat-y, ${colors.box.mainBg}`}
      bgAttachment={'scroll'}
      transform={'scale(-1)'}
      zIndex={-1000001}
    />
  </>
);
