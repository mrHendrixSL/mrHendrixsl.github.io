export interface Update {
  date: string;
  label: string;
  content: string;
  href?: string;
  linkLabel?: string;
  featured: boolean;
}

export const updates: Update[] = [
  {
    date: '2026-09', label: 'Sep 2026', featured: true,
    content: 'Presented Evaluating Lexical Extraction in Hiberno-English: Rule-Based and LLM-Assisted Approaches at Digital Humanities Congress 2026, University of Sheffield.',
    href: 'https://www.dhi.ac.uk/dhc/2026/paper/320', linkLabel: 'Presentation details'
  },
  {
    date: '2026-08', label: 'Aug 2026', featured: true,
    content: 'Accepted to participate in the Digital History Autumn School, From Data Acquisition to Data Publication: Quality Control, Tool Assessment, and Methodological Challenges in Digital History, at the Herder Institute in Marburg, Germany (28 Sep–2 Oct 2026).'
  },
  {
    date: '2026-07', label: 'Jul 2026', featured: true,
    content: 'Completed a research secondment at Nimbus Research Centre, MTU, working on grounding and trust in agentic cyber-physical systems within the inTrusted project.',
    href: 'https://nimbuscentre.ie/project/intrusted/', linkLabel: 'inTrusted project'
  },
  {
    date: '2026-01-28', label: 'Jan 2026', featured: true,
    content: 'Published and presented the abstract Modeling Parallel Text: A Multidimensional Typology of Authorship and Transformation at CASCADE × MECANO Convention 1 on 28 January 2026.',
    href: 'https://www.horizoncascade.net/wp-content/uploads/sites/42/2026/01/CASCADExMECANO_Convention1_ShortAbstracts-Jan-2026.pdf', linkLabel: 'Abstract PDF'
  },
  {
    date: '2025-07', label: 'Jul 2025', featured: true,
    content: "Published and presented the conference abstract Rewriting Tradition: Quantifying Change in Lady Gregory's Irish Legends at DH2025 in Lisbon.",
    href: 'https://doi.org/10.5281/zenodo.18340803', linkLabel: 'Published abstract'
  }
];
