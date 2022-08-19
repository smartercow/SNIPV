import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { SnippetsTypeLinks } from "../../components/Heading/SnippetsType";
import MyCodeSnippets from "../../components/MySnippets/MyCodeSnippets";
import MyErrorSnippets from "../../components/MySnippets/MyErrorSnippets";
const SnippetsType = [
  {
    type: "code",
    title: "Koder",
    component: MyCodeSnippets,
  },
  {
    type: "errors",
    title: "Fejl",
    component: MyErrorSnippets,
  },
  /*   {
    type: "motorcyles",
    title: "Motorcyles",
    component: Motorcyles
  },
  {
    type: "scooters",
    title: "Scooters",
    component: Scooters
  } */
];


const MySnippets = () => {
  const [selectedType, setSelectedType] = useState()

  console.log(selectedType);
  
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
