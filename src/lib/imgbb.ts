export const uploadToImgbb = async (file: File): Promise<string> => {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) {
    throw new Error("Image upload is not configured. Paste an image URL instead.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
    method: "POST",
    body: formData,
  });
  const result = await res.json();

  if (!res.ok || !result?.data?.url) {
    throw new Error("Image upload failed. Please try again.");
  }
  return result.data.url as string;
};
