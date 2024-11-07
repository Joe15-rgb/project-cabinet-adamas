import type { Request, Response } from "express";
import { db } from 'App/config/database';

export class IndexController {
  static async homeHandler(req: Request, res: Response): Promise<void> {
    try {
      const app = {
        title: "Application Adamas",
        message: "Bonjour le monde!"
      };

      const clients = await db.clientModel.findAll()
      // res.status(200).render("index", { app, clients });
      res.json(clients)
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }

  static async aboutHandler(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).render("about")
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }
}
