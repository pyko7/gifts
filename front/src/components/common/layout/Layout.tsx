import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const CommonLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box minH="100vh" backgroundColor="main.950" color="main.50">
    {children}
  </Box>
);

export default CommonLayout;
