import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Badge,
  Icon,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";
import { CurrentVersion } from "../../../pages/api/updates/CurrentVersion";

export default function PatchTable({ updateData }) {
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>
            Kun store commits er synlige som opdateringer, for små tweak commits
            hold øje med den{" "}
            <NextLink href="https://github.com/smartercow/SNIPV" passHref>
              <Link isExternal color="Primary">
                original repository <ExternalLinkIcon h={3} w={3} />
              </Link>
            </NextLink>
            .
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Dato</Th>
              <Th>Version</Th>
              <Th>Commit</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {updateData && (
              <>
                {updateData.map((item, i) => (
                  <Tr key={item.id}>
                    <Td>{item.date}</Td>
                    <Td>{item.version}</Td>
                    <Td>
                      <div className="flex gap-2">
                        {item.commit}
                        <Tooltip
                          label={item.commitMsg}
                          borderRadius="lg"
                          bg="PrimaryLighter"
                          color="DarkBlue"
                          py={1}
                          hasArrow
                        >
                          <Text color="Primary">
                            <Icon as={BsQuestionCircleFill} w={4} h={4} />
                          </Text>
                        </Tooltip>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        {item.id === CurrentVersion.id ? (
                          <Badge colorScheme="purple">nuværende</Badge>
                        ) : item.status === "nyeste" ? (
                          <Badge colorScheme="blue">nyeste</Badge>
                        ) : (
                          <Badge colorScheme="gray">{item.status}</Badge>
                        )}
                      </div>
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
