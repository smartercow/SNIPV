import React from "react";
import { Dropdown } from "@nextui-org/react";

export default function Country() {
  const [selected, setSelected] = React.useState(new Set(["🇩🇰da"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  return (
    <Dropdown>
      <Dropdown.Button auto light color="primary" /* css={{ tt: "capitalize" }} */>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Single selection actions"
        color="primary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}
        disabledKeys={["🇬🇧eng"]}
      >
        <Dropdown.Item key="🇩🇰da">Dansk</Dropdown.Item>
        <Dropdown.Item key="🇬🇧eng">English</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}