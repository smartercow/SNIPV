import { Text } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CgExternal } from "react-icons/cg";

const ErrorSnippetPage = ({ snippet }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 -ml-1">
          <div
            className={`l${snippet.category.langId} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {snippet.folder.language?.label}
            </p>
          </div>
          {snippet.folder?.framework.frameworkId && (
            <div
              className={`f${snippet.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
            >
              <p className="text-xs MonoHeading font-semibold lowercase">
                {snippet.folder.framework?.label}
              </p>
            </div>
          )}
          {snippet?.folder?.processor.processorId && (
            <div
              className={`p${snippet.folder?.processor.processorId} lBadge rounded-3xl flex justify-center items-center`}
            >
              <p className="text-xs MonoHeading font-semibold lowercase">
                {snippet.folder.processor?.label}
              </p>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h2 style={{ color: "#031B4E" }} className="SnippetHeading">
              {snippet.title}
            </h2>
          </div>
          {snippet.description && (
            <div className="text-lg ">{snippet.description}</div>
          )}
        </div>
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
        <div>
          <Text h4 color="error">
            Fejl Kode
          </Text>
        </div>
        <SyntaxHighlighter
          language="javascript"
          style={oneLight}
          className="rounded-lg"
        >
          {snippet.errorcode}
        </SyntaxHighlighter>
      </div>

      {snippet.solutioncode && (
        <div>
          <div>
            <Text h4 color="success">
              Løsning kode
            </Text>
          </div>
          <SyntaxHighlighter
            language="javascript"
            style={oneLight}
            className="rounded-lg"
          >
            {snippet.solutioncode}
          </SyntaxHighlighter>
        </div>
      )}

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
          <div>
            <Link href={snippet.link}>
              <a
                target="_blank"
                className="text-[#0072F5] underline underline-offset-4 text font-semibold text-lg"
              >
                {snippet.link}
                <span className="text-blue-500">
                  <CgExternal />
                </span>
              </a>
            </Link>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="text-lg flex gap-1">
          <p>Af</p> <p>{snippet.id}</p>
          <p className="font-bold text-[#031B4E]">
            {snippet.userData.username}
          </p>
        </div>
        
        <div className="flex gap-2 md:gap-4">
          {snippet.updatedAt && (
            <div>
              <Text small b transform="uppercase" className="font-semibold text-[#031B4E]">
                Opdateret:&nbsp;
                {new Date(snippet.updatedAt.seconds * 1000).toLocaleDateString(
                  "da-DK"
                )}
              </Text>
            </div>
          )}
          <div>
            <Text small b transform="uppercase" className="text-[#031B4E]">
              Oprettet:&nbsp;
              {new Date(snippet.postedAt.seconds * 1000).toLocaleDateString(
                "da-DK"
              )}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorSnippetPage;
