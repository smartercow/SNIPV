import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const SideMenu = ({ modules, snippet }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    query: { id },
  } = useRouter();

  const handleHref = (link) => {
    router.push(link).then(() => {
      if (link) router.push(link);
    });
  };

  return (
    <div className="flex flex-col">
      {snippet?.setupHasFolderStructure && (
        <Box
          p={3}
          borderWidth="1px"
          borderColor="PrimaryELight"
          borderRadius={10}
          bg={asPath.endsWith("/folderstructure") ? "PrimaryLighter" : "none"}
          onClick={() => handleHref(`/setup/${id}/folderstructure`)}
          className="w-[16rem] cursor-pointer transition ease-in-out duration-300"
          _hover={{
            bg: "PrimaryLighter",
          }}>
          <Text fontSize={15} fontWeight="semibold" color={asPath.endsWith("/folderstructure") ? "Primary" : "Black"}>
            Mappestruktur
          </Text>
        </Box>
      )}
      <Accordion defaultIndex={[0]} allowMultiple variant="menu">
        {modules.map((item) => {
          if (asPath.startsWith(`/setup/${id}/${String(item.moduleTitle).replace(/ /g, "-")}`))
            return (
              <Box key={item.moduleId} className="cursor-pointer transition ease-in-out duration-300 w-[16rem]">
                <AccordionItem mt={1}>
                  <h2>
                    <AccordionButton
                      p={3}
                      borderRadius="md"
                      _hover={{
                        bg: "PrimaryLighter",
                      }}
                      _selected={{
                        bg: "PrimaryLighter",
                        borderBottomRadius: "none",
                      }}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize={15} color="Primary" fontWeight="semibold">
                          {item.moduleTitle}
                        </Text>
                      </Box>
                      <AccordionIcon color="Primary" />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p={0}>
                    {item.sections.map((sect, index) => {
                      if (asPath.endsWith(`#${String(sect.sectionTitle).replace(/ /g, "-")}`))
                        return (
                          <Box
                            key={sect.sectionId}
                            py={2}
                            px={4}
                            bg="PrimaryLighter"
                            onClick={() =>
                              handleHref(
                                `/setup/${id}/${String(item.moduleTitle).replace(/ /g, "-")}#${String(
                                  sect.sectionTitle
                                ).replace(/ /g, "-")}`
                              )
                            }>
                            <Text fontSize={15} color="Primary" fontWeight="semibold">
                              {sect.sectionTitle}
                            </Text>
                          </Box>
                        );
                      else
                        return (
                          <Box
                            key={sect.sectionId}
                            py={2}
                            px={4}
                            _hover={{ bg: "PrimaryLighter" }}
                            onClick={() => handleHref(`#${String(sect.sectionTitle).replace(/ /g, "-")}`)}>
                            <Text fontSize={15} fontWeight="semibold">
                              {sect.sectionTitle}
                            </Text>
                          </Box>
                        );
                    })}
                  </AccordionPanel>
                </AccordionItem>
              </Box>
            );
          else
            return (
              <Box key={item.moduleId} className="w-[16rem]">
                <AccordionItem p={0} mt={1}>
                  <h2>
                    <AccordionButton
                      p={3}
                      borderRadius="md"
                      _hover={{
                        bg: "PrimaryLighter",
                      }}>
                      <Box flex="1" textAlign="left">
                        <Text fontSize={15} fontWeight="semibold">
                          {item.moduleTitle}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p={0}>
                    {item.sections.map((sect, index) => (
                      <Box key={index} _hover={{ bg: "PrimaryLighter" }}>
                        <Text
                          py={2}
                          px={4}
                          fontSize={15}
                          fontWeight="semibold"
                          onClick={() =>
                            handleHref(
                              `/setup/${id}/${String(item.moduleTitle).replace(/ /g, "-")}#${String(
                                sect.sectionTitle
                              ).replace(/ /g, "-")}`
                            )
                          }
                          className="cursor-pointer transition ease-in-out duration-300 ">
                          {sect.sectionTitle}
                        </Text>
                      </Box>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Box>
            );
        })}
      </Accordion>
    </div>
  );
};

export default SideMenu;
