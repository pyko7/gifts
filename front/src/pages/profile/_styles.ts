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
    backgroundColor: (theme) => theme.colors.main["950"],
  },
});
