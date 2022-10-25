import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUsernameModal } from "../atoms/setUsernameModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoginModal from "../components/Modals/LoginModal";
import { auth, db } from "../firebase/clientApp";
import { useRecoilState } from "recoil";
import SetUsernameModal from "../components/Modals/SetUsernameModal";
import { useRouter } from "next/router";
import LoadingState from "../components/LoadingState";
import DeleteMainFolderModal from "../components/Modals/DeleteMainFolderModal";
import DeleteSubFolderModal from "../components/Modals/DeleteSubFolderModal";
import CreateFolderModal from "../components/Modals/CreateFolderModal";

const ClientLayout = ({ children, user }) => {
  const { pathname, asPath } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useRecoilState(setUsernameModal);
  const [update, setUpdate] = useState(true);

  const CheckUser = async () => {
    try {
      const userDocRef = doc(db, "UsersData1", user.uid);

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef);

        if (userDoc.exists()) {
          const User = await getDoc(userDocRef);

          if (User.data().usernameSet === false) {
            setOpen(true);
          }
        } else {
          //SET USER DATA KUN FØRSTE GANG
          await setDoc(doc(db, "UsersData1", user.uid), {
            usernameSet: false,
            username: "",
            usernameValue: "",
            user: JSON.parse(JSON.stringify(user)),
          });

          setUpdate(!update);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      CheckUser();
    }
  }, [user, update]);

  return (
    <div className="flex flex-col h-screen px-2">
      <header className="flex-none">
        <Header user={user} />
      </header>

      <main className="max-w-6xl px-5 lg:px-0 lg:mx-auto pt-2 w-full flex-grow">
        {children}
      </main>

      <footer className="flex-none">
        <Footer />
      </footer>
      <CreateFolderModal />
      <SetUsernameModal />
      <LoginModal />
      <DeleteMainFolderModal />
      <DeleteSubFolderModal />
    </div>
  );
};

export default ClientLayout;
