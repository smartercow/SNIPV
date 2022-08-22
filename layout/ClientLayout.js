import { collection, doc, getDoc, query, setDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUsernameModal } from "../atoms/setUsernameModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreateCodeFolderModal from "../components/Modals/CreateCodeFolderModal";
import CreateErrorFolderModal from "../components/Modals/CreateErrorFolderModal";
import LoginModal from "../components/Modals/LoginModal";
import { auth, db } from "../Firebase/clientApp";
import { useRecoilState } from "recoil";
import SetUsernameModal from "../components/Modals/SetUsernameModal";

const ClientLayout = ({ children }) => {
  const [user] = useAuthState(auth);

  const [open, setOpen] = useRecoilState(setUsernameModal);

  const [update, setUpdate] = useState(true)


  const CheckUser = async () => {
    const docRef = doc(db, "UsersData1", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data dokument er der!");

      const docRef = doc(db, "UsersData1", user.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists() && docSnap.data().usernameSet === false) {
        setOpen(true);
        console.log("Username = false");
      } 

    } else {
      console.log("UsernameSet = false");
      //SET USER DATA FOR THE FIRST TIME ONLY
      await setDoc(doc(db, "UsersData1", user.uid), {
        usernameSet: false,
        username: "",
        usernameValue: "",
        user: JSON.parse(JSON.stringify(user))
      });

      setUpdate(!update)
    }
  }

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user, update]);

 
  return (
    <div>
      <Header user={user} />
      <hr />
      <div className="max-w-5xl mx-5 lg:mx-auto mt-3">{children}</div>
      <Footer />
      <CreateCodeFolderModal />
      <CreateErrorFolderModal />
      <SetUsernameModal />
      <LoginModal />
    </div>
  );
};

export default ClientLayout;
