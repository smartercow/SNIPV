import { Text } from "@chakra-ui/react";
import React from "react";

const Notes = ({ snippet }) => {
  return (
    <div className="bg-[#D4EFEE] p-4 rounded-lg">
      <Text color="#005955">
        <Text color="#005955" b>
          NOTER:&nbsp;
        </Text>
        {snippet?.notes}
      </Text>
    </div>
  );
};

export default Notes;
