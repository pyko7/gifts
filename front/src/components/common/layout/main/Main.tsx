import { FC, PropsWithChildren } from "react";
import { Box } from "@chakra-ui/react";
import Header from "@components/features/header/Header";
import sxs from "./_styles";

const Main: FC<PropsWithChildren> = ({ children }) => (
    <Box sx={sxs.container}>
      <Header />
      {children}
    </Box>
  );

export default Main;
