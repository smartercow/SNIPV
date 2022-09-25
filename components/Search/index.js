import { Badge, Button, Card, Input, Loading, Text } from "@nextui-org/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useState } from "react";
import { db } from "../../firebase/clientApp";
import TagHeading from "../Heading/TagType/TagHeading";
import { LoginIcon } from "../SVG/LoginIcon";
import { Paper } from "../SVG/Paper";

const initialState = {
  searchValue: "",
};

const Search = () => {
  const [inputValue, setInputValue] = useState(initialState);
  const [codeResults, setCodeResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const searchCodeSnip = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const snipQuery = query(
        collection(db, "CodeSnippetsData1"),
        where("tags", "array-contains", inputValue.searchValue),
        orderBy("postedAt", "desc")
      );
      const snipDocs = await getDocs(snipQuery);
      const snips = snipDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCodeResults(snips);
      setLoading(false);
    } catch (error) {
      console.log("getMyCodeFolders error", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-3">
        <div>
          <div>
            <TagHeading headingType={"Søg en SNIPS med"} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <form onSubmit={searchCodeSnip}>
              <div className="flex gap-4">
                <Input
                  aria-label="Search Snips"
                  clearable
                  bordered
                  animated="false"
                  placeholder="Søg her"
                  width="100%"
                  name="searchValue"
                  onKeyDown={(e) => e.key === "Enter" && searchCodeSnip}
                  onChange={handleChange}
                />
                <Button auto type="submit">
                  Søg
                </Button>
              </div>
            </form>
          </div>
          <div>
            {codeResults && (
              <div>
                {codeResults.map((snip, index) => (
                  <div key={index} className="hoverable-item flex gap-2">
                    <Link href={`/s/${snip.id}`}>
                      <div className="hoverable-item w-full">
                        <Card
                          isPressable
                          variant="flat"
                          css={{ mw: "100%", padding: "$0" }}
                          key={snip.id}
                        >
                          <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                            <div className="w-full flex flex-col gap-2">
                              <div className="flex gap-6 items-center">
                                <div className="pl-2">
                                  <Paper
                                    fill="#0072F5"
                                    className="cursor-pointer"
                                    width={50}
                                    height={50}
                                  />
                                </div>

                                <div className="w-full flex flex-col justify-center gap-3 MonoHeading">
                                  <div className="w-full">
                                    <p className="text-[#031B4E] text-lg font-[500] truncateText">
                                      {snip.title}
                                    </p>
                                  </div>
                                  {snip.description && (
                                    <div className="-mt-2 h-5">
                                      <h6 className="text-[#031b4ed4] whitespace-nowrap MonoHeading truncateText">
                                        {snip.description}
                                      </h6>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex">
                                <div className="w-24 flex justify-center">
                                  {snip.folder.folderSnippetType === "code" && (
                                    <div className="pr-[.60rem]">
                                      <Badge
                                        isSquared
                                        color="primary"
                                        variant="flat"
                                      >
                                        KODE
                                      </Badge>
                                    </div>
                                  )}
                                </div>
                                <div className="w-full MonoHeading">
                                  <div className="flex gap-2">
                                    <div
                                      className={`l${snip.category.langId} lBadge rounded-3xl flex justify-center items-center`}
                                    >
                                      <p className="text-xs MonoHeading font-semibold lowercase">
                                        {snip.folder.language?.label}
                                      </p>
                                    </div>
                                    {snip.folder?.framework.frameworkId && (
                                      <div
                                        className={`f${snip.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {snip.folder.framework?.label}
                                        </p>
                                      </div>
                                    )}
                                    {snip?.folder?.processor.processorId && (
                                      <div
                                        className={`p${snip.folder?.processor.processorId} lBadge rounded-3xl flex justify-center items-center`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {snip.folder.processor?.label}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="text-[#031B4E]">
                                  <p className="text-xs font-mono">
                                    {new Date(
                                      snip.postedAt.seconds * 1000
                                    ).toLocaleDateString("da-DK")}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="hoverable-show">
                              <LoginIcon
                                width={30}
                                height={30}
                                fill="#0072F5"
                              />
                            </div>
                          </div>
                        </Card>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-center items-center h-[20vh]">
                <Loading size="lg" />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-5">
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
