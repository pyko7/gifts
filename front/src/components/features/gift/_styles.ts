import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    padding: "1rem",
  },
  image: {
    aspectRatio: "1 / 1",
    objectFit: "cover",
    borderRadius: (theme) => theme.radii.xl,
  },
});
