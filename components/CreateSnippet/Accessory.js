import React, { useState } from "react";
import Select from "react-select";
import { JavascriptFrameworks } from "../../utilities/JavascriptFrameworks";
import { CSSprocessors } from "../../utilities/CSSprocessors";
import { Text, Tooltip } from "@nextui-org/react";
import { BsQuestionCircleFill } from "react-icons/bs";

const Accessory = ({
  language,
  framework,
  processor,
  handleSelectFramework,
  handleSelectProcessor,
}) => {

  return (
    <div>
      {(language?.langId === "54" || language?.langId === "127") && (
        <div className="flex gap-2 w-full items-center">
          <div className="w-full">
            <Select
              options={JavascriptFrameworks}
              placeholder="Valg Framework"
              value={framework}
              onChange={handleSelectFramework}
              isSearchable={true}
              className="w-full"
              aria-label="Select"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </div>

          <div className="pt-2">
            <Tooltip
              content={"Javascript framework for denne mappe"}
              color="primary"
              css={{ zIndex: 999999 }}
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </div>
        </div>
      )}

      {language.langId === "19" && (
        <div className="flex gap-2 w-full items-center">
          <div className="w-full">
            <Select
              options={CSSprocessors}
              placeholder="Valg processor"
              value={processor}
              onChange={handleSelectProcessor}
              isSearchable={true}
              className="w-full"
              aria-label="Select"
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </div>
          <div className="">
            <Tooltip
              content={"Processor for denne mappe"}
              color="primary"
              css={{ zIndex: 999999 }}
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accessory;
