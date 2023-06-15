"use client"

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  direction: "rtl",
  fonts: {
    heading: `Pinar, sans-serif`,
    body: `Pinar, sans-serif`,
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "pink",
      },
    },
    Checkbox: {
      defaultProps: {
        colorScheme: "pink",
      },
    },
    Accordion: {
      defaultProps: {
        colorScheme: "red",
      },
    },
  },
});

export default theme;
