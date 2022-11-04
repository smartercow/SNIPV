import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";
const customVariant = defineStyle((props) => {
  return {
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    borderColor: "BorderGray",
    borderWidth: 1,
    _hover: {
      bg: "gray.100",
    },
  };
});

const disabledStyles = {
  _hover: {
    bg: "Primary",
    opacity: 0.5,
  },
};

export const Button = {
  baseStyle: {
    transition: "transform 0.15s ease-out, background 0.15s ease-out",
    textTransform: "uppercase",
  },
  variants: {
    custom: customVariant,
    btnSub: {
      color: "white",
      bg: "Primary",
      fontWeight: 500,
      fontSize: "xs",
      height: "2rem",
      minW: "80px",
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        ...disabledStyles,
        _hover: {
          ...disabledStyles,
        },
      },
    },
    btnCloseGhost: {
      color: "Red",
      fontSize: "sm",
      height: "2.3rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      _hover: {
        bg: "RedLight",
      },
    },
    btnCloseFlat: {
      bg: "RedLight",
      color: "Red",
      fontSize: "sm",
      height: "2.3rem",
      fontWeight: "bold",
      _hover: {
        opacity: 0.8,
      },
    },
    entry: {
      color: "white",
      bg: "Primary",
      fontWeight: 500,
      fontSize: "sm",
      height: "2.3rem",
      minW: "90px",
      _hover: {
        opacity: 0.8,
      },
      _disabled: {
        ...disabledStyles,
        _hover: {
          ...disabledStyles,
        },
      },
    },
    create: {
      bg: "Primary",
      color: "white",
      minW: "130px",
      fontSize: "1.1rem",
      fontWeight: 600,
      h: "40px",
      _hover: {
        bg: "PrimaryLight",
      },
    },
    /* 

    dropdown: {
      width: "50px",
    },
    noFolder: {
      bg: "Primary",
      color: "white",
      h: "30px",
      _hover: {
        bg: "PrimaryLight",
      },
    }, */
  },
};
