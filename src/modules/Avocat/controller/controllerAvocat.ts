import ServiceAvocat from "../services/serviceAvocat";
import { db } from "App/config/database";
import type { Request, Response } from "express";

export class AvocatController {
  static async createAvocat(req: Request, res: Response): Promise<void> {
    try {
      const { Nom, Prenom, Specialite, Barreau, Email, Telephone, Statut, Sexe } = req.body;

      // Validation des données d'entrée
      if (!Nom || !Prenom || !Email) {
        res.status(400).send("Nom, Prenom et Email sont requis.");
      }

      // Création d'un nouvel avocat
      const avocat = await db.avocatModel.create({
        Nom,
        Prenom,
        Specialite,
        Barreau,
        Email,
        Telephone,
        Statut,
        Profile: req.file?.path,
        Sexe,
      });

      // Récupération de tous les avocats après l'ajout
      const avocats = await db.avocatModel.findAll();

      // Rendu de la vue avec la liste mise à jour des avocats
      res.status(201).render("components/contentPeople", { avocats });
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un avocat:", error);
      res.status(500).send("Une erreur est survenue lors de l'ajout de l'avocat, veuillez réessayer plus tard.");
    }
  }

  static async getAvocats(req: Request, res: Response): Promise<void> {
    try {
      const avocats = await db.avocatModel.findAll({ raw: true, });
      // res.status(200).json(avocats);

      res.status(200).render("components/contentPeople", { avocats });
      console.log(avocats)
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de getAvocats:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }
}
