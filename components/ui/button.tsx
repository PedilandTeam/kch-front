import { Box } from "@chakra-ui/react";

export const NewButton = () => {
  return (
    <Box
      as="button"
      height="30px"
      lineHeight="1.2"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      border="1px"
      px="8px"
      borderRadius="5px"
      fontSize="14px"
      fontWeight="semibold"
      bg="#f5f6f7"
      borderColor="#ccd0d5"
      color="#4b4f56"
      _hover={{ bg: "#ebedf0" }}
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      _focus={{}}
    >
      Join Group
    </Box>
  );
};
