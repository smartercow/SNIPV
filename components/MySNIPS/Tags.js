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
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setCol("CodeSnippetsData1");
    }
    if (asPath.startsWith("/snips/errors")) {
      setCol("ErrorSnippetsData1");
    }
    if (asPath.startsWith("/snips/setups")) {
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

  console.log("SNIPPS", tags);
  return (
    <div className="w-[300px] hidden md:inline-flex">
      {tags && (
        <Box
          bg="PrimaryELight"
          className="rounded-md shadow-md bg-opacity-60 flex flex-col gap-5 pt-1 pb-5 px-3 w-full"
        >
          <div className="my-2">
            <TagHeading headingType={"Seneste tags"} />
          </div>

          <div className="flex gap-2 flex-wrap -mt-4 select-none">
            {tags.slice(0, 22).map((tag, index) => (
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
            <Link href="/tags">
              <Text className="text-center" variant="seeMore">
                SE ALLE
              </Text>
            </Link>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Tags;
