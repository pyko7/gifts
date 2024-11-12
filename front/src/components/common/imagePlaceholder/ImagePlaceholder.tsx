import { FC, PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";
import { ImagePlaceholderProps } from "./_props";
import sxs from "./_styles";

const ImagePlaceholder: FC<PropsWithChildren<ImagePlaceholderProps>> = ({
  sx,
  children,
}) => (
  <Box aria-hidden="true" sx={{ ...sxs.placeholder, ...sx }}>
    {children}
  </Box>
);

export default ImagePlaceholder;
