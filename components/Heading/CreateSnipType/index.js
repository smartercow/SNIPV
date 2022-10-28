import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";

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
      titel: "Setup",
      link: "/upsert/setup",
    },
  ];

  return (
    <>
      {user && (
        <div className="flex uppercase">
          {Type.map((item, index) => {
            if (asPath.startsWith(item.link))
              return (
                <Link key={index} href={item.link} passHref>
                  <a>
                    <Box borderColor="Primary" className="border-b-2 px-3">
                      <Text variant="H3" color="Primary">
                        {item.titel}
                      </Text>
                    </Box>
                  </a>
                </Link>
              );
            else
              return (
                <Link key={index} href={item.link} passHref>
                  <a>
                    <Box className="border-b-2 px-3">
                      <Text
                        variant="H3"
                        textTransform="extrabold"
                        _hover={{ color: "Primary" }}
                      >
                        {item.titel}
                      </Text>
                    </Box>
                  </a>
                </Link>
              );
          })}
        </div>
      )}
    </>
  );
};
