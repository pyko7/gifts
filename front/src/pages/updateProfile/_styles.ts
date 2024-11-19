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
    maxWidth: "40rem",
    margin: "0 auto",
  },
  item: {
    cursor: "pointer",
    textAlign: "left",
    padding: "1rem",
    "&:hover": {
      opacity: 0.8,
      backgroundColor: (theme) => theme.colors.main[900],
    },
  },
});
