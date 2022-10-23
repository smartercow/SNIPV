import { Divider, Text } from "@chakra-ui/react";
import React from "react";
import Masthead from "./Masthead";

const Details = ({ snippet }) => {
  return (
    <div>
      <Masthead snippet={snippet} />

      <div className="flex flex-col">
        <Text variant="title">{snippet.title}</Text>

        <Text px={1} variant="description">
          {snippet.description}
        </Text>
      </div>

      {snippet.tags && (
        <div className="flex gap-2 mt-2">
          {snippet.tags.map((tag, index) => (
            <div
              key={index}
              className="bg-[#EFF2FB] text-[#4D5B7C] px-2 rounded-lg hover:tagHover flex items-center tagFont"
            >
              <h5 className="mb-[3px]">{tag}</h5>
            </div>
          ))}
        </div>
      )}

      <Divider mt={2} h={0.8} />
    </div>
  );
};

export default Details;
