import { Button, Collapse, Input, Text } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import { InfoCircle } from "../SVG/InfoCircle";

const initialState = {
  searchValue: "",
};

const Search = () => {
  const [user] = useAuthState(auth);
  const [inputValue, setInputValue] = useState(initialState);
  const [codeResults, setCodeResults] = useState([]);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  /*   const searchCodeSnip = async (e) => {
    const colRef = collection(db, "CodeSnippetsData1");
    try {
      const querySearch = query(
        colRef,
        where("title", "==", "Github"),
        orderBy("postedAt", "desc")
      );
      console.log("Searching...");

      const snipDocs = await getDocs(querySearch);

      const snips = snipDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("insideFunction", snipDocs.docs());

      setCodeResults(snips);
    } catch (error) {
      console.log("Error on search!");
    }
  }; */

  const getMyCodeFolders = async () => {
    try {
      const folderQuery = query(
        collection(db, "CodeSnippetsData1"),
        where("tags", "==", inputValue.searchValue),
        orderBy("createdAt", "desc")
      );
      const folderDocs = await getDocs(folderQuery);
      const folders = folderDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCodeResults(folders);
    } catch (error) {
      console.log("getMyCodeFolders error", error.message);
    }
  };
  useEffect(() => {
    getMyCodeFolders();
  }, [inputValue]);

  console.log("SearchSNips", codeResults);
  console.log("InputValue", inputValue.searchValue);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3">
        <div>
          <div>
            <Text transform="uppercase" h5>
              Søg en snip med tag
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <form onSubmit={getMyCodeFolders}>
              <div className="flex gap-4">
                <Input
                  aria-label="Search Snips"
                  clearable
                  bordered
                  animated="false"
                  placeholder="Søg her"
                  width="100%"
                  name="searchValue"
                  onKeyDown={(e) => e.key === "Enter" && getMyCodeFolders}
                  onChange={handleChange}
                />
                <Button auto type="submit">
                  Søg
                </Button>
              </div>
            </form>
          </div>
          <div>Resultater...</div>
        </div>
      </div>
      <div>
        <Link href="/help/tags">
          <Text color="primary" className="cursor-pointer underline">
            Læs hvordan man skriver søgbare tags
          </Text>
        </Link>
      </div>
    </div>
  );
};

export default Search;
