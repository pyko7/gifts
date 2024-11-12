import makeSx from "@utils/makeSx";

export default makeSx({
  card: {
    width: "100%",
    backgroundColor: "transparent",
    border: (theme) => `1px solid ${theme.colors.main["700"]}`,
    borderRadius: (theme) => theme.radii["xl"],
    "&:hover": {
      backdropFilter: "brightness(140%)",
      borderColor: (theme) => theme.colors.main["600"],
    },
  },
  cardImage: {
    width: "100%",
    height: "100%",
    aspectRatio: "1/1",
    objectFit: "cover",
  },
  cardBody: {
    padding: 0,
  },
  cardIcon: {
    width: "1.25rem",
    height: "1.25rem",
  },
  cardFooter: {
    color: (theme) => theme.colors.main["200"],
  },
  cardFooterTitle: {
    fontWeight: "bold",
  },
  cardFooterSubText: {
    color: (theme) => theme.colors.main["500"],
  },
  cardWishRateContainer: {
    width: "fit-content",
    height: "fit-content",
  },
  iconPlaceholder: {
    "& > svg": {
      color: (theme) => theme.colors.main[400],
    },
  },
});
