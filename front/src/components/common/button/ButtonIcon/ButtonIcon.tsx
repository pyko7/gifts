import { Button, Icon } from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { ButtonIconProps } from "./_props";
import sxs from "./_styles";

const ButtonIcon: FC<ButtonIconProps> = ({
  CustomIcon,
  variant = "ghost",
  colorVariant = "light",
  buttonSize = "md",
  sx,
  ...rest
}) => {
  const lightColorVariant = useMemo(
    () => colorVariant === "light",
    [colorVariant]
  );
  const buttonSizes = useMemo(
    () =>
      buttonSize === "sm"
        ? "1.25rem"
        : buttonSize === "lg"
          ? "2.25rem"
          : "1.75rem",
    [buttonSize]
  );

  return (
    <Button
      variant={variant}
      sx={{
        ...sxs.buttonBase,
        width: buttonSizes,
        height: buttonSizes,
        "& > svg": {
          color: (theme) =>
            lightColorVariant ? theme.colors.main[200] : theme.colors.main[500],
          "&:hover": {
            color: (theme) =>
              lightColorVariant
                ? theme.colors.main[400]
                : theme.colors.main[300],
          },
        },
        ...sx,
      }}
      {...rest}
    >
      <Icon as={CustomIcon} />
    </Button>
  );
};

export default ButtonIcon;
