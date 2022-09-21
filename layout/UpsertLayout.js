import React from "react";
import { CreateSnipType } from "../components/Heading/CreateSnipType";

const UpsertLayout = ({ children }) => {
  return (
    <div>
      <div>
        <CreateSnipType />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UpsertLayout;
