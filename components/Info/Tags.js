import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { CgExternal } from "react-icons/cg";

const TagsInfo = () => {
  return (
    <div className="w-full">
      <div>
        <Text h4>Hvordan man skriver søgbare tags</Text>
      </div>
      <hr className="my-3" />
      <div>
        <div className="bg-red-400 p-3 rounded-lg">
          <Text color="white">
            Firestore database&nbsp;
            <span className="text-white">
              <Link href="https://firebase.google.com/docs/firestore/solutions/search">
                <a target="_blank" className="text-white underline">
                  understøtter ikke
                  <span className="text-blue-500">
                    <CgExternal />
                  </span>
                </a>
              </Link>
            </span>
            &nbsp;fuldtekstsøgning og henviser til tredjeparts søgetjenester,
            der ikke har et free tier plan som Firebase har. Derfor kan du kun
            søge efter tags, så sørg for at dine
            <span className="font-semibold">&nbsp;SNIP&nbsp;</span>tags er
            præcise til
            <span className="font-semibold">&nbsp;SNIP&nbsp;</span>søgning
            senere.
          </Text>
        </div>
        <div>
          <ul className="list-decimal">
            <li>
              <Text>
                Navngive tags der opsummerer det specifikke
                <span className="font-semibold">&nbsp;SNIP&nbsp;</span>. Du kan
                skrive så mange tags som du ville og hvis du gentager det samme
                tag med præcise samme navn i et andet
                <span className="font-semibold">&nbsp;SNIP&nbsp;</span>bliver
                det ikke duplikeret i din&nbsp;
                <span className="underline">
                  <Link href="/tags"><a target="_blank">TAGS</a></Link>
                </span>
                &nbsp;side.
              </Text>
            </li>
            <li>
              <Text>
                Sørg for, at tagnavnet er formateret korrekt og er let at huske.
                Om du skriver det med små eller store bogstaver ville de blive
                tilføjet som små bogstaver i databasen. Undgå at bruge
                specialtegn.
              </Text>
              <Text>Eksempler:&nbsp;</Text>
              <div className="flex flex-col gap-3 mt-2 ml-2">
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      usestate
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      map loop
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      console.log
                    </p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <Text>
                Du kan bruge meta-tags, som kun du forstår og er let at huske.
                Pak meta-tags i firkantede brackets.
              </Text>
              <Text>Eksempler:&nbsp;</Text>
              <div className="flex flex-col gap-3 mt-2 ml-2">
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      [nybegynder]
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      [subjektiv]
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-3 py-1 bg-[#c8dfff85] rounded-md cursor-pointer hover:opacity-70 lowercase ease-in duration-300">
                    <p className="font-[500] text-sm SnippetHeadingTwo tracking-wide text-[#031B4E]">
                      [bedste-praksis]
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TagsInfo;
