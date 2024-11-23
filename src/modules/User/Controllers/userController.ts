import type { Request, Response } from "express";
import { db } from 'App/config/database';

export class IndexController {
  static async homeHandler(req: Request, res: Response): Promise<void> {
    try {
      const app = {
        title: "Application Adamas",
        message: "Bonjour le monde!"
      };

      // const clients = await db.clientModel.findAll()
      res.status(200).render("index", { app });
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }

  static async ledgerHandler(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).render("ledger")
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }
  static async peopleHandler(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).render("people")
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }
  static async reportHandler(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).render("report")
    } catch (error) {
      console.error("Erreur survenue lors de l'exécution de homeHandler:", error);
      res.status(500).send("Une erreur est survenue, veuillez réessayer plus tard.");
    }
  }
}
