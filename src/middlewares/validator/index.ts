import Joi from "joi";
import { AvocatStatut } from 'App/types/enums';
import type { IAvocat as AvocatAttributes } from "App/modules/Avocat/interfaces/AvocatInterface";

class Validator {
  /**
   * Valide les données pour la création ou la mise à jour d'un avocat.
   * @param body - Données de l'avocat à valider.
   * @returns Les résultats de la validation.
   */
  private static avocatData(body: Partial<AvocatAttributes>) {
    const schemaAvocat = Joi.object({
      Nom: Joi.string().required().messages({
        "string.base": "Le nom doit être une chaîne de caractères.",
        "any.required": "Le nom est obligatoire.",
      }),
      Prenom: Joi.string().required().messages({
        "string.base": "Le prénom doit être une chaîne de caractères.",
        "any.required": "Le prénom est obligatoire.",
      }),
      Specialite: Joi.string().required().messages({
        "string.base": "La spécialité doit être une chaîne de caractères.",
        "any.required": "La spécialité est obligatoire.",
      }),
      Barreau: Joi.string().required().messages({
        "string.base": "Le barreau doit être une chaîne de caractères.",
        "any.required": "Le barreau est obligatoire.",
      }),
      Email: Joi.string().email().required().messages({
        "string.email": "L'email doit être valide.",
        "any.required": "L'email est obligatoire.",
      }),
      Telephone: Joi.string().required().messages({
        "string.base": "Le téléphone doit être une chaîne de caractères.",
        "any.required": "Le téléphone est obligatoire.",
      }),
      Statut: Joi.string()
        .valid(...Object.values(AvocatStatut))
        .required()
        .messages({
          "any.only": `Le statut doit être l'un des suivants : ${Object.values(AvocatStatut).join(", ")}.`,
          "any.required": "Le statut est obligatoire.",
        }),
    });

    // Valider les données et retourner le résultat
    return schemaAvocat.validate(body, { abortEarly: false });
  }

  /**
   * Méthode publique pour valider un avocat.
   * @param body - Données à valider.
   * @returns Objet contenant les erreurs ou les données validées.
   */
  static avocat(body: Partial<AvocatAttributes>) {
    const { error, value } = Validator.avocatData(body);

    if (error) {
      // Retourne une liste d'erreurs détaillées
      return {
        valid: false,
        errors: error.details.map((detail) => detail.message),
      };
    }

    // Si aucune erreur, retourne les données validées
    return {
      valid: true,
      data: value,
    };
  }
}

export default Validator;
