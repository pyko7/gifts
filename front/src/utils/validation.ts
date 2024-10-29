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

export const isNameValid = (name: string) =>
  name && name.trim().length > 0 ? undefined : "Veuillez entrer un nom";

export const isUrlValid = (url: string) =>
  url.slice(0, 5) === "https" ? undefined : "Veuillez entrer un nom valide";
