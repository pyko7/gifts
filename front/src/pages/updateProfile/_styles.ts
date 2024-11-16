import makeSx from "@utils/makeSx";

export default makeSx({
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
