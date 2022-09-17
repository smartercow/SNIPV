import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SnippetsFolderType = () => {
  const { asPath } = useRouter();

  const Type = [
    {
      titel: "Koder",
      link: "/folders/codes",
    },
    {
      titel: "Fejl",
      link: "/folders/errors",
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

export default SnippetsFolderType;
