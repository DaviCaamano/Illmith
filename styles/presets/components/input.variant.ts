import { colors } from '@colors';

const inputVariant = {
  Input: {
    variants: {
      modal: {
        field: {
          pos: 'relative',
          width: '100%',
          px: '1.25rem',
          py: '1.25rem',
          display: 'inline-block',
          border: '1px solid lightgray',
          color: colors.input.modal.text,
          borderRadius: '5px',
          fontSize: '1.125rem',
          bg: colors.input.modal.bg,
          boxShadow: 'inset 0 0 1px darkgray',

          _hover: {
            boxShadow: 'inset 0 0 3px darkgray',
          },
          _placeholder: { color: 'gray' },
          _focus: {
            border: '2px solid lightgray',
            px: '1.1875rem',
            py: '1.1875rem',
            boxShadow: 'inset 0 0 5px lightgray',
          },
        },
      },
      check: {
        field: {
          w: '1.25rem',
          h: '1.25rem',
          p: 0,
          border: '1px solid #ccc',
          borderRadius: '1px',
          outline: '2px solid transparent',
          _checked: {},
        },
      },
    },
  },
};

export default inputVariant;
