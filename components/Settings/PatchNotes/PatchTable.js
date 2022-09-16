import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import { StyledBadge } from "./StyledBadge";
import { BsQuestionCircleFill } from "react-icons/bs";

export default function PatchTable() {
  const columns = [
    { name: "DATO", uid: "date" },
    { name: "VERSION", uid: "version" },
    { name: "COMMIT", uid: "commit" },
    { name: "STATUS", uid: "status" },
  ];
  const PatchVersion = [
    {
      id: 1,
      date: "16/09/2022",
      version: "1.2.2",
      commit: "Search",
      commitMsg: "Der blevet skiftet noget",
      status: "nyeste",
    },
    {
      id: 2,
      date: "16/09/2022",
      version: "1.2.1",
      commit: "PatchNotes",
      commitMsg: "Der blevet skiftet noget",
      status: "nuværende",
    },
    {
      id: 2,
      date: "16/09/2022",
      version: "1.2.1",
      commit: "PatchNotes",
      commitMsg: "Der blevet skiftet noget",
      status: "forældet",
    },
  ];
  const renderCell = (PatchVersion, columnKey) => {
    const cellValue = PatchVersion[columnKey];
    switch (columnKey) {
      case "dato":
        return <Text>{PatchVersion.dato}</Text>;
      case "version":
        return <Text>{PatchVersion.version}</Text>;
      case "commit":
        return (
          <Row className="flex gap-3">
            <Text>{PatchVersion.commit}</Text>
            <Tooltip
              content={PatchVersion.commitMsg}
              color="primary"
              keepMounted="true"
              css={{ zIndex: 999999 }}
              className="mt-1"
            >
              <Text h5 color="primary">
                <BsQuestionCircleFill />
              </Text>
            </Tooltip>
          </Row>
        );
      case "status":
        return (
          <StyledBadge type={PatchVersion.status}>{cellValue}</StyledBadge>
        );

      default:
        return cellValue;
    }
  };
  return (
    <Table
      aria-label="Patch notes table"
      align="center"
      css={{
        height: "auto",
        width: "45vw",
        minWidth: "100%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column key={column.uid}>{column.name}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={PatchVersion}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}
