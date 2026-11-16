import type { MetadataRoute } from "next";
import { services, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/oplossingen", "/sectoren", "/ons-werk", "/over-ons", "/contact", "/privacy"];
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, lastModified: now, changeFrequency: "monthly" as const, priority: r === "" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: `${site.url}/oplossingen/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
