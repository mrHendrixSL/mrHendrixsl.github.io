export interface ResearchProject {
  id: string;
  title: string;
  context: string;
  dates: string;
  status: 'current' | 'completed';
  description: string;
  secondaryDescription?: string;
  href?: string;
  collaborator?: string;
}

export const projects: ResearchProject[] = [
  {
    id: 'doctoral',
    title: 'Modelling Intertextual Relations under Transformation',
    context: 'University College Cork · CASCADE Horizon Europe MSCA Doctoral Network',
    dates: 'Sep 2024 – Sep 2027 (expected)',
    status: 'current',
    description: 'My doctoral research examines how textual relations can be represented, retrieved, judged, and explored when surface similarity is weakened through paraphrase, adaptation, obfuscation, allusion, historical variation, and other forms of textual change.',
    secondaryDescription: 'The work combines information retrieval, language modelling, benchmark construction, evaluation, and visual analytics to support analysis across large textual collections.'
  },
  {
    id: 'nimbus-intrusted',
    title: 'Grounding and Trust in Agentic Cyber-Physical Systems',
    context: 'inTrusted project · Nimbus Research Centre · Munster Technological University',
    dates: 'Apr–Jul 2026',
    status: 'completed',
    href: 'https://nimbuscentre.ie/project/intrusted/',
    description: 'Completed a research secondment examining how natural-language instructions are preserved or altered as they pass through conversational interpretation, planning, tool use, and robotic action.'
  }
];
