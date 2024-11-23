import type { Application, Request, Response, NextFunction } from "express";
import express from "express";
import indexRoute from "./modules/User/router/userRoutes";
import compression from "compression";
import { errorHandler } from "./errors/errorHandler";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import * as rfs from "rotating-file-stream";
import path from "path";
import { fileURLToPath } from "url";
import fs from "node:fs";
import dotenv from "dotenv";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import winston from "winston";
import session from "express-session";
import figlet from 'figlet';
import chalk from 'chalk';
import avocatRoute from "./modules/Avocat/routes/avocatRoute"


// Gestion de __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "logs");

// Charger les variables d'environnement
dotenv.config();

// Limiteur de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500, //100
  message: "Trop de requêtes effectuées depuis cette IP, veuillez réessayer plus tard.",
});

// Configuration de Winston pour les logs
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, "error.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logsDir, "combined.log") }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Server
export class Server {
  private readonly PORT: number;
  private app: Application;

  constructor(port: number = Number(process.env.PORT) || 3000) {
    this.PORT = port;
    this.app = express();
    this.initialMiddleware();
    this.initialRoutes();
    this.initialErrorHandler();
  }

  // Initialisation des middlewares
  private initialMiddleware(): void {
    // Sécurité avancée avec Helmet
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "script-src": ["'self'", "trustedscripts.com"], // Exemple : ajout de sources de scripts de confiance
          "object-src": ["'none'"],                      // Interdire les objets pour éviter les attaques XSS
          "img-src": ["'self'", "data:", "blob:", "images.com"],   // Exemples de directives CSP
        },
      },
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },
      crossOriginEmbedderPolicy: true,
      crossOriginOpenerPolicy: { policy: "same-origin" },
      crossOriginResourcePolicy: { policy: "same-origin" },
      hidePoweredBy: true,
    }));

    // CORS pour limiter les ressources
    this.app.use(
      cors({
        origin: (origin, callback) => {
          const allowedOrigins = ["http://localhost:3000", "https://trusted-domain.com"];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );


    //session configs
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "default_secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Seulement en HTTPS
          maxAge: 60 * 60 * 1000, // 1 heure
        },
      })
    );


    // Limitation de taux pour les attaques DoS
    this.app.use(limiter);

    // Logger HTTP avec Morgan et rotation de fichier
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    const accessLogStream = rfs.createStream("access.log", {
      interval: "1d",
      path: logsDir,
    });
    this.app.use(morgan("combined", { stream: accessLogStream }));

    // Compression des réponses
    this.app.use(compression());

    // Analyser les requêtes JSON et URL encodées
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Vue et fichiers statiques
    this.app.set("view engine", "ejs");
    this.app.use("/public", express.static("public"));
    this.app.use("/uploads", express.static("uploads"));
  }

  // Déclaration des routes de l'application
  private initialRoutes(): void {
    const swaggerDocs = swaggerJsDoc({
      swaggerDefinition: {
        openapi: "3.0.0",
        info: {
          title: "API Documentation",
          version: "1.0.0",
          description: "Documentation de l'API pour l'application Adamas",
        },
        servers: [
          {
            url: "http://localhost:3000",
          },
        ],
      },
      apis: [
        "./src/modules/user/router/userRoutes.ts",
        "./src/modules/Avocat/routes/avocatRoute.ts"],
    });

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    this.app.use("/", indexRoute);
    this.app.use("/avocat", avocatRoute)
  }

  // Gestionnaire d'erreurs global
  private initialErrorHandler(): void {
    this.app.use(errorHandler);

    // Gestion des routes non trouvées
    this.app.use((req: Request, res: Response) => {
      logger.warn(`Route non trouvée: ${req.originalUrl}`);
      res.status(404).json({ message: "Route non trouvée" });
    });

    // Gestionnaire d'erreurs générique
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      logger.error(`Erreur serveur: ${err.message}`);
      res.status(500).json({ message: "Erreur serveur" });
    });
  }

  // Méthode pour démarrer le serveur
  public async start(): Promise<void> {
    try {
      this.app.listen(this.PORT, () => {
        figlet('CABINET APP ADAMAS', (err: any, data: any) => {
          if (err) {
            console.log('Une erreur est survenue...');
            console.dir(err);
            return;
          }
          console.log(chalk.green(data));
          console.log(chalk.green.bold(`Serveur en cours d'exécution sur:`));
          console.log(chalk.underline.blue.bold(`http://localhost:${this.PORT}`));
        });
      });
    } catch (error) {
      logger.error(`Erreur lors du démarrage du serveur: ${error}`);
      process.exit(1); // Ferme l'application en cas d'erreur critique
    }
  }
}
