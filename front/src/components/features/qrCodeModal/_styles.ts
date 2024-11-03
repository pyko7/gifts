import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    maxHeight: "75% !important",
    padding: "1rem",
    backgroundColor: (theme) => theme.colors.main[600],
    borderRadius: (theme) => theme.radii.xl,
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
});
