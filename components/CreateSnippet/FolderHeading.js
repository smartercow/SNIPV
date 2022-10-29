import { Text } from "@chakra-ui/react";
import React from "react";

const FolderHeading = ({ selectedSubFolder }) => {
  return (
    <div className="flex items-center gap-4 pt-[-2px]">
      <div className="flex items-center gap-4">
        <div className="flex gap-2 items-center">
          <Text fontWeight="semibold">
            {selectedSubFolder?.mainFolder?.label}
          </Text>

          <div
            className={`${selectedSubFolder?.mainFolder?.language?.classTree} lBadge rounded-3xl flex justify-center items-center`}
          >
            <p className="text-xs MonoHeading font-semibold lowercase">
              {selectedSubFolder?.mainFolder?.language?.label}
            </p>
          </div>
        </div>

        <div>
          <Text className="text-gray-500" size={20}>
            &#129094;
          </Text>
        </div>
      </div>

      <div className="flex gap-2">
        <div>
          <Text fontWeight="semibold">{selectedSubFolder?.label}</Text>
        </div>

        <div
          className={`${selectedSubFolder?.language?.acc?.classTree} lBadge rounded-3xl flex justify-center items-center`}
        >
          <p className="text-xs MonoHeading font-semibold lowercase">
            {selectedSubFolder?.language?.acc?.label}
          </p>
        </div>

        <div className="fileExtBadge bg-[#ECF4FF] rounded-2xl flex justify-center items-center">
          <p className="text-black text-xs MonoHeading font-semibold lowercase">
            {selectedSubFolder?.language?.fileExtension?.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FolderHeading;
