import makeSx from "../../utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    height: "100%",
    padding: {
      base: "1rem",
      lg: 0,
    },
  },
  innerContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "25rem",
    height: "75%",
    maxHeight: {
      base: "30rem",
      lg: "none",
    },
    padding: "3rem 1rem",
    backgroundColor: (theme) => theme.colors.main[900],
    borderRadius: (theme) => theme.radii.xl,
    boxShadow: (theme) =>
      `${theme.colors.main[900]} 0px 4px 6px -1px, ${theme.colors.main[900]} 0px 2px 4px -1px`,

    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: (theme) => theme.radii.xl,
      background: (theme) =>
        `linear-gradient(200deg,${theme.colors.main[800]} .06%, ${theme.colors.main[900]})`,
    },
  },
  textContainer: {
    background: "red !important",
    "& *": {
      zIndex: 2,
    },
  },
  title: {
    fontSize: (theme) => theme.fontSizes["2xl"],
    fontWeight: (theme) => theme.fontWeights.semibold,
  },
  subtitle: {
    fontSize: (theme) => theme.fontSizes["sm"],
    color: (theme) => theme.colors.main[300],
  },
});
