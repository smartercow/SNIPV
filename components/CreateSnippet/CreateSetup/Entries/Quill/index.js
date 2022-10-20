import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Toolbar";
import { Button, Text } from "@chakra-ui/react";

const Quill = ({ summaryValue, setSummaryValue, addSummary }) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Text variant="heading">Opsummering</Text>
      </div>
      <div className="text-editor">
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={summaryValue}
          onChange={setSummaryValue}
          placeholder={"Skriv her..."}
          modules={modules}
          formats={formats}
          style={{ height: "15rem", borderLeftWidth: 0 }}
        />
      </div>

      <div>
        <Button
          className="cursor-pointer"
          onClick={addSummary}
          colorScheme="yellow"
          color="white"
          variant="main"
        >
          Tilføj
        </Button>
      </div>
    </div>
  );
};

export default Quill;
