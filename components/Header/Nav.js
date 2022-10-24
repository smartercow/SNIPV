// import { Text } from "@nextui-org/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BsSearch } from "react-icons/bs";

const Nav = () => {
  const { asPath } = useRouter();

  const Menu = [
    {
      titel: "Snips",
      link: "/snips",
    },
    {
      titel: "Setups",
      link: "/setups",
    },
    {
      titel: "Tags",
      link: "/tags",
    },
  ];
  return (
    <div className="flex md:gap-5 items-center">
      <div>
        <ul className="flex md:gap-4 items-center pt-3">
          {Menu.map((item, index) => {
            if (asPath.startsWith(item.link))
              return (
                <li key={index}>
                  <Link href={item.link} passHref>
                    <a>
                      <Text
                        color="Primary"
                        variant="H2"
                        textTransform="uppercase"
                        fontWeight={700}
                      >
                        {item.titel}
                      </Text>
                    </a>
                  </Link>
                </li>
              );
            else
              return (
                <li key={index}>
                  <Link href={item.link} passHref>
                    <a>
                      <Text
                        variant="H2"
                        textTransform="uppercase"
                        fontWeight={700}
                        _hover={{ color: "Primary" }}
                      >
                        {item.titel}
                      </Text>
                    </a>
                  </Link>
                </li>
              );
          })}
        </ul>
      </div>
      {/*       <div>
        <Link href="/search">
          <Text className="cursor-pointer">
            <BsSearch />
          </Text>
        </Link>
      </div> */}
    </div>
  );
};

export default Nav;
