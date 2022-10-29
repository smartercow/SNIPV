import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SidebarInfo = () => {
  const { asPath } = useRouter();

  const Menu = [
    {
      titel: "Om SNIPV",
      link: "/info/about",
    },
    {
      titel: "Fork projekt",
      link: "/info/forkproject",
    },
    {
      titel: "Hjælp",
      link: "/info/help",
    },
  ];

  return (
    <aside>
      <div className="w-40 pt-1">
        {Menu.map((item, index) => {
          if (asPath.startsWith(item.link))
            return (
              <Box>
                <NextLink key={index} href={item.link} passHref>
                  <Link color="Primary" fontWeight="semibold">
                    {item.titel}
                  </Link>
                </NextLink>
              </Box>
            );
          else
            return (
              <Box>
                <NextLink key={index} href={item.link} passHref>
                  <Link fontWeight="semibold">{item.titel}</Link>
                </NextLink>
              </Box>
            );
        })}
      </div>
    </aside>
  );
};

export default SidebarInfo;
