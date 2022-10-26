import { Box, Text } from "@chakra-ui/react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import TagHeading from "../Heading/TagType/TagHeading";
const Tags = () => {
  const { asPath } = useRouter();
  const [col, setCol] = useState("");
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setCol("CodeSnippetsData1");
    }
    if (asPath.startsWith("/snips/errors")) {
      setCol("ErrorSnippetsData1");
    }
    if (asPath.startsWith("/setups")) {
      setCol("SetupData");
    }
  }, [asPath]);

  useEffect(() => {
    if (col) {
      const unsub = onSnapshot(
        collection(db, col),
        (snapshot) => {
          let tags = [];
          snapshot.docs.forEach((doc) => {
            tags.push(...doc.get("tags"));
          });
          const uniqueTags = [...new Set(tags)];
          setTags(uniqueTags);
        },
        (error) => {
          console.log(error);
        }
      );

      return () => {
        unsub();
      };
    }
  }, [col]);

  return (
    <div className="w-[300px] max-w-[300px] min-w-[300px] h-full hidden lg:inline-flex">
      <Box
        bg="white"
        className="rounded-md shadow-md bg-opacity-60 flex flex-col gap-3 pt-2 pb-3 px-3 w-full"
      >
        <TagHeading headingType={"Seneste tags"} />
        {tags.length > 0 && (
          <>
            <div className="flex gap-2 flex-wrap select-none">
              {tags.slice(0, 32).map((tag, index) => (
                <Link key={index} href={`/tags/codes/${tag}`}>
                  <Box
                    bg="PrimaryTLight"
                    className="px-3 py-1 rounded-md cursor-pointer hover:opacity-70 mr-2 lowercase ease-in duration-300"
                  >
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      {tag}
                    </p>
                  </Box>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/tags" passHref>
                <a>
                  <Text className="text-center" variant="seeMore">
                    SE ALLE
                  </Text>
                </a>
              </Link>
            </div>
          </>
        )}

        {!tags.length > 0 && (
          <div className="text-center">
            <Text>Du har ingen tags!</Text>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Tags;
