import {
  Button,
  Icon,
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
import LanguageBadge from "../../../Display/LanguageBadge";
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
    <div className="flex gap-2 justify-between items-center mt-2">
      <>
        <LanguageBadge snippet={snippet} />
      </>

      {user.uid === snippet.userData.uid && (
        <div className="flex items-center">
          <div>
            <a href={`${edit}${id}`}>
              <Button>
                <Icon w={8} h={8} as={EditDocumentIcon} fill="Primary" />
              </Button>
            </a>
          </div>

          <div>
            <Popover>
              <PopoverTrigger>
                <Button>
                  <Icon w={8} h={8} as={DeleteDocumentIcon} fill="Red" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <DeleteSNIPNoMap
                    handleDelete={handleDelete}
                    id={id}
                    type={type}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
    </div>
  );
};

export default Masthead;
