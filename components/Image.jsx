import NextImage from "next/image";
import { Image as IKImage } from "@imagekit/next";
import { IK_URL_ENDPOINT, isImageKitSrc } from "@/lib/imagekit";

// Drop-in for next/image. Routes ImageKit-hosted (and, when enabled, local) images through
// @imagekit/next so resizing, WebP/AVIF conversion and srcset happen on the ImageKit CDN; everything
// else — and everything when ImageKit isn't configured — falls back to plain next/image.
// Extra ImageKit-only props pass straight through: transformation=[{ ... }], queryParameters, responsive.
export default function Image(props) {
  if (isImageKitSrc(props.src)) return <IKImage urlEndpoint={IK_URL_ENDPOINT} {...props} />;
  // Strip ImageKit-only props so next/image doesn't warn about unknown DOM attributes.
  const { transformation, queryParameters, transformationPosition, responsive, ...rest } = props;
  return <NextImage {...rest} />;
}
