import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export const SnippetsTypeLinks = () => {
  return (
    <div className="mb-4">
      <div className="flex gap-3 uppercase">
        <Link href="/mysnippets/codes">
          <h5 className="cursor-pointer">Koder</h5>
        </Link>
        <Link href="/mysnippets/errors">
          <h5 className="cursor-pointer">Fejl</h5>
        </Link>
      </div>
    </div>
  );
};
