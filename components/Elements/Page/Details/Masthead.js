import {
  Box,
  Button,
  ButtonGroup,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase/clientApp";
import LanguageBadge from "../../../Display/Language/LanguageBadge";
import { DeleteSNIPNoMap } from "../../../NonModal/DeleteSNIPNoMap";
import { DeleteDocumentIcon } from "../../../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../../SVG/EditDocumentIcon";

const Masthead = ({ snippet }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { asPath } = useRouter();
  const {
    query: { id },
  } = useRouter();

  const [folder, setFolder] = useState("");
  const [pushPath, setPushPath] = useState("");
  const [edit, setEdit] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (asPath.startsWith("/s/")) {
      setFolder("CodeSnippetsData1");
      setPushPath("/snips/codes");
      setEdit("/upsert/code/");
      setType("kode SNIP");
    }
    if (asPath.startsWith("/e/")) {
      setFolder("ErrorSnippetsData1");
      setPushPath("/snips/errors");
      setEdit("/upsert/error/");
      setType("fejl SNIP");
    }
    if (asPath.startsWith("/setup/")) {
      setFolder("SetupsData");
      setPushPath("/setups");
      setEdit("/upsert/setup/");
      setType("Setup");
    }
  }, [asPath]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, folder, id));
      router.push(pushPath);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="flex gap-2 justify-between items-center">
      <>
        <LanguageBadge snippet={snippet} />
      </>

      {user?.uid === snippet.userData?.uid && (
        <Box>
          <ButtonGroup size="sm" isAttached variant="ghost">
            <a href={`${edit}${id}`}>
              <IconButton icon={<Icon as={EditDocumentIcon} height={6} width={6} fill="Primary" />} />
            </a>
            <Popover>
              <PopoverTrigger>
                <IconButton icon={<Icon w={6} h={6} as={DeleteDocumentIcon} fill="Red" />} />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <DeleteSNIPNoMap handleDelete={handleDelete} id={id} type={type} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </ButtonGroup>
        </Box>
      )}
    </div>
  );
};

export default Masthead;
