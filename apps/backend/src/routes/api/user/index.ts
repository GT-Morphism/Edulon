import { type FastifyPluginAsync } from "fastify";
import { type Static, Type } from "@sinclair/typebox";
import { type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import PocketBase from "pocketbase";

const NewUser = Type.Object({
  username: Type.String(),
  email: Type.String({ format: "email" }),
  password: Type.String(),
  passwordConfirm: Type.String(),
  name: Type.String(),
});

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<TypeBoxTypeProvider>();
  fastify.get("/", async function (request, reply) {
    return { name: "Giuseppe" };
  });

  fastify.post<{
    Body: Static<typeof NewUser>;
    Request: Static<typeof NewUser>;
  }>("/", { schema: { body: NewUser } }, async (request, reply) => {
    const pb = new PocketBase("http://127.0.0.1:8080");

    // example create data
    const data = {
      username: request.body.username,
      email: request.body.email,
      emailVisibility: true,
      password: request.body.password,
      passwordConfirm: request.body.passwordConfirm,
      name: request.body.name,
    };

    const record = await pb.collection("users").create(data);

    // (optional) send an email verification request
    await pb.collection("users").requestVerification(request.body.email);

    console.log(record);
  });
};

export default root;
