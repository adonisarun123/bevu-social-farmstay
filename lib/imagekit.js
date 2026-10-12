// ImageKit (imagekit.io) — image CDN, on-the-fly resizing/format conversion and the admin photo uploader.
// Docs: https://imagekit.io/docs/integration/nextjs
//
// Enabled only when NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is set. Without it every <Image> on the site
// renders through plain next/image exactly as before, so a missing key can never blank the site.
//
// Which images go through ImageKit (see components/Image.jsx):
//   • any src that already lives on ImageKit (https://ik.imagekit.io/... or your URL endpoint) — always
//   • local public files like /images/hero.jpg — only when NEXT_PUBLIC_IMAGEKIT_SERVE_LOCAL=true.
//     That needs a "Web folder" origin (https://www.bevusocialfarmstay.com) attached to your URL endpoint
//     in the ImageKit dashboard, or the same paths uploaded to the Media Library. Flip it on after that.
//   • third-party absolute URLs (the Unsplash placeholders) never do — they stay on next/image.

export const IK_URL_ENDPOINT = (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "").trim().replace(/\/+$/, "");
export const imagekitEnabled = IK_URL_ENDPOINT.length > 0;
export const serveLocalViaImageKit = imagekitEnabled && /^(1|true|yes)$/i.test(process.env.NEXT_PUBLIC_IMAGEKIT_SERVE_LOCAL || "");

// Media Library folders offered in the admin uploader (keeps uploads tidy and paths predictable).
export const IK_FOLDERS = ["/bevu/rooms", "/bevu/gallery", "/bevu/experiences", "/bevu/meetups", "/bevu/journal", "/bevu/amenities", "/bevu/misc"];

export function isImageKitSrc(src) {
  if (!imagekitEnabled || typeof src !== "string" || !src) return false;
  if (src.startsWith("https://ik.imagekit.io/") || src.startsWith(IK_URL_ENDPOINT + "/")) return true;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//") || src.startsWith("data:")) return false;
  return serveLocalViaImageKit && src.startsWith("/");
}
