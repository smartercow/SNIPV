import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TagType = () => {
  const { asPath } = useRouter();

  const Type = [
    {
      titel: "Koder",
      link: "/tags/codes",
    },
    {
      titel: "Fejl",
      link: "/tags/errors",
    },
  ];
  return (
    <div className="flex gap-4 uppercase">
      {Type.map((item, index) => {
        if (asPath.startsWith(item.link))
          return (
            <Link key={index} href={item.link}>
              <Text className="cursor-pointer">{item.titel}</Text>
            </Link>
          );
        else
          return (
            <Link key={index} href={item.link}>
              <Text className="cursor-pointer hover:underline">
                {item.titel}
              </Text>
            </Link>
          );
      })}
    </div>
  );
};

export default TagType;
