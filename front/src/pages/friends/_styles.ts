import makeSx from "@utils/makeSx";

export default makeSx({
  page: {
    width: "100%",
    minHeight: "100vh",
    position: {
      base: "absolute",
      md: "static",
    },
    top: 0,
    left: 0,
    padding: {
      base: 0,
      md: "1rem 5rem",
    },
    backgroundColor: (theme) => theme.colors.main["950"],
  },
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
