import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { company } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Lees hoe Ederox omgaat met jouw persoonsgegevens.",
  alternates: { canonical: "/privacy" },
};

const updated = "17 november 2026";

export default function PrivacyPage() {
  const details = [company.legalName, company.address, company.kvk && `KvK-nummer ${company.kvk}`].filter(Boolean).join(" · ");

  const sections: { h: string; p: React.ReactNode[] }[] = [
    {
      h: "1. Wie zijn wij?",
      p: [
        <>
          {details} (hierna: &ldquo;Ederox&rdquo;) is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. Je kunt
          contact met ons opnemen via het <Link href="/contact" className="text-accent underline underline-offset-2">contactformulier</Link>
          {company.email && (
            <>
              {" "}of per e-mail via <a href={`mailto:${company.email}`} className="text-accent underline underline-offset-2">{company.email}</a>
            </>
          )}
          .
        </>,
      ],
    },
    {
      h: "2. Welke gegevens verwerken wij?",
      p: [
        "Wanneer je ons contactformulier invult, verwerken wij de gegevens die je zelf verstrekt: naam, bedrijfsnaam, e-mailadres, telefoonnummer (optioneel), de oplossing waarin je geïnteresseerd bent en de inhoud van je bericht.",
        "Daarnaast verwerken wij technische gegevens die nodig zijn om de website te laten werken en te beveiligen, zoals je IP-adres. Deze gebruiken wij onder meer om misbruik van het contactformulier te voorkomen.",
      ],
    },
    {
      h: "3. Waarvoor gebruiken wij je gegevens?",
      p: [
        "Wij gebruiken je gegevens uitsluitend om je aanvraag te beantwoorden, contact met je op te nemen en, als je klant wordt, onze diensten te leveren. Daarnaast gebruiken wij technische gegevens om de website veilig en goed werkend te houden.",
        "De grondslag hiervoor is je toestemming, die je geeft bij het versturen van het formulier, en ons gerechtvaardigd belang bij een veilige website. Je kunt je toestemming altijd intrekken.",
      ],
    },
    {
      h: "4. Hoe lang bewaren wij je gegevens?",
      p: [
        "Gegevens uit het contactformulier bewaren wij maximaal twee jaar na ons laatste contact, tenzij er een klantrelatie ontstaat of een wettelijke bewaarplicht geldt. Daarna verwijderen wij ze.",
      ],
    },
    {
      h: "5. Delen met derden",
      p: [
        "Wij verkopen je gegevens nooit. Wij delen gegevens alleen met dienstverleners die nodig zijn om onze website en dienstverlening mogelijk te maken, zoals onze hostingprovider en e-maildienst. Met deze partijen maken wij afspraken over de beveiliging en vertrouwelijkheid van je gegevens.",
      ],
    },
    {
      h: "6. Cookies",
      p: ["Deze website plaatst geen tracking- of marketingcookies. Verandert dat, dan passen wij deze verklaring aan en vragen wij waar nodig vooraf om je toestemming."],
    },
    {
      h: "7. Jouw rechten",
      p: [
        "Je hebt het recht om je persoonsgegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking of vragen om je gegevens over te dragen. Neem hiervoor contact met ons op; wij reageren binnen vier weken.",
        "Ben je niet tevreden over hoe wij met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
      ],
    },
    {
      h: "8. Beveiliging",
      p: ["Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies en onrechtmatige verwerking. De website maakt gebruik van een beveiligde verbinding (HTTPS)."],
    },
    {
      h: "9. Wijzigingen",
      p: ["Wij kunnen deze privacyverklaring aanpassen. De meest actuele versie vind je altijd op deze pagina."],
    },
  ];

  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacyverklaring" text="Zo gaat Ederox om met jouw persoonsgegevens." />
      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-2xl font-semibold text-navy">{s.h}</h2>
                {s.p.map((t, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-muted">
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted">Laatst bijgewerkt: {updated}</p>
        </div>
      </section>
    </>
  );
}
