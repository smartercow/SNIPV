import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { Box, Button, Icon, Input, Text } from "@chakra-ui/react";
import { mainFolderEditUpdateState } from "../../atoms/mainFolderEditUpdateState";
import { mainFolderDeleteUpdateState } from "../../atoms/mainFolderDeleteUpdateState";
import { useRecoilValue } from "recoil";
import { CategoryIcon } from "../SVG/CategoryIcon";
import { FilterIcon } from "../SVG/FilterIcon";
import { FolderIcon } from "../SVG/FolderIcon";
import LatestHeading from "../Heading/LatestHeading";
import Category from "./Category";
import AllType from "./AllType";
import FoldersLoad from "../Folders/FoldersLoad";
import Search from "./Search";

const MySNIPS = () => {
  const [user] = useAuthState(auth);
  const { asPath } = useRouter();

  const [mainFolder, setMainFolder] = useState("");
  const [selectedMainFolder, setSelectedMainFolder] = useState();
  const [selectedSubFolder, setSelectedSubFolder] = useState([]);

  const [types, setTypes] = useState("all");
  const [col, setCol] = useState("");
  const [search, setSearch] = useState("");

  const [loadingMain, setLoadingMain] = useState(false);

  const [match, setMatch] = useState([]);
  const [noMatch, setNoMatch] = useState(false);

  const [folders, setFolders] = useState([]);
  const [snip, setSnip] = useState("");

  const mainDeleted = useRecoilValue(mainFolderDeleteUpdateState);
  const mainEdited = useRecoilValue(mainFolderEditUpdateState);

  useEffect(() => {
    if (asPath.startsWith("/snips/codes")) {
      setCol("CodeSnippetsData1");
      setMainFolder("CodeMainFolders");
      setSnip("kode SNIPS");
    }
    if (asPath.startsWith("/snips/errors")) {
      setCol("ErrorSnippetsData1");
      setMainFolder("ErrorMainFolders");
      setSnip("fejl SNIPS");
    }
    if (asPath.startsWith("/setups")) {
      setCol("SetupsData");
      setMainFolder("SetupMainFolders");
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

  const SearchTag = async (e) => {
    e.preventDefault();
    if (search && col) {
      setNoMatch(false);
      try {
        const colRef = collection(db, col);
        const Query = query(colRef, where("tags", "array-contains", search));

        onSnapshot(Query, (snapshot) => {
          let matchedSNIPS = [];
          snapshot.docs.forEach((doc) => {
            matchedSNIPS.push({ ...doc.data(), id: doc.id });
          });
          setMatch(matchedSNIPS);
        });
      } catch (error) {
        console.log("Tag search error", error.message);
      } finally {
        if (!Object.keys(match).length > 0) {
          setNoMatch(true);
        }
      }
    }
  };

  useEffect(() => {
    setNoMatch(false);
  }, [search]);

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
            <Text
              textTransform="uppercase"
              fontSize="16px"
              opacity={0.8}
              fontWeight="semibold"
            >
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
            <Icon as={FolderIcon} fill="Primary" h={4} w={4} />
            <Text
              textTransform="uppercase"
              fontSize="16px"
              opacity={0.8}
              fontWeight="semibold"
            >
              Mapper
            </Text>
          </Box>

          <Box
            _hover={{ bg: "gray.200", cursor: "pointer" }}
            py={1}
            bg={types === "search" ? "gray.200" : "#EDF2F7"}
            className="flex gap-1 items-center px-3 transition-all duration-300"
            onClick={() => setTypes("search")}
          >
            <Icon as={FilterIcon} fill="Primary" h={4} w={4} />
            <Text
              textTransform="uppercase"
              fontSize="16px"
              opacity={0.8}
              fontWeight="semibold"
            >
              Søg
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

        {types === "search" && (
          <Box borderWidth={1} p={2} borderRadius="md">
            <form onSubmit={SearchTag}>
              <div className="flex flex-col gap-2">
                <Text
                  textDecoration="underline"
                  textDecorationThickness="2px"
                  textUnderlineOffset={3}
                  textDecorationColor="Gray"
                  fontWeight="semibold"
                >
                  Søg efter tags
                </Text>
                <div className="flex-grow flex  gap-2">
                  <Input
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    onKeyPress={(e) => {
                      e.key === "Enter" && SearchTag;
                    }}
                  />
                  <div>
                    <Button type="submit">Søg</Button>
                  </div>
                </div>
              </div>
            </form>
          </Box>
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
          <Search match={match} handleDelete={handleDelete} />
          {!match.length > 0 && noMatch && (
            <>
              <div className="flex items-center justify-center">
                <div>
                  <Text color="Primary" variant="nonLabel">
                    {search}
                  </Text>
                </div>
                <div>
                  <Text variant="nonLabel">
                    &nbsp;matchede ikke nogen tags!
                  </Text>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MySNIPS;
