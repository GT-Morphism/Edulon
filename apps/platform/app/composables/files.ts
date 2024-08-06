import type { paths } from "~~/swagger";

export async function uploadFiles(files: File[]) {
  console.log("Files to upload:", files);

  const formData = new FormData();

  for (const file of files) {
    formData.append("files", file);
  }

  console.log("Current FormData contents:", formData.getAll("file"));

  const response = await $fetch<
    paths["/api/files/"]["post"]["responses"]["200"]["content"]
  >("http://localhost:5555/api/files", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  console.log("uploading files; response:", response);
}
