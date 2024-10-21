import makeSx from "@utils/makeSx";

export default makeSx({
  menuTextImportant: {
    color: (theme) => theme.colors.error["600"],
  },
  menuIconImportant: {
    width: "1rem",
    height: "1rem",
    color: (theme) => theme.colors.error["600"],
  },
});
