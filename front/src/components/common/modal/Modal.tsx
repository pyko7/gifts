import { FC, PropsWithChildren } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { CommonModalProps } from "./_props";

const CommonModal: FC<PropsWithChildren<CommonModalProps>> = ({
  isOpen,
  onClose,
  title,
  withCloseButton = true,
  primaryButtonName,
  primaryButtonAction,
  secondaryButtonName,
  secondaryButtonAction,
  children,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      {title && <ModalHeader>{title}</ModalHeader>}
      {withCloseButton && <ModalCloseButton />}
      <ModalBody>{children}</ModalBody>

      <ModalFooter>
        {primaryButtonName && (
          <Button colorScheme="blue" mr={3} onClick={primaryButtonAction}>
            {primaryButtonName}
          </Button>
        )}
        {secondaryButtonName && (
          <Button variant="ghost" onClick={secondaryButtonAction}>
            {secondaryButtonName}
          </Button>
        )}
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default CommonModal;
