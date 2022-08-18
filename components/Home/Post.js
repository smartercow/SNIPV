import { Card, Input, User } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/clientApp";

const Post = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Link href="/upsert">
        <Card isPressable variant="flat">
          <div className="flex justify-between py-3 pl-2 pr-6">
            <div>
              <User bordered src={user.photoURL} squared color="primary" />
            </div>
            <div className="w-full">
              <Input width="100%" bordered labelPlaceholder="Gem snippet" />
            </div>
            <div></div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default Post;
