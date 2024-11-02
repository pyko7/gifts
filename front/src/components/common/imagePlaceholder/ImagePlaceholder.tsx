import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { ImagePlaceholderProps } from "./_props";
import sxs from "./_styles";

const ImagePlaceholder: FC<ImagePlaceholderProps> = ({ sx }) => (
  <Box aria-hidden="true" sx={{ ...sxs.placeholder, ...sx }} />
);

export default ImagePlaceholder;
