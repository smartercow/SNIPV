import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { MdOutlineArrowRight } from "react-icons/md";
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
    <div className="w-40">
      {Menu.map((item, index) => {
        if (asPath.startsWith(item.link))
          return (
            <Link key={index} href={item.link}>
              <Text h5 color="primary" className="cursor-pointer">
                {item.titel}
              </Text>
            </Link>
          );
        else
          return (
            <Link key={index} href={item.link}>
              <Text h5 className="cursor-pointer hover:underline">
                {item.titel}
              </Text>
            </Link>
          );
      })}
    </div>
  );
};

export default Sidebar;
