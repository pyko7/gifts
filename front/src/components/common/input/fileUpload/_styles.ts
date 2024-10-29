import makeSx from "@utils/makeSx";

export default makeSx({
  container: {
    width: "100%",
    padding: "1rem",
    borderColor: "main.700",
    borderWidth: 1,
    borderRadius: (theme) => theme.radii.md,
    backgroundColor: (theme) => theme.colors.main[700],
    cursor: "pointer",
    transition: "opacity 0.15s ease-in-out",
    "&:hover": {
      opacity: 0.75,
    },
    "& *": {
      cursor: "pointer",
      color: (theme) => theme.colors.main[200],
    },
  },
  icon: {
    width: "1.5rem",
    height: "1.5rem",
  },
});
