import { Badge, Button, Card, Loading, Popover, Text } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { MdRefresh } from "react-icons/md";
import LatestHeading from "../Heading/LatestHeading";
import { DeleteSnippet } from "../NonModal/DeleteSnippet";
import { DeleteDocumentIcon } from "../SVG/DeleteDocumentIcon";
import { EditDocumentIcon } from "../SVG/EditDocumentIcon";
import { LoginIcon } from "../SVG/LoginIcon";
import { Paper } from "../SVG/Paper";
import { PaperFail } from "../SVG/PaperFail";
import LanguageBadge from "./LanguageBadge";

const Snippet = ({ snippet, handleDelete }) => {
  const [allOpenStates, setAllOpenStates] = useState({});

  return (
    <div className="hoverable-item flex gap-2">
      <Link href={`/s/${snippet.id}`}>
        <div className="hoverable-item w-full">
          <Card
            isPressable
            variant="flat"
            css={{ mw: "100%", padding: "$0" }}
            key={snippet.id}
          >
            <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
              <div className="w-full flex flex-col gap-2">
                <div className="flex gap-6 items-center">
                  <div className="pl-3">
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
                        {snippet.title}
                      </p>
                    </div>
                    {snippet.description && (
                      <div className="-mt-2 h-5">
                        <h6 className="text-[#031b4ed4] whitespace-nowrap MonoHeading truncateText">
                          {snippet.description}
                        </h6>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 flex justify-center">
                    {snippet.snippetType === "code" && (
                      <div className="pr-[.60rem]">
                        <Badge isSquared color="primary" variant="flat">
                          KODE
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full MonoHeading">
                    <LanguageBadge snippets={snippet} />

                    <div className="flex gap-3 text-[#031B4E]">
                      {snippet.updatedAt && (
                        <p className="text-xs font-mono">
                          OPDATERET:&nbsp;
                          {new Date(
                            snippet.updatedAt.seconds * 1000
                          ).toLocaleDateString("da-DK")}
                        </p>
                      )}

                      <p className="text-xs font-mono">
                        OPRETTET:&nbsp;
                        {new Date(
                          snippet.postedAt.seconds * 1000
                        ).toLocaleDateString("da-DK")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hoverable-show">
                <LoginIcon width={30} height={30} fill="#0072F5" />
              </div>
            </div>
          </Card>
        </div>
      </Link>
      <div className="hoverable-show flex flex-col gap-1 justify-center items-center">
        <div>
          <a href={`/upsert/code/${snippet.id}`}>
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
            placement="bottom"
            isOpen={allOpenStates[snippet.id]}
            onOpenChange={(nowOpen) =>
              setAllOpenStates((oldState) => ({
                ...oldState,
                [snippet.id]: nowOpen,
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
                id={snippet.id}
                handleDelete={handleDelete}
                setAllOpenStates={setAllOpenStates}
              />
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Snippet;
