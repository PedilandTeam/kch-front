'use client';
import { Global } from '@emotion/react';

const Fonts = () => (
    <Global
        styles={`
      @font-face {
        font-family: "Pinar";
        src: url("/fonts/Pinar-FD-VF.woff2") format('woff2 supports variations'),
             url("/fonts/Pinar-FD-VF.woff2") format('woff2-variations');
        font-display: fallback;
      }
      @font-face {
        font-family: "Pinar-LT";
        src: url("/fonts/Pinar-VF.woff2") format('woff2 supports variations'),
             url("/fonts/Pinar-VF.woff2") format('woff2-variations');
        font-display: fallback;
      }
      `}
    />
);

export default Fonts;
