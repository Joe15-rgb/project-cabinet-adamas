import type { Model, ModelStatic } from "sequelize";
import type { Request, Response } from "express";

// Service avocat
function ServiceAvocat<M extends Model>(db: ModelStatic<M>) {
  return {
    /**
     * Crée un nouvel avocat dans la base de données.
     * @param req - Requête Express contenant les données de l'avocat.
     * @param res - Réponse Express pour envoyer le résultat.
     */
    createAvocat: async (req: Request, res: Response): Promise<void> => {
      try {
        // Récupérer les données du corps de la requête
        const data = req.body;
        console.log("🚀 ~ createAvocat: ~ data:", data)

        // Validation rapide des données (vous pouvez utiliser une lib comme Joi/Zod)
        if (!data.name || !data.specialty) {
          res.status(400).json({ error: "Les champs 'name' et 'specialty' sont requis." });
        }

        // Création de l'avocat dans la base de données
        // const newAvocat = await db.create(data);

        // Répondre avec succès
        // res.status(201).json(newAvocat);
        res.json(data)
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de la création d'un avocat:", error);
        res.status(500).json({ error: "Une erreur est survenue lors de la création de l'avocat." });
      }
    },
  };
}

export default ServiceAvocat;
