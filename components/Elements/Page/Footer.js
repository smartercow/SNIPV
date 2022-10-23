import { Text } from "@chakra-ui/react";
import React from "react";

const Footer = ({ snippet }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-lg flex gap-1">
          <p>Af</p> <p>{snippet.id}</p>
          <p className="font-bold text-[#031B4E]">
            {snippet.userData.username}
          </p>
        </div>

        <div className="flex gap-2 md:gap-4">
          {snippet.updatedAt && (
            <div className="flex gap-1 items-center">
              <Text className="font-semibold text-[#031B4E]">Opdateret:</Text>
              <Text className="font-semibold text-[#031B4E]">
                {new Date(snippet.updatedAt.seconds * 1000).toLocaleDateString(
                  "da-DK"
                )}
              </Text>
            </div>
          )}

          <div className="flex gap-1 items-center">
            <Text transform="uppercase" className="text-[#031B4E]">
              Oprettet:
            </Text>
            <Text transform="uppercase" className="text-[#031B4E]">
              {new Date(snippet.postedAt.seconds * 1000).toLocaleDateString(
                "da-DK"
              )}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
