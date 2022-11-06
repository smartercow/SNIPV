import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Syntax from "../../CreateSnippet/CreateSetup/Entries/Syntax";
import parse from "html-react-parser";

const Layout = ({ snippet, children }) => {
  const [menu, setMenu] = useState();

  useEffect(() => {
    if (snippet) {
      setMenu(Object.values(snippet.entries));
    }
  }, [snippet]);
  return (
    <div>
      {menu && (
        <div className="flex">
          <div className="w-80">
            {menu.map((item, index) => (
              <div className="flex" key={index}>
                <div>
                  {index + 1}
                  {". "}
                  {item.sectionTitle}
                </div>
              </div>
            ))}
          </div>

          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
