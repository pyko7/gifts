import makeSx from "@utils/makeSx";

export default makeSx({
  gitfButton: {
    display: {
      base: "none",
      md: "block",
    },
  },
  menuTextImportant: {
    color: (theme) => theme.colors.error["600"],
  },
  menuIconBase: {
    width: "1rem",
    height: "1rem",
  },
  menuIconImportant: {
    width: "1rem",
    height: "1rem",
    color: (theme) => theme.colors.error["600"],
  },
});
