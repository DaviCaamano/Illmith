const pseudoComponent = {
  content: "''",
  pos: 'absolute',
  w: '100%',
  h: '2px',
  top: 0,
  left: '-100%',
  transition: 'all 0.4s ease-in-out, background 0.15s ease-in-out',
};
export const promptButtonVariant = (color: { text: string; hoverText: string; bg: string; animatedBar: string }) => ({
  w: 'auto',
  pos: 'relative',
  color: color.text,
  lineHeight: '45px',
  fontWeight: 'semibold',
  letterSpacing: '1px',
  fontSize: ['0.875rem', '0.875rem', '1rem'],
  bg: color.bg,
  borderRadius: '3px',
  transition: 'all 150ms linear',
  cursor: 'pointer',
  textDecoration: 'none',
  textTransform: 'uppercase',
  overflow: 'hidden',
  _hover: {
    bg: 'transparent !important',
    color: color.hoverText,
    textDecoration: 'none',
    transition: 'all 150ms linear',

    _before: { left: 0 },
    _after: { right: 0 },
  },
  _active: {
    opacity: 0.5,
  },
  _before: {
    ...pseudoComponent,
    bgColor: color.animatedBar,
  },
  _after: {
    ...pseudoComponent,
    bgColor: color.animatedBar,
    bottom: '0 !important',
    top: 'auto !important',
    right: '-100%',
    left: 'auto',
  },
  _disabled: {
    pointerEvents: 'none',
  },
});
