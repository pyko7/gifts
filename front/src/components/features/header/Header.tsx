import { Flex, useMediaQuery } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import sxs from "./_styles";
import Navbar from "../navbar/Navbar";
import MobileNavbar from "../navbar/mobile/MobileNavbar";

const Header: FC = () => {
  const [isLargerThanTablet] = useMediaQuery("(min-width: 768px)");
  return (
    <Flex alignItems="center" justifyContent="space-between" sx={sxs.header}>
      <Link to="/">Gifts</Link>
      {!isLargerThanTablet ? <MobileNavbar /> : <Navbar />}
    </Flex>
  );
};

export default Header;
