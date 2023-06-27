import {
    Badge,
    Button, Checkbox,
    CheckboxGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useDisclosure
} from "@chakra-ui/react";
import { CATEGORY, GENERAL } from "../../../components/allTexts";
import { FunnelIcon } from "@heroicons/react/24/solid";

export const ListFilter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="filter-wrap">
      <div className="filter-title w-full flex md:hidden pt-1" onClick={onOpen}>
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
        <div className="filter-section mb-3 pb-4 border-dashed border-b border-gray-300  ">
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
                  <span className="text-sm">{CATEGORY.DRIVING_SCHOOL}</span>
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
  );
};
