import { Avatar, Box, Input } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const Post = () => {
  const [user] = useAuthState(auth);
  return (
    <div>
      <Link href="/upsert">
        <Box display={{ md: "flex" }}>
          <div className="flex justify-between items-center gap-4 py-3 pl-2 pr-6 bg-[#ebecf0] w-full">
            <Avatar src={user.photoURL} size="md" />

            <div className="w-full">
              <Input backgroundColor="white" placeholder="GEM EN SNIP" />
            </div>
          </div>
        </Box>
      </Link>
    </div>
  );
};

export default Post;
