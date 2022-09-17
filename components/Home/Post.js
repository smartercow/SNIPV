import { Card, Input, User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const Post = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Link href="/upsert">
        <Card isPressable variant="flat" css={{ mw: "100%", padding: "$0" }}>
          <div className="flex justify-between py-3 pl-2 pr-6 bg-[#F1F7FF]">
            <div>
              <User bordered src={user.photoURL} squared color="primary" />
            </div>
            <div className="w-full">
              <Input width="100%" bordered labelPlaceholder="Gem en snippet" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Post;
