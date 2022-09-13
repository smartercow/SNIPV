import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const SnippetsTypeLinks = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="flex gap-3 uppercase">
        <Link href="/mysnippets/codes">
            <h5 className="cursor-pointer">Koder</h5>
          </Link>
          <Link href="/mysnippets/errors">
            <h5 className="cursor-pointer">Fejl</h5>
          </Link>
        </div>
{/*         <Button.Group color="primary" size="sm">
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
        </Button.Group> */}
      </div>
    </div>
  );
};




