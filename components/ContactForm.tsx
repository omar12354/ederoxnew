"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, Loader2, Send, Settings2 } from "lucide-react";
import { contactOptions, finderProblems, services } from "@/lib/content";
import { validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { cn, inSentence } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

const empty: ContactInput = { naam: "", bedrijf: "", email: "", telefoon: "", oplossing: "", bericht: "", akkoord: false };

export function ContactForm({ dark = false }: { dark?: boolean }) {
  const params = useSearchParams();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prefilled, setPrefilled] = useState(false);

  // Vooraf invullen via URL (?oplossing=…&behoefte=…&onderwerp=kennismaking)
  useEffect(() => {
    const oplossing = params.get("oplossing");
    const behoefte = params.get("behoefte");
    const onderwerp = params.get("onderwerp");
    const valid = oplossing && contactOptions.some((o) => o.value === oplossing);
    const problem = finderProblems.find((p) => p.id === behoefte);
    if (!valid && !problem && !onderwerp) return;
    const service = services.find((s) => s.slug === oplossing);
    setValues((v) => ({
      ...v,
      oplossing: valid ? oplossing : v.oplossing,
      bericht:
        v.bericht ||
        (problem && service
          ? `Onze uitdaging: ${problem.label}\n\nIk wil graag bespreken hoe ${inSentence(service.title)} ons hierbij kan helpen.`
          : onderwerp === "kennismaking"
            ? "Ik plan graag een vrijblijvende kennismaking in. Mijn voorkeur voor dag en tijd: "
            : ""),
    }));
    setPrefilled(true);
  }, [params]);

  // Vooraf invullen vanuit de keuzehulp op dezelfde pagina
  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<PrefillDetail>).detail;
      setValues((v) => ({ ...v, oplossing: d.oplossing ?? v.oplossing, bericht: d.bericht ?? v.bericht }));
      setPrefilled(true);
      setStatus("idle");
    };
    window.addEventListener(PREFILL_EVENT, handler);
    return () => window.removeEventListener(PREFILL_EVENT, handler);
  }, []);

  const set = <K extends keyof ContactInput>(key: K, value: ContactInput[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };
  const blur = (key: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ naam: true, bedrijf: true, email: true, telefoon: true, oplossing: true, bericht: true, akkoord: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first)?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const hp = (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: hp }),
      });
      const data = (await res.json().catch(() => ({}))) as { code?: string; errors?: ContactErrors };
      if (res.ok) {
        setStatus("success");
        setValues(empty);
        setTouched({});
      } else if (res.status === 503 && data.code === "not_configured") {
        setStatus("not_configured");
      } else if (res.status === 400 && data.errors) {
        setErrors(data.errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const show = (k: keyof ContactInput) => touched[k] && errors[k];
  const labelCls = cn("mb-1.5 block text-sm font-medium", dark ? "text-white/85" : "text-navy");
  const errCls = "mt-1.5 text-[13px] font-medium text-[#f97066]";

  const field = (k: "naam" | "bedrijf" | "email" | "telefoon", label: string, type: string, autoComplete: string, optional = false, placeholder = "") => (
    <div>
      <label htmlFor={k} className={labelCls}>
        {label} {optional ? <span className={dark ? "text-white/45" : "text-muted"}>(optioneel)</span> : <span aria-hidden className="text-accent">*</span>}
      </label>
      <input
        id={k}
        name={k}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={values[k] ?? ""}
        onChange={(e) => set(k, e.target.value)}
        onBlur={() => blur(k)}
        aria-invalid={show(k) ? true : undefined}
        aria-describedby={show(k) ? `${k}-fout` : undefined}
        required={!optional}
        className="input"
      />
      {show(k) && <p id={`${k}-fout`} className={errCls}>{errors[k]}</p>}
    </div>
  );

  return (
    <div id="formulier" className="scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className={cn("rounded-2xl p-8 text-center", dark ? "bg-white/5 ring-1 ring-white/10" : "bg-white ring-1 ring-line")} role="status">
            <CheckCircle2 className="mx-auto size-12 text-emerald-500" aria-hidden />
            <h3 className={cn("mt-4 text-xl font-semibold", dark ? "text-white" : "text-navy")}>Bedankt voor je bericht!</h3>
            <p className={cn("mt-2", dark ? "text-white/65" : "text-muted")}>We hebben je aanvraag ontvangen en nemen zo snel mogelijk contact met je op.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-medium text-accent underline underline-offset-4">
              Nog een bericht sturen
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} noValidate onSubmit={onSubmit} className="space-y-5" aria-describedby="form-uitleg">
            <p id="form-uitleg" className={cn("text-sm", dark ? "text-white/55" : "text-muted")}>
              Velden met <span className="text-accent">*</span> zijn verplicht.
            </p>
            {prefilled && (
              <p className={cn("rounded-lg px-3 py-2 text-sm", dark ? "bg-accent/15 text-white" : "bg-accent-50 text-navy")} role="status">
                We hebben het formulier alvast ingevuld op basis van je keuze. Pas het gerust aan.
              </p>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              {field("naam", "Naam", "text", "name")}
              {field("bedrijf", "Bedrijfsnaam", "text", "organization")}
              {field("email", "E-mailadres", "email", "email", false, "naam@bedrijf.nl")}
              {field("telefoon", "Telefoonnummer", "tel", "tel", true, "06 12345678")}
            </div>
            <div>
              <label htmlFor="oplossing" className={labelCls}>
                Gewenste oplossing <span aria-hidden className="text-accent">*</span>
              </label>
              <select id="oplossing" name="oplossing" value={values.oplossing} onChange={(e) => set("oplossing", e.target.value)} onBlur={() => blur("oplossing")} aria-invalid={show("oplossing") ? true : undefined} aria-describedby={show("oplossing") ? "oplossing-fout" : undefined} required className="input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23667085%22 stroke-width=%222%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10">
                {contactOptions.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
              {show("oplossing") && <p id="oplossing-fout" className={errCls}>{errors.oplossing}</p>}
            </div>
            <div>
              <label htmlFor="bericht" className={labelCls}>
                Bericht <span aria-hidden className="text-accent">*</span>
              </label>
              <textarea id="bericht" name="bericht" rows={5} value={values.bericht} onChange={(e) => set("bericht", e.target.value)} onBlur={() => blur("bericht")} aria-invalid={show("bericht") ? true : undefined} aria-describedby={show("bericht") ? "bericht-fout" : undefined} required placeholder="Vertel kort waar je tegenaan loopt of wat je wilt bereiken." className="input resize-y" />
              {show("bericht") && <p id="bericht-fout" className={errCls}>{errors.bericht}</p>}
            </div>
            {/* Honeypot tegen spam — onzichtbaar voor bezoekers */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label className={cn("flex items-start gap-3 text-sm", dark ? "text-white/75" : "text-muted")}>
                <input id="akkoord" type="checkbox" checked={values.akkoord} onChange={(e) => { set("akkoord", e.target.checked); setTouched((t) => ({ ...t, akkoord: true })); }} aria-invalid={show("akkoord") ? true : undefined} aria-describedby={show("akkoord") ? "akkoord-fout" : undefined} className="mt-0.5 size-4 shrink-0 accent-[#4169FF]" />
                <span>
                  Ik ga ermee akkoord dat Ederox mijn gegevens gebruikt om contact met mij op te nemen. Lees onze{" "}
                  <Link href="/privacy" className="underline underline-offset-2 hover:text-accent">privacyverklaring</Link>.
                </span>
              </label>
              {show("akkoord") && <p id="akkoord-fout" className={errCls}>{errors.akkoord}</p>}
            </div>

            <AnimatePresence>
              {status === "not_configured" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="flex gap-3 rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900">
                  <Settings2 className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <p>
                    <strong>Je bericht kon op dit moment niet worden verstuurd.</strong> Het formulier is tijdelijk niet beschikbaar.
                    {contactEmail ? (
                      <> Mail ons gerust direct via <a href={`mailto:${contactEmail}`} className="font-medium underline underline-offset-2">{contactEmail}</a>.</>
                    ) : (
                      <> Probeer het later nog eens.</>
                    )}
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} role="alert" className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <p>
                    Er ging iets mis bij het versturen. Controleer je internetverbinding en probeer het opnieuw.
                    {contactEmail && (
                      <> Lukt het niet? Mail ons via <a href={`mailto:${contactEmail}`} className="font-medium underline underline-offset-2">{contactEmail}</a>.</>
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <button type="submit" disabled={status === "submitting"} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-white shadow-[0_10px_30px_-10px_rgb(65_105_255/0.7)] transition hover:bg-accent-600 disabled:opacity-70 sm:w-auto">
              {status === "submitting" ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />}
              {status === "submitting" ? "Bezig met versturen…" : "Verstuur bericht"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
