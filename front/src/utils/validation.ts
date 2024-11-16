export const isEmailValid = (email: string) => {
  const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const match = regex.test(email);
  return match ? undefined : "Veuillez saisir une adresse email valide";
};

export const isPasswordValid = (password: string) => {
  if (password.length < 8) {
    return "Le mot de passe doit contenir au moins 8 caractères";
  }
  const regex = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
  const match = regex.test(password);
  return match
    ? undefined
    : "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre ainsi qu'un caractère spécial";
};

/**
 *
 * @param {string} password value in password input
 * @param {string} confirmPassword value in confirmPassword input
 */
export const isConfirmPasswordValid = (
  password: string,
  confirmPassword: string
): string | undefined => {
  const invalidConfirmPassword = isPasswordValid(confirmPassword);
  if (invalidConfirmPassword) return invalidConfirmPassword;
  if (password !== confirmPassword) {
    return "Les mots de passe doivent être similaire";
  }
  return undefined;
};

export const isNameValid = (name: string) =>
  name && name.trim().length > 0 ? undefined : "Veuillez entrer un nom";

export const isUrlValid = (url: string) =>
  url.slice(0, 5) === "https" ? undefined : "Veuillez entrer un lien valide";

export const isWishRateValid = (rate: string) => {
  const rateNumber = parseInt(rate);
  const error = "Veuillez entrer une valeur entre 1 et 5";
  if (isNaN(rateNumber)) return error;
  return rateNumber < 6 && rateNumber > 0 ? undefined : error;
};

export const isPriceValid = (val: string) => {
  const regex = /^-?\d+(,\d+)?$/;
  const match = regex.test(val);
  return val.length > 0 && match ? undefined : "Veuillez entrer un prix valide";
};
