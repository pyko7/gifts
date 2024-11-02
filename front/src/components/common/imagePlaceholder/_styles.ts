import makeSx from "@utils/makeSx";

export default makeSx({
  placeholder: {
    width: "100%",
    maxWidth: "22rem",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: (theme) => theme.radii.xl,
    backgroundColor: (theme) => theme.colors.main[700],
  },
});
