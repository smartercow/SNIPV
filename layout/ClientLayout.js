import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CreateFolderModal from "../components/Modals/CreateFolderModal";
import LoginModal from "../components/Modals/LoginModal";
import { auth } from "../Firebase/clientApp";


const ClientLayout = ({children}) => {
  const [user] = useAuthState(auth);

  return (
    <div>
      <Header user={user} />
      <hr />
      <div className="max-w-5xl mx-5 lg:mx-auto mt-3">{children}</div>
      <Footer />
      <CreateFolderModal />
      <LoginModal />
    </div>
  );
};

export default ClientLayout;