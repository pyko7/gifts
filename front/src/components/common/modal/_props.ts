export type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  withCloseButton?: boolean;
  primaryButtonName?: string;
  primaryButtonAction?: () => void;
  secondaryButtonName?: string;
  secondaryButtonAction?: () => void;
};
