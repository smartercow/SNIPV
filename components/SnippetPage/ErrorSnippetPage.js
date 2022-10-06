import { Popover, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { CgExternal } from "react-icons/cg";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { DeleteErrorSnippetNoMap } from "../NonModal/DeleteErrorSnippet/DeleteErrorSnippetNoMap";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/clientApp";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import SyntaxHandler from "../Syntax/Error/SyntaxHandler";
import SolutionSyntaxHandler from "../Syntax/Error/SolutionSyntaxHandler";
import LanguageBadge from "../Display/LanguageBadge";
import OutputSyntaxHandler from "../Syntax/OutputSyntaxHandler";

const ErrorSnippetPage = ({ snippet }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "ErrorSnippetsData1", id));
      router.push("/snips/errors");
    } catch (error) {
      console.log("Fejl i sletning!", error.message);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 justify-between items-center">
          <>
            <LanguageBadge snippet={snippet} />
          </>

          {user.uid === snippet.userData.uid && (
            <div className="flex gap-2 items-center">
              <div>
                <a href={`/upsert/error/${id}`}>
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
                    <DeleteErrorSnippetNoMap
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
            <h3 style={{ color: "#031B4E" }} className="SnippetHeading">
              {snippet.title}
            </h3>
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
        <SyntaxHandler snippet={snippet} />
      </div>

      {snippet.solutioncode && (
        <div>
          <SolutionSyntaxHandler snippet={snippet} />
        </div>
      )}

      {snippet.output && (
        <div>
          <OutputSyntaxHandler snippet={snippet} />
        </div>
      )}

      {snippet.notes && (
        <div className="bg-[#D4EFEE] p-4 rounded-lg">
          <Text color="#005955">
            <Text color="#005955" b>
              NOTER:&nbsp;
            </Text>
            {snippet?.notes}
          </Text>
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

      <div className="flex justify-between">
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

export default ErrorSnippetPage;
