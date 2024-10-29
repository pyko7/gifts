import { AspectRatio, Box, Image } from "@chakra-ui/react";
import { FC } from "react";
import { FileUploadPreviewProps } from "./_props";
import sxs from "./_styles";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { CloseIcon } from "@components/common/icons";

const FileUploadPreview: FC<FileUploadPreviewProps> = ({
  filePreview,
  onClear,
}) => (
  <Box sx={sxs.container}>
    <ButtonIcon
      buttonSize="sm"
      CustomIcon={CloseIcon}
      sx={sxs.icon}
      onClick={onClear}
    />
    <AspectRatio ratio={1} sx={sxs.innerContainer}>
      <Image src={filePreview} alt="preview" sx={sxs.image} />
    </AspectRatio>
  </Box>
);

export default FileUploadPreview;
