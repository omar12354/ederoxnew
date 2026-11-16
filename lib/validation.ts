export type ContactInput = {
  naam: string;
  bedrijf: string;
  email: string;
  telefoon?: string;
  oplossing: string;
  bericht: string;
  akkoord: boolean;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{8,20}$/;

export function validateContact(input: Partial<ContactInput>): ContactErrors {
  const e: ContactErrors = {};
  const naam = (input.naam ?? "").trim();
  const bedrijf = (input.bedrijf ?? "").trim();
  const email = (input.email ?? "").trim();
  const telefoon = (input.telefoon ?? "").trim();
  const bericht = (input.bericht ?? "").trim();

  if (naam.length < 2) e.naam = "Vul je naam in.";
  else if (naam.length > 100) e.naam = "Je naam mag maximaal 100 tekens bevatten.";
  if (bedrijf.length < 2) e.bedrijf = "Vul je bedrijfsnaam in.";
  else if (bedrijf.length > 120) e.bedrijf = "De bedrijfsnaam mag maximaal 120 tekens bevatten.";
  if (!email) e.email = "Vul je e-mailadres in.";
  else if (!EMAIL_RE.test(email) || email.length > 200) e.email = "Dit e-mailadres lijkt niet te kloppen.";
  if (telefoon && !PHONE_RE.test(telefoon)) e.telefoon = "Vul een geldig telefoonnummer in, of laat dit veld leeg.";
  if (!input.oplossing) e.oplossing = "Kies de oplossing waarin je geïnteresseerd bent.";
  if (bericht.length < 10) e.bericht = "Vertel ons in een paar zinnen waar we je mee kunnen helpen (minimaal 10 tekens).";
  else if (bericht.length > 4000) e.bericht = "Je bericht mag maximaal 4000 tekens bevatten.";
  if (!input.akkoord) e.akkoord = "Geef aan dat je akkoord gaat met de verwerking van je gegevens.";
  return e;
}
