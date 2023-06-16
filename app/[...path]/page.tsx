"use client"

import {
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { CATEGORY, COUNTRY, GENERAL } from "../../components/allTexts";
import { BadgeNew } from "../../components/elements/badgenew";
import { BookOpenIcon, EyeIcon, FunnelIcon } from "@heroicons/react/24/solid";
import { OpenHours } from "../../components/elements/openhours";
import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { CircleFlag } from "react-circle-flags";
import Rating from "react-rating";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathSeparator } from "@/hooks/usePathSeparator";
import Item from "./item/item";
import Country from "./country";

export default function List({params}: {params: {path: string[]}}) {
  const property = {
    reviewCount: 34,
    rating: 4,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const paths = usePathSeparator(params.path)
  useEffect(() => {
    console.log(paths);
    
  },[params.path])

  if(paths.country && paths.country.length == 2 && !paths.unit){
    return <Country/>
  }else if(paths.country.length > 2 && !paths.unit){
    return <Item/>
  }
  

  return (
    <div className="component mt-5 page-list">
      <div className="container mx-auto max-w-screen-2xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-y-4 sm:gap-5">
          <div className="sidebar rounded-md border bg-slate-50 p-3">
            <div
              className="filter-title w-full flex md:hidden pt-1"
              onClick={onOpen}
            >
              <FunnelIcon className="h-5 w-5 ml-2" />
              <span className="font-semibold">{GENERAL.FILTERS}</span>
            </div>
            <Modal isOpen={isOpen} onClose={onClose} size="full">
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{GENERAL.FILTER_SELECT_PLEASE}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="filter-body pt-3">
                    <div className="filter-section mb-3 pb-4 border-dashed border-b">
                      <h3 className="font-medium mb-2">{GENERAL.CATEGORY}</h3>
                      <CheckboxGroup colorScheme="blue">
                        <Stack
                          spacing={[2, 5]}
                          direction={["column", "column"]}
                          className=" text-gray-600 "
                        >
                          <div className="item flex justify-between items-center">
                            <Checkbox>{CATEGORY.RESTAURANT}</Checkbox>
                            <Badge>58</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>{CATEGORY.DRIVING_SCHOOL}</Checkbox>
                            <Badge>77</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>{CATEGORY.ZANAN}</Checkbox>
                            <Badge>102</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>{CATEGORY.GOOSH}</Checkbox>
                            <Badge>35</Badge>
                          </div>
                        </Stack>
                      </CheckboxGroup>
                    </div>
                    <div className="filter-section mb-3">
                      <h3 className="font-medium mb-2">{GENERAL.CITY_NAME}</h3>
                      <CheckboxGroup colorScheme="blue">
                        <Stack
                          spacing={[2, 3]}
                          direction={["column", "column"]}
                          className=" text-gray-600 "
                        >
                          <div className="item flex justify-between items-center">
                            <Checkbox>برلین</Checkbox>
                            <Badge>18</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>کلن</Checkbox>
                            <Badge>61</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>فرانکفورت</Checkbox>
                            <Badge>164</Badge>
                          </div>
                          <div className="item flex justify-between items-center">
                            <Checkbox>هامبورگ</Checkbox>
                            <Badge>11</Badge>
                          </div>
                        </Stack>
                      </CheckboxGroup>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" ml={3} onClick={onClose}>
                    {GENERAL.FILTER_APPLY}
                  </Button>
                  <Button variant="ghost">{GENERAL.BACK_TO_LIST}</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <div className="filter-title w-full hidden md:flex md:items-center border-b pb-2">
              <FunnelIcon className="h-4 w-4 ml-2" />
              <span className="font-semibold">{GENERAL.FILTERS}</span>
            </div>
            <div className="filter-body pt-3 hidden md:block">
              <div className="filter-section mb-3 pb-4 border-dashed border-b">
                <h3 className="font-medium mb-2">{GENERAL.CATEGORY}</h3>
                <CheckboxGroup colorScheme="blue">
                  <Stack
                    spacing={[2, 1]}
                    direction={["column", "column"]}
                    className=" text-gray-600"
                  >
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">{CATEGORY.RESTAURANT}</span>
                      </Checkbox>
                      <Badge>20</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">
                          {CATEGORY.DRIVING_SCHOOL}
                        </span>
                      </Checkbox>
                      <Badge>75</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">{CATEGORY.ZANAN}</span>
                      </Checkbox>
                      <Badge>103</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">{CATEGORY.GOOSH}</span>
                      </Checkbox>
                      <Badge>210</Badge>
                    </div>
                  </Stack>
                </CheckboxGroup>
              </div>
              <div className="filter-section mb-3">
                <h3 className="font-medium mb-2">{GENERAL.CITY_NAME}</h3>
                <CheckboxGroup colorScheme="blue">
                  <Stack
                    spacing={[2, 1]}
                    direction={["column", "column"]}
                    className=" text-gray-600 "
                  >
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">برلین</span>
                      </Checkbox>
                      <Badge>13</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">کلن</span>
                      </Checkbox>
                      <Badge>44</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">فرانکفورت</span>
                      </Checkbox>
                      <Badge>67</Badge>
                    </div>
                    <div className="item flex justify-between items-center">
                      <Checkbox>
                        <span className="text-sm">هامبورگ</span>
                      </Checkbox>
                      <Badge>4</Badge>
                    </div>
                  </Stack>
                </CheckboxGroup>
              </div>
            </div>
          </div>
          <div className="page-content sm:col-span-4">
            <div className="list-card grid grid-cols-1 sm:grid-cols-4 gap-y-4 sm:gap-3">
              <Card overflow="hidden" variant="outline">
                <div className="border-b bg-slate-50 h-24 mb-14">
                  <div className="flex justify-center mt-9">
                    <Link href="/de/item">
                      <Image
                        alt="لیست"
                        src={"/img/list/list-demo.webp"}
                        width={112}
                        height={112}
                        className="rounded-full w-28 h-28"
                      />
                    </Link>
                  </div>
                  <div>
                    <BadgeNew variant={"new"} />
                    <BadgeNew variant={"featured"} />
                  </div>
                </div>
                <CardBody>
                  <div className="flex justify-center card-header">
                    <HStack>
                      <OpenHours />
                      <Link href="/de/item">
                        <Heading size="md">رستوران البرز کلن</Heading>
                      </Link>
                    </HStack>
                  </div>

                  <div className="flex justify-center mt-4 card-rating">
                  {/* @ts-ignore */}
                    <Rating
                      initialRating={2}
                      emptySymbol={
                        <StarIcon className="h-5 w-5 text-gray-300" />
                      }
                      fullSymbol={
                        <StarIcon className="h-5 w-5 text-yellow-400" />
                      }
                    />
                    <span className="mr-2 text-sm text-gray-500">
                      (304 نظر)
                    </span>
                  </div>
                </CardBody>
                <div className="border-t p-3">
                  <div className="flex w-full justify-between card-tools text-sm text-gray-700">
                    <div className="flex">
                      <CircleFlag
                        countryCode="de"
                        className="w-5 ml-2"
                        title={COUNTRY.GERMANY}
                      />
                      کلن
                    </div>
                    <div className="flex justify-center content-center">
                      <BookOpenIcon className="w-5 ml-1 text-gray-400" />
                      <span>{CATEGORY.RESTAURANT}</span>
                    </div>
                    <div className="flex">
                      <EyeIcon className="w-5 ml-1 text-gray-400" />
                      <span>112</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
