import { Server } from "./server";
import cluster from "node:cluster";
import { availableParallelism } from "node:os";
import { cpus } from "os"; // Fallback in case availableParallelism is not supported
import { db } from "./config/database";
import SequelizeConnection from "./config/envConfig";

const PORT: number = 3000;
const numCPU: number = availableParallelism ? availableParallelism() : cpus().length;
const server = new Server(PORT);

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Créer un worker pour chaque CPU disponible
  for (let i = 0; i < numCPU; i++) {
    cluster.fork();
  }

  // Gérer la sortie d'un worker pour redémarrer automatiquement
  cluster.on("exit", (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} exited with code ${code} (${signal || "no signal"})`);

    // Redémarre un nouveau worker uniquement si l'ancien s'est arrêté avec une erreur
    if (code !== 0) {
      const newWorker = cluster.fork();
      console.log(`New worker ${newWorker.process.pid} started`);
    }
  });

  // Affiche un message lorsque chaque worker est opérationnel
  cluster.on("listening", (worker, address) => {
    console.log(`Worker ${worker.process.pid} is listening on port ${PORT}`);
  });

} else {
  // Démarre le serveur et la base de données dans chaque worker
  (async () => {
    try {
      // Connexion à la base de données
      await SequelizeConnection.connect();
      await db.sequelize.sync({ force: false, alter: false });
      console.log(`Database synchronized by worker ${process.pid}`);

      // Démarre le serveur
      await server.start();
      console.log(`Server started by worker ${process.pid} on port ${PORT}`);
    } catch (error) {
      console.error(`Worker ${process.pid} failed to start: ${error}`);
      process.exit(1); // Sortie du worker en cas d'erreur
    }
  })();
}
