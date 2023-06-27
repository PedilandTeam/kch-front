"use client";

import { useEffect } from "react";

import { usePathSeparator } from "@/hooks/usePathSeparator";
import Item from "./item/item";
import Country from "./country";
import List from "./list";

export default function Path({ params }: { params: { path: string[] } }) {
  const property = {
    reviewCount: 34,
    rating: 4,
  };

  const paths = usePathSeparator(params.path);
  useEffect(() => {
    console.log(paths);
  }, [params.path]);

  if (paths.country && paths.country.length == 2 && !paths.unit) {
    return <Country />;
  } else if (paths.country.length > 2 && !paths.unit) {
    return <Item />;
  }
  return <List />;
}
