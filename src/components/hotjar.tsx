"use client";

import { memo, useEffect } from "react";
import { hotjar } from "react-hotjar";

const Hotjar = () => {
  useEffect(() => {
    hotjar.initialize({ id: 5007002, sv: 6 });
  }, []);

  return null;
};

export default memo(Hotjar);
