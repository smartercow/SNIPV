import { Box, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { TbSortDescending } from "react-icons/tb";

const LatestHeading = ({ headingIcon, headingType }) => {
  return (
    <Box mb={3} borderBottomWidth={1} borderColor="Gray">
      <div className="flex items-center gap-2">
        <Icon as={TbSortDescending} w={5} h={5} />
        <Text variant="H4" textTransform="uppercase">
          {headingType}
        </Text>
      </div>
    </Box>
  );
};

export default LatestHeading;
