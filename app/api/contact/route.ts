import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/validation";

export const runtime = "nodejs";

/** Eenvoudige in-memory rate limit per IP (per serverinstantie). */
const hits = new Map<string, { count: number; reset: number }>();
function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 10 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 5;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "invalid_json" }, { status: 400 });
  }

  // Honeypot: bots vullen dit verborgen veld in. Doe alsof het gelukt is, maar verstuur niets.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return NextResponse.json({ code: "validation", errors }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "onbekend";
  if (rateLimited(ip)) return NextResponse.json({ code: "rate_limited" }, { status: 429 });

  const data = {
    naam: body.naam!.trim(),
    bedrijf: body.bedrijf!.trim(),
    email: body.email!.trim(),
    telefoon: body.telefoon?.trim() || "",
    oplossing: body.oplossing!,
    bericht: body.bericht!.trim(),
    ontvangen: new Date().toISOString(),
  };

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CONTACT_WEBHOOK_URL } = process.env;
  const resendReady = Boolean(RESEND_API_KEY && CONTACT_TO_EMAIL && CONTACT_FROM_EMAIL);

  if (!resendReady && !CONTACT_WEBHOOK_URL) {
    // Geen provider gekoppeld: eerlijk melden, niets doen alsof het verstuurd is.
    return NextResponse.json({ code: "not_configured" }, { status: 503 });
  }

  try {
    if (resendReady) {
      const html = `<h2>Nieuwe aanvraag via ederox.com</h2>
<p><strong>Naam:</strong> ${escape(data.naam)}<br/><strong>Bedrijf:</strong> ${escape(data.bedrijf)}<br/>
<strong>E-mail:</strong> ${escape(data.email)}<br/><strong>Telefoon:</strong> ${escape(data.telefoon || "-")}<br/>
<strong>Oplossing:</strong> ${escape(data.oplossing)}</p><p>${escape(data.bericht).replace(/\n/g, "<br/>")}</p>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: CONTACT_TO_EMAIL!.split(",").map((s) => s.trim()),
          reply_to: data.email,
          subject: `Nieuwe aanvraag: ${data.bedrijf} (${data.oplossing})`,
          html,
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    }
    if (CONTACT_WEBHOOK_URL) {
      const res = await fetch(CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bron: "ederox.com contactformulier", ...data }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] verzending mislukt:", err instanceof Error ? err.message : err);
    return NextResponse.json({ code: "send_failed" }, { status: 502 });
  }
}
