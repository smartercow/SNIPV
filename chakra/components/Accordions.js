export const Accordion = {
  baseStyle: {},
  /*   sizes: {
    sm: {
      fontSize: "md",
      height: "20px",
    },
  }, */
  variants: {
    main: {
      container: {
        border: "none",
        mt: 2,
        button: {
          color: "Black",
          borderRadius: 10,
          _hover: {
            bg: "PrimaryELight",
          },
          _expanded: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
    sub: {
      container: {
        mb: 2,
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "iGrayLight",
        borderRadius: 10,
        button: {
          color: "Black",
          borderRadius: 10,
          bg: "iGrayLight",
          _hover: {
            bg: "PrimaryELight",
          },
          _expanded: {
            bg: "PrimaryELight",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
    preview: {
      container: {
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "PrimaryELight",
        borderRadius: 10,
        mt: 1,
        button: {
          color: "Black",
          borderRadius: 10,
          _hover: {
            bg: "PrimaryELight",
          },
          _expanded: {
            bg: "PrimaryELight",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        },
      },
    },
  },
};
