import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
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
    borderRadius: (theme) => theme.radii["xl"],
  },
});
