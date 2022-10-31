import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CloseIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Packages = ({ packages, setPackages, AddAllPackages }) => {
  const [packageValue, setPackageValue] = useState("");
  const [nextId, setNextId] = useState(1);

  const [editPack, setEditPack] = useState(false);
  const [editId, setEditId] = useState(0);
  const AddPackage = (e) => {
    e.preventDefault();
    setPackages((oldForm) => [
      ...oldForm,
      { packageId: nextId, package: packageValue },
    ]);
    setPackageValue("");
    setNextId(nextId + 1);
  };

  const editPackage = () => {
    const editedPackage = packages.map((obj) => {
      if (obj.packageId === editId) {
        return { ...obj, package: packageValue };
      }

      return obj;
    });
    setPackageValue("");
    setPackages(editedPackage);
    setEditPack(false);
    setEditId(0);
  };

  const moveUp = (index) => {
    if (index < 1 || index >= packages.length) return;

    setPackages((packages) => {
      packages = [...packages];

      [packages[index - 1], packages[index]] = [
        packages[index],
        packages[index - 1],
      ];

      return packages;
    });
  };

  const moveDown = (index) => {
    if (index >= packages.length - 1) return;

    setPackages((packages) => {
      packages = [...packages];

      [packages[index + 1], packages[index]] = [
        packages[index],
        packages[index + 1],
      ];

      return packages;
    });
  };

  const Cancel = () => {
    setPackageValue("");
    setEditPack(false);
    setEditId(0);
  };

  console.log("packages", packages);
  return (
    <Box>
      <div>
        {Object.keys(packages).length > 0 && (
          <div>
            {packages.map((pack, index) => {
              return (
                <Box
                  key={index}
                  borderColor="Gray"
                  borderWidth={1}
                  borderRadius="md"
                  mb={2}
                  p={2}
                >
                  <div>
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <IconButton
                        aria-label="Up"
                        onClick={() => moveUp(index)}
                        icon={
                          <ArrowUpIcon height={5} width={5} color="gray.500" />
                        }
                      />
                      <IconButton
                        aria-label="Down"
                        onClick={() => moveDown(index)}
                        icon={
                          <ArrowDownIcon
                            height={5}
                            width={5}
                            color="gray.500"
                          />
                        }
                      />
                      <IconButton
                        aria-label="Edit"
                        onClick={() => {
                          setPackageValue(pack.package),
                            setEditPack(true),
                            setEditId(pack.packageId);
                        }}
                        icon={<EditIcon height={4} width={4} color="Primary" />}
                      />
                      <IconButton
                        aria-label="Down"
                        disabled={
                          editPack && editId === pack.packageId ? true : false
                        }
                        onClick={() => {
                          setPackages(
                            packages.filter(
                              (pc) => pc.packageId !== pack.packageId
                            )
                          );
                        }}
                        icon={<CloseIcon height={3} width={3} color="Red" />}
                      />
                    </ButtonGroup>
                    {/* {editPack && editId === index + 1 && ( */}
                    {/* )} */}
                  </div>
                  <Box mt={1}>
                    <Text>{pack.package}</Text>
                  </Box>
                </Box>
              );
            })}
            <Divider mt={4} mb={2} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <Text
            textTransform="uppercase"
            variant="heading"
            fontWeight="semibold"
          >
            Pakker
          </Text>
        </div>
        <div>
          <Input
            value={packageValue}
            onChange={(e) => setPackageValue(e.target.value)}
            placeholder="npx create-react-app "
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={editPack ? editPackage : AddPackage}>
            {editPack ? "Opdatere" : "Tilføj"}
          </Button>
          <Button onClick={editPack ? Cancel : AddAllPackages}>
            {editPack ? "Annullere" : "Færdig"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Packages;
