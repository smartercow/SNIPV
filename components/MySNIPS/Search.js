import { Box } from "@chakra-ui/react";
import React from "react";
import Snippet from "../Display/Snippet";
import LatestHeading from "../Heading/LatestHeading";

const Search = ({ match, handleDelete }) => {
  return (
    <div>
      {Object.keys(match).length > 0 && (
        <>
          <LatestHeading headingType={`Søgeresultater`} />

          <Box
            px={4}
            pt={2}
            pb={4}
            borderBottomRadius="md"
            boxShadow="md"
            bg="white"
          >
            {match?.map((snippet) => (
              <Snippet
                key={snippet.id}
                snippet={snippet}
                handleDelete={handleDelete}
              />
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default Search;
