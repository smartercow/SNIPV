import { Text } from "@nextui-org/react";
import React from "react";
import { AiTwotoneTags } from "react-icons/ai";

const TagHeading = ({ headingType, headingColor }) => {
  return (
    <div className="w-full">
      <div className="flex gap-2">
        <Text className="text-[#031B4E]">
          <AiTwotoneTags />
        </Text>
        <Text h5 transform="uppercase" color={headingColor}>
          {headingType} tags
        </Text>
      </div>
      <hr />
    </div>
  );
};

export default TagHeading;
