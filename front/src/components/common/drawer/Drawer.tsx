import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { CommonDrawerProps } from "./_props";

const CommonDrawer: FC<PropsWithChildren<CommonDrawerProps>> = ({
  isOpen,
  onClose,
  withCloseButton = true,
  title = undefined,
  children,
}) => (
  <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>{title}</DrawerHeader>
      {withCloseButton && <DrawerCloseButton />}
      {children}
    </DrawerContent>
  </Drawer>
);

export default CommonDrawer;
