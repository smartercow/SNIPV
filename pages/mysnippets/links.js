import React from "react";
import MyLinksSnippets from "../../components/MySnippets/MyLinksSnippets";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";

const Links = () => {
  return (
    <div>
      <div>
        <SnippetsTypeLinks />
      </div>
      <div>
        <MyLinksSnippets />
      </div>
    </div>
  );
};

export default Links;
