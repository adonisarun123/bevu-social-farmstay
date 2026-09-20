import { site } from "@/data/site";

export default function manifest() {
  return {
    name: site.name,
    short_name: "Bevu",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1E6",
    theme_color: "#7A6140",
    icons: [{ src: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  };
}
