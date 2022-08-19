import { Text } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-5xl mx-5 lg:mx-auto my-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="cursor-pointer">
            <Link href="/about">
              <Text small b color="black">
                Om SNIPV
              </Text>
            </Link>
          </div>
          <div>
            <Text
              small
              className="text-[#E6E8EB]"
            >
              Databeskyttelsespolitik
            </Text>
          </div>
          <div>
            <Text small className="text-[#E6E8EB]">Cookiepolitik</Text>
          </div>
        </div>
        <div className="">
          <Text small>© 2022 SNIPV beta 0.40</Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
