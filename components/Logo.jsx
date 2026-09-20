import Image from "next/image";
import Link from "next/link";

// Official wordmark (public/images/logo.png). `tone="light"` swaps in the cream-text version for dark backgrounds.
export default function Logo({ tone = "dark", className = "", height = 44 }) {
  const src = tone === "light" ? "/images/logo-light.png" : "/images/logo.png";
  const width = Math.round(height * (578 / 200));
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="Bevu Social Farmstay — home">
      <Image src={src} alt="Bevu Social Farmstay" width={width} height={height} priority className="h-auto w-auto" style={{ height, width: "auto" }} />
    </Link>
  );
}
