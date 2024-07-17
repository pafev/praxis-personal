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
    });
    const uploadedImage = (await response.json()) as UploadApiResponse;
    return uploadedImage;
  } catch (error) {
    throw error;
  }
}

async function uploadFile({
  file,
  publicId,
}: {
  file: File;
  publicId: string;
}) {
  try {
    const reader = new FileReader();
    reader.onload = async () => {
      const fileContent = reader.result as string;
      const uploadedImage = await uploadUrl({ url: fileContent, publicId });
      return uploadedImage;
    };
    reader.readAsDataURL(file);
  } catch (error) {
    throw error;
  }
}

export { uploadUrl, uploadFile };
