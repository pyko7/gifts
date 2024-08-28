import makeSx from "@utils/makeSx";

export default makeSx({
  text: {
    margin: 0,
    padding: 0,
    zIndex: 2,
    fontSize: (theme) => theme.fontSizes["sm"],
    color: (theme) => theme.colors.error[600],
  },
});
