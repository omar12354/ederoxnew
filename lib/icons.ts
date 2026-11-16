import {
  Workflow,
  Code2,
  MonitorSmartphone,
  Cable,
  HeartPulse,
  Briefcase,
  Building2,
  Handshake,
  Puzzle,
  Route,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "./content";

export const icons: Record<IconKey, LucideIcon> = {
  automation: Workflow,
  software: Code2,
  web: MonitorSmartphone,
  integration: Cable,
  health: HeartPulse,
  briefcase: Briefcase,
  building: Building2,
  handshake: Handshake,
  puzzle: Puzzle,
  route: Route,
  sprout: Sprout,
};
