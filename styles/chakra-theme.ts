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
  styles: {
    global: {
      '#__next': {
        height: '100%',
        width: '100%',
      },
    },
  },
});

export { chakraTheme, ChakraProvider };
