import { Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SidebarInfo = () => {
  const { asPath } = useRouter();

  const Menu = [
    {
      titel: "Om SNIPV",
      link: "/info/about",
    },
    {
      titel: "Fork projekt",
      link: "/info/forkproject",
    },
    {
      titel: "Hjælp",
      link: "/info/help",
    },
  ];

  return (
    <aside>
      <div className="w-40 pt-1">
        {Menu.map((item, index) => {
          if (asPath.startsWith(item.link))
            return (
              <Link key={index} href={item.link}>
                <Text
                  h5
                  color="primary"
                  transform="uppercase"
                  className="cursor-pointer"
                >
                  {item.titel}
                </Text>
              </Link>
            );
          else
            return (
              <Link key={index} href={item.link}>
                <Text
                  h5
                  transform="uppercase"
                  className="cursor-pointer hover:underline"
                >
                  {item.titel}
                </Text>
              </Link>
            );
        })}
      </div>
    </aside>
  );
};

export default SidebarInfo;
