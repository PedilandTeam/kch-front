import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const paths = request.nextUrl.searchParams.get("paths");
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: "Invalid secret", date: Date.now() });
  }

  if (!paths) {
    return Response.json({ revalidated: false, message: "Missing paths", date: Date.now() });
  }

  const pathsArray = paths.split(',')

  for (const path of pathsArray) {
    revalidatePath(path, "page")
  }

  console.info(`Revalidated: ${paths}`)
  return Response.json({ revalidated: true, date: Date.now() })
}
