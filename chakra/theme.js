import { Accordion } from "./components/Accordions";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Buttons";
import { Input } from "./components/Inputs";
import { Text } from "./components/Texts";
import { Icon } from "./components/Icons";
import { Box } from "./components/Boxes";
import { Avatar } from "./components/Avatars";
import { Link } from "./components/Links";
import { Textarea } from "./components/Textareas";
import { Tabs } from "./components/TabsStyle";
import { menuTheme } from "./components/menuTheme";

export const theme = extendTheme({
  colors: {
    Primary: "#087ea4",
    PrimaryLight: "#087ea499",
    PrimaryLighter: "#E6F7FF",
    PrimaryTLight: "#d0ebf7",
    PrimaryELight: "#edf4f7",

    DarkBlue: "#031B4E",

    Black: "#23272F",
    BlackLight: "#404756",

    Purple: "#575FB7",
    PurpleLighter: "#F3F4FD",

    Orange: "#C76A15",
    OrangeLight: "#FEF5E7",

    Gray: "#d8deed",
    GrayHeavy: "#99A1B3",
    GrayLight: "#ebecf0",

    iGray: "#EDF2F7",
    iGrayLight: "#F6F7F9",

    BorderGray: "#E2E8F0",

    PrimaryBackground: "#fafafa",

    Red: "#F31260",
    RedLight: "#FDD8E5",

    Blue: "#0072F5",

    Green: "#17C964",

    Orange: "#F5A524",
  },
  styles: {
    global: () => ({
      body: {
        bg: "PrimaryBackground",
        fontFamily: "Inter, sans sarif",
        overflowY: "overlay",
      },
    }),
  },
  /*   fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Ubuntu', sans-serif`,
  }, */
  components: {
    Button,
    Input,
    Accordion,
    Text,
    // Icon,
    Box,
    Avatar,
    Link,
    Textarea,
    Tabs,
    Menu: menuTheme,
  },
});
