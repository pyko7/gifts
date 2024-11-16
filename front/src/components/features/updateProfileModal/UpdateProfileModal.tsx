import FormContainer from "@components/common/formContainer/FormContainer";
import CommonModal from "@components/common/modal/Modal";
import { FC, useMemo } from "react";
import ResetPasswordForm from "../form/resetPasswordForm/ResetPasswordForm";
import { useUpdateProfileFormContext } from "@context/updateProfile/UpdateProfileContext";
import CompleteProfileForm from "../form/completeProfileForm/CompleteProfileForm";
import ResetEmailForm from "../form/resetEmailForm/ResetEmailForm";

const UpdateProfileModal: FC = () => {
  const { isModalOpen, mode, onClose } = useUpdateProfileFormContext();

  const modalTitle = useMemo(() => {
    if (mode === "EMAIL") {
      return `Modifier l'adresse email`;
    } else if (mode === "PASSWORD") {
      return `Modifier le mot de passe`;
    }
    return "Modifier les informations du profil";
  }, [mode]);

  return (
    <CommonModal isOpen={isModalOpen} onClose={onClose} withCloseButton={false}>
      <FormContainer title={modalTitle} onCancel={onClose}>
        {mode === "INFOS" && <CompleteProfileForm mode="EDIT" />}
        {mode === "PASSWORD" && <ResetPasswordForm />}
        {mode === "EMAIL" && <ResetEmailForm />}
      </FormContainer>
    </CommonModal>
  );
};

export default UpdateProfileModal;
