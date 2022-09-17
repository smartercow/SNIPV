import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {MdOutlineArrowRight} from "react-icons/md"
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
      <ul>
        {Menu.map((item, index) => {
          if (asPath === item.link)
            return (
              <li key={index}>
                <Link href={item.link}>
                  <Text b className="cursor-pointer text">
                    <MdOutlineArrowRight />{item.titel}
                  </Text>
                </Link>
              </li>
            );
          else
            return (
              <li key={index}>
                <Link href={item.link}>
                  <Text className="cursor-pointer hover:underline">{item.titel}</Text>
                </Link>
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
