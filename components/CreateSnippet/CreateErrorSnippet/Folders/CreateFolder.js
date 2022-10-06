import React from "react";
import { useRecoilValue } from "recoil";
import { createErrorFolderModalState } from "../../../../atoms/createErrorFolderModalAtom";
import CreateMainFolder from "./CreateMainFolder";
import CreateSubFolder from "./CreateSubFolder";

const CreateFolder = () => {
  const tabOpen = useRecoilValue(createErrorFolderModalState)
  return (
    <div>
      <div>
        {tabOpen.view == 0 && (
            <CreateMainFolder />
        )}

        {tabOpen.view == 1 && (
            <CreateSubFolder />
        )}
      </div>
    </div>
  );
};

export default CreateFolder;
