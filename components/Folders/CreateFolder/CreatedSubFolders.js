import { Loading } from "@nextui-org/react";
import {
  collection,
  FieldPath,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { useRecoilState } from "recoil";
import { CreateFolderModalState } from "../../../atoms/CreateFolderModalAtom";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { auth, db } from "../../../firebase/clientApp";
import {
  OptionFileExt,
  ValueFileExt,
} from "../../CreateSnippet/Select/SelectProps";
import { NoOptionsMessage } from "../../CreateSnippet/Select/NoOptionsMessage";
import SubFolderDropdown from "../../Display/SubFolderDropdown";
import { AddNoteIcon } from "../../SVG/AddNoteIcon";
import { subFolderDeleteUpdateState } from "../../../atoms/subFolderDeleteUpdateState";
import { subFolderEditUpdateState } from "../../../atoms/subFolderEditUpdateState";
import { Button, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CreatedSubFolders({
  setSelectedSubFolder,
  selectedSubFolder,
  selectedMainFolder,
  setSubFolders,
  subFolders,
  id,
  dataFetched,
  selectSubValue,
  setSelectSubValue,
}) {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [subFolder, setSubFolder] = useState("");

  const [open, setOpen] = useRecoilState(CreateFolderModalState);
  const [update, setUpdate] = useRecoilState(updateStateAtom);

  const [subEdited, setSubEdited] = useRecoilState(subFolderEditUpdateState);
  const [subDeleted, setSubDeleted] = useRecoilState(
    subFolderDeleteUpdateState
  );
  const [subLoading, setSubLoading] = useState(true);

  function handleSelect(data) {
    setSelectSubValue(data);
    setSelectedSubFolder(data);
  }

  useEffect(() => {
    if (asPath.startsWith("/upsert/code")) {
      setSubFolder("CodeSubFolders");
    }
    if (asPath.startsWith("/upsert/error")) {
      setSubFolder("ErrorSubFolders");
    }
    if (asPath.startsWith("/upsert/setup")) {
      setSubFolder("SetupSubFolders");
    }
  }, [asPath]);

  console.log("SUUB", subFolder);

  useEffect(() => {
    if (!user) return;
    setSubLoading(true);
    if (subFolder && selectedMainFolder.language?.langId > 0) {
      const folderColRef = query(
        collection(db, "UsersData1", user.uid, subFolder),
        where(
          new FieldPath("mainFolder", "mainFolderId"),
          "==",
          selectedMainFolder.mainFolderId
        )
      );
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setSubFolders(
          userData.docs.map((doc) => ({ ...doc.data(), subFolderId: doc.id }))
        );
        setSubLoading(false);
      };
      getFolders();
    }
  }, [user, update, selectedMainFolder, subDeleted, subFolder]);

  useEffect(() => {
    if (id) {
      setSelectSubValue(setSelectedSubFolder);
      setUpdate(!update);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataFetched]);

  useEffect(() => {
    if (subDeleted) {
      setUpdate(!update);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubDeleted(false);
    }
  }, [subDeleted]);

  useEffect(() => {
    if (subEdited) {
      setUpdate(!update);
      setSelectSubValue(null);
      setSelectedSubFolder({});
      setSubEdited(false);
    }
  }, [subEdited]);

  return (
    <div>
      {!subLoading && (
        <>
          {subFolders?.length > 0 ? (
            <div>
              <div className="flex flex-col gap-2">
                <Text variant="H5">Undermappe</Text>

                <div className="flex gap-3 items-center w-full">
                  <Icon
                    as={AddNoteIcon}
                    w={9}
                    h={9}
                    fill="Primary"
                    cursor="pointer"
                    onClick={() => {
                      setOpen({
                        default: true,
                        view: 1,
                        folder: selectedMainFolder,
                      });
                    }}
                  />

                  <div className="w-full">
                    <Select
                      options={subFolders}
                      placeholder="Valg en rodmappe"
                      value={selectSubValue}
                      onChange={handleSelect}
                      isSearchable={true}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      components={{
                        NoOptionsMessage,
                        Option: OptionFileExt,
                        SingleValue: ValueFileExt,
                      }}
                    />
                  </div>

                  <div className="w-10">
                    {selectedSubFolder?.subFolderId && (
                      <SubFolderDropdown
                        selectedSubFolder={selectedSubFolder}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-2">
                <Text variant="nonLabel">Ingen undermapper!</Text>

                <div>
                  <Button
                    variant="noFolder"
                    onClick={() => {
                      setOpen({
                        default: true,
                        view: 1,
                        folder: selectedMainFolder,
                      });
                    }}
                  >
                    Opret
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {subLoading && (
        <div className="flex justify-center items-center h-20">
          <Loading size="md" />
        </div>
      )}
    </div>
  );
}
