import { Text } from "@nextui-org/react";
import React from "react";
import { TbSortDescending } from "react-icons/tb";

const LatestHeading = ({ headingIcon, headingType }) => {
  return (
    <div className="w-full mb-2">
      <div className="flex gap-2">
        <Text><TbSortDescending /></Text>
        <Text h5 transform="uppercase" className="text-[#031B4E]">
          {headingType}
        </Text>
      </div>
      <hr />
    </div>
  );
};

export default LatestHeading;
