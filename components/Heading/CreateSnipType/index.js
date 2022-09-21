import React from "react";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";

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
            <Text size={18} h5 transform="uppercase" color="primary" className="cursor-pointer">{item.titel}</Text>
          </Link>
        );
      else
        return (
          <Link key={index} href={item.link}>
            <Text size={18} h5 transform="uppercase" className="cursor-pointer hover:underline">{item.titel}</Text>
          </Link>
        );
    })}
  </div>
  );
};
