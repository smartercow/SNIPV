export const Tabs = {
  /*   baseStyle: {
    bg: "Primary",
    h: 8,
    w: 8,
  }, */

  variants: {
    mainTab: {
      tab: {
        color: "Black",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
        _selected: {
          fontWeight: "semibold",
          borderBottomWidth: "2px",
          color: "Primary",
          borderBottomColor: "Primary",
          borderBottomStyle: "solid",
        },
        _hover: {
          // bg: "red",
        },
      },
      tabpanel: {
        p: 0,
      },
      /*       tablist: {
        color: "Black",
        borderBottomWidth: "2px",
        borderBottomColor: "Primary",
      }, */
    },
  },
};
