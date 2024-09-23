import { FastifyRequest, FastifyReply } from "fastify";
import { instagramService } from "../services/instagramServices";

export const getUserFollowers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { username } = request.params as { username: string };
  const followers = await instagramService.getUserFollowers(username);
  reply.send({ followers });
};

export const monitorUser = (request: FastifyRequest, reply: FastifyReply) => {
  const { username } = request.body as { username: string };
  instagramService.monitorUser(username);
  reply.send({ message: `Now monitoring @${username}` });
};

export const stopMonitoringUser = (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { username } = request.body as { username: string };
  instagramService.stopMonitoringUser(username);
  reply.send({ message: `Stopped monitoring @${username}` });
};
