import { Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TbSortDescending } from "react-icons/tb";

const LatestHeading = ({ headingIcon, headingType }) => {
  return (
    <div className="w-full mb-3">
      <div className="flex items-center gap-2">
        <Icon as={TbSortDescending} w={6} h={6} />
        <Text variant="H4" textTransform="uppercase">
          {headingType}
        </Text>
      </div>
    </div>
  );
};

export default LatestHeading;
