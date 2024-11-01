import makeSx from "@utils/makeSx";

export default makeSx({
  iconContainer: {
    width: "1.25rem",
    "& *": {
      width: "100%",
      height: "100%",
    },
  },
  title: {
    fontSize: (theme) => theme.fontSizes["2xl"],
  },
  description: {
    color: (theme) => theme.colors.main[300],
  },
  price: {
    fontSize: (theme) => theme.fontSizes["2xl"],
  },
  button: {
    width: "50%",
  },
});
