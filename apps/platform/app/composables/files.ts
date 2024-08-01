import type { paths } from "~~/swagger";

export async function uploadFiles(formData: FormData) {
  console.log(formData);

  const response = await $fetch<
    paths["/api/files/"]["post"]["responses"]["200"]["content"]
  >("http://localhost:5555/api/files", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    credentials: "include",
  });

  console.log("uploading file; response:", response);
}
