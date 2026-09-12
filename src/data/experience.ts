export interface ExperienceEntry {
  title: string;
  organisation: string;
  meta: string;
  summary?: string;
  details?: string[];
  tags?: string[];
}

export const academic: ExperienceEntry[] = [
  {
    title: 'Teaching Assistant & Co-Lecturer — Data Visualization for Machine Learning',
    organisation: 'School of Computer Science & IT, University College Cork',
    meta: '2025/26 Academic Year · CS3205 / CS6426 · Cork, Ireland',
    summary: 'Co-taught the undergraduate and postgraduate Data Visualization for Machine Learning module. Responsibilities included revision of lecture and laboratory material, lecture delivery, practical laboratory teaching, preparation of teaching materials, and assessment.',
    details: ['Revised lecture content and laboratory material for the 2025/26 cohort.', 'Delivered lectures on data preparation, machine-learning visualisation workflows, and interpretation.', 'Designed and taught practical Python laboratory sessions.', 'Prepared lecture slides and supporting teaching material for the 2026 delivery.', 'Completed assessment and marking of student assignments and examinations.'],
    tags: ['Data Visualisation', 'Machine Learning', 'Python', 'Assessment']
  },
  {
    title: 'Visiting Lecturer', organisation: 'Department of Electrical & Information Engineering, University of Ruhuna', meta: 'Aug 2023 – Sep 2024 · Galle, Sri Lanka · Hybrid',
    summary: 'Courses taught: Introduction to Data Visualization with Power BI; Excel for Data Science; Data Preprocessing & Cleaning; and Data Splitting & Cross Validation.',
    details: ['Introduction to Data Visualization with Power BI — data sources, visualisations, colour theory, Gestalt principles, DAX expressions, and dashboards.', 'Excel for Data Science — data cleaning, PivotTables, time-series analysis, statistical analysis, and Solver.', 'Data Preprocessing & Cleaning — missing data, outlier detection, one-hot encoding, and categorical variables.', 'Data Splitting & Cross Validation — training, validation, and test sets; overfitting; precision, recall, F1, and confusion matrices.'],
    tags: ['Data Science Teaching', 'Power BI', 'Excel Analytics']
  },
  {
    title: 'Visiting Lecturer', organisation: 'Sri Lanka Telecom Training Centre · Sri Lanka Telecom PLC', meta: 'Aug 2023 – Sep 2024 · Welisara, Sri Lanka · On-site',
    summary: 'Taught Pearson BTEC courses and configured laboratory environments, coursework, and assessment material aligned with Pearson BTEC standards.',
    details: ['Fundamentals of AI & Intelligent Systems (K/618/5660) — AI types, applications, NLP, conversational AI, and ethics.', 'Big Data & Visualization (J/618/6251) — Python for big data, Jupyter, Power BI, DAX, and data governance.', 'Business Intelligence (M/615/1641) — BI systems, data warehouses, OLAP, and descriptive and predictive analytics.'],
    tags: ['AI Education', 'Big Data', 'Business Intelligence']
  }
];

