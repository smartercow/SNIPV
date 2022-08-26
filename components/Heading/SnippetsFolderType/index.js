import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SnippetsFolderType = () => {
  return (
    <div>
      <Button.Group color="primary" size="sm">
        <Link href="/folders/codes">
          <Button>Koder</Button>
        </Link>
        <Link href="/folders/errors">
          <Button>Fejl</Button>
        </Link>
        <Button disabled>Links</Button>
        <Button disabled>Noter</Button>
      </Button.Group>
    </div>
  );
};

export default SnippetsFolderType;
