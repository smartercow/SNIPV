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
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

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
    <div className="border-b border-gray-100 shadow-md bg-white">
      {user && (
        <>
          {lastUpdate && (
            <>
              {lastUpdate?.id !== CurrentVersion?.id && (
                <div className="flex justify-center bg-[#0072F5]">
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
                        <Text
                          color="white"
                          b
                          className="cursor-pointer hover:underline"
                        >
                          Opdatere nu
                        </Text>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
      <div className="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto h-18">
        <div className="flex gap-4 items-center">
          <div className="flex items-center">
            <Link href="/" passHref>
              <a>
                <Text
                  variant="H1"
                  textTransform="uppercase"
                  fontWeight="extrabold"
                >
                  SNIPV
                </Text>
              </a>
            </Link>
          </div>
          <div>
            {user && (
              <Link href="/upsert/code">
                <Edit
                  fill="#087ea4"
                  className="cursor-pointer"
                  width={35}
                  height={35}
                />
              </Link>
            )}
          </div>

          {/*           <div className=" select-none">
            <Text
              color="white"
              fontSize={14}
              className="bg-red-500 px-2 font-semibold underline underline-offset-4"
            >
              v2 TESTING!
            </Text>
          </div> */}
        </div>

        {user && (
          <div className="hidden md:inline">
            <Nav />
          </div>
        )}

        <div className="flex items-center gap-1">
          {user ? (
            <div className="">
              <div>
                <Menu>
                  <MenuButton as={Button}>Profil</MenuButton>
                  <MenuList>
                    <MenuGroup title={`${user?.email}`}>
                      <Link href="/settings">
                        <MenuItem>Indstillinger</MenuItem>
                      </Link>
                    </MenuGroup>
                    <MenuGroup>
                      <Link href="/info/help">
                        <MenuItem>Hjælp</MenuItem>
                      </Link>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup>
                      <MenuItem onClick={logout}>Log ud</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </div>
              {/*               <Dropdown placement="bottom-left">
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
                <Dropdown.Menu color="primary" aria-label="Avatar Actions">
                  <Dropdown.Item key="profile" css={{ height: "$14" }}>
                    <Text size={12} b color="inherit" css={{ d: "flex" }}>
                      {user?.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="mysnips" withDivider>
                    <Link href="/snips">
                      <div className="w-full font-semibold">Snips</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="tags">
                    <Link href="/tags">
                      <div className="w-full font-semibold">Tags</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    <Link href="/settings">
                      <div className="w-full font-semibold">Indstillinger</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" color="error" withDivider>
                    <div className="w-full font-semibold" onClick={logout}>
                      Log ud
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
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
