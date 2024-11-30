import makeSx from "@utils/makeSx";

export default makeSx({
  badge: {
    position: "absolute",
    top: -1,
    right: 0,
    width: "20px",
    height: "20px",
    paddingX: "6px",
    backgroundColor: (theme) => theme.colors.error[600],
    fontSize: "0.75rem",
    borderRadius: (theme) => theme.radii.full,
    zIndex: 2,
  },
});
