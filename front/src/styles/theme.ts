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
    Button: {
      baseStyle: {
        _disabled: {
          bg: "main.500",
          color: "main.200",
          cursor: "default",
          opacity: 0.7,
          _active: {
            bg: "main.500 !important",
          },
          _hover: {
            bg: "main.500 !important",
          },
        },
      },
    },
    Drawer: {
      baseStyle: {
        dialog: {
          bg: "main.900",
          color: "main.200",
        },
        // Customize header styles
        header: {},
        // Customize footer styles
        footer: {},
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          bg: "main.950",
          opacity: "0.75 !important",
        },
        dialog: {
          height: "100%",
          bg: "transparent",
          color: "main.200",
          margin: 0,
        },
        body: {
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        },
        closeButton: {
          position: "absolute",
          top: {
            base: "1rem",
            lg: "2rem",
          },
          right: {
            base: "1rem",
            lg: "2rem",
          },
          zIndex: 3,
          "& > svg": {
            width: "1.25rem",
            height: "1.25rem",
          },
          color: "main.200",
          _hover: {
            color: "main.50",
          },
        },
        // Customize header styles
        header: {},
        // Customize footer styles
        footer: {},
      },
    },
    Menu: {
      baseStyle: {
        list: {
          bg: "main.900",
          color: "white",
          border: "none",
          padding: "0.5rem",
        },
        item: {
          bg: "transparent",
          color: "main.200",
          borderRadius: "0.35rem",
          _hover: {
            bg: "main.800",
          },
          _focus: {
            bg: "main.800",
          },
        },
      },
    },
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
    Textarea: {
      baseStyle: {
        borderColor: "main.700",
        background: "transparent",
        borderWidth: 1,
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
      defaultProps: {
        //used to clear default style
        variant: null,
      },
    },
  },
});
