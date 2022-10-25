import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import { MdRefresh } from "react-icons/md";
import LatestHeading from "../Heading/LatestHeading";
import Snippet from "../Display/Snippet";
import { useRouter } from "next/router";
import LoadingSNIPS from "../LoadingState/LoadingSNIPS";
import { Box, Button, Icon, Text } from "@chakra-ui/react";
import Category from "./Category";
import AllType from "./AllType";
import FoldersLoad from "../Folders/FoldersLoad";
import { mainFolderEditUpdateState } from "../../atoms/mainFolderEditUpdateState";
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { useRecoilState } from "recoil";
import Search from "./Search";
import { CategoryIcon } from "../SVG/CategoryIcon";
import { FilterIcon } from "../SVG/FilterIcon";
import { SwapIcon } from "../SVG/SwapIcon";

const MySNIPS = () => {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [mainFolder, setMainFolder] = useState("");

  const [types, setTypes] = useState("all");

  const [col, setCol] = useState("");

  const [loadingMain, setLoadingMain] = useState(false);

  const [folders, setFolders] = useState([]);
  const [snipType, setSnipType] = useState("");
  const [snip, setSnip] = useState("");

  const [mainDeleted, setMainDeleted] = useRecoilState(
    mainFolderDeleteUpdateState
  );
  const [mainEdited, setMainEdited] = useRecoilState(mainFolderEditUpdateState);

  const [selectedMainFolder, setSelectedMainFolder] = useState();
  const [selectedSubFolder, setSelectedSubFolder] = useState([]);

  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setCol("CodeSnippetsData1");
      setMainFolder("CodeMainFolders");
      setSnipType("code");
      setSnip("kode SNIPS");
    }
    if (asPath.startsWith("/snips/errors")) {
      setCol("ErrorSnippetsData1");
      setMainFolder("ErrorMainFolders");
      setSnipType("error");
      setSnip("fejl SNIPS");
    }
    if (asPath.startsWith("/setups")) {
      setCol("SetupData");
      setMainFolder("SetupMainFolders");
      setSnipType("setup");
      setSnip("Setups");
    }
  }, [asPath]);

  useEffect(() => {
    if (!user) return;
    if (col) {
      setLoadingMain(true);
      const folderColRef = query(
        collection(db, "UsersData1", user.uid, mainFolder)
      );
      const getFolders = async () => {
        const userData = await getDocs(folderColRef);
        setFolders(
          userData.docs.map((doc) => ({ ...doc.data(), mainFolderId: doc.id }))
        );
      };

      getFolders();
    }
  }, [user, mainDeleted, mainEdited, mainFolder, col]);

  const handleDelete = async (id) => {
    try {
      if (col) {
        await deleteDoc(doc(db, col, id));
        setUpdate(!update);
      }
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Box
        bg="white"
        boxShadow="sm"
        borderRadius="lg"
        className="flex flex-col gap-3"
        p={2}
      >
        <Box bg="iGray" borderRadius="lg" className="flex items-center">
          <Box
            _hover={{ bg: "gray.200", cursor: "pointer" }}
            py={1}
            bg={types === "all" ? "gray.200" : "#EDF2F7"}
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
            className="flex gap-1 items-center px-3 transition-all duration-300"
            onClick={() => setTypes("all")}
          >
            <Icon as={CategoryIcon} fill="Primary" h={4} w={4} />
            <Text textTransform="uppercase" fontSize="16px" color="gray.600">
              Alle
            </Text>
          </Box>
          <Box
            _hover={{ bg: "gray.200", cursor: "pointer" }}
            py={1}
            bg={types === "category" ? "gray.200" : "#EDF2F7"}
            className="flex gap-1 items-center px-3 transition-all duration-300"
            onClick={() => setTypes("category")}
          >
            <Icon as={FilterIcon} fill="Primary" h={4} w={4} />
            <Text textTransform="uppercase" fontSize="16px" color="gray.600">
              Mapper
            </Text>
          </Box>
        </Box>

        {types === "category" && (
          <FoldersLoad
            folders={folders}
            loadingMain={loadingMain}
            setLoadingMain={setLoadingMain}
            selectedMainFolder={selectedMainFolder}
            setSelectedMainFolder={setSelectedMainFolder}
            selectedSubFolder={selectedSubFolder}
            setSelectedSubFolder={setSelectedSubFolder}
          />
        )}
      </Box>

      {types === "all" && (
        <div>
          <LatestHeading headingType={`Alle ${snip}`} />

          <AllType
            setLoadingMain={setLoadingMain}
            selectedSubFolder={selectedSubFolder}
            col={col}
            handleDelete={handleDelete}
            snip={snip}
          />
        </div>
      )}

      {types === "category" && (
        <>
          {selectedSubFolder?.mainFolder?.mainFolderId && (
            <>
              <LatestHeading headingType={`${selectedSubFolder.label}`} />

              <Category
                mainFolder={mainFolder}
                loadingMain={loadingMain}
                setLoadingMain={setLoadingMain}
                col={col}
                selectedSubFolder={selectedSubFolder}
                handleDelete={handleDelete}
              />
            </>
          )}

          {!selectedMainFolder?.mainFolderId && (
            <div className="flex justify-center mt-10">
              <Text variant="H5">Valg en rodmappe!</Text>
            </div>
          )}
        </>
      )}

      {types === "search" && (
        <>
          <Search />
        </>
      )}
    </div>
  );
};

export default MySNIPS;
