import CommonModal from "@components/common/modal/Modal";
import { useGiftFormContext } from "@context/giftForm/GiftFormContext";
import GiftForm from "../form/giftForm/GiftForm";
import FormContainer from "@components/common/formContainer/FormContainer";

const GiftModal = () => {
  const { isModalOpen, onClose } = useGiftFormContext();
  return (
    <CommonModal isOpen={isModalOpen} onClose={onClose}>
      <FormContainer title="Création d'un gift" buttonName={undefined}>
        <GiftForm />
      </FormContainer>
    </CommonModal>
  );
};

export default GiftModal;
