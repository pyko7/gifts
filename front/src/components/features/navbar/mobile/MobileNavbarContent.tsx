import { Flex, Text } from "@chakra-ui/react";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import { mobileNavbarLinks } from "../_utils";

const MobileNavbarContent: FC = () => (
  <Flex flexDirection="column" gap="1rem" paddingY="2rem">
    {mobileNavbarLinks.map((item) => (
      <Text
        as={Link}
        key={generateUniqueId()}
        to={item.url}
        sx={{ fontSize: "1.25rem" }}
      >
        {item.title}
      </Text>
    ))}
  </Flex>
);

export default MobileNavbarContent;
