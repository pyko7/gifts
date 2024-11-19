import { Flex } from "@chakra-ui/react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { ArrowLeftIcon } from "@components/common/icons";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import sxs from "./_styles";
import { PageInnerHeaderProps } from "./_props";

const PageInnerHeader: FC<PropsWithChildren<PageInnerHeaderProps>> = ({
  children,
  hidden = true,
}) => {
  const navigate = useNavigate();

  return (
    <Flex
      flex={1}
      justifyContent="space-between"
      sx={{
        ...sxs.header,
        display: {
          base: "flex",
          md: hidden ? "none" : "flex",
        },
      }}
    >
      <ButtonIcon
        buttonSize="md"
        CustomIcon={ArrowLeftIcon}
        onClick={() => navigate(-1)}
      />
      {children}
    </Flex>
  );
};

export default PageInnerHeader;
