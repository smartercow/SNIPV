import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Text,
  useClipboard,
  useToast,
} from "@chakra-ui/react";

export default function PackageBox({ pack }) {
  const { onCopy } = useClipboard(pack.package);
  const toast = useToast();
  return (
    <Box
      borderWidth={1}
      borderRadius="md"
      className="flex items-center gap-1 w-[70%]"
    >
      <Box
        bg="gray.100"
        borderBottomLeftRadius="md"
        height={10}
        className="w-6 select-none flex items-center justify-center"
      >
        <Text
          fontWeight="semibold"
          className="text-center"
          color="Primary"
          fontSize={17}
        >
          $
        </Text>
      </Box>
      <Box className="flex-grow whitespace-nowrap truncate">
        <Text variant="package" className="truncate">
          {pack.package}
        </Text>
      </Box>
      <Box className="flex-none">
        <IconButton
          aria-label="Up"
          variant="custom"
          borderTop="none"
          borderRight="none"
          borderBottom="none"
          borderLeftRadius="none"
          onClick={() => {
            onCopy(),
              toast({
                title: "Kopieret",
                description: pack.package,
                status: "success",
                duration: 3000,
                isClosable: true,
              });
          }}
          icon={<CopyIcon height={4} width={4} color="Primary" />}
        />
      </Box>
    </Box>
  );
}
