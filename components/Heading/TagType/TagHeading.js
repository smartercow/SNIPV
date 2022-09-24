import { Text } from "@nextui-org/react";
import React from "react";
import { TbSortDescending } from "react-icons/tb";

const TagHeading = ({ headingType, colorType }) => {
  return (
    <div className="w-full mb-2">
      <div className="flex gap-2">
        <Text className="text-[#031B4E]">
          <TbSortDescending />
        </Text>
        <Text h5 transform="uppercase" color={colorType}>
          {headingType} tags
        </Text>
      </div>
      <hr />
    </div>
  );
};

export default TagHeading;
