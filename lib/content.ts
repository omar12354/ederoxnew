/**
 * Centrale content van de Ederox-website.
 * Pas hier teksten, diensten, sectoren en teamgegevens aan.
 */

export const site = {
  name: "Ederox",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ederox.com",
  tagline: "Technologie die jouw bedrijf vooruithelpt.",
  description:
    "Ederox is jouw technologiepartner voor automatisering, software op maat, websites en systeemintegraties. Wij helpen Nederlandse bedrijven slimmer werken en efficiënter groeien.",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
};

/**
 * Bedrijfsgegevens. Vul aan zodra bekend; lege velden worden niet getoond.
 * Het e-mailadres komt uit NEXT_PUBLIC_CONTACT_EMAIL.
 */
export const company = {
  legalName: "Ederox",
  kvk: "",
  address: "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Oplossingen", href: "/oplossingen" },
  { label: "Sectoren", href: "/sectoren" },
  { label: "Ons werk", href: "/ons-werk" },
  { label: "Over ons", href: "/over-ons" },
  { label: "Contact", href: "/contact" },
] as const;

export type IconKey =
  | "automation"
  | "software"
  | "web"
  | "integration"
  | "health"
  | "briefcase"
  | "building"
  | "handshake"
  | "puzzle"
  | "route"
  | "sprout";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  intro: string;
  icon: IconKey;
  examples: string[];
  benefits: { title: string; text: string }[];
  applications: { title: string; text: string }[];
  process: { title: string; text: string }[];
};

