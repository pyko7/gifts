export type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  confirmText: string;
  onClose: () => void;
  onClick: () => void;
};
