"use client";

import { useRef, useState } from "react";
import { ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload } from "@imagekit/next";
import { Copy, Check, UploadCloud, X } from "lucide-react";
import Image from "@/components/Image";
import { IK_FOLDERS } from "@/lib/imagekit";
import { field, label } from "@/components/ui";

// Direct browser → ImageKit upload. Credentials come from /api/upload-auth (admin-only); the file never
// touches our server. Each finished upload shows the CDN URL plus a ready-to-paste data-file snippet.
const authenticator = async () => {
  const res = await fetch("/api/upload-auth", { cache: "no-store" });
  if (!res.ok) {
    let msg = `Auth failed (${res.status})`;
    try { msg = (await res.json()).error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json();
};

const describe = (err) => {
  if (err instanceof ImageKitAbortError) return "Cancelled";
  if (err instanceof ImageKitInvalidRequestError) return `Rejected: ${err.message}`;
  if (err instanceof ImageKitUploadNetworkError) return `Network error: ${err.message}`;
  if (err instanceof ImageKitServerError) return `ImageKit error: ${err.message}`;
  return err?.message || "Upload failed";
};

const slugify = (name) => name.toLowerCase().replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export default function MediaUploader() {
  const inputRef = useRef(null);
  const [folder, setFolder] = useState(IK_FOLDERS[0]);
  const [items, setItems] = useState([]); // { id, name, progress, status, url, filePath, width, height, error, abort }
  const [dragging, setDragging] = useState(false);

  const start = async (files) => {
    const list = Array.from(files || []).filter((f) => f.type.startsWith("image/"));
    if (!list.length) return;
    let auth;
    try { auth = await authenticator(); } catch (e) { alertRow(e); return; }
    for (const file of list) {
      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const abort = new AbortController();
      setItems((s) => [{ id, name: file.name, progress: 0, status: "uploading", abort }, ...s]);
      const ext = (file.name.match(/\.[a-z0-9]+$/i) || [""])[0].toLowerCase();
      upload({
        ...auth,
        file,
        fileName: `${slugify(file.name)}${ext}`,
        folder,
        useUniqueFileName: true,
        tags: ["bevu", folder.split("/").pop()],
        abortSignal: abort.signal,
        onProgress: (e) => setItems((s) => s.map((it) => (it.id === id ? { ...it, progress: Math.round((e.loaded / e.total) * 100) } : it))),
      })
        .then((r) => setItems((s) => s.map((it) => (it.id === id ? { ...it, status: "done", progress: 100, url: r.url, filePath: r.filePath, width: r.width, height: r.height } : it))))
        .catch((err) => setItems((s) => s.map((it) => (it.id === id ? { ...it, status: "error", error: describe(err) } : it))));
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const alertRow = (e) => setItems((s) => [{ id: `auth-${Date.now()}`, name: "Could not start upload", status: "error", error: e.message }, ...s]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[220px_1fr]">
        <div>
          <label className={label} htmlFor="ik-folder">Folder</label>
          <select id="ik-folder" className={field} value={folder} onChange={(e) => setFolder(e.target.value)}>
            {IK_FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <span className={label}>Photos</span>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); setDragging(false); start(e.dataTransfer.files); }}
            className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-10 text-sm transition ${dragging ? "border-brick bg-brick/5" : "border-ink/15 hover:border-brick/60"}`}
          >
            <UploadCloud className="text-brick" />
            <span className="font-medium">Drop photos here or click to choose</span>
            <span className="text-xs text-stone">JPG, PNG, WebP, HEIC · several at once is fine · originals up to 25 MB</span>
          </button>
          <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => start(e.target.files)} />
        </div>
      </div>

      {items.length > 0 && (
        <ul className="mt-8 space-y-3">
          {items.map((it) => <Row key={it.id} item={it} onRemove={() => setItems((s) => s.filter((x) => x.id !== it.id))} />)}
        </ul>
      )}
    </div>
  );
}

function Row({ item, onRemove }) {
  const snippet = item.url ? `{ src: "${item.url}", alt: "" }` : "";
  return (
    <li className="rounded-2xl border border-ink/10 bg-white/60 p-4">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-sand">
          {item.url && <Image src={item.url} alt={item.name} fill sizes="112px" className="object-cover" transformation={[{ width: 224, height: 160, crop: "maintain_ratio" }]} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate text-sm font-medium">{item.name}</div>
            <div className="flex items-center gap-2 text-xs">
              {item.status === "uploading" && <button type="button" className="text-stone hover:text-brick" onClick={() => item.abort?.abort()}>Cancel</button>}
              <button type="button" aria-label="Remove from list" className="text-stone hover:text-brick" onClick={onRemove}><X size={14} /></button>
            </div>
          </div>
          {item.status === "uploading" && <progress value={item.progress} max={100} className="mt-2 h-1.5 w-full accent-brick" />}
          {item.status === "error" && <p className="mt-2 text-xs text-brick-dark">{item.error}</p>}
          {item.status === "done" && (
            <div className="mt-2 space-y-2">
              <CopyLine value={item.url} hint={item.width && item.height ? `${item.width}×${item.height}` : null} />
              <CopyLine value={snippet} mono />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

function CopyLine({ value, hint, mono = true }) {
  const [ok, setOk] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1500); } catch {} };
  return (
    <div className="flex items-center gap-2">
      <code className={`block min-w-0 flex-1 truncate rounded-lg bg-cream px-2 py-1 text-[11px] ${mono ? "" : "font-sans"}`}>{value}</code>
      {hint && <span className="shrink-0 text-[11px] text-stone">{hint}</span>}
      <button type="button" onClick={copy} className="shrink-0 rounded-lg border border-ink/10 p-1.5 text-stone hover:text-brick" aria-label="Copy">{ok ? <Check size={14} className="text-forest" /> : <Copy size={14} />}</button>
    </div>
  );
}
