import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Toolbar";
import { Button, Text } from "@chakra-ui/react";

const Quill = ({
  summaryValue,
  setSummaryValue,
  addSummary,
  editSum,
  setEditSum,
  editSumEntry,
}) => {
  const [disableSave, setDisableSave] = useState(true);

  useEffect(() => {
    if (Object.keys(summaryValue).length > 11) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [summaryValue]);

  const Cancel = () => {
    setSummaryValue({});
    setEditSum(false);
  };
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
          placeholder={"Skriv her... min. 5 tegn"}
          modules={modules}
          formats={formats}
          style={{ height: "15rem", borderLeftWidth: 0 }}
        />
      </div>

      <div>
        <Button
          onClick={editSum ? editSumEntry : addSummary}
          variant="entrySub"
          disabled={disableSave}
        >
          {editSum ? "Opdatare" : "Tilføj"}
        </Button>

        {editSum && (
          <Button onClick={Cancel} variant="entrySub" disabled={disableSave}>
            Anullere
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quill;
