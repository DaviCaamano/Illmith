import { Box, forwardRef, TextProps } from '@chakra-ui/react';

export const Span = forwardRef<TextProps, 'p'>((props, ref) => {
  const newProps = { ...props, display: 'inline' };
  return <Box {...newProps} ref={ref} />;
});
