import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const AlertClose = () => {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert
      status="warning"
      fontSize="14px"
      padding={[2,3]}
      mt={5}
      borderRadius={5}
    >
      <InformationCircleIcon className="w-10 sm:w-6 h-10 sm:h-6 ml-2 text-orange-900" />
      <div className="ml-4">
        این صفحه توسط ادمین کوچا مدیریت می‌شود. لطفا جهت ثبت درخواست مالکیت آن،
        <Link href="#" className="mx-1 text-sky-700 font-medium">
          ایـنـجـا
        </Link>
        کلیک کنید.
      </div>
      <CloseButton position="absolute" left={1} top={[3,2]} onClick={onClose} />
    </Alert>
  ) : (
    <></>
  );
};
