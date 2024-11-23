import express from "express";
import { IndexController } from "../Controllers";

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Accéder à la page d'accueil
 *     description: Renvoie le contenu de la page d'accueil.
 *     responses:
 *       200:
 *         description: Page d'accueil renvoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/", IndexController.homeHandler);
/**
 * @swagger
 * /ledger:
 *   get:
 *     summary: Accéder à la page  dossier
 *     description: Renvoie le contenu de la page dossier.
 *     responses:
 *       200:
 *         description: Page dossier (ledger) envoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/ledger", IndexController.ledgerHandler);
/**
 * @swagger
 * /people:
 *   get:
 *     summary: Accéder à la page  personnel
 *     description: Renvoie le contenu de la page personnel.
 *     responses:
 *       200:
 *         description: Page personnel (people) renvoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/people", IndexController.peopleHandler);
/**
 * @swagger
 * /report:
 *   get:
 *     summary: Accéder à la page  rapport
 *     description: Renvoie le contenu de la page rapport.
 *     responses:
 *       200:
 *         description: Page rapport (report) renvoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/report", IndexController.reportHandler);

export default router;
