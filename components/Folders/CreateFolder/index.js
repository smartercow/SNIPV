import React from "react";
import { useRecoilValue } from "recoil";
import { CreateFolderModalState } from "../../../atoms/CreateFolderModalAtom";
import CreateMainFolder from "./CreateMainFolder";
import CreateSubFolder from "./CreateSubFolder";

const CreateFolder = () => {
  const tabOpen = useRecoilValue(CreateFolderModalState);

  return (
    <div>
      <div>
        {tabOpen.view == 0 && (
          <CreateMainFolder selectedMainFolder={tabOpen.folder} />
        )}

        {tabOpen.view == 1 && (
          <CreateSubFolder /* selectedMainFolder={tabOpen.folder} */ />
        )}
      </div>
    </div>
  );
};

export default CreateFolder;
