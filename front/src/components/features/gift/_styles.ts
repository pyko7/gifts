import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    padding: "1rem",
  },
  image: {
    position: "relative",
    width: "100%",
    maxWidth: "22rem",
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: (theme) => theme.radii.xl,
  },
  iconPlaceholder: {
    "& > svg": {
      color: (theme) => theme.colors.main[400],
    },
  },
});
