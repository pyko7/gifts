import { Flex } from "@chakra-ui/react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { ArrowLeftIcon } from "@components/common/icons";
import { FC, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import sxs from "./_styles";

const MobilePageHeader: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Flex flex={1} justifyContent="space-between" sx={sxs.header}>
      <ButtonIcon
        buttonSize="md"
        CustomIcon={ArrowLeftIcon}
        onClick={() => navigate(-1)}
      />
      {children}
    </Flex>
  );
};

export default MobilePageHeader;
