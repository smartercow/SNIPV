import { Divider, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { DocumentIcon } from "../../../SVG/DocumentIcon";
import { Paper } from "../../../SVG/Paper";
import Masthead from "./Masthead";

const Details = ({ snippet }) => {
  return (
    <div>
      <Masthead snippet={snippet} />

      <div className="flex flex-col">
        <Text fontSize={24} fontWeight="semibold" variant="pageTitle">
          {snippet.snippetType === "code" && snippet.model === "file" ? (
            <Icon as={DocumentIcon} pb={1} fill="Blue" height={8} w={8} />
          ) : (
            snippet.snippetType === "code" &&
            snippet.model === "snippet" && <Icon as={Paper} pb={1} fill="Blue" height={8} w={8} />
          )}

          {snippet.snippetType === "error" && snippet.model === "file" ? (
            <Icon as={DocumentIcon} pb={1} fill="Red" height={8} w={8} />
          ) : (
            snippet.snippetType === "error" &&
            snippet.model === "snippet" && <Icon as={Paper} pb={1} fill="Red" height={8} w={8} />
          )}

          {!snippet.snippetType && (
            <>
              {snippet.folder.folderSnippetType === "code" ? (
                <Icon as={Paper} pb={1} fill="Blue" height={8} w={8} />
              ) : (
                snippet.folder.folderSnippetType === "error" && <Icon as={Paper} pb={1} fill="Red" height={8} w={8} />
              )}
            </>
          )}
          {snippet.title}
        </Text>

        <Text px={1} variant="pageDescription">
          {snippet.description}
        </Text>
      </div>

      {snippet.tags && (
        <div className="flex gap-2 mt-2">
          {snippet.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[#EFF2FB] text-[#4D5B7C] px-2 rounded-lg hover:tagHover flex items-center tagFont">
              <h5>{tag}</h5>
            </div>
          ))}
        </div>
      )}

      <Divider my={2} h={0.8} />
    </div>
  );
};

export default Details;
