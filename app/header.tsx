"use client"

import { COUNTRY, MENU, MODAL } from "../components/allTexts";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

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
import { CountryNamespace } from "@/types/country";
import { useParams } from "next/navigation";


type HeaderProps = {
  countries: CountryNamespace.GET[]
}

export const Header = ({countries}: HeaderProps) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const params = useParams()
  useEffect(() => {
    console.log(params.path);
    
  },[params])

  return (
    <>
      <header>
        <div className="container mx-auto max-w-[1144px]">
          <div className="flex justify-between py-3 mx-3 sm:mx-0">
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
                  countryCode={params[0]}
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
                  onClick={onClose} 
                  countryCode="un"
                  className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                  title={COUNTRY.ALL_COUNTRIES}
                />
                <p className="text-sm	center text-center mt-2 font-medium">
                  {COUNTRY.ALL}
                </p>
              </Link>
              {
                countries.map((country, index) => {
                  return (
                    <Link key={country.code} href={country.code}>
                    <CircleFlag
                      onClick={onClose} 
                      countryCode={country.code}
                      className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 hover:cursor-pointer transition duration-200"
                      title={country.name}
                    />
                    <p className="text-sm	center text-center mt-2 font-medium">
                      {country.name}
                    </p>
                  </Link>
                  )
                })
              }

            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
