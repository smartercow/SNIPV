import { Text } from "@chakra-ui/react";
import React from "react";

const Notes = ({ snippet }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-[#D4EFEE] p-4 rounded-lg w-[40rem]">
        <Text color="#005955" className="inline-block">
          <span className="font-bold">NOTER:</span>&nbsp;{snippet?.notes}
        </Text>
      </div>
    </div>
  );
};

export default Notes;
