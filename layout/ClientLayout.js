import {
  collection,
  doc,
  getDoc,
  query,
  runTransaction,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUsernameModal } from "../atoms/setUsernameModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreateCodeFolderModal from "../components/Modals/CreateCodeFolderModal";
import CreateErrorFolderModal from "../components/Modals/CreateErrorFolderModal";
import LoginModal from "../components/Modals/LoginModal";
import { auth, db } from "../firebase/clientApp";
import { useRecoilState } from "recoil";
import SetUsernameModal from "../components/Modals/SetUsernameModal";
import { useRouter } from "next/router";
import LoadingState from "../components/LoadingState";
import DeleteMainFolderModal from "../components/Modals/DeleteMainFolderModal";
import DeleteSubFolderModal from "../components/Modals/DeleteSubFolderModal";
import CreateSetupFolderModal from "../components/Modals/CreateSetupFolderModal";

const ProtectedRoutes = [
  "/snips",
  "/folders",
  "/tags",
  "/settings",
  "/stats",
  "/patchnotes",
  "/search",
];

const ClientLayout = ({ children, user }) => {
  const { pathname, asPath } = useRouter();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useRecoilState(setUsernameModal);
  const [update, setUpdate] = useState(true);

  /*   const NoAccess = () => {
  const findColor = Colors.filter((element) =>
    String(element).startsWith("blue")
  );

    try {
      if (!user && asPath.startsWith(pRoutes)) {
        router.push("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    NoAccess();
  }, [user]); */

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
    <div className="flex flex-col">
      <header className="h-[6vh]">
        <Header user={user} />
      </header>
      <hr />
      <main className="max-w-6xl mx-5 lg:mx-auto mt-3 min-h-[82vh] w-full">
        {children}
      </main>
      <footer className="h-[10vh]">
        <Footer />
      </footer>
      <CreateCodeFolderModal />
      <CreateErrorFolderModal />
      <CreateSetupFolderModal />
      <SetUsernameModal />
      <LoginModal />
      <DeleteMainFolderModal />
      <DeleteSubFolderModal />
    </div>
  );
};

export default ClientLayout;
