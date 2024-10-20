import makeSx from "@utils/makeSx";

export default makeSx({
  header: {
    width: "100%",
    padding: {
      base: "1rem",
      lg: "1rem 3rem",
    },
    borderBottom: (theme) => `1px solid ${theme.colors.main["700"]}`,
  },
});
