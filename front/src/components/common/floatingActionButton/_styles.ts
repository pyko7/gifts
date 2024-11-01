import makeSx from "@utils/makeSx";

export default makeSx({
  buttonContainer: {
    position: "sticky",
    bottom: "3rem",
    left: "75%",
    display: {
      base: "block",
      md: "none",
    },
  },
  addButton: {
    width: "3rem",
    height: "3rem",
    padding: "0.5rem",
    backgroundColor: (theme) => theme.colors.main[200],
    borderRadius: (theme) => theme.radii.full,
    "& > *": {
      color: (theme) => `${theme.colors.main[950]} !important`,
    },
  },
});
