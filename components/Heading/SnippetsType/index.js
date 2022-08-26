import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const SnippetsTypeLinks = () => {
  return (
    <div>
      <div className="mb-4">
        <Button.Group color="primary" size="sm">
          <Link href="/mysnippets/codes">
            <Button>Koder</Button>
          </Link>
          <Link href="/mysnippets/errors">
            <Button>Fejl</Button>
          </Link>
          <Link href="/mysnippets/links">
            <Button disabled>Links</Button>
          </Link>
          <Link href="/mysnippets/notes">
            <Button disabled>Noter</Button>
          </Link>
        </Button.Group>
      </div>
    </div>
  );
};




