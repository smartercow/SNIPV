import { Button } from "@nextui-org/react";
import React from "react";
import MyCodeSnippets from "../components/MySnippets/MyCodeSnippets";

const mysnippets = () => {
  return (
    <div>
      <div>
        <div className="mb-4">
          <Button.Group color="secondary" size="sm">
            <Button>Koder</Button>
            <Button disabled>Fejl</Button>
            <Button disabled>Links</Button>
            <Button disabled>Noter</Button>
          </Button.Group>
        </div>
      </div>
      <div>
        <MyCodeSnippets />
      </div>
    </div>
  );
};

export default mysnippets;
