import makeSx from "../../../../utils/makeSx";

export default makeSx({
  button: {
    width: "1rem",
    height: "1rem",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent ",
    },
  },
  icon: {
    width: "100%",
    height: "100%",
    color: (theme) => theme.colors.main[500],
    "&:hover": {
      color: (theme) => theme.colors.main[300],
    },
  },
});
