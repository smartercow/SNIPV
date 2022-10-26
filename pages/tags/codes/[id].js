import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase/clientApp";
import { Badge, Button, Card, Loading, Popover } from "@nextui-org/react";
import Link from "next/link";
import { DeleteDocumentIcon } from "../../../components/SVG/DeleteDocumentIcon";
import { DeleteSnippet } from "../../../components/NonModal/DeleteSnippet";
import { EditDocumentIcon } from "../../../components/SVG/EditDocumentIcon";
import { LoginIcon } from "../../../components/SVG/LoginIcon";
import { Paper } from "../../../components/SVG/Paper";
import { MdRefresh } from "react-icons/md";
import { Text } from "@chakra-ui/react";
const CodeTagPage = () => {
  const {
    query: { id },
  } = useRouter();

  const [user] = useAuthState(auth);

  const [codeTagSnippetsSearch, setCodeTagSnippetsSearch] = useState();
  const [loading, setLoading] = useState(true);

  const getMySnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where("tags", "array-contains", id),
        orderBy("postedAt", "desc")
      );
      const snippetDocs = await getDocs(snippetQuery);

      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setCodeTagSnippetsSearch(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMySnippets();
    }
  }, [user]);

  return (
    <div className="min-h-[70vh]">
      {user && (
        <div>
          <div className="flex gap-2 items-center">
            <Text transform="uppercase">Kode snips med tag:</Text>
            <Text color="primary" transform="lowercase">
              {id}
            </Text>
          </div>
          <div>
            <div>
              <div className="flex flex-col gap-4">
                {codeTagSnippetsSearch?.map((snip, index) => (
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
                                      className={`l${snip.category?.langId} lBadge rounded-3xl flex justify-center items-center`}
                                    >
                                      <p className="text-xs MonoHeading font-semibold lowercase">
                                        {snip.folder.language?.label}
                                      </p>
                                    </div>
                                    {snip.folder?.framework?.frameworkId && (
                                      <div
                                        className={`f${snip.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
                                      >
                                        <p className="text-xs MonoHeading font-semibold lowercase">
                                          {snip.folder.framework?.label}
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

                {loading && (
                  <div className="flex justify-center items-center h-[20vh]">
                    <Loading size="lg" />
                  </div>
                )}

                {/*           {!loading && (
            <>
              {!isEmpty && (
                <div className="flex justify-center">
                  <Button size="sm" onClick={fetchMore}>
                    <MdRefresh />HENT MERE
                  </Button>
                </div>
              )}
            </>
          )} */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeTagPage;
