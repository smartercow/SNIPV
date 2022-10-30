import { Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Sidebar = () => {
  const { asPath } = useRouter();

  const Menu = [
    {
      titel: "Generel",
      link: "/settings/general",
    },
    {
      titel: "Stats",
      link: "/settings/stats",
    },
    {
      titel: "Opdateringer",
      link: "/settings/patchnotes",
    },
  ];
  return (
    <aside className="w-40 pt-1">
      {Menu.map((item, index) => {
        if (asPath.startsWith(item.link))
          return (
            <NextLink key={index} href={item.link} passHref>
              <a>
                <Text color="Primary" fontSize={18} fontWeight="semibold">
                  {item.titel}
                </Text>
              </a>
            </NextLink>
          );
        else
          return (
            <NextLink key={index} href={item.link} passHref>
              <a>
                <Text
                  _hover={{ color: "Primary" }}
                  fontSize={18}
                  fontWeight="semibold"
                >
                  {item.titel}
                </Text>
              </a>
            </NextLink>
          );
      })}
    </aside>
  );
};

export default Sidebar;
