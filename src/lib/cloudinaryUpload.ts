import { type UploadApiResponse } from "cloudinary";

async function uploadUrl(url: string) {
  try {
    const response = await fetch("/api/cloudinary", {
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const uploadedImage = (await response.json()) as UploadApiResponse;
    return uploadedImage;
  } catch (error) {
    throw error;
  }
}

export { uploadUrl };
