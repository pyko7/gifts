import makeSx from "@utils/makeSx";

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
    maxWidth: {
      base: "25rem",
      lg: "30rem",
    },
    height: "75%",
    padding: {
      base: "3rem 1.5rem",
      lg: "3rem",
    },
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
    "& *": {
      zIndex: 2,
    },
  },
  textContainer: {
    "& *": {
      zIndex: 2,
    },
  },
  icon: {
    marginBottom: "1rem",
    "& *": {
      width: "1.5rem",
      height: "1.5rem",
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
  cancelButton: {
    color: (theme) => theme.colors.main[600],
    "&:hover": {
      backgroundColor: "transparent",
      color: (theme) => theme.colors.main[200],
    },
  },
});
