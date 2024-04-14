"use client";
import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'AnjomanMaxVF';
        src: url('/fonts/AnjomanMaxVF.woff') format('woff-variations'),
        url('/fonts/AnjomanMaxVF.woff') format('woff');
        font-weight: 100 1000;
        font-display: fallback;
      }
      `}
  />
);

export default Fonts;
