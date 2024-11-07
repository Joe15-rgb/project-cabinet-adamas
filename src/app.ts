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

  // Écoute l'événement 'exit' pour redémarrer un worker s'il meurt
  cluster.on("exit", (worker, code, signal) => {
    console.error(`Worker ${worker.process.pid} exited with code ${code} (${signal || "no signal"})`);

    // Redémarre un nouveau worker en cas de crash
    const newWorker = cluster.fork();
    console.log(`New worker ${newWorker.process.pid} started`);
  });

  // Affiche un message lorsque chaque worker est opérationnel
  cluster.on("listening", (worker, address) => {
    console.log(`Worker ${worker.process.pid} is listening on port ${PORT}`);
  });

} else {
  // Dans un worker, démarre le serveur
  server.start().then(() => {
    console.log(`Server started by worker ${process.pid} on port ${PORT}`);
  }).catch((error: any) => {
    console.error(`Worker ${process.pid} failed to start the server: ${error.message}`);
    process.exit(1); // Sortie du worker en cas d'erreur
  });

  (async () => {
    await SequelizeConnection.connect()

    db.sequelize.sync({
      force: false,
      alter: false
    })
  })()

}
