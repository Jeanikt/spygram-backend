import WebSocket from "ws";
import { FastifyInstance } from "fastify";
import scrapeFollowers from "../services/scraper";

export default async function routes(fastify: FastifyInstance) {
  fastify.get("/ws", { websocket: true }, (connection, req) => {
    console.log("Client connected");
  });
  // Rota para obter os seguidores de um usuário
  fastify.get("/api/users/:username/followers", async (request, reply) => {
    const { username } = request.params as { username: string };
    const result = await scrapeFollowers(username);

    if (result) {
      reply.send(result);
    } else {
      reply.status(404).send({ error: "User not found or scraping failed." });
    }
  });
}
