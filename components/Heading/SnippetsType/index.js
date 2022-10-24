import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Text } from "@chakra-ui/react";

export const SnippetsTypeLinks = () => {
  const { asPath } = useRouter();

  const Type = [
    {
      titel: "Koder",
      link: "/snips/codes",
    },
    {
      titel: "Fejl",
      link: "/snips/errors",
    },
    {
      titel: "Setups",
      link: "/setups",
    },
  ];
  return (
    <div className="flex uppercase mb-3">
      {Type.map((item, index) => {
        if (asPath.startsWith(item.link))
          return (
            <Link key={index} href={item.link} passHref>
              <a>
                <Box borderColor="Primary" className="border-b-2 px-3">
                  <Text variant="H3" color="Primary">
                    {item.titel}
                  </Text>
                </Box>
              </a>
            </Link>
          );
        else
          return (
            <Link key={index} href={item.link} passHref>
              <a>
                <div className="border-b-2 px-3">
                  <Text
                    variant="H3"
                    textTransform="extrabold"
                    _hover={{ color: "Primary" }}
                  >
                    {item.titel}
                  </Text>
                </div>
              </a>
            </Link>
          );
      })}
    </div>
  );
};
