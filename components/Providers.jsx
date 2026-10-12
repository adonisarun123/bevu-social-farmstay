"use client";

import { SessionProvider } from "next-auth/react";
import { ImageKitProvider } from "@imagekit/next";
import { IK_URL_ENDPOINT, imagekitEnabled } from "@/lib/imagekit";

export default function Providers({ children }) {
  const tree = <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>;
  // ImageKitProvider sets the default urlEndpoint for any <Image>/<Video> from @imagekit/next used directly.
  return imagekitEnabled ? <ImageKitProvider urlEndpoint={IK_URL_ENDPOINT}>{tree}</ImageKitProvider> : tree;
}
