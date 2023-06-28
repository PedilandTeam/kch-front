"use client"
import Link from "next/link";
import { GENERAL } from "../components/allTexts";

export const Footer = () => {
  return (
    <footer className="text-center text-sm text-gray-500  mt-5 ">
      <p className="py-4 mx-5 border-t border-gray-100">
        {GENERAL.COPYRIGHT_TEXT1}{" "}
        <Link href="/">
          {GENERAL.KOOCHAA}، {GENERAL.KOOCHAA_SLOGAN}
        </Link>{" "}
        {GENERAL.COPYRIGHT_TEXT2}
      </p>
    </footer>
  );
};
