import { Loading } from "@nextui-org/react";
import React from "react";

const SnippetLoading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <Loading size="lg" />
    </div>
  );
};

export default SnippetLoading;