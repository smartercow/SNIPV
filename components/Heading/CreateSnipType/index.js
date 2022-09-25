import React from "react";
import { Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

export const CreateSnipType = () => {
  const { asPath } = useRouter();
  const router = useRouter();
  const [user] = useAuthState(auth);

  const Type = [
    {
      titel: "Kode",
      link: "/upsert/code",
    },
    {
      titel: "Fejl",
      link: "/upsert/error",
    },
  ];

  return (
    <>
      {user && (
        <div className="flex gap-4 uppercase">
          {Type.map((item, index) => {
            if (asPath.startsWith(item.link))
              return (
                <Link key={index} href={item.link}>
                  <Text
                    size={18}
                    h5
                    transform="uppercase"
                    color="primary"
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
                    size={18}
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
      )}
    </>
  );
};
