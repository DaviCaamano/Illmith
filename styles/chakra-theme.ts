import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { breakpoints, colors, components, zIndices } from '@presets';

const chakraTheme = extendTheme({
  fonts: {
    body: 'Montserrat, serif',
  },
  colors,
  zIndices,
  breakpoints,
  components,
});

export { chakraTheme, ChakraProvider };
