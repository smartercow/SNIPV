import { Input, Text } from "@chakra-ui/react";
import React from "react";

const SnipLink = ({ handleChange, linkHeading, link }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="w-full flex gap-4 items-center">
        <div className="w-20">
          <Text variant="subLabel">Heading</Text>
        </div>

        <div className="w-full">
          <Input
            name="linkHeading"
            size="md"
            onChange={handleChange}
            value={linkHeading}
          />
        </div>
      </div>

      <div className="w-full flex gap-4 items-center">
        <div className="w-20">
          <Text variant="subLabel">Link</Text>
        </div>

        <div className="w-full">
          <Input name="link" size="md" onChange={handleChange} value={link} />
        </div>
      </div>
    </div>
  );
};

export default SnipLink;
