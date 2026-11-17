/**
 * Modern, freely usable Pexels editorial photography.
 * Each photo has its own source ID; images are purely illustrative,
 * not depictions of Ederox employees, products or existing customers.
 * Centralized so every page uses the same visual direction.
 */
const pexels = (id: number, width = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;

export const media = {
  hero: pexels(34774358, 1600),
  sectors: {
    zorg: pexels(31844508, 1400),
    "zakelijke-dienstverlening": pexels(39219944, 1400),
    mkb: pexels(33342702, 1400),
  },
  services: {
    "automatisering-ai": pexels(34212896, 1200),
    "software-op-maat": pexels(36706460, 1200),
    "websites-platforms": pexels(40857901, 1200),
    systeemintegraties: pexels(37730211, 1200),
  },
  projects: {
    "digitale-receptie": pexels(33812025, 1200),
    "crm-adviesbureau": pexels(34804005, 1200),
    "webshop-koppeling": pexels(33572895, 1200),
    boekingsplatform: pexels(35203644, 1200),
  },
} as const;
