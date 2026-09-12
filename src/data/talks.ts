export interface TimelineItem {
  title: string;
  event: string;
  date: string;
  dateLabel: string;
  location?: string;
  description: string;
  href?: string;
  linkLabel?: string;
  type: 'presentation' | 'contribution';
}

export const talks: TimelineItem[] = [
  { type: 'presentation', title: 'Evaluating Lexical Extraction in Hiberno-English: Rule-Based and LLM-Assisted Approaches', event: 'Digital Humanities Congress 2026', date: '2026-09-02', dateLabel: '2–3 September 2026', location: 'University of Sheffield', description: 'Presented an evaluation of rule-based and LLM-assisted approaches to extracting structured lexical information from Hiberno-English dictionary material.', href: 'https://www.dhi.ac.uk/dhc/2026/paper/320', linkLabel: 'Presentation details' },
  { type: 'presentation', title: 'Modeling Parallel Text: A Multidimensional Typology of Authorship and Transformation', event: 'CASCADE × MECANO Convention 1', date: '2026-01-28', dateLabel: '28 January 2026', description: 'Presented the multidimensional framework published in the Convention 1 short abstracts.', href: 'https://www.horizoncascade.net/wp-content/uploads/sites/42/2026/01/CASCADExMECANO_Convention1_ShortAbstracts-Jan-2026.pdf', linkLabel: 'Convention 1 short abstracts' },
  { type: 'presentation', title: "Beyond Translation: Rethinking 'Parallel Text' Across Disciplines", event: 'UCC Digital Humanities Colloquium', date: '2025-10-01', dateLabel: '1 October 2025', location: 'University College Cork', description: "Presented a cross-disciplinary reframing of the concept of 'parallel text', examining how the term is understood differently across NLP, translation studies, and digital humanities — and what a unified computational treatment would require." },
  { type: 'presentation', title: "Rewriting Tradition: Quantifying Change in Lady Gregory's Irish Legends", event: 'DH2025: Alliance of Digital Humanities Organizations', date: '2025-07-14', dateLabel: 'July 2025', location: 'Lisbon, Portugal', description: "Presented the published conference abstract on computational comparison of textual transformation in Lady Gregory's retellings of Irish legend.", href: 'https://doi.org/10.5281/zenodo.18340803', linkLabel: 'Published abstract' },
  { type: 'presentation', title: 'Language Modelling and Visualization for Parallel Text', event: 'CACSSS PhD Lightning Talks · University College Cork', date: '2025-04-04', dateLabel: '4 April 2025', location: 'University College Cork', description: 'Introduced doctoral research on language modelling and visualisation for parallel-text analysis to the CACSSS research community.' },
  { type: 'presentation', title: 'Sentiment Reason Mining Framework for Analyzing Twitter Discourse on Critical Issues in US Healthcare Industry', event: '2023 International Research Conference on Smart Computing and Systems Engineering (SCSE)', date: '2023-06-29', dateLabel: '29 June 2023', location: 'University of Kelaniya', description: 'Presented the research paper at SCSE 2023.' },
  { type: 'contribution', title: 'Peer Reviewer', event: '8th International Research Conference on Smart Computing and Systems Engineering (SCSE 2025)', date: '2025-02-01', dateLabel: 'February 2025', description: 'Evaluated academic papers on AI, NLP, and Machine Learning research; provided technical assessments and constructive feedback.' },
  { type: 'contribution', title: 'Evaluator — System Development Project Poster Presentation', event: 'Department of Industrial Management, Faculty of Science, University of Kelaniya', date: '2023-10-01', dateLabel: 'October 2023', description: 'Served as evaluator for student projects in System Development & Data Science.' },
  { type: 'contribution', title: 'Curriculum Development — Foundation to Data Science', event: 'Department of Electrical & Information Engineering, University of Ruhuna', date: '2023-08-01', dateLabel: 'August 2023', description: 'External consultant and reviewer for curriculum design covering Python, data preprocessing and acquisition, dimensionality reduction, cross-validation, overfitting and underfitting, and performance metrics.' }
];
