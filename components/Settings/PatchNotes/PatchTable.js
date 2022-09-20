import { Table, Row, Col, Tooltip, User, Text, Badge } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { BsQuestionCircleFill } from "react-icons/bs";
import { CurrentVersion } from "../../../pages/api/updates/CurrentVersion";

export default function PatchTable({ updateData }) {
  return (
    <Table
      aria-label="Patch notes table"
      css={{
        height: "auto",
        width: "45vw",
      }}
    >
      <Table.Header>
        <Table.Column>DATO</Table.Column>
        <Table.Column>VERSION</Table.Column>
        <Table.Column>COMMIT</Table.Column>
        <Table.Column align="center">STATUS</Table.Column>
      </Table.Header>
      <Table.Body>
        {updateData &&
          updateData.map((item, index) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell>{item.version}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  {item.commit}
                  <Tooltip
                    content={item.commitMsg}
                    color="primary"
                    keepMounted="true"
                    css={{ zIndex: 999999 }}
                    className="mt-1"
                  >
                    <Text h5 color="primary">
                      <BsQuestionCircleFill />
                    </Text>
                  </Tooltip>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-center">
                {item.id === CurrentVersion.id ? (
                  <Badge color="secondary">nuværende</Badge>
                ) : item.status === "nyeste" ? (
                  <Badge color="primary">nyeste</Badge>
                ) : (
                  <Badge>{item.status}</Badge>
                )}
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  );
}
