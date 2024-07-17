import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import cloudinary from "~/utils/cloudinaryApi";

export async function POST(request: NextRequest) {
  const dataSchema = z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
  });
  const data = (await request.json()) as z.infer<typeof dataSchema>;

  try {
    dataSchema.parse(data);
    const uploadedImage = await cloudinary.uploader.upload(data.url, {
      public_id: data.publicId,
      upload_preset: "unsigned_upload",
      allowed_formats: [
        "jpg",
        "png",
        "jpeg",
        "webp",
        "svg",
        "ico",
        "jfif",
        "mp4",
        "mkv",
      ],
      invalidate: true,
    });
    return new NextResponse(JSON.stringify(uploadedImage));
  } catch (error) {
    return new NextResponse(JSON.stringify(error), {
      status: 400,
    });
  }
}
