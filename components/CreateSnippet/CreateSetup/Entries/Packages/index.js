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

const Packages = ({
  packages,
  setPackages,
  AddAllPackages,
  editState,
  setEditState,
  editId,
  setEditId,
  entries,
  setEntries,
}) => {
  const [packageValue, setPackageValue] = useState("");

  const [editPack, setEditPack] = useState(false);
  const [editPackId, setEditPackId] = useState("");

  const randomValue = (Math.random() + 3).toString(36).substring(2);

  const AddPackage = (e) => {
    e.preventDefault();
    setPackages((oldForm) => [
      ...oldForm,
      { packageId: randomValue, package: packageValue },
    ]);
    setPackageValue("");
  };

  const UpdatePackages = () => {
    const editedPackages = entries.map((obj) => {
      if (obj.entryId === editId) {
        return { ...obj, packages: packages };
      }

      return obj;
    });
    setPackages([]);
    setEntries(editedPackages);
    setEditState(false);
    setEditId("");
  };

  const editPackage = () => {
    const editedPackage = packages.map((obj) => {
      if (obj.packageId === editPackId) {
        return { ...obj, package: packageValue };
      }

      return obj;
    });
    setPackageValue("");
    setPackages(editedPackage);
    setEditPack(false);
    setEditPackId("");
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
    setEditPackId("");
  };

  console.log("packages", packages);
  console.log("editPackId", editPackId);
  return (
    <Box p={4} borderWidth={1} borderRadius="md">
      <div>
        {packages.length > 0 && (
          <div>
            <div>
              <Text
                fontWeight="semibold"
                textTransform="uppercase"
                fontSize={14}
              >
                Tilføjet pakker
              </Text>
            </div>
            <Divider mb={2} />
            {packages.map((pack, index) => {
              return (
                <Box key={index} mb={3}>
                  <div>
                    <ButtonGroup size="sm" isAttached variant="outline">
                      <IconButton
                        aria-label="Up"
                        onClick={() => moveUp(index)}
                        borderBottomRadius="none"
                        borderBottom="none"
                        icon={
                          <ArrowUpIcon height={5} width={5} color="gray.500" />
                        }
                      />
                      <IconButton
                        aria-label="Down"
                        onClick={() => moveDown(index)}
                        borderBottom="none"
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
                        borderBottom="none"
                        onClick={() => {
                          setPackageValue(pack.package),
                            setEditPack(true),
                            setEditPackId(pack.packageId);
                        }}
                        icon={<EditIcon height={4} width={4} color="Primary" />}
                      />
                      <IconButton
                        aria-label="Down"
                        borderBottomRadius="none"
                        borderBottom="none"
                        disabled={
                          editPack && editPackId === pack.packageId
                            ? true
                            : false
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
                  </div>
                  <Box
                    borderColor={
                      editPack && editPackId === pack.packageId
                        ? "Primary"
                        : "BorderGray"
                    }
                    borderWidth={1}
                    borderRadius="md"
                    borderTopLeftRadius="none"
                    py={1}
                    key={index}
                    className="flex items-center gap-1"
                  >
                    <div className="w-4 select-none">
                      <Text fontWeight="semibold" className="text-center">
                        &nbsp;$
                      </Text>
                    </div>
                    <Box className="flex-grow">
                      <Text>{pack.package}</Text>
                    </Box>
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
            fontSize={14}
          >
            Tilføj pakker
          </Text>
        </div>
        <div>
          <Input
            value={packageValue}
            onChange={(e) => setPackageValue(e.target.value)}
            placeholder="npx create-next-app -e with-tailwindcss"
          />
        </div>
        <div className="flex gap-3">
          <Button onClick={editPack ? editPackage : AddPackage}>
            {editPack ? "Opdatere" : "Tilføj"}
          </Button>
          <Button
            onClick={
              editPack ? Cancel : editState ? UpdatePackages : AddAllPackages
            }
          >
            {editPack ? "Annullere" : editState ? "Opdatere" : "Færdig"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Packages;
