import makeSx from "@utils/makeSx";

export default makeSx({
  profileHeader: {
    width: "100%",
    justifyContent: "space-between",
    gap: "1rem",
  },
  profileHeaderInnerContainer: {
    width: "100%",
    flexDirection: {
      base: "column",
      md: "row",
    },
    alignItems: "center",
    gap: {
      md: "1rem",
    },
  },
  profileHeaderTextContainer: {
    flexDirection: "column",
    alignItems: {
      base: "center",
      md: "flex-start",
    },
  },
  profileHeaderText: {
    fontSize: (theme) => theme.fontSizes["xl"],
    fontWeight: (theme) => theme.fontWeights.bold,
  },
  profileHeaderTextLight: {
    color: (theme) => theme.colors.main["500"],
  },
  profileHeaderMenuButton: {
    display: {
      base: "none",
      md: "flex",
    },
    alignItems: "flex-start",
  },
});
