import makeSx from "@utils/makeSx";

export default makeSx({
  drawerLinks: {
    fontSize: "1.25rem",
  },
  drawerFooter: {
    width: "100%",
  },
  drawerIconContainer: {
    width: "1.25rem",
    height: "1.25rem",
    "& *": {
      width: "100%",
      height: "100%",
    },
  },
  link: {
    color: (theme) => theme.colors.main[300],
    fontWeight: (theme) => theme.fontWeights.normal,
    fontSize: "1.25rem",
  },
});
