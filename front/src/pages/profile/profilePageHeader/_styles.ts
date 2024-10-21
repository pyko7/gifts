import makeSx from "@utils/makeSx";

export default makeSx({
  header: {
    display: {
      base: "flex",
      lg: "none",
    },
    padding: {
      base: "1rem",
      lg: "1rem 3rem",
    },
  },
  menuTextImportant: {
    color: (theme) => theme.colors.error["600"],
  },
  menuIconImportant: {
    width: "1rem",
    height: "1rem",
    color: (theme) => theme.colors.error["600"],
  },
});
