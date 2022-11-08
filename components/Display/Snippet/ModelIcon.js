import { Icon } from "@chakra-ui/react";
import React from "react";
import { DocumentIcon } from "../../SVG/DocumentIcon";
import { Paper } from "../../SVG/Paper";
import { WorkIcon } from "../../SVG/WorkIcon";

const iconSize = 10;
const ModelIcon = ({ snippet }) => {
  return (
    <div>
      {snippet.snippetType === "code" && (
        <>
          {snippet.model === "file" ? (
            <Icon as={DocumentIcon} fill="Blue" height={iconSize} width={iconSize} />
          ) : (
            <Icon as={Paper} fill="Blue" height={iconSize} width={iconSize} />
          )}
        </>
      )}

      {snippet.snippetType === "error" && (
        <>
          {snippet.model === "file" ? (
            <Icon as={DocumentIcon} fill="Red" height={iconSize} width={iconSize} />
          ) : (
            <Icon as={Paper} fill="Red" height={iconSize} width={iconSize} />
          )}
        </>
      )}

      {snippet.snippetType === "setup" && <Icon as={WorkIcon} fill="purple" height={iconSize} width={iconSize} />}
    </div>
  );
};

export default ModelIcon;
