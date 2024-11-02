import makeSx from "@utils/makeSx";

export default makeSx({
  title: {
    fontSize: (theme) => ({
      base: theme.fontSizes["2xl"],
      lg: theme.fontSizes["5xl"],
    }),
  },
  description: {
    color: (theme) => theme.colors.main[300],
  },
});
