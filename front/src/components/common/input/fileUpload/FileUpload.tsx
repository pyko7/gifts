import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FileUploadProps } from "./_props";
import sxs from "./_styles";

const FileUpload: FC<FileUploadProps> = ({ label, icon = undefined }) => (
  <Flex
    as="label"
    htmlFor="picture"
    justifyContent="center"
    alignItems="center"
    gap={{
      base: "0.5rem",
      lg: "0.25rem",
    }}
    sx={sxs.container}
  >
    <Flex
      aria-hidden="true"
      justifyContent="center"
      alignItems="center"
      sx={sxs.icon}
    >
      {icon}
    </Flex>
    <Text>{label}</Text>
  </Flex>
);

export default FileUpload;
