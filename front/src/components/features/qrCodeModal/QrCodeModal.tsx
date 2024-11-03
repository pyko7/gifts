import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { useQrCodeModalContext } from "@context/qrCodeModal/QrCodeModalContext";
import CommonModal from "@components/common/modal/Modal";
import QRCode from "react-qr-code";
import sxs from "./_styles";
import QrCodeModalText from "./qrCodeModalText/QrCodeModalText";
import { API_URL } from "@utils/env";

const QrCodeModal: FC = () => {
  const { isOpen, onClose } = useQrCodeModalContext();
  const endpoint = `${API_URL}/route`;
  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <Flex
        flexDirection="column"
        alignItems="center"
        gap="2rem"
        sx={sxs.container}
      >
        <QRCode
          size={256}
          style={{
            height: "auto",
            width: "100%",
            borderRadius: "2rem",
          }}
          value={endpoint}
        />
        <QrCodeModalText />
      </Flex>
    </CommonModal>
  );
};

export default QrCodeModal;
