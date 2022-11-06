import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const SideMenu = ({ modules }) => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    query: { id },
    query: { slug },
  } = useRouter();

  const handleHref = (link) => {
    router.push(link).then(() => {
      if (link) router.push(link);
    });
  };

  return (
    <div className="flex flex-col min-w-[10rem] max-w-[10rem]">
      <Accordion defaultIndex={[0]} allowToggle variant="menu">
        {modules.map((item) => {
          if (
            asPath.startsWith(
              `/setup/${id}/${String(item.moduleTitle).replace(/ /g, "-")}`
            )
          )
            return (
              <Box
                key={item.moduleId}
                className="cursor-pointer transition ease-in-out duration-300 w-[16rem]"
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      p={2}
                      onClick={() =>
                        handleHref(
                          `/setup/${id}/${String(item.moduleTitle).replace(
                            / /g,
                            "-"
                          )}#${String(item.sections[0].sectionTitle).replace(
                            / /g,
                            "-"
                          )}`
                        )
                      }
                    >
                      <Box flex="1" textAlign="left">
                        <Text
                          fontSize={15}
                          color="Primary"
                          fontWeight="semibold"
                        >
                          {item.moduleTitle}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p={0}>
                    {item.sections.map((sect, index) => {
                      if (
                        asPath.endsWith(
                          `#${String(sect.sectionTitle).replace(/ /g, "-")}`
                        )
                      )
                        return (
                          <Box
                            key={index}
                            py={1}
                            px={4}
                            bg="PrimaryLighter"
                            onClick={() =>
                              handleHref(
                                `#${String(sect.sectionTitle).replace(
                                  / /g,
                                  "-"
                                )}`
                              )
                            }
                          >
                            <Text
                              fontSize={15}
                              color="Primary"
                              fontWeight="semibold"
                            >
                              {sect.sectionTitle}
                            </Text>
                          </Box>
                        );
                      else
                        return (
                          <Box
                            key={index}
                            py={1}
                            px={4}
                            _hover={{ bg: "PrimaryLighter" }}
                            onClick={() =>
                              handleHref(
                                `#${String(sect.sectionTitle).replace(
                                  / /g,
                                  "-"
                                )}`
                              )
                            }
                          >
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
                <AccordionItem p={0}>
                  <h2>
                    <AccordionButton
                      p={2}
                      onClick={() =>
                        handleHref(
                          `/setup/${id}/${String(item.moduleTitle).replace(
                            / /g,
                            "-"
                          )}#${String(item.sections[0].sectionTitle).replace(
                            / /g,
                            "-"
                          )}`
                        )
                      }
                    >
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
                      <Box key={index}>
                        <Text
                          py={1}
                          px={4}
                          fontSize={15}
                          fontWeight="semibold"
                          onClick={() =>
                            handleHref(
                              `#${String(sect.sectionTitle).replace(/ /g, "-")}`
                            )
                          }
                          className="cursor-pointer transition ease-in-out duration-300 "
                        >
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
