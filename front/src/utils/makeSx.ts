import { SystemStyleObjectRecord } from "@chakra-ui/react";

const makeSx = <T extends SystemStyleObjectRecord>(sx: T): T => sx;

export default makeSx;
