import { Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingSNIPS = ({ size }) => {
  return (
    <div className="flex justify-center my-3">
      <Spinner
        thickness="6px"
        speed="0.75s"
        emptyColor="gray.200"
        color="Primary"
        h={size}
        w={size}
      />
    </div>
  );
};

export default LoadingSNIPS;
