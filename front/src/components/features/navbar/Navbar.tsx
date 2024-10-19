import { Button, Flex } from "@chakra-ui/react";
import ButtonIcon from "@components/common/button/buttonIcon/ButtonIcon";
import { BellIcon } from "@components/common/icons";
import { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC = () => (
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

export default Navbar;
