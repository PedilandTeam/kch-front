import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";

interface QuestionModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  openModal,
  setOpenModal,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalSize, setModalSize] = useState("full");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 728) {
        setModalSize("2xl");
      } else {
        setModalSize("full");
      }
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal
        isOpen={openModal}
        size={modalSize}
        backdrop="blur"
        onOpenChange={onOpenChange}
        onClose={() => setOpenModal(false)}
        placement="top-center"
        // className=""
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2>ثبت سوال</h2>
              </ModalHeader>
              <ModalBody>
                <Select
                color="warning"
                  isRequired
                  // label="تاپیک"
                  placeholder="انتخاب تاپیک"
                  className="w-full"
                  variant="bordered"
                >
                  <SelectItem>test</SelectItem>
                  <SelectItem>2</SelectItem>
                  <SelectItem>test</SelectItem>
                  <SelectItem>test</SelectItem>
                </Select>
                <Input
                color="warning"
                  autoFocus
                  placeholder="سوال "
                  variant="bordered"
                  size="lg"
                />
                <div id="textarea-wrapper">
                  <Textarea size="lg" className=""  color="warning" variant="bordered" placeholder="توضیحات"  />
                </div>
                <Button className=" max-w-[6rem]" color="primary">
                  ثبت سوال
                </Button>
              </ModalBody>
              <ModalFooter>
                {/* <Button color="danger" variant="flat" onPress={onClose}>
                  بستن
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionModal;
