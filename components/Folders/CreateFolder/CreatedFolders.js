import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Select, CreatableSelect, AsyncSelect } from "chakra-react-select";
import { useRecoilState } from "recoil";
import { CreateFolderModalState } from "../../../atoms/CreateFolderModalAtom";
import { mainFolderDeleteUpdateState } from "../../../atoms/mainFolderDeleteUpdateState";
import { mainFolderEditUpdateState } from "../../../atoms/mainFolderEditUpdateState";
import { updateStateAtom } from "../../../atoms/updateStateAtom";
import { auth, db } from "../../../firebase/clientApp";
import { OptionFileExt, ValueFileExt } from "../../Select/SelectProps";
import { NoOptionsMessage } from "../../Select/NoOptionsMessage";
import { AddNoteIcon } from "../../SVG/AddNoteIcon";
import MainFolderDropdown from "../../Display/MainFolderDropdown";
import { Button, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import LoadingSNIPS from "../../LoadingState/LoadingSNIPS";

export default function CreatedFolders({
  setSelectedMainFolder,
  selectedMainFolder,
  setSelectedSubFolder,
  selectedSubFolder,
  id,
  selectValue,
  setSelectValue,
  setSelectSubValue,
  disableSelectInput,
}) {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [mainFolder, setMainFolder] = useState("");
  const [type, setType] = useState("");

  const [folders, setFolders] = useState([]);
  const [mainLoading, setMainLoading] = useState(true);

  const [open, setOpen] = useRecoilState(CreateFolderModalState);
  const [mainDeleted, setMainDeleted] = useRecoilState(
    mainFolderDeleteUpdateState
  );

  const [mainEdited, setMainEdited] = useRecoilState(mainFolderEditUpdateState);

  const [update, setUpdate] = useRecoilState(updateStateAtom);

  function handleSelect(data) {
    setSelectValue(data);
    setSelectedMainFolder(data);
    setSelectSubValue(null);

    if (!open) {
      setSelectedSubFolder({});
    }
  }

  useEffect(() => {
    if (asPath.startsWith("/upsert/code")) {
      setMainFolder("CodeMainFolders");
      setType("code");
    }
    if (asPath.startsWith("/upsert/error")) {
      setMainFolder("ErrorMainFolders");
      setType("error");
    }
    if (asPath.startsWith("/upsert/setup")) {
      setMainFolder("SetupMainFolders");
      setType("setup");
    }
  }, [asPath]);

  useEffect(() => {
    if (!user) return;
    if (mainFolder) {
      setMainLoading(true);
      const folderColRef = collection(db, "UsersData1", user.uid, mainFolder);
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setFolders(
          userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
        );
        setMainLoading(false);
      };
      getFolders();
    }
  }, [user, update, mainDeleted, mainFolder]);

  useEffect(() => {
    if (mainDeleted) {
      setSelectValue(null);
      setSelectedMainFolder({});
      setMainDeleted(false);
    }
  }, [mainDeleted]);

  useEffect(() => {
    if (mainEdited) {
      setSelectValue(null);
      setSelectedMainFolder({});
      setMainEdited(false);
    }
  }, [mainEdited]);

  return (
    <div>
      {!mainLoading && (
        <>
          <div>
            {folders.length > 0 ? (
              <div className="flex flex-col gap-2">
                <Text variant="H5">Rodmappe</Text>

                <div className="flex gap-3 items-center w-full">
                  <Icon
                    as={AddNoteIcon}
                    w={9}
                    h={9}
                    fill="Primary"
                    cursor="pointer"
                    onClick={() => {
                      setOpen({ default: true, view: 0 });
                    }}
                  />

                  <div className="w-full">
                    <Select
                      options={folders}
                      placeholder="Valg en rodmappe"
                      value={selectValue}
                      onChange={handleSelect}
                      isSearchable={true}
                      isDisabled={disableSelectInput}
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
                    {selectedMainFolder?.mainFolderId && (
                      <MainFolderDropdown
                        selectedMainFolder={selectedMainFolder}
                      />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <Text variant="nonLabel">
                    Du har ingen rodmapper for fejl Setups!
                  </Text>

                  <div>
                    <Button
                      variant="noFolder"
                      size="sm"
                      onClick={() => {
                        setOpen({ default: true, view: 0 });
                      }}
                    >
                      Opret
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {mainLoading && <LoadingSNIPS size={10} />}
    </div>
  );
}
