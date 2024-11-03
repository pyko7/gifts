import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import sxs from "./_styles";

const QrCodeModalText: FC = () => (
  <Flex flexDirection="column" alignItems="center" gap="0.5rem">
    <Text sx={sxs.title}>Ajoutez-moi pour voir mes gifts</Text>
    <Text sx={sxs.subtitle}>
      Votre code QR est privé. Si vous le partagez avec quelqu'un, cette
      personne pourra vous envoyer une demande d'ami.
    </Text>
  </Flex>
);

export default QrCodeModalText;
