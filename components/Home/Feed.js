import {
  Avatar,
  Badge,
  Card,
  Collapse,
  Dropdown,
  Grid,
  Loading,
  Pagination,
  Text,
  Tooltip,
  User,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdPublic } from "react-icons/md";
import { excerpt } from "../../utilities/excerpt";
import { LoginIcon } from "../SVG/LoginIcon";

const Feed = ({ user, snippets, tags, loading }) => {
  const [truncate, setTruncate] = useState(30);

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1100px)").matches) {
        setTruncate(90);
      } else if (window.matchMedia("(min-width: 900px)").matches) {
        setTruncate(60);
      } else if (window.matchMedia("(min-width: 600px)").matches) {
        setTruncate(40);
      } else if (window.matchMedia("(min-width: 400px)").matches) {
        setTruncate(20);
      }
    });
  }, [truncate, user]);

  return (
    <div>
      {snippets && (
        <div className="w-full">
          {snippets.snips && (
            <div className="flex flex-col gap-4 ">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                <div className="flex items-center gap-2 pl-2 h-10">
                  <div className="pt-3">
                    <Text h3 color="white">
                      <MdPublic />
                    </Text>
                  </div>
                  <div className="w-full ">
                    <div className="uppercase">
                      <p className="font-semibold">Offentlige snippets</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-4">
                  {snippets.snips.slice(0, 10).map((snip, index) => (
                    <div key={index}>
                      <Link href={`/s/${snip.id}`}>
                        <div className="hoverable-item">
                          <Card
                            isPressable
                            variant="flat"
                            css={{ mw: "100%", padding: "$0" }}
                            key={snip.id}
                          >
                            <div className="cardHover bg-[#F1F7FF] hoverable-item flex gap-3 items-center p-2 border-b rounded-xl w-full">
                              <div className="w-full flex flex-col gap-2">
                                <div className="flex items-center">
                                  <div className="">
                                    <Tooltip
                                      content={snip.userData.username}
                                      color="primary"
                                    >
                                      <User
                                        src={snip.userData?.photoURL}
                                        zoomed
                                        squared
                                        pointer
                                      />
                                    </Tooltip>
                                  </div>

                                  <div className="w-full flex flex-col justify-center gap-3 MonoHeading">
                                    <div>
                                      <p className="text-[#031B4E] text-lg font-[500]">
                                        {excerpt(snip.title, truncate)}
                                      </p>
                                    </div>
                                    {snip.description && (
                                      <div className="-mt-2 h-5">
                                        <h6 className="text-[#031b4ed4] whitespace-nowrap MonoHeading">
                                          {excerpt(snip.description, truncate)}
                                        </h6>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex">
                                  <div className="w-24 flex justify-center">
                                    {snip.folder.folderSnippetType ===
                                      "code" && (
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
                                    {snip.folder.folderSnippetType ===
                                      "error" && (
                                      <div className="pr-[.60rem]">
                                        <Badge
                                          isSquared
                                          color="error"
                                          variant="flat"
                                        >
                                          FEJL
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

                <div className="mt-5 text-center">
                  <Pagination color="primary" total={10} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;
