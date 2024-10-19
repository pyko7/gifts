import { BellIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  return (
    <Flex>
      <Link to="/">Accueil</Link>
      <Link to="/">Amis</Link>
      <Button>Ma carte</Button>
      <Flex>
        <Flex>
          <ButtonIcon CustomIcon={BellIcon} />
        </Flex>
        <Flex>
          <ButtonIcon CustomIcon={BellIcon} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;