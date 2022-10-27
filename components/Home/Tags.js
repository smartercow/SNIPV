import { Box, Text } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/clientApp";
import TagHeading from "../Heading/TagType/TagHeading";
const Tags = ({ headTitle }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getAllTags = async () => {
      try {
        const codeQuery = query(collection(db, "CodeSnippetsData1"));

        const errorQuery = query(collection(db, "ErrorSnippetsData1"));

        const setupQuery = query(collection(db, "SetupsData"));

        const codeDocs = await getDocs(codeQuery);
        const errorDocs = await getDocs(errorQuery);
        const setupDocs = await getDocs(setupQuery);

        Promise.all([codeDocs, errorDocs, setupDocs])
          .then((PromiseResults) => {
            const mergedTags = [];

            PromiseResults.forEach((snapshot) => {
              snapshot.forEach((doc) => {
                mergedTags.push(...doc.get("tags"));
              });
            });

            const uniqueTags = [...new Set(mergedTags)];

            return uniqueTags;
          })
          /*           .then((mergedData) =>
            mergedData.sort((a, b) => a.postedAt - b.postedAt).reverse()
          ) */
          .then((mergedTags) => {
            setTags(mergedTags);
          })
          .catch((e) => console.log("error", e));
      } catch (error) {
        console.log("getPosts error", error.message);
      }
    };
    return () => {
      getAllTags();
    };
  }, []);

  return (
    <div className="w-[300px] max-w-[300px] min-w-[300px] bg-white">
      <div>
        <TagHeading headingType={headTitle} />
        <Box className="rounded-md shadow-md bg-opacity-60 flex flex-col gap-3 pb-3 px-3">
          {tags.length > 0 && (
            <>
              <div className="flex gap-2 flex-wrap select-none">
                {tags.slice(0, 30).map((tag, index) => (
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

          {!tags && (
            <div className="text-center">
              <Text variant="nonLabel">Du har ingen tags!</Text>
            </div>
          )}
        </Box>
      </div>
    </div>
  );
};

export default Tags;
