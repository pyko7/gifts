import CommonModal from "@components/common/modal/Modal";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import GiftForm from "../form/giftForm/GiftForm";
import FormContainer from "@components/common/formContainer/FormContainer";

const GiftModal = () => {
  const { isModalOpen, onClose, mode } = useGiftFormContext();
  const title = mode === "EDIT" ? "Modifier d'un gift" : "Création d'un gift";
  return (
    <CommonModal isOpen={isModalOpen} onClose={onClose}>
      <FormContainer title={title} buttonName={undefined}>
        <GiftForm />
      </FormContainer>
    </CommonModal>
  );
};

export default GiftModal;
