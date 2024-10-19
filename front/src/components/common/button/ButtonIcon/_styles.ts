import makeSx from "../../../../utils/makeSx";

export default makeSx({
  buttonBase: {
    padding: 0,
    color: "inherit",
    "& > *": {
      width: "100%",
      height: "100%",
    },
    "&:hover": {
      backgroundColor: "transparent ",
    },
  },
});
