import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";

const MySnippets = () => {

  return (
    <div>
      <SnippetsTypeLinks />
      <div>
      <MyCodeSnippets />
      </div>
    </div>
  );
};

export default MySnippets;
