export const copyToClipboard = () => {
  if (translatedText) {
    navigator.clipboard
      .writeText(translatedText)
      .then(() => {
        console.log("Texte copié dans le presse-papiers");
      })
      .catch((err) => {
        console.error("Erreur lors de la copie dans le presse-papiers", err);
      });
  }
};
