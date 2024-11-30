import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import sxs from "./_styles";
import { BadgeProps } from "./_props";

const Badge: FC<BadgeProps> = ({ value, invisible = true }) => {
  if (invisible) return null;

  return (
    <Flex justifyContent="center" alignItems="center" sx={sxs.badge}>
      {value}
    </Flex>
  );
};

export default Badge;
