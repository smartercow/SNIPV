export const Button = {
  baseStyle: {},
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
      color: "red.400",
      bg: "Primary",
      minW: "130px",
      _hover: {
        bg: "PrimaryLight",
      },
    },
    sub: {
      bg: "PrimaryLighter",
      fontWeight: 500,
      minW: "100px",
      _hover: {
        opacity: 0.8,
      },
    },
    entry: {
      color: "white",
      bg: "Primary",
      fontWeight: 500,
      minW: "100px",
      _hover: {
        opacity: 0.8,
      },
    },
    entrySub: {
      color: "white",
      bg: "Primary",
      fontWeight: 500,
      minW: "80px",
      height: "35px",
      _hover: {
        opacity: 0.8,
      },
    },
    dropdown: {
      width: "50px",
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
    noFolder: {
      bg: "Primary",
      color: "white",
      h: "20px",
      _hover: {
        bg: "PrimaryLight",
      },
    },
  },
};
