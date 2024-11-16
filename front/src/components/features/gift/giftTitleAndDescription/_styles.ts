import makeSx from "@utils/makeSx";

export default makeSx({
  title: {
    fontSize: (theme) => ({
      base: theme.fontSizes["2xl"],
      lg: theme.fontSizes["5xl"],
    }),
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    fontWeight: (theme) => theme.fontWeights.semibold,
    color: (theme) => theme.colors.main[200],
  },
  icon: {
    width: "1rem",
    height: "1rem",
  },
  description: {
    color: (theme) => theme.colors.main[300],
  },
});
