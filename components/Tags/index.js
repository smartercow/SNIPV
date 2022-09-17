import { Text } from "@nextui-org/react";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../Firebase/clientApp";
import TagType from "../Heading/TagType";

const Tags = () => {
  const [user] = useAuthState(auth);

  const [codeTags, setCodeTags] = useState([]);
  const [errorTags, setErrorTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const snapSub = onSnapshot(
      collection(db, "CodeSnippetsData1"),
      (snapshot) => {
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setCodeTags(uniqueTags);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      snapSub();
    };
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const snapSub = onSnapshot(
      collection(db, "ErrorSnippetsData1"),
      (snapshot) => {
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
        });
        const uniqueTags = [...new Set(tags)];
        setErrorTags(uniqueTags);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      snapSub();
    };
  }, [user]);

  return (
    <div>
      <div className="mb-3">
        <TagType />
      </div>
      <div className="mt-4">
        <div>
          <div>
            <Text transform="uppercase" color="primary" h5>
              Kode tags
            </Text>
          </div>
          <div className="my-6 flex flex-col gap-4">
            {codeTags && (
              <div className="flex gap-2 flex-wrap -mt-4">
                {codeTags
                  .slice(0, 40)
                  .reverse()
                  .map((tag, index) => (
                    <Link key={index} href={`/tags/codes/${tag}`}>
                      <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 mr-2 lowercase ease-in duration-300">
                        <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                          {tag}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
            <div className="text-center">
              <Link href="/tags/codes">
                <Text h5 className="cursor-pointer hover:underline">
                  SE ALLE
                </Text>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Text transform="uppercase" color="error" h5>
              Fejl Tags
            </Text>
          </div>
          <div className="my-6 flex flex-col gap-4">
            {errorTags && (
              <div className="flex gap-2 flex-wrap -mt-4">
                {errorTags
                  .slice(0, 40)
                  .reverse()
                  .map((tag, index) => (
                    <Link key={index} href={`/tags/errors/${tag}`}>
                      <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 mr-2 lowercase ease-in duration-300">
                        <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                          {tag}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
            <div className="text-center">
              <Link href="/tags/errors">
                <Text h5 className="cursor-pointer hover:underline">
                  SE ALLE
                </Text>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
