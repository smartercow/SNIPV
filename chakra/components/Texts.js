export const Text = {
  baseStyle: {
    borderRadius: "12px",
    color: "Black",
    fontSize: "16px",
    fontWeight: 500,
    fontFamily: "Anek Malayalam",
    _focus: {
      boxShadow: "none",
    },
  },

  variants: {
    H3: {
      color: "Black",
      fontSize: "20px",
      textTransform: "uppercase",
    },
    H4: {
      color: "Black",
      fontSize: "18px",
      textTransform: "uppercase",
      letterSpacing: ".1px",
    },
    H5: {
      color: "Black",
      fontSize: "16px",
      textTransform: "uppercase",
      letterSpacing: ".1px",
    },
    headUppercase: {
      color: "Black",
      fontSize: "16px",
      textTransform: "uppercase",
    },
    header: {
      color: "Black",
      fontSize: "22px",
      textTransform: "uppercase",
      fontWeight: 600,
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
    },
    heading: {
      color: "BlackLight",
      fontSize: "16px",
      fontWeight: 500,
    },
    title: {
      color: "BlackLight",
      fontFamily: "Ubuntu",
      fontSize: "26px",
      fontWeight: 600,
      letterSpacing: "0.1px",
    },
    description: {
      color: "BlackLight",
      fontSize: "18px",
      fontWeight: 500,
      letterSpacing: "0.3px",
    },
    /* Seneste Tags/home */
    boxHeading: {
      fontSize: "18px",
      textTransform: "uppercase",
    },
    snipHeading: {
      // color: "Primary",
      fontSize: "18px",
      fontWeight: 500,
      fontFamily: "Ubuntu",
      letterSpacing: "0.1px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    snipDescription: {
      // color: "PrimaryLight",
      fontSize: "15px",
      fontWeight: 500,
      letterSpacing: "0.5px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    seeMore: {
      fontSize: "16px",
      textTransform: "uppercase",
      fontFamily: "Ubuntu",
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
    },
    folderHeading: {
      color: "Black",
      fontSize: "20px",
      textTransform: "uppercase",
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
