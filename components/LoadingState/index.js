import React from "react";
import LoadingSNIPS from "./LoadingSNIPS";
const LoadingState = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <LoadingSNIPS size={10} />
    </div>
  );
};

export default LoadingState;
