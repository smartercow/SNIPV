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
import React, { useEffect, useState } from "react";
import PackageBox from "./PackageBox";

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

  const [disableSave, setDisableSave] = useState(true);

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

  const CancelSection = () => {
    setPackageValue("");
    setPackages([]);
    setEditState(false);
  };

  useEffect(() => {
    if (packages.length > 0) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [packages]);
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
                Pakker
              </Text>
            </div>
            <Divider my={2} />
            {packages.map((pack, index) => {
              return (
                <Box key={index} mb={3}>
                  <Box className="">
                    <ButtonGroup size="sm" isAttached variant="custom">
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
                        borderBottom="none"
                        ml="-1px"
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
                        ml="-1px"
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
                        ml="-1px"
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
                  </Box>
                  <Box
                    borderColor={
                      editPack && editPackId === pack.packageId
                        ? "Primary"
                        : "BorderGray"
                    }
                    borderTopLeftRadius="none"
                    key={index}
                  >
                    <PackageBox pack={pack} />
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
            Pakke
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
          <Button
            variant="btnSub"
            disabled={packageValue ? false : true}
            onClick={editPack ? editPackage : AddPackage}
          >
            {editPack ? "Opdatere pakke" : "Tilføj pakke"}
          </Button>
          <Button
            variant="btnSub"
            disabled={disableSave}
            onClick={
              editPack ? Cancel : editState ? UpdatePackages : AddAllPackages
            }
          >
            {editPack
              ? "Annullere"
              : editState
              ? "Opdatere pakker"
              : "Tilføj pakker"}
          </Button>
          {editState && !editPack && (
            <Button variant="btnSub" onClick={CancelSection}>
              Annullere
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Packages;
