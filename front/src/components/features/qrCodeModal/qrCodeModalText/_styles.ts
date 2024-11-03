import makeSx from "@utils/makeSx";

export default makeSx({
  title: {
    color: (theme) => theme.colors.main[200],
    fontSize: (theme) => theme.fontSizes["2xl"],
  },
  subtitle: {
    color: (theme) => theme.colors.main[500],
  },
});
