import React, { useEffect } from "react";
import { auth, db } from "../../Firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button, Grid, User } from "@nextui-org/react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { GoogleLogo } from "./GoogleLogo"
import { GithubLogo } from "./GithubLogo";
const Auth = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

    const createUserDocument = async (user) => {

      await setDoc(doc(db, "UsersData1", user.uid), {
        isAdmin: false,
        author: user.displayName,
        username: "",
        //Remember UserName for "UsersData2"
        isModerator: false,
        superUser: false,
        user: JSON.parse(JSON.stringify(user))
      });
    }
  
    useEffect(() => {
      if (userCred?.user) {
        createUserDocument(userCred.user)
      }
    }, [userCred])

  return (
    <div className="flex flex-col gap-4 justify-center">
      <Button auto color="gradient" icon={<GoogleLogo />} onClick={() => signInWithGoogle()}>&nbsp; Forsæt med Google</Button>
      <Button auto disabled color="gradient" icon={<GithubLogo />} onClick={() => {}}>&nbsp; Forsæt med Github</Button>
    </div>
  );
};

export default Auth;
