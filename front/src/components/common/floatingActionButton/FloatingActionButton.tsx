import { Box } from "@chakra-ui/react";
import { FC } from "react";
import ButtonIcon from "../button/buttonIcon/ButtonIcon";
import sxs from "./_styles";
import { FloatingActionButtonProps } from "./_props";

const FloatingActionButton: FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
}) => (
  <Box sx={sxs.buttonContainer}>
    <ButtonIcon sx={sxs.addButton} CustomIcon={icon} onClick={onClick} />
  </Box>
);

export default FloatingActionButton;
