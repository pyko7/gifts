import { Box, Flex, Text } from "@chakra-ui/react";
import { generateUniqueId } from "@utils/_utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import { mobileNavbarLinks } from "../_utils";
import sxs from "./_styles";

const MobileNavbarContent: FC = () => (
  <Flex flexDirection="column" gap="1rem" paddingY="2rem">
    {mobileNavbarLinks.map((item) => (
      <Flex key={generateUniqueId()} alignItems="center" gap="0.75rem">
        <Flex
          alignItems="center"
          justifyContent="center"
          aria-hidden="true"
          sx={sxs.drawerIconContainer}
        >
          <Box>{item?.icon}</Box>
        </Flex>
        <Text as={Link} to={item.url} sx={sxs.link}>
          {item.title}
        </Text>
      </Flex>
    ))}
  </Flex>
);

export default MobileNavbarContent;
