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
 * /about:
 *   get:
 *     summary: Accéder à la page d'a propos
 *     description: Renvoie le contenu de la page a propos.
 *     responses:
 *       200:
 *         description: Page d'apropos renvoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/about", IndexController.aboutHandler);

export default router;
