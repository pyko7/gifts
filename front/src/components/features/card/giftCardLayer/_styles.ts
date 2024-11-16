import makeSx from "@utils/makeSx";

export default makeSx({
  cardImageLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: (theme) => theme.radii.lg,
    borderBottomRadius: "none",
    backgroundColor: (theme) => theme.colors.main[950],
    opacity: 0.9,
    zIndex: 2,
  },
  cardImageLayerText: {
    fontSize: (theme) => theme.fontSizes["2xl"],
    color: (theme) => theme.colors.main[200],
  },
});
