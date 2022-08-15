import { Button, Grid, Text, User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { auth } from "../../Firebase/clientApp";
import Auth from "../Auth";
import Country from "../Country";

const Menu = ["Fejl", "Tags", "Sprog", "Mapper", "Indstillinger"];

const Header = ({ user }) => {
  const logout = async () => {
    await signOut(auth);
    //clear community state
  };
  return (
    <div className="flex justify-between items-center max-w-5xl mx-5 lg:mx-auto py-2">
      <div className="flex gap-2 items-center">
        <div className="cursor-pointer">
          <Link href="/">
            <Text h4 weight="extrabold">SNIPV</Text>
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
      <div className="hidden md:inline">
        {user && (
          <Button.Group color="gradient" ghost>
            <Link href="/snippets"><Button>KODER</Button></Link>
            {Menu.map((item, index) => (
              <Button disabled key={index}>
                <Text b transform="uppercase">
                  {item}
                </Text>
              </Button>
            ))}
          </Button.Group>
        )}
      </div>
      <div className="flex items-center">
        {user ? (
          <User squared src={user.photoURL} name={user.displayName}>
            <Button size="xs" onClick={logout} color="gradient">
              Log ud
            </Button>
          </User>
        ) : (
          <div>
            <Auth />
          </div>
        )}
        <div>
          <Country />
        </div>
      </div>
    </div>
  );
};

export default Header;
