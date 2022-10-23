import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";

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
  ];
  return (
    <div className="flex gap-4 uppercase">
      {Type.map((item, index) => {
        if (asPath.startsWith(item.link))
          return (
            <Link key={index} href={item.link}>
              <Text variant="H3" color="Primary" cursor="pointer">
                {item.titel}
              </Text>
            </Link>
          );
        else
          return (
            <Link key={index} href={item.link}>
              <Text variant="H3" cursor="pointer">
                {item.titel}
              </Text>
            </Link>
          );
      })}
    </div>
  );
};
