import makeSx from "@utils/makeSx";

export default makeSx({
  header: {
    width: "100%",
    padding: {
      base: "1rem",
      lg: 0,
    },
    borderBottom: (theme) => `1px solid ${theme.colors.main["700"]}`,
  },
});
