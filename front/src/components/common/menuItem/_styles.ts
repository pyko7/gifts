import makeSx from "@utils/makeSx";

export default makeSx({
  item: {
    paddingRight: 0,
    "& .chakra-menu__icon-wrapper": {
      width: "1.25rem",
      height: "1.25rem",
    },
    "& span": {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "0.5rem",
    },
  },

  icon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  button: {
    width: "1.15rem",
    height: "1.15rem",
    cursor: "pointer",
    pointerEvents: "auto",
  },
});
