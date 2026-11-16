export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function bookingHref(fallback = "/contact?onderwerp=kennismaking#formulier") {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  return url && url.length > 0 ? url : fallback;
}

/** Kleine letters voor gebruik midden in een zin, met behoud van afkortingen als "AI". */
export function inSentence(title: string) {
  return title.toLowerCase().replace(/\bai\b/g, "AI");
}
