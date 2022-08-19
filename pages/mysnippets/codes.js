import React from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
const Codes = () => {
  return (
    <div>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyCodeSnippets />
      </div>
    </div>
  );
};

export default Codes;
