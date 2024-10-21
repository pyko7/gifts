import makeSx from "@utils/makeSx";

export default makeSx({
  profileHeaderText: {
    fontSize: (theme) => theme.fontSizes["xl"],
    fontWeight: (theme) => theme.fontWeights.bold,
  },
  profileHeaderTextLight: {
    color: (theme) => theme.colors.main["500"],
  },
});
