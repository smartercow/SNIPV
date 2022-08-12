import React, { useEffect } from "react";
import { auth, db } from "../../Firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button, Grid, User } from "@nextui-org/react";
import { doc, setDoc } from "firebase/firestore";

const Auth = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user) => {
    const userDocRef = doc(db, "Users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <div>
      <Button onClick={() => signInWithGoogle()}>Continue with Google</Button>
    </div>
  );
};

export default Auth;
