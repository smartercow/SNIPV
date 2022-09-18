import { Text } from "@nextui-org/react";
import React from "react";

const Heading = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <Text
        h3
        css={{
          textGradient: "90deg, $blue600 -20%, $pink600 50%",
        }}
        weight="extrabold"
      >
        SNIPV
      </Text>
    </div>
  );
};

export default Heading;
