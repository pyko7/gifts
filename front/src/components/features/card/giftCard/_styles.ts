import makeSx from "@utils/makeSx";

export default makeSx({
  card: {
    margin: "2rem",
    backgroundColor: "transparent",
    border: (theme) => `1px solid ${theme.colors.main["700"]}`,
    borderRadius: (theme) => theme.radii["xl"],
  },
  cardImage: {
    width: "100%",
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
});
