import { menuAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

const baseStyle = definePartsStyle({
  groupTitle: {
    bg: "PrimaryLighter",
    px: 2,
    borderRadius: "md",
    color: "Primary",
    fontSize: 12,
  },
});
export const menuTheme = defineMultiStyleConfig({ baseStyle });
