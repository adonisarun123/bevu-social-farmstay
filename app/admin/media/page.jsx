import { PageTitle, Card } from "@/components/ui";
import MediaUploader from "@/components/admin/MediaUploader";
import { imagekitEnabled, IK_URL_ENDPOINT, serveLocalViaImageKit } from "@/lib/imagekit";

export const metadata = { title: "Media" };

export default function MediaPage() {
  const keysSet = Boolean(process.env.IMAGEKIT_PUBLIC_KEY && process.env.IMAGEKIT_PRIVATE_KEY);
  const ready = imagekitEnabled && keysSet;
  return (
    <>
      <PageTitle eyebrow="Media" title="Photo uploads" />
      <p className="mt-3 max-w-2xl text-sm text-bark/75">
        Photos go straight to ImageKit (CDN + automatic resizing/WebP). Upload, copy the URL, then paste it into the <code>image</code> / <code>src</code> fields in <code>data/rooms.js</code>, <code>data/gallery.js</code>, <code>data/experiences.js</code>, <code>data/meetups.js</code> or <code>data/posts.js</code> and redeploy.
      </p>
      <div className="mt-8 grid gap-6">
        {!ready && (
          <Card className="border-brick/30">
            <h2 className="font-display text-xl">ImageKit isn't fully configured</h2>
            <ul className="mt-3 space-y-1 text-sm">
              <li><code className="text-xs">NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT</code> — <span className={imagekitEnabled ? "text-forest" : "text-brick-dark"}>{imagekitEnabled ? IK_URL_ENDPOINT : "missing"}</span></li>
              <li><code className="text-xs">IMAGEKIT_PUBLIC_KEY</code> / <code className="text-xs">IMAGEKIT_PRIVATE_KEY</code> — <span className={keysSet ? "text-forest" : "text-brick-dark"}>{keysSet ? "set" : "missing"}</span></li>
            </ul>
            <p className="mt-3 text-xs text-stone">Get all three from imagekit.io → Developer options, add them in Vercel → Settings → Environment Variables (and <code>.env.local</code>), then redeploy. Until then the site serves images through Next.js as before.</p>
          </Card>
        )}
        <Card>
          <MediaUploader />
        </Card>
        <Card>
          <h2 className="font-display text-xl">How images are served</h2>
          <ul className="mt-3 space-y-1 text-sm text-bark/80">
            <li>• ImageKit URLs (<code className="text-xs">https://ik.imagekit.io/…</code>) → ImageKit CDN with on-the-fly resizing and format conversion.</li>
            <li>• Local files in <code className="text-xs">/public/images</code> → {serveLocalViaImageKit ? "ImageKit (NEXT_PUBLIC_IMAGEKIT_SERVE_LOCAL is on)" : "Next.js image optimizer (set NEXT_PUBLIC_IMAGEKIT_SERVE_LOCAL=true after adding a Web-folder origin for the site in ImageKit)"}.</li>
            <li>• Unsplash placeholders → Next.js image optimizer until replaced.</li>
          </ul>
        </Card>
      </div>
    </>
  );
}
