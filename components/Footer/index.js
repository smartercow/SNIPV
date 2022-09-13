import { Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-5xl mx-5 lg:mx-auto my-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="cursor-pointer">
            <Link href="/about">
              <Text small b color="black" className="hover:underline cursor-pointer">
                OM SNIPV
              </Text>
            </Link>
          </div>
          <div>
          <Link href="/forkproject">
              <Text small b color="black" className="hover:underline cursor-pointer">
                FORK DENNE PROJEKT
              </Text>
            </Link>
          </div>
        </div>
        <div className="">
          <Text small>© 2022 SNIPV</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
