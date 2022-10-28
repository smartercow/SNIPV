import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Text } from "@chakra-ui/react";

const TagType = () => {
  const { asPath } = useRouter();

  const Type = [
    {
      titel: "Alle",
      link: "/tags",
    },
    {
      titel: "Koder",
      link: "/tags/codes",
    },
    {
      titel: "Fejl",
      link: "/tags/errors",
    },
    {
      titel: "Setups",
      link: "/tags/setups",
    },
  ];
  return (
    <div className="flex uppercase mb-3">
      {Type.map((item, index) => {
        if (asPath === item.link)
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
                    color="DarkBlue"
                    textTransform="extrabold"
                    className="transition duration-300"
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

export default TagType;
