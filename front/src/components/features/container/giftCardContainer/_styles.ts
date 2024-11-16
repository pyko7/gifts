import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: {
      base: "column",
      md: "row",
    },
    alignItems: "center",
    flexWrap: {
      md: "wrap",
    },
    gap: "2rem",
  },
  innerContainer: {
    width: {
      base: "100%",
      md: "calc(50% - 2rem)",
      lg: "calc(33% - 2rem)",
    },
    maxWidth: "19rem",
    justifyContent: "center",
  },
  skeleton: {
    width: "100%",
    borderRadius: (theme) => theme.radii["xl"],
  },
});
