import fastify from "fastify";
import cors from "@fastify/cors";
import websocket from "@fastify/websocket";
import { config } from "./config/environment";
import routes from "./routes";

const app = fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

app.register(cors, {
  origin: config.clientUrl,
  credentials: true,
});

app.register(websocket);

app.register(routes);

const start = async () => {
  try {
    await app.listen({ port: config.port, host: "0.0.0.0" });
    console.log(`Server is running on http://localhost:${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
