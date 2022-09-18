import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SidebarInfo = () => {
  const { asPath } = useRouter();

  const Menu = [
    {
      titel: "Om SNIPV",
      link: "/about",
    },
    {
      titel: "Fork projekt",
      link: "/forkproject",
    },
    {
      titel: "Hjælp",
      link: "/help",
    },
  ];
  
  return (
    <div>
      <div className="flex flex-col gap-4 w-40 text-center">
        {Menu.map((item, index) => {
          if (asPath.startsWith(item.link))
            return (
              <Link key={index} href={item.link}>
                <Text h5 color="primary" transform="uppercase" className="cursor-pointer">
                  {item.titel}
                </Text>
              </Link>
            );
          else
            return (
              <Link key={index} href={item.link}>
                <Text h5 transform="uppercase" className="cursor-pointer hover:underline">
                  {item.titel}
                </Text>
              </Link>
            );
        })}
      </div>
    </div>
  );
};

export default SidebarInfo;
