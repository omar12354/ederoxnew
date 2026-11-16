# Ederox — website (ederox.com)

Website van Ederox, gebouwd met **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS 4**, **Motion** en **Lucide Icons**. De hele site is in het Nederlands.

## Snel starten

Je hebt Node.js 20 of nieuwer nodig.

```bash
npm install
cp .env.example .env.local   # optioneel, zie "Configuratie"
npm run dev                  # http://localhost:3000
```

| Script              | Wat het doet                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Ontwikkelserver met hot reload     |
| `npm run build`     | Productiebuild                     |
| `npm run start`     | Productiebuild serveren            |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | TypeScript-controle                |

## Projectstructuur

```
app/                      Routes (App Router)
  page.tsx                Home
  oplossingen/            Overzicht + [slug] voor de 4 dienstpagina's
  sectoren/ ons-werk/ over-ons/ contact/ privacy/
  api/contact/route.ts    Server-side afhandeling van het contactformulier
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
components/               Herbruikbare componenten
  home/                   Hero, Services, Showcase (interactieve demo's)
  demos/                  Telefonie-, CRM- en automatiseringsdemo
lib/
  content.ts              ALLE teksten, diensten, sectoren, team (één plek om aan te passen)
  validation.ts           Formuliervalidatie (gedeeld door client en server)
public/images/            Foto's (team, sectoren)
```

## Wat je nog moet aanleveren

### Foto's
Er staan nu duidelijk gemarkeerde placeholders. Er worden bewust geen willekeurige personen als oprichters getoond.

| Bestand                                   | Waar het staat                    | Daarna instellen in `lib/content.ts`        |
| ----------------------------------------- | --------------------------------- | ------------------------------------------- |
| `public/images/team/hero.jpg`             | Hero homepage (staand, ±1600×2000) | `heroPhoto = "/images/team/hero.jpg"`       |
| `public/images/team/oprichter-1..3.jpg`   | Profielkaarten (4:5)               | `founders[i].photo`                         |
| `public/images/sectoren/zorg.jpg` e.d.    | Sectorkaarten (4:3)                | `sectors[i].image`                          |

Afbeeldingen worden automatisch geoptimaliseerd (AVIF/WebP, lazy loading) via `next/image`.

### Gegevens van het team
Vul in `lib/content.ts` → `founders` de **naam, functie, introductie en LinkedIn-URL** in. Lege velden tonen nu "Naam volgt" en dergelijke.

### Privacyverklaring
`app/privacy/page.tsx` is een concept. Laat hem juridisch controleren en vul de delen tussen [vierkante haken] in (KvK, adres, bewaartermijnen, verwerkers).

## Configuratie (`.env.local`)

| Variabele                 | Doel                                                                 |
| ------------------------- | -------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`    | Basis-URL voor sitemap, canonical en Open Graph (`https://ederox.com`) |
| `NEXT_PUBLIC_BOOKING_URL` | Optioneel: Calendly/Cal.com-link voor "Plan een kennismaking". Leeg = `/contact` |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contactformulier per e-mail via [Resend](https://resend.com) |
| `CONTACT_WEBHOOK_URL`     | Contactformulier naar een webhook (Make, Zapier, n8n, CRM)           |

**Contactformulier:** validatie werkt aan client- én serverzijde, met honeypot en een eenvoudige rate limit. Zolang er **geen** Resend-gegevens of webhook zijn ingesteld, geeft de API `503 not_configured` terug. Het formulier zegt dan eerlijk dat het bericht **niet** is verstuurd. Er wordt geen nepbevestiging getoond. Secrets staan alleen server-side (nooit `NEXT_PUBLIC_`).

## Publiceren op ederox.com

**Aanbevolen: Vercel**
1. Zet het project in een Git-repository (GitHub/GitLab).
2. Importeer het op [vercel.com](https://vercel.com/new). Het framework wordt automatisch herkend.
3. Stel de environment variables uit `.env.example` in onder *Settings → Environment Variables*.
4. Voeg onder *Settings → Domains* `ederox.com` en `www.ederox.com` toe en zet de DNS-records bij je domeinregistrar zoals Vercel aangeeft (A-record `76.76.21.21` voor de apex, CNAME `cname.vercel-dns.com` voor www).
5. Bij Resend: verifieer het domein ederox.com (SPF/DKIM), zodat `CONTACT_FROM_EMAIL` bijv. `website@ederox.com` kan zijn.

**Alternatief: eigen server (Node)**
```bash
npm ci && npm run build
NODE_ENV=production npm run start -- -p 3000
```
Zet er een reverse proxy (bijv. Nginx/Caddy) met HTTPS voor en laat het proces draaien met pm2 of systemd.

## Toegankelijkheid & performance
- Semantische HTML, één H1 per pagina, skip-link, zichtbare focus states, toetsenbordbediening (ook de tabs met pijltjestoetsen).
- `prefers-reduced-motion` wordt gerespecteerd (Motion `reducedMotion="user"` + CSS).
- Pagina's worden statisch gegenereerd. Alleen interactieve onderdelen zijn client components.
