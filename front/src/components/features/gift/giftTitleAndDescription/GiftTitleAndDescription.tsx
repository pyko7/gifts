import { FC } from "react";
import { Text } from "@chakra-ui/react";
import sxs from "./_styles";

const GiftTitleAndDescription: FC = ({ gift }: any) => (
  <>
    <Text sx={sxs.title}>{gift?.name}</Text>
    <Text sx={sxs.description}>{gift?.description}</Text>
  </>
);

export default GiftTitleAndDescription;
