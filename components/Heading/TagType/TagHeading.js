import { Divider, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { AiTwotoneTags } from "react-icons/ai";

const TagHeading = ({ headingType, headingColor }) => {
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center">
        <Icon as={AiTwotoneTags} color="DarkBlue" h={6} w={6} />
        <Text variant="H4" textTransform="uppercase" color={headingColor}>
          {headingType}
        </Text>
      </div>
      <Divider my={2} />
    </div>
  );
};

export default TagHeading;
