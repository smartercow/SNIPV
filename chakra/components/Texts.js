export const Text = {
  baseStyle: {
    borderRadius: "12px",
    color: "DarkBlue",
    fontFamily: `'Inter', sans-serif`,
    fontSize: "16px",
    _focus: {
      boxShadow: "none",
    },
  },

  variants: {
    H1: {
      fontSize: "32px",
    },
    H2: {
      fontSize: "22px",
    },
    H3: {
      fontSize: "18px",
      fontWeight: "semibold",
      // letterSpacing: "0.01em",
    },
    H4: {
      fontSize: "17px",
      fontWeight: "semibold",

      // letterSpacing: "0.01em",
    },
    H5: {
      fontWeight: "semibold",
      fontSize: "14px",
      textTransform: "uppercase",
    },
    H6: {
      fontSize: "14px",
    },
    snipHeading: {
      color: "DarkBlue",
      fontSize: "17px",
      fontWeight: "semibold",
      letterSpacing: "0.1px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    snipDescription: {
      color: "DarkBlue",
      fontSize: "15px",
      letterSpacing: "0.1px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    seeMore: {
      fontSize: "15px",
      textTransform: "uppercase",
      fontFamily: "Ubuntu",
      fontWeight: "semibold",
      color: "DarkBlue",
      _hover: {
        color: "Primary",
        cursor: "pointer",
      },
      transition: "all 0.2s",
    },
    nonLabel: {
      fontSize: "13px",
      textTransform: "uppercase",
      fontWeight: "semibold",
    },
    snipNameDeleteModal: {
      width: "440",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    folderHeading: {
      color: "DarkBlue",
      fontSize: "20px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    preview: {
      color: "DarkBlue",
      fontSize: "11px",
      textTransform: "uppercase",
      fontWeight: 500,
    },
    /*     headUppercase: {
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

    boxHeading: {
      fontSize: "18px",
      textTransform: "uppercase",
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
    }, */
  },
};
