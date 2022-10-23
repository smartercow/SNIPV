import { Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSNIPS = () => {
  return (
    <div className="flex justify-center">
      <Spinner
        thickness="6px"
        speed="0.75s"
        emptyColor="gray.200"
        color="Primary"
        h={16}
        w={16}
      />
    </div>
  );
};

export default LoadingSNIPS;
