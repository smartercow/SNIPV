import { Avatar, Box, Input } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const Post = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="w-full">
      <Link href="/upsert/code">
        <div>
          <div className="flex justify-between items-center gap-4 py-3 pl-2 pr-6 bg-[#ebecf0]">
            <Avatar src={user.photoURL} size="md" />

            <div className="w-full">
              <Input backgroundColor="white" placeholder="GEM EN SNIP" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Post;
