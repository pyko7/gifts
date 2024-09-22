import { extendTheme } from "@chakra-ui/react";

const colors = {
  main: {
    950: "#0a0a0a",
    900: "#171717",
    800: "#262626",
    700: "#404040",
    600: "#525252",
    500: "#737373",
    400: "#a3a3a3",
    300: "#d4d4d4",
    200: "#e5e5e5",
    100: "#f5f5f5",
    50: "#fafafa",
  },
  success: {
    600: "#16a34a",
    500: "#22c55e",
  },
  error: {
    600: "#dc2626",
    500: "#ef4444",
  },
  warning: {
    600: "#f59e0b",
    500: "#fbbf24",
  },
};

export const theme = extendTheme({
  colors,
  components: {
    Input: {
      baseStyle: {
        field: {
          borderColor: "main.700",
          borderWidth: 1,
          background: "transparent",
          _placeholder: {
            color: "main.50",
          },
          _invalid: {
            borderColor: "error.600",
          },
          _hover: {
            borderColor: "main.500",
          },
          _focus: {
            borderColor: "main.500",
          },
        },
      },
      defaultProps: {
        //used to clear default style
        variant: null,
      },
    },
  },
});