import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { BsQuestionCircleFill } from "react-icons/bs";
import { currentUpdate } from "../../../pages/api/currentupdate";

export default function PatchTable({ updateData }) {
  return (
    <Table
      aria-label="Example static collection table"
      css={{
        height: "auto",
        width: "45vw",
      }}
      selectionMode="single"
    >
      <Table.Header>
        <Table.Column>DATO</Table.Column>
        <Table.Column>VERSION</Table.Column>
        <Table.Column>COMMIT</Table.Column>
        <Table.Column>STATUS</Table.Column>
      </Table.Header>
      <Table.Body>
        {updateData && updateData.map((item, index) => (
          <Table.Row key="1">
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>
              <div className="flex gap-2">
              {item.version}
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
            <Table.Cell>{item.commit}</Table.Cell>
            <Table.Cell>{item.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
