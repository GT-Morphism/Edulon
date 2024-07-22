import type { FastifyPluginAsync } from "fastify";
// import Pocketbase from "pocketbase";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // const pb = new Pocketbase("http://localhost:8080");

  // const authData = await pb.admins.authWithPassword("g@g.com", "giuseppe12345");

  // const records = await pb.collection("Lecture").getFullList({
  //   sort: "-created",
  //   headers: {
  //     Authorization: authData.token,
  //   },
  // });

  fastify.get("/", async function (request, reply) {
    return "Nice";
  });
};

export default root;
