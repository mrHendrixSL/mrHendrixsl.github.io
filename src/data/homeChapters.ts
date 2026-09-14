export const homeChapters = [
  { id: 'intro', index: '00', label: 'Identity', railLabel: 'Intro', href: '/' },
  { id: 'position', index: '01', label: 'Research position', railLabel: 'Position', href: '/position/' },
  { id: 'transformation', index: '02', label: 'Relation under transformation', railLabel: 'Transformation', href: '/transformation/' },
  { id: 'architecture', index: '03', label: 'Research architecture', railLabel: 'Architecture', href: '/architecture/' },
  { id: 'now', index: '04', label: 'Now / additional work', railLabel: 'Now', href: '/now/' }
] as const;

export type HomeChapterId = typeof homeChapters[number]['id'];
