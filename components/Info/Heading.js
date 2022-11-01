import { Text } from "@chakra-ui/react";
import React from "react";

const Heading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <Text
        /*         css={{
          textGradient: "90deg, $blue600 -20%, $pink600 50%",
        }} */
        fontWeight="extrabold"
      >
        SNIPV
      </Text>
    </div>
  );
};

export default Heading;
