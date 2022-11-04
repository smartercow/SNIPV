import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./Toolbar";
import { Button, Text } from "@chakra-ui/react";

const Quill = ({
  summaryValue,
  setSummaryValue,
  addSummary,
  editState,
  setEditState,
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
    setEditState(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <div>
        <Text textTransform="uppercase" variant="heading" fontWeight="semibold">
          Opsummering
        </Text>
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

      <div className="flex gap-2">
        <Button
          onClick={editState ? editSumEntry : addSummary}
          variant="btnSub"
          disabled={disableSave}
        >
          {editState ? "Opdatare" : "Tilføj"}
        </Button>

        {editState && (
          <Button onClick={Cancel} variant="btnSub" disabled={disableSave}>
            Anullere
          </Button>
        )}
      </div>
    </div>
  );
};

export default Quill;
