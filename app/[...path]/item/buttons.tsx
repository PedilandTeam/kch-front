import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import {
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

export const ItemButtons = () => {
  return (
    <Stack direction="row" spacing={3} align="center">
      <Button colorScheme="pink" variant="solid">
        <ChatBubbleBottomCenterTextIcon className="w-6 h-6 ml-2" />
        نظر خود را ثبت کنید
      </Button>
    </Stack>
  );
};
