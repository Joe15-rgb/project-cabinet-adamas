import { Router } from "express";
import { AvocatController } from "../controller/controllerAvocat";
import { upload } from "App/utils/uploader";

const router = Router();

/**
 * @swagger
 * /people/getAvocat:
 *   get:
 *     summary: Accéder à la liste des avocats
 *     description: Renvoie le contenu de la liste des avocats.
 *     responses:
 *       200:
 *         description: Liste des avocats renvoyée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/getAvocat", AvocatController.getAvocats);

/**
 * @swagger
 * /people/addAvocat:
 *   post:
 *     summary: Ajouter un nouvel avocat
 *     description: Permet d'ajouter un avocat avec les détails fournis.
 *     parameters:
 *       - name: thumbnail
 *         in: formData
 *         required: false
 *         type: file
 *         description: Image du profil de l'avocat (facultatif)
 *       - name: Nom
 *         in: formData
 *         required: true
 *         type: string
 *       - name: Prenom
 *         in: formData
 *         required: true
 *         type: string
 *       - name: Specialite
 *         in: formData
 *         required: false
 *         type: string
 *       - name: Barreau
 *         in: formData
 *         required: false
 *         type: string
 *       - name: Email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: Telephone
 *         in: formData
 *         required: false
 *         type: string
 *       - name: Statut
 *         in: formData
 *         required: false
 *         type: string
 *       - name: Sexe
 *         in: formData
 *         required: false
 *         type: string
 *     responses:
 *       201:
 *         description: Avocat ajouté avec succès
 *       400:
 *         description: Requête invalide, données manquantes ou incorrectes
 *       500:
 *         description: Erreur interne du serveur
 */
router.post("/addAvocat", upload.single("thumbnail"), AvocatController.createAvocat);

export default router;
