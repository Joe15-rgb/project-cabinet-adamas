import type { Request, Response, NextFunction } from "express";
import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379", // Remplacez par l'URL de votre instance Redis
});

redisClient.on("error", (err) => {
  console.error("Erreur de connexion à Redis:", err);
});

(async () => {
  await redisClient.connect();
})();

// Middleware pour la gestion du cache
export const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cacheKey = req.originalUrl; // Utiliser l'URL comme clé de cache

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      // Retourner les données en cache
      console.log("Données récupérées depuis le cache");
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      // Redéfinir la méthode res.json pour stocker dans le cache
      const originalJson = res.json.bind(res);

      res.json = (data: any) => {
        // Stocker les données en cache avec une expiration (ex: 1 heure)
        redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
        return originalJson(data);
      };

      next();
    }
  } catch (error) {
    console.error("Erreur dans le middleware de cache:", error);
    next();
  }
};
