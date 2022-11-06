import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../firebase/clientApp";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import FolderHeading from "../FolderHeading";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import CreatedFolders from "../../Folders/CreateFolder/CreatedFolders";
import CreatedSubFolders from "../../Folders/CreateFolder/CreatedSubFolders";
import Tags from "../Elements/Tags";
import { useAuthState } from "react-firebase-hooks/auth";
import Modules from "./Modules";
import ButtonCheckBox from "./ButtonCheckBox";
import FolderStructure from "./Entries/FolderStructure";

const initialState = {
  title: "",
  description: "",
};

const SnipMenu = [
  { type: "folder", text: "Mappestruktur for denne Setup", size: 7 },
  { type: "numeric", text: "Numeriske titler for alle moduler", size: 6 },
];

const CreateSetup = ({ id, setLoading, setDataError }) => {
  const [user] = useAuthState(auth);

  const [selectedMainFolder, setSelectedMainFolder] = useState([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState();
  const [subFolders, setSubFolders] = useState([]);

  const [form, setForm] = useState(initialState);
  const { title, description } = form;
  const [lowercaseForm, setLowercaseForm] = useState([]); //Search
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInputValues, setTagInputValues] = useState([]);

  const [modulesFolderStructure, setModulesFolderStructure] = useState("");
  const [allHasFolderStructure, setAllHasFolderStructure] = useState(false);
  const [allHasNumericTitles, setAllHasNumericTitles] = useState(false);

  const [selectValue, setSelectValue] = useState([]);
  const [selectSubValue, setSelectSubValue] = useState();

  const [modules, setModules] = useState([]);

  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [uid, setUid] = useState("");

  const router = useRouter();
  const [dataFetched, setDataFetched] = useState(false);

  const [btnLoad, setBtnLoad] = useState(false);
  const [disableCode, setDisableCode] = useState(true);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [accordionIndex, setAccordionIndex] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setLowercaseForm({
      ...lowercaseForm,
      [e?.target.name]: e?.target.value.toLowerCase(),
    });
  };

  const lowercaseTags = tagInputValues.map((element) => {
    return element.toLowerCase();
  });

  useEffect(() => {
    setTags(lowercaseTags);
  }, [tagInputValues]);

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "UsersData1", user.uid);
    const getUser = async () => {
      const userData = await getDoc(userDocRef);

      setUsername(userData?.data().username);
      setUsernameValue(userData?.data().usernameValue);
      setUid(userData?.data().user?.uid);
      setPhotoURL(userData?.data().user?.photoURL);
    };
    getUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      setBtnLoad(true);
      if (!id) {
        try {
          await addDoc(collection(db, "SetupsData"), {
            ...form,
            search: {
              title: lowercaseForm.title,
              description: lowercaseForm.description,
            },
            setupHasFolderStructure: allHasFolderStructure,
            setupFolderStructure: modulesFolderStructure,
            allHasNumericTitles: allHasNumericTitles,
            modules: { ...modules },
            snippetType: "setup",
            postedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            folder: selectedSubFolder,
            tags: tags,
          });
          router.push("/setups");
        } catch (error) {
          console.log("Fejl i opretning af Setup!", error);
        }
      } else {
        try {
          await updateDoc(doc(db, "SetupsData", id), {
            ...form,
            search: {
              title: lowercaseForm.title ? lowercaseForm.title : form.title,
              description: lowercaseForm.description
                ? lowercaseForm.description
                : form.description,
            },
            setupHasFolderStructure: allHasFolderStructure,
            setupFolderStructure: modulesFolderStructure,
            allHasNumericTitles: allHasNumericTitles,
            modules: { ...modules },
            updatedAt: serverTimestamp(),
            userData: {
              username: username,
              usernameValue: usernameValue,
              uid: uid,
              photoURL: photoURL,
            },
            folder: selectedSubFolder,
            tags: tags,
            notes: notes,
          });
          router.push(`/setup/${id}`);
        } catch (error) {
          console.log("Fejl i opdatering af SNIP!", error);
        }
      }
    } else {
      // return toast.error("Valg en mappe!");
      return toast.error("FEJL!");
    }
  };

  const getSetupsData = async () => {
    try {
      const docRef = doc(db, "SetupsData", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        //Code Setup data from {id}
        setSelectedMainFolder(snapshot.data().folder.mainFolder);
        setSelectValue(snapshot.data().folder.mainFolder);
        setSelectedSubFolder(snapshot.data().folder);
        setSelectSubValue(snapshot.data().folder);
        setForm({
          title: snapshot.data().title,
          description: snapshot.data().description,
        });
        setAllHasFolderStructure(snapshot.data().setHasFolderStructure);
        setModulesFolderStructure(snapshot.data().setupFolderStructure);
        setAllHasNumericTitles(snapshot.data().allHasNumericTitles);
        setModules(Object.values(snapshot.data().modules));
        setTags(snapshot.data().tags);
        setLoading(false);
      }
    } catch (error) {
      console.log("Kan ikke hente Setup til at opdatere!", error);
      setDataError(true);
      setLoading(false);
    } finally {
      //Code SNIP data have been fetched
      setDataFetched(true);
      setDataError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getSetupsData();
      setDisableCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (selectSubValue) {
      setCodeExpanded(true);
      setAccordionIndex(1);
      setDisableCode(false);
      // setFolderExpanded(false);
    } else {
      setCodeExpanded(false);
      setAccordionIndex(0);
      setDisableCode(true);
      // setFolderExpanded(true);
    }
  }, [selectSubValue, selectedMainFolder]);

  return (
    <div className="p-4">
      <Accordion defaultIndex={[0]} allowToggle variant="main">
        <AccordionItem index={accordionIndex}>
          <h2>
            <AccordionButton
              borderRadius={10}
              bg="iGrayLight"
              _hover={{ bg: "PrimaryELight" }}
              _expanded={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Box flex="1" textAlign="left">
                <Text variant="folderHeading">Mappe</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div className="flex flex-col gap-4 mx-1 h-40">
              <CreatedFolders
                selectedMainFolder={selectedMainFolder}
                setSelectedMainFolder={setSelectedMainFolder}
                selectedSubFolder={selectedSubFolder}
                setSelectedSubFolder={setSelectedSubFolder}
                id={id}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                setSelectSubValue={setSelectSubValue}
              />

              {selectedMainFolder?.language?.langId && (
                <div>
                  <CreatedSubFolders
                    selectedMainFolder={selectedMainFolder}
                    selectedSubFolder={selectedSubFolder}
                    setSelectedSubFolder={setSelectedSubFolder}
                    setSubFolders={setSubFolders}
                    subFolders={subFolders}
                    selectSubValue={selectSubValue}
                    setSelectSubValue={setSelectSubValue}
                  />
                </div>
              )}
            </div>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem mt={3} index={accordionIndex} isDisabled={disableCode}>
          <h2>
            <AccordionButton
              borderRadius={10}
              bg="iGrayLight"
              _hover={{ bg: "PrimaryELight" }}
              _expanded={{
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <Box flex="1" textAlign="left">
                <div className="flex gap-5 items-center">
                  <Text variant="folderHeading">SETUP</Text>
                  {codeExpanded && (
                    <FolderHeading selectedSubFolder={selectedSubFolder} />
                  )}
                </div>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py={4}>
            <form onSubmit={handleSubmit} className="mx-3">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-5 h-full">
                  <div className="w-full flex gap-4 items-center">
                    <div className="w-24">
                      <Text variant="H5">Titel</Text>
                    </div>
                    <Input
                      name="title"
                      size="md"
                      required
                      maxLength={130}
                      onChange={handleChange}
                      value={title}
                    />
                  </div>

                  <div className="w-full flex gap-4 items-center">
                    <div className="w-24">
                      <Text variant="H5">Beskrivelse</Text>
                    </div>
                    <Input
                      name="description"
                      size="md"
                      required
                      maxLength={180}
                      onChange={handleChange}
                      value={description}
                    />
                  </div>
                </div>
                <Accordion allowToggle variant="sub">
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        role="heading"
                        borderRadius={10}
                        bg="iGrayLight"
                        _hover={{ bg: "PrimaryELight" }}
                        _expanded={{
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                      >
                        <Box flex="1" textAlign="left">
                          <Text variant="H5">Tags</Text>
                        </Box>
                        <AccordionIcon mr={2} />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <Tags
                        id={id}
                        dataFetched={dataFetched}
                        tags={tags}
                        setTagInputValues={setTagInputValues}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Box>
                  <Box>
                    <ButtonCheckBox
                      SnipMenu={SnipMenu}
                      hasFolderStructure={allHasFolderStructure}
                      setHasFolderStructure={setAllHasFolderStructure}
                      hasNumericTitles={allHasNumericTitles}
                      setHasNumericTitles={setAllHasNumericTitles}
                    />
                  </Box>
                  {allHasFolderStructure && (
                    <FolderStructure
                      folderStructure={modulesFolderStructure}
                      setFolderStructure={setModulesFolderStructure}
                    />
                  )}
                </Box>
                <Box>
                  <Modules
                    modules={modules}
                    setModules={setModules}
                    allHasNumericTitles={allHasNumericTitles}
                  />
                </Box>

                <div className="flex flex-col gap-5">
                  <div>
                    {id ? (
                      <Button
                        style={{ color: "white" }}
                        variant="create"
                        color="primary"
                        type="submit"
                        isLoading={btnLoad}
                        loadingText="Indsender.."
                      >
                        OPDATERE
                      </Button>
                    ) : (
                      <Button
                        style={{ color: "white" }}
                        variant="create"
                        color="primary"
                        type="submit"
                        isLoading={btnLoad}
                        loadingText="Indsender.."
                      >
                        GEM
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CreateSetup;