export const services: Service[] = [
  {
    slug: "automatisering-ai",
    title: "Automatisering & AI",
    short: "Minder handwerk, slimmere processen.",
    description:
      "Bespaar tijd, verminder handmatig werk en maak bedrijfsprocessen slimmer met automatisering en kunstmatige intelligentie.",
    intro:
      "Veel teams besteden uren per week aan taken die zich steeds herhalen: gegevens overtypen, telefoontjes doorzetten, standaardmails versturen. Wij brengen in kaart waar die tijd naartoe gaat en automatiseren wat geautomatiseerd kan worden. AI zetten we in waar het echt iets toevoegt, niet omdat het kan.",
    icon: "automation",
    examples: [
      "AI-receptionisten",
      "Voice agents",
      "Workflowautomatisering",
      "Chatbots",
      "Automatische klantcommunicatie",
    ],
    benefits: [
      { title: "Meer tijd voor echt werk", text: "Repeterende taken lopen automatisch, zodat jouw team zich richt op klanten en kwaliteit." },
      { title: "Altijd bereikbaar", text: "Een digitale receptionist of chatbot vangt vragen op, ook buiten kantoortijden." },
      { title: "Minder fouten", text: "Gegevens worden één keer vastgelegd en consistent verwerkt, zonder overtypen." },
      { title: "Schaalbaar", text: "Meer aanvragen betekent niet automatisch meer handwerk of extra personeel." },
    ],
    applications: [
      { title: "Digitale receptionist", text: "Neemt de telefoon op, beantwoordt veelgestelde vragen en plant afspraken direct in de agenda." },
      { title: "Automatische opvolging", text: "Offertes, herinneringen en bevestigingen worden op het juiste moment verstuurd." },
      { title: "Slimme intake", text: "Aanvragen worden automatisch gecategoriseerd en bij de juiste collega neergelegd." },
      { title: "Documentverwerking", text: "Facturen, formulieren en e-mails uitlezen en verwerken in jouw systemen." },
    ],
    process: [
      { title: "Procesanalyse", text: "We brengen samen in kaart welke taken veel tijd kosten en waar automatisering het meeste oplevert." },
      { title: "Ontwerp", text: "We ontwerpen de workflow en bepalen waar menselijke controle nodig blijft." },
      { title: "Bouwen & testen", text: "We bouwen de automatisering en testen deze met echte scenario's uit jouw praktijk." },
      { title: "Live & bijsturen", text: "Na livegang monitoren we de resultaten en verbeteren we waar nodig." },
    ],
  },
  {
    slug: "software-op-maat",
    title: "Software op maat",
    short: "Software die past bij hoe jij werkt.",
    description: "Software die zich aanpast aan jouw bedrijf, in plaats van andersom.",
    intro:
      "Standaardpakketten zijn handig, tot ze dat niet meer zijn. Als je werkt met omwegen, losse Excel-bestanden en dubbele administratie, is software op maat vaak de slimste stap. Wij bouwen overzichtelijke, betrouwbare applicaties die precies doen wat jouw organisatie nodig heeft.",
    icon: "software",
    examples: ["CRM-systemen", "Interne dashboards", "Webapplicaties", "Klantenportalen", "Maatwerksoftware"],
    benefits: [
      { title: "Precies wat je nodig hebt", text: "Geen overbodige functies, wel de functionaliteit die bij jouw werkwijze hoort." },
      { title: "Eén plek voor je informatie", text: "Geen versnipperde spreadsheets meer, maar één betrouwbare bron." },
      { title: "Meegroeien", text: "De software groeit mee met je organisatie en is eenvoudig uit te breiden." },
      { title: "Eigenaarschap", text: "Je bent niet afhankelijk van de prijswijzigingen of roadmap van een pakketleverancier." },
    ],
    applications: [
      { title: "CRM op maat", text: "Klantrelaties, offertes en opvolging in één overzicht, afgestemd op jouw salesproces." },
      { title: "Interne dashboards", text: "Realtime inzicht in de cijfers die er voor jouw bedrijf echt toe doen." },
      { title: "Klantenportaal", text: "Klanten bekijken zelf hun status, documenten en facturen." },
      { title: "Planningstools", text: "Mensen, middelen en opdrachten slim plannen en op elkaar afstemmen." },
    ],
    process: [
      { title: "Behoeften helder", text: "We vertalen jouw werkwijze naar duidelijke functionele eisen en prioriteiten." },
      { title: "Ontwerp & prototype", text: "Je ziet en test het ontwerp voordat er een regel code wordt geschreven." },
      { title: "Iteratief bouwen", text: "We bouwen in korte cycli en laten regelmatig werkende onderdelen zien." },
      { title: "Lancering & beheer", text: "We zorgen voor een soepele overgang, training en doorlopende ondersteuning." },
    ],
  },
  {
    slug: "websites-platforms",
    title: "Websites & digitale platforms",
    short: "Digitale ervaringen die converteren.",
    description:
      "Professionele digitale ervaringen die jouw merk versterken en bezoekers omzetten in klanten.",
    intro:
      "Je website is vaak het eerste contact met een nieuwe klant. Wij ontwerpen en ontwikkelen snelle, toegankelijke en goed vindbare websites en platforms die vertrouwen wekken en bezoekers helpen de volgende stap te zetten.",
    icon: "web",
    examples: ["Zakelijke websites", "Webshops", "Boekingsplatforms", "Digitale klantomgevingen"],
    benefits: [
      { title: "Sterke eerste indruk", text: "Een professioneel ontwerp dat past bij de kwaliteit van jouw dienstverlening." },
      { title: "Snel en vindbaar", text: "Gebouwd met aandacht voor laadtijd, SEO en toegankelijkheid." },
      { title: "Gericht op conversie", text: "Heldere structuur en logische vervolgstappen voor elke bezoeker." },
      { title: "Zelf beheren", text: "Waar gewenst pas je zelf eenvoudig content aan." },
    ],
    applications: [
      { title: "Zakelijke website", text: "Een heldere presentatie van je diensten, team en werkwijze." },
      { title: "Webshop", text: "Online verkopen met een soepele checkout en koppelingen met voorraad en boekhouding." },
      { title: "Boekingsplatform", text: "Klanten plannen zelf een afspraak, betaling en bevestiging inbegrepen." },
      { title: "Klantomgeving", text: "Een beveiligde online omgeving voor jouw klanten." },
    ],
    process: [
      { title: "Doelen & doelgroep", text: "We bepalen wat de website moet opleveren en voor wie hij bedoeld is." },
      { title: "Structuur & design", text: "We ontwerpen een logische structuur en een onderscheidende uitstraling." },
      { title: "Ontwikkeling", text: "We bouwen een snelle, responsive website met moderne technologie." },
      { title: "Lancering & groei", text: "Na livegang analyseren en optimaliseren we op basis van echte data." },
    ],
  },
  {
    slug: "systeemintegraties",
    title: "Systeemintegraties",
    short: "Systemen die samenwerken.",
    description:
      "Laat jouw systemen samenwerken en voorkom dubbel werk, fouten en versnipperde informatie.",
    intro:
      "De meeste bedrijven werken met meerdere systemen: een CRM, een boekhoudpakket, een agenda, een webshop. Als die niet met elkaar praten, wordt informatie handmatig overgezet. Wij koppelen jouw systemen zodat gegevens automatisch en betrouwbaar op de juiste plek komen.",
    icon: "integration",
    examples: ["API-koppelingen", "CRM-integraties", "Agenda-integraties", "Datastromen", "Procesoptimalisatie"],
    benefits: [
      { title: "Geen dubbel werk", text: "Gegevens worden één keer ingevoerd en automatisch gedeeld." },
      { title: "Actuele informatie", text: "Iedereen werkt met dezelfde, up-to-date gegevens." },
      { title: "Minder fouten", text: "Geen overtypfouten of vergeten updates meer." },
      { title: "Bestaande systemen behouden", text: "Je hoeft niet alles te vervangen: we laten bestaande tools beter samenwerken." },
    ],
    applications: [
      { title: "Webshop ↔ boekhouding", text: "Orders en betalingen automatisch verwerkt in je boekhoudsoftware." },
      { title: "Formulier ↔ CRM", text: "Nieuwe aanvragen direct als lead in je CRM, inclusief opvolgtaak." },
      { title: "Agenda-koppelingen", text: "Afspraken uit verschillende bronnen gesynchroniseerd in één agenda." },
      { title: "Datastromen", text: "Gegevens uit meerdere systemen samengebracht voor rapportage en inzicht." },
    ],
    process: [
      { title: "Inventarisatie", text: "We brengen je systemen, datastromen en knelpunten in kaart." },
      { title: "Integratieontwerp", text: "We bepalen welke gegevens waar naartoe gaan en hoe we de kwaliteit bewaken." },
      { title: "Koppelen & testen", text: "We realiseren de koppelingen en testen grondig met realistische data." },
      { title: "Monitoring", text: "We houden de koppelingen in de gaten en grijpen in als er iets misgaat." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

export type Sector = {
  slug: string;
  title: string;
  text: string;
  icon: IconKey;
  image: string | null;
  imageAlt: string;
  needs: string[];
  relatedServices: string[];
};

export const sectors: Sector[] = [
  {
    slug: "zorg",
    title: "Zorg & praktijken",
    text: "Digitale telefonie, afsprakenbeheer en efficiëntere administratieve processen.",
    icon: "health",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sfeerbeeld bij de sector zorg en praktijken",
    needs: [
      "Telefonische bereikbaarheid tijdens drukke spreekuren",
      "Afspraken plannen, verzetten en herinneringen versturen",
      "Minder administratieve last voor zorgverleners",
    ],
    relatedServices: ["automatisering-ai", "systeemintegraties"],
  },
  {
    slug: "zakelijke-dienstverlening",
    title: "Zakelijke dienstverlening",
    text: "CRM-systemen, workflowautomatisering en betere klantprocessen.",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sfeerbeeld bij de sector zakelijke dienstverlening",
    needs: [
      "Overzicht over klantrelaties en lopende trajecten",
      "Gestroomlijnde intake, offertes en opvolging",
      "Inzicht in uren, pipeline en resultaten",
    ],
    relatedServices: ["software-op-maat", "automatisering-ai"],
  },
  {
    slug: "mkb",
    title: "Mkb & ondernemingen",
    text: "Software, websites en systeemintegraties die groei ondersteunen.",
    icon: "building",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sfeerbeeld bij de sector mkb en ondernemingen",
    needs: [
      "Een professionele online presentatie die klanten oplevert",
      "Systemen die met de organisatie meegroeien",
      "Processen die minder afhankelijk zijn van handwerk",
    ],
    relatedServices: ["websites-platforms", "systeemintegraties", "software-op-maat"],
  },
];

export const processSteps = [
  { title: "Kennismaken", text: "We luisteren naar jouw uitdagingen en ontdekken waar de kansen liggen." },
  { title: "Strategie", text: "We bepalen samen welke technologische oplossing het meeste resultaat oplevert." },
  { title: "Ontwikkeling", text: "We bouwen en testen een oplossing die aansluit op jouw bedrijf." },
  { title: "Implementatie", text: "We zorgen dat alles soepel wordt geïntegreerd in jouw dagelijkse werkzaamheden." },
  { title: "Doorontwikkeling", text: "Ook na de lancering blijven we betrokken en denken we mee." },
];

export const advantages: { title: string; text: string; icon: IconKey }[] = [
  { title: "Persoonlijke aanpak", text: "Je werkt direct samen met de mensen die jouw oplossing ontwikkelen.", icon: "handshake" },
  { title: "Oplossingen op maat", text: "Geen standaardpakket als jouw bedrijf iets anders nodig heeft.", icon: "puzzle" },
  { title: "Van idee tot implementatie", text: "Wij begeleiden het volledige traject.", icon: "route" },
  { title: "Gericht op de lange termijn", text: "Wij bouwen oplossingen die kunnen meegroeien met jouw onderneming.", icon: "sprout" },
];

/**
 * Oprichters — VUL AAN met echte gegevens.
 * Foto's: plaats in /public/images/team/ en zet het pad in `photo`.
 */
export type Founder = {
  id: string;
  name: string | null;
  role: string | null;
  intro: string | null;
  linkedin: string | null;
  photo: string | null;
  photoFile: string;
};

export const founders: Founder[] = [
  { id: "oprichter-1", name: null, role: null, intro: null, linkedin: null, photo: null, photoFile: "public/images/team/oprichter-1.jpg" },
  { id: "oprichter-2", name: null, role: null, intro: null, linkedin: null, photo: null, photoFile: "public/images/team/oprichter-2.jpg" },
  { id: "oprichter-3", name: null, role: null, intro: null, linkedin: null, photo: null, photoFile: "public/images/team/oprichter-3.jpg" },
];

/** Alleen oprichters met ingevulde naam worden op de website getoond. */
export const publishedFounders = founders.filter((f) => f.name && f.role);

export const values = [
  { title: "Helder", text: "We leggen uit wat we doen en waarom, zonder onnodig jargon." },
  { title: "Praktisch", text: "We kiezen de oplossing die het meeste oplevert, niet de meest ingewikkelde." },
  { title: "Betrokken", text: "We denken mee als partner en blijven ook na de lancering beschikbaar." },
];

/** Teamfoto voor de hero. Zet op "/images/team/hero.jpg" zodra de foto beschikbaar is. */
export const heroPhoto: string | null = "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1600&q=85";

/** Keuzehulp */
export const finderProblems = [
  {
    id: "administratie",
    label: "We verliezen te veel tijd aan administratie.",
    service: "automatisering-ai",
    why: "Repeterende administratieve taken zijn vaak goed te automatiseren. Denk aan het automatisch verwerken van formulieren, versturen van bevestigingen en bijwerken van gegevens.",
    firstStep: "Een korte procesanalyse van je meest tijdrovende taken.",
  },
  {
    id: "telefoontjes",
    label: "We missen telefoontjes of klantaanvragen.",
    service: "automatisering-ai",
    why: "Een digitale receptionist of slimme chatbot zorgt dat iedere beller of aanvraag direct wordt opgevangen, ook als jouw team bezet is.",
    firstStep: "In kaart brengen wanneer en waarom contactmomenten worden gemist.",
  },
  {
    id: "systemen",
    label: "Onze systemen werken niet goed samen.",
    service: "systeemintegraties",
    why: "Met koppelingen tussen je bestaande systemen verdwijnt dubbel werk en werkt iedereen met dezelfde actuele informatie.",
    firstStep: "Een overzicht van je systemen en de gegevens die ertussen worden overgezet.",
  },
  {
    id: "software",
    label: "We hebben nieuwe software nodig.",
    service: "software-op-maat",
    why: "Software op maat sluit aan op hoe jouw organisatie werkt, in plaats van dat je je werkwijze aanpast aan een standaardpakket.",
    firstStep: "Samen de belangrijkste functionele wensen en prioriteiten bepalen.",
  },
  {
    id: "website",
    label: "Onze website is verouderd.",
    service: "websites-platforms",
    why: "Een moderne, snelle website versterkt je merk, wordt beter gevonden en helpt bezoekers om contact op te nemen.",
    firstStep: "Een korte analyse van je huidige website, doelen en doelgroep.",
  },
] as const;

/** Demonstratieprojecten — uitdrukkelijk GEEN echte klantcases. */
export const demoProjects = [
  {
    slug: "digitale-receptie",
    title: "Digitale receptie voor een fysiotherapiepraktijk",
    sector: "Zorg & praktijken",
    service: "automatisering-ai",
    challenge:
      "Tijdens behandelingen kan niemand de telefoon opnemen. Patiënten spreken een voicemail in of bellen later terug.",
    solution:
      "Een digitale receptionist die gesprekken aanneemt, veelgestelde vragen beantwoordt en afspraken direct in de praktijkagenda zet. Complexe vragen worden met een samenvatting doorgezet naar een medewerker.",
    shows: ["Gespreksafhandeling", "Agenda-integratie", "Overdracht naar medewerker"],
  },
  {
    slug: "crm-adviesbureau",
    title: "CRM op maat voor een adviesbureau",
    sector: "Zakelijke dienstverlening",
    service: "software-op-maat",
    challenge:
      "Klantinformatie staat verspreid over mailboxen, spreadsheets en notities. Niemand heeft volledig zicht op de pipeline.",
    solution:
      "Een overzichtelijk CRM met een visuele salespipeline, automatische opvolgtaken en een dashboard met de belangrijkste cijfers.",
    shows: ["Salespipeline", "Taken & opvolging", "Dashboard"],
  },
  {
    slug: "webshop-koppeling",
    title: "Koppeling tussen webshop en boekhouding",
    sector: "Mkb & ondernemingen",
    service: "systeemintegraties",
    challenge:
      "Iedere bestelling wordt handmatig overgenomen in het boekhoudpakket. Dat kost tijd en leidt tot fouten.",
    solution:
      "Een automatische datastroom die orders, betalingen en klantgegevens synchroniseert, inclusief foutmeldingen bij afwijkingen.",
    shows: ["API-koppeling", "Foutafhandeling", "Synchronisatie"],
  },
  {
    slug: "boekingsplatform",
    title: "Boekingsplatform voor een trainingscentrum",
    sector: "Mkb & ondernemingen",
    service: "websites-platforms",
    challenge:
      "Inschrijvingen lopen via e-mail en telefoon. Beschikbaarheid bijhouden is foutgevoelig.",
    solution:
      "Een website met geïntegreerd boekingssysteem, online betalen, automatische bevestigingen en een beheeromgeving.",
    shows: ["Online boeken", "Betalingen", "Beheeromgeving"],
  },
];

export const contactOptions = [
  { value: "", label: "Kies een oplossing" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "advies", label: "Weet ik nog niet — ik wil advies" },
];
