import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Lees hoe Ederox omgaat met persoonsgegevens.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

const sections = [
  { h: "1. Wie zijn wij?", p: ["Ederox (ederox.com) is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. [AANVULLEN: statutaire naam, KvK-nummer, vestigingsadres en contactgegevens.]"] },
  { h: "2. Welke gegevens verwerken wij?", p: ["Wanneer je ons contactformulier invult, verwerken wij de gegevens die je zelf verstrekt: naam, bedrijfsnaam, e-mailadres, telefoonnummer (optioneel), de gewenste oplossing en de inhoud van je bericht.", "Daarnaast kunnen technische gegevens worden verwerkt die nodig zijn voor het functioneren en beveiligen van de website, zoals je IP-adres."] },
  { h: "3. Waarvoor gebruiken wij je gegevens?", p: ["Wij gebruiken je gegevens uitsluitend om contact met je op te nemen naar aanleiding van je aanvraag, en om onze website veilig en goed werkend te houden. De grondslag hiervoor is je toestemming en/of ons gerechtvaardigd belang."] },
  { h: "4. Hoe lang bewaren wij je gegevens?", p: ["Wij bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld. [AANVULLEN: concrete bewaartermijnen.]"] },
  { h: "5. Delen met derden", p: ["Wij verkopen je gegevens niet. Wij kunnen gegevens delen met dienstverleners die ons helpen bij het leveren van onze diensten, zoals hosting- en e-mailproviders. Met deze partijen sluiten wij verwerkersovereenkomsten. [AANVULLEN: welke partijen, en of gegevens buiten de EER worden verwerkt.]"] },
  { h: "6. Cookies", p: ["Deze website gebruikt op dit moment geen tracking- of marketingcookies. Wanneer dit verandert, passen wij deze verklaring aan en vragen wij waar nodig om toestemming."] },
  { h: "7. Jouw rechten", p: ["Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking of verzoeken om overdracht van je gegevens. Neem hiervoor contact met ons op. Je hebt daarnaast het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens."] },
  { h: "8. Beveiliging", p: ["Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies en onrechtmatige verwerking."] },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Privacy" title="Privacyverklaring" text="Zo gaat Ederox om met jouw persoonsgegevens." />
      <section className="pb-24">
        <div className="container-x max-w-3xl">
          <div className="mb-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="note">
            <strong>Concept:</strong> deze privacyverklaring is voorbereid en moet nog juridisch worden gecontroleerd en aangevuld voordat de website live gaat. Onderdelen tussen [vierkante haken] moeten worden ingevuld.
          </div>
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-2xl font-semibold text-navy">{s.h}</h2>
                {s.p.map((t) => (
                  <p key={t} className="mt-3 leading-relaxed text-muted">{t}</p>
                ))}
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted">Laatst bijgewerkt: [datum invullen]</p>
        </div>
      </section>
    </>
  );
}
