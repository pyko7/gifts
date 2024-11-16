import { Button, Flex, Text } from "@chakra-ui/react";
import CommonModal from "@components/common/modal/Modal";
import { FC } from "react";
import sxs from "./_styles";
import { ConfirmModalProps } from "./_props";

const ConfirmModal: FC<ConfirmModalProps> = ({
  isOpen,
  title,
  confirmText,
  onClose,
  onClick,
}) => (
  <CommonModal withCloseButton={false} isOpen={isOpen} onClose={onClose}>
    <Flex alignItems="center" justifyContent="center" sx={sxs.container}>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        gap={5}
        sx={sxs.innerContainer}
      >
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
          sx={sxs.textContainer}
        >
          <Text sx={sxs.title}>{title}</Text>
        </Flex>

        <Text sx={sxs.subtitle}>{confirmText}</Text>

        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="0.75rem"
          sx={sxs.textContainer}
        >
          {Boolean(onClose) && (
            <Button onClick={onClose} variant="ghost" sx={sxs.cancelButton}>
              Annuler
            </Button>
          )}

          <Button onClick={onClick}>Confirmer</Button>
        </Flex>
      </Flex>
    </Flex>
  </CommonModal>
);

export default ConfirmModal;
