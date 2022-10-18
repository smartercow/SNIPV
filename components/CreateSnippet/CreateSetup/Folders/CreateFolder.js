import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useRecoilState, useRecoilValue } from "recoil";
import { createSetupFolderModalState } from "../../../../atoms/createSetupFolderModalAtom";
import CreateMainFolder from "./CreateMainFolder";
import CreateSubFolder from "./CreateSubFolder";

const CreateFolder = () => {
  const tabOpen = useRecoilValue(createSetupFolderModalState);

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
