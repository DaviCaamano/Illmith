import { promptButtonVariant } from '@presets/components/variants';
import { colors } from '@colors';

const buttonVariant = {
  Button: {
    variants: {
      prompt_dark: promptButtonVariant(colors.button.prompt.dark),
      prompt_light: promptButtonVariant(colors.button.prompt.light),
    },
  },
};

export default buttonVariant;
