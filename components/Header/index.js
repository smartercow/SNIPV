import {
  Avatar,
  Button,
  Dropdown,
  Grid,
  Input,
  Text,
  User,
} from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Login, loginModalState } from "../../atoms/loginModalStateAtom";
import { auth } from "../../Firebase/clientApp";
import Auth from "../Auth";
import Country from "../Country";
import { BsSearch } from "react-icons/bs";

const Menu = ["Mine mapper", "Indstillinger"];

const Header = ({ user }) => {
  const setAuthModalState = useSetRecoilState(Login);

  const logout = async () => {
    await signOut(auth);
    //clear community state
  };
  return (
    <div>
      <div className="flex justify-between items-center max-w-5xl mx-5 lg:mx-auto py-2">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer">
            <Link href="/">
              <Text h2 weight="extrabold">
                SNIPV
              </Text>
            </Link>
          </div>
          <div>
            {user && (
              <Link href="/upsert">
                <Button color="gradient" auto size="sm">
                  +Gem
                </Button>
              </Link>
            )}
          </div>
        </div>

        {user && (
          <div className="text-center">
            <Input
              clearable
              animated="false"
              contentRightStyling={false}
              placeholder="Search"
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
                    description=""
                    src={user.photoURL}
                    pointer
                  />
                </Dropdown.Trigger>
                <Dropdown.Menu
                  color="primary"
                  aria-label="Avatar Actions"
                  disabledKeys={[
                    "my_folders",
                    "settings",
                    "configurations",
                    "help_and_feedback",
                  ]}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Logget ind som
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="my_snippets" withDivider>
                    <Link href="/mysnippets">
                      <div className="w-full">Mine snippets</div>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item dis key="my_folders">
                    Mine mapper
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    Indstillinger
                  </Dropdown.Item>
                  <Dropdown.Item key="configurations">
                    Konfigurationer
                  </Dropdown.Item>
                  <Dropdown.Item key="help_and_feedback" withDivider>
                    Hjælp & Feedback
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
                color="gradient"
                onClick={() => setAuthModalState({ open: true })}
              >
                LOG PÅ
              </Button>
            </div>
          )}
          <div>
            <Country />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
