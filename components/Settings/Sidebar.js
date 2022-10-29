import { Text } from "@chakra-ui/react";
import Link from "next/link";
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
            <Link key={index} href={item.link}>
              <Text color="Primary" className="cursor-pointer">
                {item.titel}
              </Text>
            </Link>
          );
        else
          return (
            <Link key={index} href={item.link}>
              <Text _hover={{ color: "Primary" }} className="cursor-pointer">
                {item.titel}
              </Text>
            </Link>
          );
      })}
    </aside>
  );
};

export default Sidebar;
