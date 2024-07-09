import { type UploadApiResponse } from "cloudinary";

async function uploadUrl({
  url,
  publicId,
}: {
  url: string;
  publicId?: string;
}) {
  try {
    const response = await fetch("/api/cloudinary", {
      method: "POST",
      body: JSON.stringify({ url, publicId }),
      cache: "no-store",
    });
    const uploadedImage = (await response.json()) as UploadApiResponse;
    return uploadedImage;
  } catch (error) {
    throw error;
  }
}

export { uploadUrl };
