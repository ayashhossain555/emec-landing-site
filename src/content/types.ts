export type ProjectCategory = "river" | "water" | "env" | "plan";

export interface Project {
  name: string;
  duration: string;
  client: string;
  location: string;
  category: ProjectCategory;
}

export interface Fact {
  k: string;
  v: string;
}

/** A long-form case study, rendered at /projects/[slug] or /digital/[slug]. */
export interface CaseStudy {
  slug: string;
  /** Short title used on cards. */
  short: string;
  /** Full official assignment name, used as the page H1. */
  name: string;
  client: string;
  location: string;
  country: string;
  facts: Fact[];
  narrative: string;
  services: string[];
}

export interface DigitalCaseStudy extends CaseStudy {
  /** Caption for the screenshot placeholder until real imagery exists. */
  shot: string;
  summary: string;
  tech: string[];
}

export interface ServiceGroup {
  num: string;
  color: string;
  title: string;
  blurb: string;
  items: string[];
}

export interface DigitalCapability {
  num: string;
  color: string;
  title: string;
  text: string;
  items: string[];
}

export interface Client {
  abbr: string;
  name: string;
  /** Path under /public (e.g. "/clients/jica.svg"). Omit to render text only. */
  logo?: string;
}

export interface TeamMember {
  name: string;
  role?: string;
  qual?: string;
  years?: number;
  skills: string[];
}
