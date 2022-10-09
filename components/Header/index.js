import { Button, Dropdown, Input, Text, User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Login, loginModalState } from "../../atoms/loginModalStateAtom";
import { auth } from "../../firebase/clientApp";
import { Edit } from "../SVG/Edit";
import { InfoCircle } from "../SVG/InfoCircle";
import { getUpdates } from "../../helpers/updates";
import { CurrentVersion } from "../../pages/api/updates/CurrentVersion";
import Nav from "./Nav";

const Header = ({ user }) => {
  const [updateData, setUpdateData] = useState();
  const [lastUpdate, setLastUpdate] = useState();

  const setAuthModalState = useSetRecoilState(Login);

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    getUpdates()
      .then((uData) => {
        if (uData) {
          setUpdateData(uData.data);
        } else {
          console.log("fejl");
        }
      })
      .finally(() => {
        console.log("");
      });
  }, []);

  useEffect(() => {
    if (updateData) {
      updateData.map(function (element, index, array) {
        setLastUpdate(array[0]);
        return array;
      }, 80);
    }
  }, [updateData]);

  return (
    <div>
      {user && (
        <>
          {lastUpdate && (
            <>
              {lastUpdate?.id !== CurrentVersion?.id && (
                <div className="h-12 flex justify-center bg-[#0072F5]">
                  <div className="flex gap-2 items-center">
                    <InfoCircle
                      fill="white"
                      className="cursor-pointer"
                      width={35}
                      height={35}
                    />
                    <div className="flex gap-2 items-center">
                      <Text color="white">Der er en ny version:</Text>
                      <Text color="white" b>
                        {lastUpdate.version}
                      </Text>
                      <Text>👉</Text>
                      <Link href="/settings/patchnotes">
                      <Text color="white" b className="cursor-pointer hover:underline">Opdatere nu</Text>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="flex justify-between items-center max-w-5xl mx-5 lg:mx-auto h-16">
        <div className="flex gap-4 items-center">
          <div className="cursor-pointer">
            <Link href="/">
              <Text color="#031B4E" h2 weight="extrabold">
                SNIPV
              </Text>
            </Link>
          </div>
          <div>
            {user && (
              <Link href="/upsert/code">
                <Edit
                  fill="#0072F5"
                  className="cursor-pointer"
                  width={35}
                  height={35}
                />
              </Link>
            )}
          </div>
        </div>

        {user && (
          <div className="hidden md:inline">
            <Nav />
          </div>
        )}

        <div className="flex items-center gap-1">
          {user ? (
            <div className="">
              <Dropdown placement="bottom-left">
                <Dropdown.Trigger>
                  <User
                    bordered
                    squared
                    as="button"
                    size="lg"
                    color="primary"
                    name="Profil"
                    description={user?.displayName}
                    src={user?.photoURL}
                    pointer
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu
                  color="primary"
                  aria-label="Avatar Actions"
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Logget ind som
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user?.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="my_snippets" withDivider>
                    <Link href="/mysnippets">
                      <div className="w-full">Snips</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="tags">
                    <Link href="/tags">
                      <div className="w-full">Tags</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    <Link href="/settings">
                      <div className="w-full">Indstillinger</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" color="error" withDivider>
                    <div className="w-full" onClick={logout}>
                      Log ud
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Button
                color="primary"
                onClick={() => setAuthModalState({ open: true })}
              >
                LOG PÅ
              </Button>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
