import { createBreakpoints } from '@chakra-ui/theme-tools';

export const breakpoints = createBreakpoints({
  sm: '23em', //367px (Use { Base: 'value', sm: 'value', md: value, lg: value } below 368px screens
  md: '48em', //768px
  lg: '64em', //1024
  xl: '90em', //1440px
  '2xl': '120em', //1920px
});
