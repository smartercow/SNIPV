import { Button, Grid, Text, User } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { auth } from "../../Firebase/clientApp";
import Auth from "../Auth";

const Menu = ["Next", "React", "HTML", "CSS", "Vanilla JS",];

const Header = ({ user }) => {
  const logout = async () => {
    await signOut(auth);
    //clear community state
  };
  return (
    <div className="flex justify-between items-center max-w-5xl mx-5 lg:mx-auto py-2">
      <div className="flex gap-2 items-center">
        <div>
          <Link href='/'><Text h4>Snippets Vault</Text></Link>
        </div>
        <div>
          <Link href='/upsert'>
            <Button color="gradient" auto size="sm">
              +Gem
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Button.Group color="gradient" ghost>
          {Menu.map((item, index) => (
            <Button key={index}>{item}</Button>
          ))}
        </Button.Group>
      </div>
      <div>
        {user ? (
          <User squared src={user.photoURL} name={user.displayName}>
            <Button size="xs" onClick={logout} color="gradient">
              Logud
            </Button>
          </User>
        ) : (
          <div>
            <Auth />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
