import { Flex, useMediaQuery } from "@chakra-ui/react";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import sxs from "./_styles";
import Navbar from "../navbar/Navbar";
import { Bars3Icon } from "@components/common/icons";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import MobileNavbar from "../navbar/mobile/MobileNavbar";

const Header: FC = () => {
  const [isLargerThanTablet] = useMediaQuery("(min-width: 768px)");
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between" sx={sxs.header}>
        <Link to="/">Gifts</Link>
        {!isLargerThanTablet ? (
          <ButtonIcon
            CustomIcon={Bars3Icon}
            onClick={() => setMobileNavbarOpen(true)}
          />
        ) : (
          <Navbar />
        )}
      </Flex>
      {!isLargerThanTablet && (
        <MobileNavbar
          open={mobileNavbarOpen}
          onClose={() => setMobileNavbarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
