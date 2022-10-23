import { Checkbox } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import {
  AdditionalFileExtensions,
  AdditionalFileExtensions1,
} from "../../utilities/AdditionalFileExtensions";
import { NoOptionsMessage } from "../Select/NoOptionsMessage";

const initialSelectedLang = {
  label: "Javascript",
  value: "javascript",
  langId: "54",
  fileExtension: "js",
  accessory: true,
  accessories: [
    {
      label: "Framework",
      value: "framework",
      accessoryId: "1",
      options: [
        {
          label: "React.js",
          value: "reactjs",
          langId: "1",
          fileExtensions: [
            { label: "js", value: "js" },
            { label: "jsx", value: "js" },
          ],
        },
        {
          label: "Next.js",
          value: "nextjs",
          langId: "2",
          fileExtensions: [
            { label: "js", value: "js" },
            { label: "jsx", value: "jsx" },
          ],
        },
      ],
    },
    {
      label: "Library",
      value: "library",
      accessoryId: "2",
      options: [
        {
          label: "Three.js",
          value: "threejs",
          langId: "1",
          fileExtensions: [
            { label: "js", value: "js" },
            { label: "json", value: "json" },
          ],
        },
        {
          label: "jQuery",
          value: "jquery",
          langId: "2",
          fileExtensions: [{ label: "js", value: "js" }],
        },
      ],
    },
  ],
  syntaxHighlight: "css",
  secondary: true,
};

const AdditionalFileExt = () => {
  const [language, setLanguage] = useState(initialSelectedLang);
  const [accessories, setAccessories] = useState({});
  const [accessory, setAccessory] = useState();
  const [addAccessory, setAddAccessory] = useState(true);

  const [update, setUpdate] = useState(false);

  function handleSelectMain(data) {
    setLanguage(data);
    setUpdate(!update);
  }

  function handleSelectAdd(data) {
    setAccessory(data);
  }

  useEffect(() => {
    if (language.accessory) {
      setAccessories(language.accessories);
    }
  }, [language, update]);

  useEffect(() => {
    if (accessories) {
      setAccessory(accessories[0]);
    } else {
      setAccessory({});
    }
  }, [accessories]);

  /*   useEffect(() => {
    handleSelectAdd();
  }, [update]); */

  const { Option, SingleValue } = components;
  const IconOption = (props) => (
    <Option {...props}>
      <div className="flex items-center gap-2">
        <div className="w-12">
          <p>.{props.data.fileExtension}</p>
        </div>
        <div className="w-full">{props.data.label}</div>
        <div className="flex gap-2">
          <p>javascript</p>
          <p>next.js</p>
        </div>
      </div>
    </Option>
  );

  const IconValue = (props) => (
    <SingleValue {...props}>
      <div className="flex items-center gap-2">
        <div>
          <p>.{props.data.fileExtension}</p>
        </div>
        <div className="w-full">{props.data.label}</div>
        <div className="flex gap-2">
          <p>javascript</p>
          <p>next.js</p>
        </div>
      </div>
    </SingleValue>
  );

  return (
    <div>
      <p>Main</p>
      <Select
        options={AdditionalFileExtensions1}
        placeholder="Valg en main"
        value={language}
        onChange={handleSelectMain}
        isSearchable={true}
        menuPortalTarget={document.body}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        components={{
          NoOptionsMessage,
        }}
      />

      {language.accessory && (
        <div>
          <div>
            <Checkbox
              size="sm"
              onChange={() => setAddAccessory(!addAccessory)}
              isSelected={addAccessory}
            >
              <p>Tilbehør for {language.label}</p>
            </Checkbox>
          </div>
          {addAccessory && (
            <div>
              <Select
                options={accessories}
                placeholder="Valg tilbehør"
                value={accessory}
                onChange={handleSelectAdd}
                isSearchable={true}
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                components={{ NoOptionsMessage }}
                // defaultValue={ext[0]}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdditionalFileExt;
