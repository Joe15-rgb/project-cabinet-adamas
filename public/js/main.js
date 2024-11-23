// Sélection des éléments
const dialogElem = document.getElementById("dialog");
const showBtn = document.querySelector(".show");
const closeBtn = document.querySelector(".close");
const inputFile = document.querySelector('.field.img input[type="file"]');
const preview = document.querySelector(".field.img #preview");

// Affichage du dialogue
showBtn?.addEventListener("click", () => {
  dialogElem?.showModal();
});

// Fermeture du dialogue
closeBtn?.addEventListener("click", () => {
  dialogElem?.close();
});

// Prévisualisation d'image
inputFile?.addEventListener("change", (event) => {
  const file = event.target.files[0];

  // Vérifier si un fichier a été sélectionné
  if (!file) {
    console.warn("Aucun fichier sélectionné.");
    return;
  }

  // Vérifier que le fichier est une image
  if (!file.type.startsWith("image/")) {
    console.error("Le fichier sélectionné n'est pas une image.");
    alert("Veuillez sélectionner un fichier image valide.");
    return;
  }

  // Générer un aperçu
  const objectUrl = URL.createObjectURL(file);
  preview.src = objectUrl;

  // Libérer l'URL précédente après chargement de l'image
  preview.onload = () => {
    URL.revokeObjectURL(objectUrl);
  };
});
