import { Box, Button, Divider, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Packages = ({ packages, setPackages, AddAllPackages }) => {
  const [packageValue, setPackageValue] = useState("");

  const AddPackage = (e) => {
    e.preventDefault();
    setPackages((oldForm) => [...oldForm, packageValue]);
    setPackageValue("");
  };

  return (
    <Box borderColor="Gray" borderWidth={1} borderRadius="md" p={2}>
      <div>
        {Object.keys(packages).length > 0 && (
          <div>
            {packages.map((pack, index) => (
              <div key={index} className="mb-2">
                <Input readOnly defaultValue={pack} />
              </div>
            ))}
            <Divider my={4} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <Input
            value={packageValue}
            onChange={(e) => setPackageValue(e.target.value)}
            placeholder="npx create-react-app "
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={AddPackage}>Tilføj</Button>
          <Button onClick={AddAllPackages}>Færdig</Button>
        </div>
      </div>
    </Box>
  );
};

export default Packages;
