import { getUploadAuthParams } from "@imagekit/next/server";
import { requireAdmin } from "@/lib/auth";

// One-time credentials for direct browser → ImageKit uploads (components/admin/MediaUploader.jsx).
// Admin-only: anyone holding these params can upload into the Media Library until they expire.
export const dynamic = "force-dynamic";

export async function GET() {
  try { await requireAdmin(); } catch { return Response.json({ error: "Forbidden" }, { status: 403 }); }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY; // never exposed to the client
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  if (!privateKey || !publicKey) return Response.json({ error: "ImageKit keys are not configured (IMAGEKIT_PUBLIC_KEY / IMAGEKIT_PRIVATE_KEY)." }, { status: 503 });

  const { token, expire, signature } = getUploadAuthParams({ privateKey, publicKey, expire: 10 * 60 });
  return Response.json({ token, expire, signature, publicKey }, { headers: { "Cache-Control": "no-store" } });
}
