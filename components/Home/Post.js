import { Avatar, Box, Input } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";

const Post = () => {
  const [user] = useAuthState(auth);
  return (
    <Box bg="white" borderRadius="lg" className="w-full select-none">
      <Link href="/upsert/code" passHref>
        <a>
          <Box p={2} boxShadow="sm" borderRadius="lg">
            <div className="flex justify-between items-center gap-4 py-2 rounded-md px-3 bg-[#EDF2F7]">
              <Avatar src={user.photoURL} size="md" />

              <div className="w-full">
                <Input backgroundColor="white" placeholder="GEM EN SNIP" />
              </div>
            </div>
          </Box>
        </a>
      </Link>
    </Box>
  );
};

export default Post;
