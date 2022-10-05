import { Badge, Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import {
  collection,
  deleteDoc,
  doc,
  FieldPath,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LanguageBadge from "../../components/Display/LanguageBadge";
import LatestHeading from "../../components/Heading/LatestHeading";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import { DeleteSnippet } from "../../components/NonModal/DeleteSnippet";
import { DeleteErrorSnippet } from "../../components/NonModal/DeleteErrorSnippet";
import { DeleteDocumentIcon } from "../../components/SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../../components/SVG/EditDocumentIcon";
import { LoginIcon } from "../../components/SVG/LoginIcon";
import { Paper } from "../../components/SVG/Paper";
import { PaperFail } from "../../components/SVG/PaperFail";
import { auth, db } from "../../firebase/clientApp";

const MySnippets = () => {
  const [user] = useAuthState(auth);

  const [myCodeSnippets, setMyCodeSnippets] = useState();
  const [myErrorSnippets, setMyErrorSnippets] = useState();
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const [allOpenStates, setAllOpenStates] = useState({});

  const getMyCodeSnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "CodeSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        limit(4)
      );

      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyCodeSnippets(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  const getMyErrorSnippets = async () => {
    try {
      const snippetQuery = query(
        collection(db, "ErrorSnippetsData1"),
        where(new FieldPath("userData", "uid"), "==", user?.uid),
        orderBy("postedAt", "desc"),
        limit(4)
      );

      const snippetDocs = await getDocs(snippetQuery);
      const snippets = snippetDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMyErrorSnippets(snippets);
      setLoading(false);
    } catch (error) {
      console.log("getPosts error", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getMyCodeSnippets();
      getMyErrorSnippets();
    }
  }, [user, update]);

  const handleCodeSnippetDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  const handleErrorSnippetDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ErrorSnippetsData1", id));
      setUpdate(!update);
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="min-h-[70vh]">
      {user && (
        <>
          <Head>
            <title>Mine SNIPS - SNIPV</title>
            <meta name="description" content="Created by Peter G" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <>
            <>
              <SnippetsTypeLinks />
            </>

            <>
              <LatestHeading headingType={"Seneste kode SNIPS"} />
            </>

            <div>
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex flex-col gap-2 w-full">
                    {myCodeSnippets?.length > 0 && (
                      <div className="flex flex-col gap-3">
                        {myCodeSnippets.map((snippets, index) => (
                          <div
                            key={index}
                            className="hoverable-item flex gap-2"
                          >
                            <Link href={`/s/${snippets.id}`}>
                              <div className="hoverable-item w-full">
                                <Card
                                  isPressable
                                  variant="flat"
                                  css={{ mw: "100%", padding: "$0" }}
                                  key={snippets.id}
                                >
                                  <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                                    <div className="w-full flex flex-col gap-2">
                                      <div className="flex gap-5 items-center">
                                        <div className="pl-1">
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
                                              {snippets.title}
                                            </p>
                                          </div>

                                          {snippets.description && (
                                            <div className="-mt-2 h-5">
                                              <h6 className="text-[#031b4ed4] whitespace-nowrap MonoHeading truncateText">
                                                {snippets.description}
                                              </h6>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="flex">
                                        <div className="w-20 flex items-center justify-center">
                                          <div className="pr-[.60rem]">
                                            <Badge
                                              isSquared
                                              color="primary"
                                              variant="flat"
                                            >
                                              KODE
                                            </Badge>
                                          </div>
                                        </div>

                                        <div className="flex gap-1 items-center justify-between w-full MonoHeading">
                                          <LanguageBadge snippets={snippets} />

                                          <div className="flex gap-3 text-[#031B4E]">
                                            {snippets.updatedAt && (
                                              <div className="flex gap-1">
                                                <p className="text-xs font-mono">
                                                  OPDATERET:
                                                </p>

                                                <p className="text-xs font-mono font-semibold">
                                                  {new Date(
                                                    snippets.updatedAt.seconds *
                                                      1000
                                                  ).toLocaleDateString("da-DK")}
                                                </p>
                                              </div>
                                            )}

                                            <div className="flex gap-1">
                                              <p className="text-xs font-mono">
                                                OPRETTET:
                                              </p>
                                              <p className="text-xs font-mono font-semibold">
                                                {new Date(
                                                  snippets.postedAt.seconds * 1000
                                                ).toLocaleDateString("da-DK")}
                                              </p>
                                            </div>
                                          </div>
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
                            <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                              <div>
                                <a href={`/upsert/code/${snippets.id}`}>
                                  <Button auto light>
                                    <EditDocumentIcon
                                      fill="#0072F5"
                                      className="cursor-pointer"
                                      width={26}
                                      height={26}
                                    />
                                  </Button>
                                </a>
                              </div>
                              <div>
                                <Popover
                                  placement="top"
                                  isOpen={allOpenStates[snippets.id]}
                                  onOpenChange={(nowOpen) =>
                                    setAllOpenStates((oldState) => ({
                                      ...oldState,
                                      [snippets.id]: nowOpen,
                                    }))
                                  }
                                >
                                  <Popover.Trigger>
                                    <Button auto light>
                                      <DeleteDocumentIcon
                                        fill="#F31260"
                                        className="cursor-pointer"
                                        width={26}
                                        height={26}
                                      />
                                    </Button>
                                  </Popover.Trigger>
                                  <Popover.Content>
                                    <DeleteSnippet
                                      id={snippets.id}
                                      handleCodeSnippetDelete={
                                        handleCodeSnippetDelete
                                      }
                                      setAllOpenStates={setAllOpenStates}
                                    />
                                  </Popover.Content>
                                </Popover>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="text-center">
                          <Link href="/snips/codes">
                            <Text b className="cursor-pointer hover:underline">
                              SE ALLE
                            </Text>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {loading ? (
                    <div className="flex justify-center items-center h-[20vh]">
                      <Loading size="lg" />
                    </div>
                  ) : (
                    <div>
                      {!myCodeSnippets?.length > 0 && (
                        <div className="flex justify-center mt-10">
                          <Text b size={13} transform="uppercase">
                            Du har ingen kode SNIPS! 😔
                          </Text>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <>
                    <LatestHeading headingType={"Seneste fejl SNIPS"} />
                  </>

                  <div className="flex flex-col gap-2 w-full">
                    {myErrorSnippets?.length > 0 && (
                      <div className="flex flex-col gap-3">
                        {myErrorSnippets.map((snip) => (
                          <div
                            key={snip.id}
                            className="hoverable-item flex gap-2"
                          >
                            <Link href={`/e/${snip.id}`}>
                              <div className="hoverable-item w-full">
                                <Card
                                  isPressable
                                  variant="flat"
                                  css={{ mw: "100%", padding: "$0" }}
                                  key={snip.id}
                                >
                                  <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                                    <div className="w-full flex flex-col gap-2">
                                      <div className="flex gap-5 items-center">
                                        <div className="pl-1">
                                          <PaperFail
                                            fill="#FF3137"
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
                                      <div className="flex items-center">
                                        <div className="w-20 flex justify-center items-center">
                                          <div className="pr-[.56rem]">
                                            <Badge
                                              isSquared
                                              color="error"
                                              variant="flat"
                                            >
                                              FEJL
                                            </Badge>
                                          </div>
                                        </div>
                                        <div className="flex gap-1 items-center justify-between w-full MonoHeading">
                                          <div className="flex gap-2">
                                            <div
                                              className={`l${snip.category.langId} lBadge rounded-3xl flex justify-center items-center`}
                                            >
                                              <p className="text-xs MonoHeading font-semibold lowercase">
                                                {snip.folder.language?.label}
                                              </p>
                                            </div>
                                            {snip.folder?.framework
                                              .frameworkId && (
                                              <div
                                                className={`f${snip.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
                                              >
                                                <p className="text-xs MonoHeading font-semibold lowercase">
                                                  {snip.folder.framework?.label}
                                                </p>
                                              </div>
                                            )}
                                            {snip?.folder?.processor
                                              .processorId && (
                                              <div
                                                className={`p${snip.folder?.processor.processorId} lBadge rounded-3xl flex justify-center items-center`}
                                              >
                                                <p className="text-xs MonoHeading font-semibold lowercase">
                                                  {snip.folder.processor?.label}
                                                </p>
                                              </div>
                                            )}
                                          </div>

                                          <div className="flex gap-3 text-[#031B4E]">
                                            {snip.updatedAt && (
                                              <div className="flex gap-1">
                                                <p className="text-xs font-mono">
                                                  OPDATERET:
                                                </p>

                                                <p className="text-xs font-mono font-semibold">
                                                  {new Date(
                                                    snip.updatedAt.seconds *
                                                      1000
                                                  ).toLocaleDateString("da-DK")}
                                                </p>
                                              </div>
                                            )}

                                            <div className="flex gap-1">
                                              <p className="text-xs font-mono">
                                                OPRETTET:
                                              </p>
                                              <p className="text-xs font-mono font-semibold">
                                                {new Date(
                                                  snip.postedAt.seconds * 1000
                                                ).toLocaleDateString("da-DK")}
                                              </p>
                                            </div>
                                          </div>
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
                            <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
                              <div>
                                <a href={`/upsert/error/${snip.id}`}>
                                  <Button auto light>
                                    <EditDocumentIcon
                                      fill="#0072F5"
                                      className="cursor-pointer"
                                      width={26}
                                      height={26}
                                    />
                                  </Button>
                                </a>
                              </div>
                              <div>
                                <Popover
                                  placement="top"
                                  isOpen={allOpenStates[snip.id]}
                                  onOpenChange={(nowOpen) =>
                                    setAllOpenStates((oldState) => ({
                                      ...oldState,
                                      [snip.id]: nowOpen,
                                    }))
                                  }
                                >
                                  <Popover.Trigger>
                                    <Button auto light>
                                      <DeleteDocumentIcon
                                        fill="#F31260"
                                        className="cursor-pointer"
                                        width={26}
                                        height={26}
                                      />
                                    </Button>
                                  </Popover.Trigger>
                                  <Popover.Content>
                                    <DeleteErrorSnippet
                                      id={snip.id}
                                      handleErrorSnippetDelete={
                                        handleErrorSnippetDelete
                                      }
                                      setAllOpenStates={setAllOpenStates}
                                    />
                                  </Popover.Content>
                                </Popover>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="text-center">
                          <Link href="/snips/errors">
                            <Text b className="cursor-pointer hover:underline">
                              SE ALLE
                            </Text>
                          </Link>
                        </div>
                      </div>
                    )}

                    {loading ? (
                      <div className="flex justify-center items-center h-[20vh]">
                        <Loading size="lg" />
                      </div>
                    ) : (
                      <div>
                        {!myErrorSnippets?.length > 0 && (
                          <div className="flex justify-center mt-10">
                            <Text b size={13} transform="uppercase">
                              Du har ingen fejl SNIPS! 😔
                            </Text>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default MySnippets;