export const industry: ExperienceEntry[] = [
  { title: 'Data Analyst', organisation: 'EFL Global', meta: 'May 2023 – Sep 2024 · Colombo, Sri Lanka · Hybrid', details: ['Automated global finance reporting across 39 countries & 70+ offices using Python, VBA & Advanced Excel.', 'Maintained Azure Databricks workloads supporting automated MIS, AR & AP reporting.', 'Built Power BI & Tableau dashboards for real-time insights and decision-making.', 'Implemented business workflow automation using Microsoft Power Automate & Logic Apps.', 'Managed Azure Analysis Services, Data Lakes, Blob Storage, and Synapse Analytics.'], tags: ['Python', 'Azure Databricks', 'Power BI', 'Tableau', 'Power Automate'] },
  { title: 'Implementation Engineer', organisation: 'Affno Asia Pacific', meta: 'Nov 2022 – May 2023 · Colombo, Sri Lanka', details: ['Designed and deployed BI solutions for supply chain analytics.', 'Developed Python & VBA-based data-wrangling automation for large datasets.', 'Worked as Technical Business Analyst in support of client operations.', 'Worked with Amazon EC2 & MongoDB Atlas for cloud-based solutions.'], tags: ['Data Wrangling', 'Business Intelligence', 'Supply Chain Analytics', 'MongoDB'] },
  { title: 'Operations Analyst', organisation: 'SYNERGEN Health', meta: 'Sep 2019 – Nov 2022 · Colombo, Sri Lanka', details: ['Managed the Qlik Sense cloud-based RCM BI platform (Doctrix) for real-time KPI & SLA monitoring.', 'Led process training for multiple clients in Revenue Cycle Management (RCM).', 'Implemented Python & VBA automation for financial reporting and data integrity.', 'Maintained Amazon DynamoDB & Kinesis Data Streams for real-time analytics.'], tags: ['Healthcare BI', 'QlikSense', 'Revenue Cycle Analytics', 'Python', 'VBA'] },
  { title: 'Associate Operations Analyst (Intern)', organisation: 'SYNERGEN Health', meta: 'Mar 2019 – Sep 2019 · Colombo, Sri Lanka', details: ['Assisted data management processes and trade support.', 'Conducted client reporting, process monitoring, and data sanity checks.'] },
  { title: 'Business Analyst (Intern)', organisation: 'Global System Solutions', meta: 'Sep 2018 – Mar 2019 · Colombo, Sri Lanka', details: ['Gathered requirements through interviews, workshops, and site visits.', 'Developed use cases, workflows, and requirement documentation.', 'Supported pre-sales activities for business intelligence solutions.'] }
];

export const education: ExperienceEntry[] = [
  { title: 'PhD in Computer Science', organisation: 'University College Cork, Ireland', meta: 'Sep 2024 – Sep 2027 (expected) · CASCADE Horizon Europe MSCA Doctoral Network', summary: 'Research focus: Modelling Intertextual Relations under Transformation: Retrieval, Judgement, and Visual Analytics across the Parallel Text Spectrum', details: ['Representing textual relations across paraphrase, adaptation, obfuscation, allusion, historical variation, and related forms of transformation.', 'Developing large-scale retrieval methods for passages with limited lexical overlap.', 'Constructing benchmarks and evaluating relation judgements across different forms and degrees of transformation.', 'Designing visual-analytics methods for exploring relation spaces and supporting close reading.'] },
  { title: 'M.Sc. Business Analytics', organisation: 'Robert Gordon University, Aberdeen, UK', meta: 'Sep 2021 – Sep 2023 · Distinction', summary: 'Thesis: Twitter Sentiment Reason Mining Framework to Identify Major Problems in US Healthcare Industry · Grade: A', details: ['Developed a Python-based NLP framework using sentiment analysis, topic modelling, clustering, and text vectorisation to analyse Twitter discourse on the US healthcare sector.'] },
  { title: 'B.Sc. (Hons) Business Information Systems', organisation: 'Cardiff Metropolitan University, Cardiff, UK', meta: 'Nov 2016 – Oct 2018', summary: 'Thesis: Computer-Aided Diagnosis System for Lung Cancer Detection — a Java-based CADe system using image processing and machine learning.' },
  { title: 'BTEC Higher National Diploma in Software Development', organisation: 'Pearson Edexcel, UK', meta: 'May 2014 – May 2016', summary: 'Coursework included object-oriented programming, data structures and algorithms, IT security, networking technologies, web application development, and database development.' }
];

export const skillGroups = [
  { title: 'Research Methods', items: ['Information Retrieval','Semantic Retrieval','Corpus Engineering','Benchmark Design','Relation Judgement','LLM Evaluation','Textual Similarity','Visual Analytics','Experimental Evaluation'] },
  { title: 'NLP & Retrieval', items: ['Hugging Face Transformers','SentenceTransformers / SBERT','spaCy','Gensim','NLTK','BM25','ANN Search','LLM APIs','Local Language Models','Rule-Based Parsing'] },
  { title: 'Data & Research Engineering', items: ['Python','SQL','Pandas','DuckDB','PyArrow','JSONL','Parquet','PyTorch','scikit-learn','CUDA','Git','Jupyter'] },
  { title: 'Visualisation & Analytics', items: ['Plotly','Matplotlib','Streamlit','Power BI','Tableau','Qlik Sense','DAX'] },
  { title: 'Cloud & Systems', items: ['Azure Databricks','Azure Synapse','Azure Blob Storage','Azure Logic Apps','Power Automate','AWS EC2','AWS DynamoDB','AWS Kinesis','MongoDB Atlas'] }
];
