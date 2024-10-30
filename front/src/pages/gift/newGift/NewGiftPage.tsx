import { FC } from "react";
import FormContainer from "@components/common/formContainer/FormContainer";
import GiftForm from "@components/features/form/giftForm/GiftForm";
import GiftFormProvider from "@context/giftForm/GiftFormContext";

const NewGiftPage: FC = () => (
  <FormContainer title="Création d'un gift" buttonName={undefined}>
    <GiftFormProvider>
      <GiftForm />
    </GiftFormProvider>
  </FormContainer>
);

export default NewGiftPage;
