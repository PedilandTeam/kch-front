import { Badge } from "@chakra-ui/react";
import { GENERAL } from "../util/allTexts";

export const BadgeNew = ({ variant }) => {
  return (
    <Badge
      colorScheme={variant == "featured" ? "red" : "green"}
      fontSize=".85rem"
      pos="absolute"
      top="3"
      right={variant == "new" && "3"}
      left={variant == "featured" && "3"}
    >
      {variant == "featured" ? GENERAL.FEATURED : GENERAL.NEW}
    </Badge>
  );
};
