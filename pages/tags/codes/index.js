import { Text } from "@nextui-org/react";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import TagType from "../../../components/Heading/TagType";
import TagHeading from "../../../components/Heading/TagType/TagHeading";
import { auth, db } from "../../../firebase/clientApp";

const CodeTagsPage = () => {
  const [user] = useAuthState(auth);

  const [codeTags, setCodeTags] = useState([]);
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

  return (
    <div className="min-h-[70vh]">
      <>
        <TagType />
        <TagHeading headingType={"Kode"} colorType={"primary"} />
      </>

      <>
        <div className="my-5 flex flex-col gap-4">
          {codeTags && (
            <div className="flex gap-2 flex-wrap">
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
        </div>
      </>
    </div>
  );
};

export default CodeTagsPage;
