export const Text = {
  baseStyle: {
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 500,
    fontFamily: "Ubuntu",
    _focus: {
      boxShadow: "none",
    },
  },

  variants: {
    headUppercase: {
      color: "Black",
      fontSize: "16px",
      textTransform: "uppercase",
    },
    header: {
      color: "Black",
      fontSize: "20px",
      textTransform: "uppercase",
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
    },
    snipHeading: {
      color: "Primary",
      fontSize: "16px",
      fontWeight: 500,
    },
    snipDescription: {
      color: "BlackLighter",
      fontSize: "14px",
      // fontWeight: "semibold",
    },
    seeMore: {
      color: "Black",
      fontSize: "16px",
      textTransform: "uppercase",
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
    },
    NavHeading: {
      color: "Black",
      fontSize: "17px",
      textTransform: "uppercase",
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
    },
    folderLabel: {
      color: "Black",
      fontSize: "16px",
    },
    folderHeading: {
      color: "Black",
      fontSize: "20px",
      textTransform: "uppercase",
    },
    label: {
      color: "BlackLight",
      fontSize: "16px",
      // textTransform: "uppercase",
    },
    subLabel: {
      color: "Black",
      fontSize: "15px",
      fontWeight: 400,
    },
    accLabel: {
      color: "Black",
      fontSize: "16px",
      _expanded: {
        bg: "PrimaryELight",
      },
    },
    nonLabel: {
      color: "Red",
      fontSize: "15px",
    },
    collapse: {
      color: "Black",
      fontSize: "20px",
      textTransform: "uppercase",
    },
    preview: {
      color: "Black",
      fontSize: "12px",
      textTransform: "uppercase",
      fontWeight: 500,
    },
  },
};
