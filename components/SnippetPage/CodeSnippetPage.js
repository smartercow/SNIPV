import { Button, Popover, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CgExternal } from "react-icons/cg";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { DeleteCodeSnippetNoMap } from "../NonModal/DeleteCodeSnippet/DeleteCodeSnippetNoMap";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";

const SnippetPage = ({ snippet }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  console.log("SNIPPET", snippet);
  console.log("ID", id);
  console.log("USER", user);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "CodeSnippetsData1", id));
      router.push("/snips/codes");
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 justify-between items-center">
          <div>
            <div className="flex gap-2 -ml-1">
              <div
                className={`l${snippet.category.langId} lBadge rounded-3xl flex justify-center items-center`}
              >
                <p className="text-xs MonoHeading font-semibold lowercase">
                  {snippet.folder.language?.label}
                </p>
              </div>
              {snippet.folder?.framework.frameworkId && (
                <div
                  className={`f${snippet.folder.framework.frameworkId} lBadge rounded-3xl flex justify-center items-center`}
                >
                  <p className="text-xs MonoHeading font-semibold lowercase">
                    {snippet.folder.framework?.label}
                  </p>
                </div>
              )}
              {snippet?.folder?.processor.processorId && (
                <div
                  className={`p${snippet.folder?.processor.processorId} lBadge rounded-3xl flex justify-center items-center`}
                >
                  <p className="text-xs MonoHeading font-semibold lowercase">
                    {snippet.folder.processor?.label}
                  </p>
                </div>
              )}
            </div>
          </div>

          {user.uid === snippet.userData.uid && (
            <div className="flex gap-2 items-center">
              <div>
                <a href={`/upsert/code/${id}`}>
                  <Text>
                    <EditDocumentIcon
                      fill="#0072F5"
                      className="cursor-pointer"
                      width={30}
                      height={30}
                    />
                  </Text>
                </a>
              </div>
              <div>
                <Popover
                  placement="bottom"
                  isOpen={deleteConfirm}
                  onOpenChange={setDeleteConfirm}
                >
                  <Popover.Trigger>
                    <Text auto light>
                      <DeleteDocumentIcon
                        fill="#F31260"
                        className="cursor-pointer"
                        width={30}
                        height={30}
                      />
                    </Text>
                  </Popover.Trigger>
                  <Popover.Content>
                    <DeleteCodeSnippetNoMap
                      snippet={snippet}
                      handleDelete={handleDelete}
                      setDeleteConfirm={setDeleteConfirm}
                      id={id}
                    />
                  </Popover.Content>
                </Popover>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center">
            <h2 style={{ color: "#031B4E" }} className="SnippetHeading">
              {snippet.title}
            </h2>
          </div>
          {snippet.description && (
            <div className="text-lg ">{snippet.description}</div>
          )}
        </div>
      </div>
      {snippet.tags && (
        <div className="flex gap-2">
          {snippet.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[#EFF2FB] text-[#4D5B7C] px-2 rounded-lg hover:tagHover flex items-center tagFont"
            >
              <h5 className="mb-[3px]">{tag}</h5>
            </div>
          ))}
        </div>
      )}
      <div>
        <SyntaxHighlighter
          language="javascript"
          style={oneLight}
          className="rounded-lg"
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      {snippet.notes && (
        <div>
          <div className="bg-[#D4EFEE] p-4 rounded-lg">
            <Text color="#005955">
              <Text color="#005955" b>
                Notat:&nbsp;
              </Text>
              {snippet?.notes}
            </Text>
          </div>
        </div>
      )}

      {snippet.link && (
        <div className="linkSection bg-[#EFF2FB] px-4 py-1 ">
          <div className="">
            {snippet.linkHeading && (
              <div>
                <p className="font-semibold">{snippet.linkHeading}</p>
              </div>
            )}
            {snippet.link && (
              <div>
                <Link href={snippet.link}>
                  <a
                    target="_blank"
                    className="text-[#0072F5] underline underline-offset-4 text font-semibold text-lg"
                  >
                    {snippet.link}
                    <span className="text-blue-500">
                      <CgExternal />
                    </span>
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="text-lg flex gap-1">
          <p>Af</p> <p>{snippet.id}</p>
          <p className="font-bold text-[#031B4E]">
            {snippet.userData.username}
          </p>
        </div>

        <div className="flex gap-2 md:gap-4">
          {snippet.updatedAt && (
            <div className="flex gap-1 items-center">
              <Text
                small
                b
                transform="uppercase"
                className="font-semibold text-[#031B4E]"
              >
                Opdateret:
              </Text>
              <Text
                small
                transform="uppercase"
                className="font-semibold text-[#031B4E]"
              >
                {new Date(snippet.updatedAt.seconds * 1000).toLocaleDateString(
                  "da-DK"
                )}
              </Text>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <Text small b transform="uppercase" className="text-[#031B4E]">
              Oprettet:
            </Text>
            <Text small transform="uppercase" className="text-[#031B4E]">
              {new Date(snippet.postedAt.seconds * 1000).toLocaleDateString(
                "da-DK"
              )}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetPage;
