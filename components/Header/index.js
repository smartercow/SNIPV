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
  Box,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { UserIcon } from "../SVG/UserIcon";
import { SettingIcon } from "../SVG/SettingIcon";
import { QuestionIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { LogoutIcon } from "../SVG/LogoutIcon";

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
    <div className="shadow-md bg-white">
      {user && (
        <>
          {lastUpdate && (
            <>
              {lastUpdate?.id !== CurrentVersion?.id && (
                <Box bg="PrimaryLighter" className="flex justify-center">
                  <div className="flex gap-2 items-center my-1">
                    <Icon as={InfoCircle} fill="Primary" width={8} height={8} />
                    <div className="flex gap-2 items-center">
                      <Text color="DarkBlue">Der er en ny version:</Text>
                      <Text color="Primary" b>
                        {lastUpdate.version}
                      </Text>
                      <Text>👉</Text>
                      <Link href="/settings/patchnotes">
                        <Text
                          color="DarkBlue"
                          _hover={{ color: "Primary" }}
                          className="cursor-pointer uppercase"
                        >
                          Opdatere nu!
                        </Text>
                      </Link>
                    </div>
                  </div>
                </Box>
              )}
            </>
          )}
        </>
      )}
      <div className="flex justify-between items-center max-w-6xl mx-5 lg:mx-auto h-14">
        <div className="flex gap-4 items-center">
          <div className="flex items-center select-none">
            <Link href="/" passHref>
              <a>
                <Text
                  textTransform="uppercase"
                  fontSize={32}
                  fontWeight="extrabold"
                  letterSpacing="tighter"
                  color="DarkBlue"
                >
                  SNIPV
                </Text>
              </a>
            </Link>
          </div>
          <div>
            {user && (
              <Link href="/upsert/code" passHref>
                <a>
                  <Edit
                    fill="#087ea4"
                    className="cursor-pointer"
                    width={35}
                    height={35}
                  />
                </a>
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
                <Menu pb={0}>
                  <MenuButton as={Button}>
                    <Icon as={UserIcon} fill="DarkBlue" height={5} width={5} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup
                      title={
                        <Box
                          bg="PrimaryLighter"
                          px={2}
                          borderRadius="md"
                          color="Primary"
                        >
                          {user?.email}
                        </Box>
                      }
                    >
                      <Link href="/settings">
                        <a>
                          <MenuItem
                            fontWeight="semibold"
                            color="DarkBlue"
                            icon={
                              <Icon
                                as={SettingIcon}
                                fill="Primary"
                                height={5}
                                width={5}
                              />
                            }
                          >
                            Indstillinger
                          </MenuItem>
                        </a>
                      </Link>
                    </MenuGroup>
                    <MenuGroup>
                      <Link href="/info/help">
                        <a>
                          <MenuItem
                            fontWeight="semibold"
                            color="DarkBlue"
                            icon={
                              <Icon
                                as={QuestionIcon}
                                color="Primary"
                                height={4}
                                width={4}
                                ml={1}
                              />
                            }
                          >
                            Hjælp
                          </MenuItem>
                        </a>
                      </Link>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup>
                      <MenuItem
                        bg="Red"
                        color="white"
                        fontWeight="semibold"
                        _hover={{
                          bg: "Red",
                          color: "white",
                          opacity: 0.8,
                        }}
                        onClick={logout}
                        /*                         icon={
                          <Icon
                            as={LogoutIcon}
                            fill="Red"
                            height={5}
                            width={5}
                          />
                        } */
                      >
                        Log ud
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </div>
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
