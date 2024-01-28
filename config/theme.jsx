'use client';

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  direction: 'rtl',
  fonts: {
    heading: `Pinar, sans-serif`,
    body: `Pinar, sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium', // Normally, it is "semibold"
        // borderColor: "#888 !important",
        padding: '8px 12px !important',
      },
      defaultProps: {},
      variants: {},
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'pink',
      },
    },
    Accordion: {
      defaultProps: {
        colorScheme: 'red',
      },
    },
  },
});

export default theme;
