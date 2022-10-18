export const Button = {
  baseStyle: {
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 500,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
    lg: {
      fontSize: "10pt",
      height: "28px",
    },
  },
  variants: {
    main: {
      color: "white",
      bg: "Primary",
      minW: "130px",

      _hover: {
        bg: "PrimaryLight",
      },
    },
    dropdown: {
      width: "50px",
    },
    create: {
      bg: "Primary",
      minW: "130px",
      fontSize: "1.1rem",
      color: "white",
      h: "45px",
      _hover: {
        bg: "PrimaryLight",
      },
    },
  },
};
