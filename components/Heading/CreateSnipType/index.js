import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { Text } from "@chakra-ui/react";

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
    {
      titel: "Opsætning",
      link: "/upsert/setup",
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
                  <Text color="Primary" variant="NavHeading">
                    {item.titel}
                  </Text>
                </Link>
              );
            else
              return (
                <Link key={index} href={item.link}>
                  <Text variant="NavHeading">{item.titel}</Text>
                </Link>
              );
          })}
        </div>
      )}
    </>
  );
};
