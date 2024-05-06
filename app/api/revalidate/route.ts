import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const paths = request.nextUrl.searchParams.get("paths");
  const tags = request.nextUrl.searchParams.get("tags");
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ revalidated: false, message: "Invalid secret", date: Date.now() });
  }

  if (!paths && !tags) {
    return Response.json({ revalidated: false, message: "Missing paths", date: Date.now() });
  }

  if (paths) {
    const pathsArray = paths.split(',')
    for (const path of pathsArray) {
      revalidatePath(path, "page")
    }
  }

  if(tags) {
    const tagsArray = tags.split(',')
    for (const tag of tagsArray) {
      revalidateTag(tag)
    }
  }



  console.info(`Revalidated: ${paths}`)
  return Response.json({ revalidated: true, date: Date.now() })
}
