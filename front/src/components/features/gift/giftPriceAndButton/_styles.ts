import makeSx from "@utils/makeSx";

export default makeSx({
  price: {
    fontSize: (theme) => ({
      base: theme.fontSizes["2xl"],
      lg: theme.fontSizes["4xl"],
    }),
  },
  button: {
    width: "50%",
    maxWidth: "14rem",
  },
});
