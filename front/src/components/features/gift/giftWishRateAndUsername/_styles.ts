import makeSx from "@utils/makeSx";

export default makeSx({
  iconContainer: {
    width: "1.25rem",
    "& *": {
      width: "100%",
      height: "100%",
    },
  },
  userName: {
    fontWeight: (theme) => theme.fontWeights.semibold,
    color: (theme) => theme.colors.main[100],
  },
  hiddenOnMobile: {
    display: {
      base: "none",
      md: "block",
    },
  },
});
