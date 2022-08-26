import { Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
const SnippetPage = ({ snippet }) => {
  const [check, setCheck] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if ((snippet.category.langId === "19") | "54" | "50") {
      if (snippet.category.langId === "19") {
        setBgColor("#009BDD"); //css blue
        setColor("white");
      }

      if (snippet.category.langId === "54") {
        setBgColor("#F7E018"); //yellow js
        setColor("#031B4E"); //blueish main
      }

      if (snippet.category.langId === "50") {
        setBgColor("#FF3137"); //red html
        setColor("white");
      }
    }
  }, [snippet]);

  //bg-[#F7E018] yellow
  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex gap-2 items-center">
          <div className="">
            <div
              style={{ backgroundColor: bgColor, color: color }}
              className="bg-[#F75C1E] text-white rounded-lg py-1 px-3 uppercase hover:langHover SPlangauge"
            >
              {Object.keys(snippet?.folder?.framework).length > 0 && (
                <div>
                  {Object.keys(snippet?.folder?.framework).length > 0 ? (
                    <p className="font-mono">
                      {snippet?.folder?.framework?.label}
                    </p>
                  ) : (
                    <p className="font-mono">
                      {snippet?.folder?.language?.label}
                    </p>
                  )}
                </div>
              )}

              {Object.keys(snippet?.folder?.processor).length > 0 && (
                <div>
                  {Object.keys(snippet?.folder?.processor).length > 0 ? (
                    <p className="font-mono">
                      {snippet?.folder?.processor?.label}
                    </p>
                  ) : (
                    <p className="font-mono">
                      {snippet?.folder?.language?.label}
                    </p>
                  )}
                </div>
              )}

              {!Object.keys(snippet?.folder?.processor).length > 0 &&
                !Object.keys(snippet?.folder?.framework).length > 0 && (
                  <div>
                    <p className="font-mono">{snippet?.category?.label}</p>
                  </div>
                )}
            </div>
          </div>
          <div className="">
            <Text h2 color="#031B4E" className="SnippetHeading">
              {snippet.title}
            </Text>
          </div>
        </div>
        {snippet.description && (
          <div className="text-lg ">{snippet.description}</div>
        )}
      </div>
      {snippet.tags && (
        <div className="flex gap-2">
          {snippet.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[#EFF2FB] text-[#4D5B7C] px-2 rounded-lg hover:tagHover flex items-center tagFont"
            >
              <h5 className="mb-[3px]">{tag}</h5>
            </div>
          ))}
        </div>
      )}
      <div>
        <SyntaxHighlighter
          language="javascript"
          style={oneLight}
          className="rounded-lg"
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      {snippet.notes && (
        <div>
          <div className="bg-[#D4EFEE] p-4 rounded-lg">
            <Text color="#005955">
              <Text color="#005955" b>
                Notat:&nbsp;
              </Text>
              {snippet?.notes}
            </Text>
          </div>
        </div>
      )}

      {snippet.link && (
        <div className="linkSection bg-[#EFF2FB] px-4 py-1 ">
          <div className="">
            {snippet.linkHeading && (
              <div>
                <p className="font-semibold">{snippet.linkHeading}</p>
              </div>
            )}
            {snippet.link && (
              <div>
                <a
                  href={snippet.link}
                  className="text-[#1253fa] underline underline-offset-4 text font-semibold text-lg"
                >
                  {snippet.link}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-lg flex gap-1">
        <p>Af</p>
        <p className="font-bold text-[#031B4E]">{snippet.userData.username}</p>
      </div>
    </div>
  );
};

export default SnippetPage;
