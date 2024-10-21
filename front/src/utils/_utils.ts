export const generateUniqueId = (): number =>
  Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

export const kebabToCamel = (kebab: string): string =>
  kebab
    .split("-")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
