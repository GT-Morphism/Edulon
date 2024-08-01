import { Type } from "@sinclair/typebox";

export const File = Type.Object({
  fieldname: Type.String(),
  filename: Type.String(),
  encoding: Type.String(),
  mimetype: Type.String(),
  buffer: Type.String({ format: "binary" }),
});

export const Files = Type.Array(File);

export const directusFilesResponseSchema = Type.Object({
  message: Type.String(),
});
