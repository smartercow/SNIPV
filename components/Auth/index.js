import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/clientApp";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { Button, Input } from "@nextui-org/react";
import { GoogleLogo } from "./GoogleLogo";
import { doc, getDoc } from "firebase/firestore";
const Auth = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");

  const [hidden, setHidden] = useState(true);
  const [accessed, setAccessed] = useState(false);

  useEffect(() => {
    const getAccess = async () => {
      const docRef = doc(db, "Access", "AccessPass");
      const access = await getDoc(docRef);
      setAccess(access.data());
    };
    getAccess();
  }, []);

  const confirmAccess = (e) => {
    e.preventDefault();
    if (access.password === password) {
      setHidden(false);
      setAccessed(true);
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div hidden={accessed}>
        <form onSubmit={confirmAccess}>
          <div className="flex gap-3">
            <div className="w-full">
              <Input
                aria-label="access"
                type="password"
                width="100%"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && confirmAccess}
              />
            </div>
            <Button auto type="submit">
              Få adgang
            </Button>
          </div>
        </form>
      </div>

      <div hidden={hidden}>
        <div className="flex justify-center">
          <Button
            auto
            color="primary"
            icon={<GoogleLogo />}
            onClick={() => signInWithGoogle()}
          >
            &nbsp; Forsæt med Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
