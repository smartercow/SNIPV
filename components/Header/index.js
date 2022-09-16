import { Button, Dropdown, Input, Text, User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useSetRecoilState } from "recoil";
import { Login, loginModalState } from "../../atoms/loginModalStateAtom";
import { auth } from "../../Firebase/clientApp";
import { BsSearch } from "react-icons/bs";
import { Edit } from "../SVG/Edit";
import { InfoCircle } from "../SVG/InfoCircle";

const Header = ({ user }) => {
  const setAuthModalState = useSetRecoilState(Login);

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <div>
      {user && (
        <div className="flex justify-center py-2 bg-[#0072F5]">
          <div className="flex gap-2 items-center">
            <InfoCircle
              fill="#0072F5"
              className="cursor-pointer"
              width={35}
              height={35}
            />
            <div className="flex gap-2 items-center">
            <Text color="white">Der er en ny version:</Text>
            <Text color="white" b>1.5.0</Text>
            <Text color="white">Opdatere nu</Text>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between items-center max-w-5xl mx-5 lg:mx-auto py-2">
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
              <Link href="/upsert">
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
          <div className="text-center hidden md:inline">
            <Input
              clearable
              animated="false"
              contentRightStyling={false}
              placeholder="Søg"
              borderWeight="bold"
              aria-label="Search"
              contentLeft={
                <Text b>
                  <BsSearch />
                </Text>
              }
              width="120%"
              disabled
            />
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
                  disabledKeys={["tags"]}
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
                      <div className="w-full">Mine snippets</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item key="folders">
                    <Link href="/folders">
                      <div className="w-full">Mine mapper</div>
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
    </div>
  );
};

export default Header;
