import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "50%",
    position: "relative",
  },
  innerContainer: {
    width: "100%",
  },
  icon: {
    position: "absolute",
    zIndex: 3,
    top: 1,
    right: 1,
    backgroundColor: "rgba(0,0,0, 0.5)",
    borderRadius: (theme) => theme.radii.full,
  },
  image: {
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
  },
});
