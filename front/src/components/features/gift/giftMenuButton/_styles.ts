import makeSx from "@utils/makeSx";

export default makeSx({
  menuTextImportant: {
    color: (theme) => theme.colors.error["600"],
  },
  menuIconBase: {
    width: "1rem",
    height: "1rem",
  },
  menuIconImportant: {
    color: (theme) => theme.colors.error["600"],
  },
});
