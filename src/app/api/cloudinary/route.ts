import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import cloudinary from "~/utils/cloudinaryApi";

export async function POST(request: NextRequest) {
  const dataSchema = z.object({ url: z.string().url() });
  const data = (await request.json()) as { url: string };

  const { success } = dataSchema.safeParse(data);
  if (!success) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  await cloudinary.uploader.upload(data.url);

  return new NextResponse(JSON.stringify(data));
}
