import React from "react";
import Sidebar from "../components/Info/Sidebar";
import Heading from "../components/Info/Heading";

const InfoLayout = ({ children }) => {
  return (
    <div className="min-h-[70vh] w-full">
      <div className="">
        <div className="flex justify-center items-center h-20">
          <Heading />
        </div>
        <div className="flex gap-3">
          <div>
            <Sidebar />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoLayout;
