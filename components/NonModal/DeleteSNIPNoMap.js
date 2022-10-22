import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

export const DeleteSNIPNoMap = ({ id, handleDelete, type }) => {
  return (
    <Box>
      <Box>
        <Text
          textAlign="center"
          fontWeight="semibold"
          fontSize={19}
          color="Red"
        >
          Bekræft!
        </Text>
      </Box>
      <Box className="my-1 text-center">
        <Text fontSize={16}>
          Er du sikker på, at du vil slette denne {type}? Ved at gøre dette, vil
          du ikke være i stand til at gendanne indhold.
        </Text>
      </Box>
      <Box className="flex justify-center">
        <Button
          color="white"
          bg="Red"
          h={9}
          w={20}
          _hover={{
            bg: "Red",
            opacity: 0.7,
          }}
          onClick={() => {
            handleDelete(id);
          }}
        >
          SLET
        </Button>
      </Box>
    </Box>
  );
};
