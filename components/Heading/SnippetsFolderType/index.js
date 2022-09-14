import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const SnippetsFolderType = () => {
  return (
    <div className="flex gap-4 uppercase">
        <Link href="/folders/codes">
        <h5 className="cursor-pointer">Koder</h5>
        </Link>
        <Link href="/folders/errors">
        <h5 className="cursor-pointer">Fejl</h5>
        </Link>
    </div>
  );
};

export default SnippetsFolderType;
