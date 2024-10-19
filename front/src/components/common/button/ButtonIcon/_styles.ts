import makeSx from "../../../../utils/makeSx";

export default makeSx({
  button: {
    width: "1rem",
    height: "1rem",
    padding: 0,
    color: "inherit",
    "& > svg": {
      width: "1.25rem",
      height: "1.25rem",
      color: (theme) => theme.colors.main[500],
      "&:hover": {
        color: (theme) => theme.colors.main[300],
      },
    },
    "&:hover": {
      backgroundColor: "transparent ",
    },
  },
});
