/**
 * Curated, editorial imagery for Ederox. Real commercial/technology scenes, never
 * presented as Ederox employees or completed client work.
 *
 * Unsplash download endpoints resolve to original photos and avoid the generic
 * photo IDs previously used across unrelated industries. Shared imagery is
 * intentional only when the same sector appears on two different routes.
 */
const unsplash = (id: string, width = 1600) =>
  `https://unsplash.com/photos/${id}/download?force=true&w=${width}&q=85`;

export const media = {
  hero: unsplash("sXYBmejEK8U", 1600),
  sectors: {
    zorg: unsplash("odfdtDItnT4", 1400),
    "zakelijke-dienstverlening": unsplash("4uIRzJYYaOE", 1400),
    mkb: unsplash("xaGFrbbJuAo", 1400),
  },
  services: {
    "automatisering-ai": unsplash("wGlgRXVax5c", 1200),
    "software-op-maat": unsplash("NaqeNu5PGks", 1200),
    "websites-platforms": unsplash("Mgjum08dZx8", 1200),
    systeemintegraties: unsplash("lZkRGePI5HA", 1200),
  },
  projects: {
    "digitale-receptie": unsplash("AhTbsbvyO-g", 1200),
    "crm-adviesbureau": unsplash("WrlIRaC9t-A", 1200),
    "webshop-koppeling": unsplash("Q3xWisdE54Q", 1200),
    boekingsplatform: unsplash("t2Qwt_ZBYCw", 1200),
  },
} as const;
