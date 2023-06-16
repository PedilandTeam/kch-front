"use client"

import { COUNTRY, MENU, MODAL } from "../components/allTexts";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export const Header = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <header className="shadow-sm">
        <div className="p-3">
          <div className="flex justify-between">
            <div className="logo">
              <Link href="/">
                <Image
                  src="/img/logo.svg"
                  width={180}
                  height={56}
                  alt="Pediland Logo"
                />
              </Link>
            </div>
            <div className="flex items-center tools">
              <div className="select-country">
                <CircleFlag
                  countryCode="un"
                  className="opacity-75 hover:opacity-100 hover:cursor-pointer transition"
                  width={40}
                  onClick={onOpen}
                />
              </div>
              <div className="menu-icon mr-3">
                <Bars3Icon
                  className="text-lg h-11 w-11 hover:cursor-pointer"
                  ref={btnRef}
                  onClick={onDrawerOpen}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        initialFocusRef={undefined}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div className="logo">
              <Link href="/">
                <Image
                  src="/img/logo.svg"
                  width={160}
                  height={50}
                  alt="Pediland Logo"
                />
              </Link>
            </div>
          </DrawerHeader>
          <DrawerBody>
            <ul className="border-dashed border-y divide-dashed divide-y">
              <li className=" py-2 px-3">
                <Link href="/de" onClick={onDrawerClose}>
                  {MENU.COMMUNITIES}
                </Link>
              </li>
              <li className=" py-2 px-3">
                <Link href="#">{MENU.BUSINESSES}</Link>
              </li>
              <li className=" py-2 px-3">
                <Link href="#">{MENU.DOCTORS}</Link>
              </li>
            </ul>
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Modal
        isOpen={isOpen}
        scrollBehavior={"inside"}
        onClose={onClose}
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md">{MODAL.COUNTRY_TITLE}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid grid-cols-4 gap-7 md:grid-cols-12 md:gap-10 place-content-center mb-4 country-list">
              <Link href="#">
                <CircleFlag
                  countryCode="un"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.ALL_COUNTRIES}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.ALL}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="de"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.GERMANY}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.GERMANY}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="gb-eng"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.ENGLAND}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.ENGLAND}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="se"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.SWEDEN}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.SWEDEN}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="at"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.AUSTRIA}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.AUSTRIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="tr"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.TURKEY}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.TURKEY}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="ca"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.CANADA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="us"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.USA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="au"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.AUSTRALIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="ae"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.UAE}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="my"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.MALAYSIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="fr"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.FRANCE}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="nl"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.NETHERLANDS}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="it"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.ITALY}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="dk"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.DENMARK}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="be"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.BELGIUM}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="nz"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.NEWZEALAND}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="kw"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.KUWAIT}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="qa"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.QATAR}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="am"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.ARMENIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="ch"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.SWITZERLAND}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="no"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.NORWAY}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="ge"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.GEORGIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="es"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.SPAIN}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="ru"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.RUSSIA}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="fi"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.FINLAND}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="cy"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.CYPRUS}
                </p>
              </Link>
              <Link href="#">
                <CircleFlag
                  countryCode="jp"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.JAPAN}
                </p>
              </Link>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
