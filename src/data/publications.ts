export type PublicationGroup = 'published' | 'conference' | 'research';

export interface Publication {
  group: PublicationGroup;
  title: string;
  venue: string;
  date: string;
  authors?: string[];
  statuses: string[];
  tags: string[];
  description: string;
  href?: string;
  sourceLabel?: string;
}

export const publications: Publication[] = [
  {
    group: 'published',
    title: "Rewriting Tradition: Quantifying Change in Lady Gregory's Irish Legends",
    venue: 'DH2025: Alliance of Digital Humanities Organizations · Universidade NOVA de Lisboa, Lisbon, Portugal · 14–18 Jul 2025',
    date: '2025-07-14',
    authors: ['Rachel McCarthy', 'Rasika Edirisinghe', "James O'Sullivan", 'Clíona Ó Gallchoir', 'Rosane Minghim', 'Órla Murphy'],
    statuses: ['Published Conference Abstract', 'Conference Presentation'],
    tags: ['Digital Humanities', 'NLP', 'Literary Analysis', 'Textual Transformation'],
    href: 'https://doi.org/10.5281/zenodo.18340803', sourceLabel: 'DOI',
    description: "Published and presented at DH2025, this work examines textual transformation in Lady Gregory's retellings of Irish legend through computational comparison. The study uses quantitative text analysis to investigate changes in language, style, and textual structure while connecting computational measurements with questions of literary adaptation and transmission."
  },
  {
    group: 'published',
    title: 'Sentiment Reason Mining Framework for Analyzing Twitter Discourse on Critical Issues in US Healthcare Industry',
    venue: '2023 International Research Conference on Smart Computing and Systems Engineering (SCSE) · University of Kelaniya, Sri Lanka · 29 Jun 2023',
    date: '2023-06-29',
    authors: ['Rasika Edirisinghe', 'P. P. G. Dinesh Asanka'],
    statuses: ['Published Conference Paper'],
    tags: ['Sentiment Analysis', 'NLP', 'Topic Modelling', 'Machine Learning'],
    href: 'https://ieeexplore.ieee.org/document/10215010/', sourceLabel: 'IEEE Xplore',
    description: 'Presents a machine-learning framework for identifying sentiment and the reasons associated with those opinions in social-media discourse about the US healthcare industry. The approach combines NLP, sentiment analysis, clustering, and topic modelling to extract interpretable patterns from public discussion.'
  },
  {
    group: 'conference',
    title: 'Evaluating Lexical Extraction in Hiberno-English: Rule-Based and LLM-Assisted Approaches',
    venue: 'Digital Humanities Congress 2026 · University of Sheffield, Sheffield, UK · 2–3 Sep 2026',
    date: '2026-09-02', authors: ['Rasika Edirisinghe'], statuses: ['Conference Presentation'],
    tags: ['Digital Humanities', 'NLP', 'LLMs', 'Lexical Extraction', 'Hiberno-English'],
    href: 'https://www.dhi.ac.uk/dhc/2026/paper/320', sourceLabel: 'DHC 2026',
    description: 'Presented an evaluation of rule-based and large-language-model-assisted approaches to extracting structured lexical information from Hiberno-English dictionary material. The work considers how extraction quality can be assessed across structurally different dictionary entries.'
  },
  {
    group: 'conference',
    title: 'Modeling Parallel Text: A Multidimensional Typology of Authorship and Transformation',
    venue: 'CASCADE × MECANO Convention 1 · 28 Jan 2026',
    date: '2026-01-28', authors: ['Rasika Edirisinghe'], statuses: ['Published Abstract', 'Conference Presentation'],
    tags: ['Parallel Text', 'Text Reuse', 'Digital Humanities', 'Computational Literary Studies'],
    href: 'https://www.horizoncascade.net/wp-content/uploads/sites/42/2026/01/CASCADExMECANO_Convention1_ShortAbstracts-Jan-2026.pdf', sourceLabel: 'Abstract PDF',
    description: 'Published and presented at CASCADE × MECANO Convention 1, this work proposes a multidimensional framework for describing relationships between parallel texts by separating questions of authorship from the degree and nature of textual transformation. The model connects literary-theoretical accounts of textual relation with computational approaches to similarity, reuse, adaptation, and transformation.'
  },
  {
    group: 'research', title: 'Modelling Intertextual Relations under Transformation',
    venue: 'Doctoral Research · University College Cork · CASCADE MSCA Doctoral Network', date: '2024-09-01',
    statuses: ['Current Research'], tags: ['Information Retrieval', 'Text Reuse', 'Allusion', 'Semantic Similarity', 'LLMs'],
    description: 'Investigates how meaningful relationships between texts can be retrieved and evaluated when lexical overlap progressively disappears through paraphrase, obfuscation, adaptation, and allusion. The research combines large-scale semantic retrieval, relation judgement, benchmark construction, and evaluation across a spectrum of textual transformation.'
  },
  {
    group: 'research', title: 'Relation-Space Exploration and Visual Analytics for Parallel Text',
    venue: 'Doctoral Research · University College Cork · CASCADE MSCA Doctoral Network', date: '2024-09-01',
    statuses: ['Current Research'], tags: ['Visual Analytics', 'Information Retrieval', 'Embeddings', 'Digital Humanities'],
    description: 'Develops interactive methods for exploring large candidate spaces of textual relations and moving between aggregate patterns and close-reading views. Current work examines retrieval at sentence, paragraph, and chapter level.'
  },
  {
    group: 'research', title: 'Trust and Grounding in Agentic Cyber-Physical Systems',
    venue: 'Research Secondment · Nimbus Research Centre, Munster Technological University · inTrusted', date: '2026-07-01',
    statuses: ['Research Secondment'], tags: ['Agentic AI', 'Human-Robot Interaction', 'Cyber-Physical Systems', 'AI Safety', 'Grounding'],
    href: 'https://nimbuscentre.ie/project/intrusted/', sourceLabel: 'inTrusted',
    description: 'Research conducted with Tharindu Ranathunga during the Nimbus secondment examined failures that arise when conversational AI systems translate human instructions into physical action. The work focused on maintaining grounded, action-critical information across planning and tool-use stages.'
  }
];
