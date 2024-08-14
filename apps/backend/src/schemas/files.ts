import { Type } from "@sinclair/typebox";

export const fileAssetParamsSchema = Type.Object({
  id: Type.String(),
  fileName: Type.String(),
});
