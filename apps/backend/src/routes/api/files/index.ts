import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import {
  createDirectus,
  authentication,
  rest,
  uploadFiles,
  withToken,
} from "@directus/sdk";

const route: FastifyPluginAsyncTypebox = async (fastify, _opts) => {
  const client = createDirectus(fastify.config.DIRECTUS_URL)
    .with(authentication("cookie", { credentials: "include" }))
    .with(rest());

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Files"],
        summary: "Upload new files",
        description:
          "Fastify endpoint to upload a single or multiple files using the Directus SDK.",
      },
    },
    async (request, reply) => {
      try {
        const tokenFromRequest = request.unsignCookie(
          request.cookies.access_token || "",
        );
        const parts = request.files(); // get files from multipart
        const formData = new FormData();

        // assign files from request to a new form data for directus sdk
        for await (const part of parts) {
          if (part.type === "file") {
            const chunks: Uint8Array[] = [];

            for await (const chunk of part.file) {
              chunks.push(chunk);
            }

            const blob = new Blob(chunks, { type: part.mimetype });
            formData.append("file", blob, part.filename);
          }
        }

        // upload via directus sdk
        await client.request(
          withToken(tokenFromRequest.value || "", uploadFiles(formData)),
        );

        reply.status(200).send({
          ok: true,
        });
      } catch (error) {
        console.log("Error while uploading file to directus.");

        reply.status(400).send({
          ok: false,
        });
      }
    },
  );
};

export default route;
