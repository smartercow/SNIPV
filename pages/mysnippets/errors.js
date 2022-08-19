import React from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";

const Errors = () => {
  return (
    <div>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyErrorSnippets />
      </div>
    </div>
  );
};

export default Errors;
