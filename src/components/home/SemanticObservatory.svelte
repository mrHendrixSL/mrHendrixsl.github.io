<script lang="ts">
  import { onMount } from 'svelte';
  import {
    Delaunay,
    curveBasis,
    forceCenter,
    forceCollide,
    forceLink,
    forceManyBody,
    forceSimulation,
    line,
    randomLcg,
    type SimulationLinkDatum,
    type SimulationNodeDatum
  } from 'd3';

  type Point = { x: number; y: number };
  type RelationNode = SimulationNodeDatum & { id: string; label: string; anchor?: boolean; fx?: number; fy?: number };
  type RelationLink = SimulationLinkDatum<RelationNode> & { source: string | RelationNode; target: string | RelationNode; strong?: boolean };

  const phases = [
    { key: 'texts', label: 'Texts', output: 'Text / corpus', tools: ['TEI / XML', 'JSONL', 'Parquet'] },
    { key: 'represent', label: 'Represent', output: 'Embeddings', tools: ['Python', 'PyTorch', 'SentenceTransformers', 'Hugging Face', 'spaCy'] },
    { key: 'retrieve', label: 'Retrieve', output: 'Candidates', tools: ['FAISS', 'BM25', 'ANN search', 'DuckDB'] },
    { key: 'judge', label: 'Judge', output: 'Ranked relations', tools: ['LLMs', 'Benchmark design', 'Relation judgement', 'scikit-learn'] },
    { key: 'explore', label: 'Explore', output: 'Relation map', tools: ['D3.js', 'Plotly', 'Streamlit', 'Matplotlib'] },
    { key: 'relation', label: 'Relation space', output: 'Persistent relation', tools: ['Different words', 'The same questions', 'New ways to find them'] }
  ];

  const seeded = randomLcg(.4162);
  const clusterCenters = [
    { x: 405, y: 228 },
    { x: 558, y: 218 },
    { x: 500, y: 332 }
  ];
  const wordPoints = Array.from({ length: 52 }, (_, index) => {
    const fromPrimary = index < 31;
    const startColumn = index % (fromPrimary ? 9 : 7);
    const startRow = Math.floor(index / (fromPrimary ? 9 : 7));
    const cluster = index % clusterCenters.length;
    const center = clusterCenters[cluster];
    const angle = seeded() * Math.PI * 2;
    const radius = Math.sqrt(seeded());
    const depth = seeded() * 2 - 1;
    const selected = [4, 11, 18, 27, 38, 46].includes(index);
    return {
      index,
      cluster,
      depth,
      sx: (fromPrimary ? 165 : 315) + startColumn * 14,
      sy: (fromPrimary ? 185 : 315) + startRow * 15,
      tx: center.x + Math.cos(angle) * radius * 76 + depth * 13,
      ty: center.y + Math.sin(angle) * radius * 53 - depth * 9,
      radius: (selected ? 4.6 : 1.7 + seeded() * 2.1) * (.9 + (depth + 1) * .09),
      selected
    };
  });

  const embeddingDelaunay = Delaunay.from(wordPoints, point => point.tx, point => point.ty);
  const embeddingLinks: Array<{ source: typeof wordPoints[number]; target: typeof wordPoints[number]; weak: boolean }> = [];
  wordPoints.forEach((point, index) => {
    for (const neighbour of embeddingDelaunay.neighbors(index)) {
      if (neighbour > index && embeddingLinks.length < 74) {
        const target = wordPoints[neighbour];
        embeddingLinks.push({ source: point, target, weak: !(point.selected || target.selected) });
      }
    }
  });

  const pathMaker = line<Point>().x(point => point.x).y(point => point.y).curve(curveBasis);
  const queryPoint = wordPoints.find(point => point.selected) ?? wordPoints[0];
  const candidatePoints = wordPoints.filter(point => point.selected);
  const clusterGuides = clusterCenters.map((center, cluster) => {
    const members = wordPoints.filter(point => point.cluster === cluster);
    const radiusX = Math.max(...members.map(point => Math.abs(point.tx - center.x))) + 17;
    const radiusY = Math.max(...members.map(point => Math.abs(point.ty - center.y))) + 14;
    return { ...center, radiusX, radiusY };
  });
  const queryPaths = candidatePoints.map((candidate, index) => pathMaker([
    { x: queryPoint.tx, y: queryPoint.ty },
    { x: 500 + index * 17, y: 250 + Math.sin(index) * 52 },
    { x: candidate.tx, y: candidate.ty }
  ]) ?? '');

  const relationNodes: RelationNode[] = [
    { id: 'milton', label: 'Milton', anchor: true, fx: 235, fy: 195 },
    { id: 'shelley', label: 'Shelley', anchor: true, fx: 735, fy: 335 },
    { id: 'created', label: 'created being', anchor: true, x: 480, y: 265 },
    { id: 'creator', label: 'creator', x: 330, y: 295 },
    { id: 'creation', label: 'creation', x: 475, y: 150 },
    { id: 'adam', label: 'Adam', x: 665, y: 185 },
    { id: 'angel', label: 'fallen angel', x: 635, y: 305 },
    { id: 'responsibility', label: 'responsibility', x: 440, y: 375 },
    { id: 'allusion', label: 'allusion', x: 585, y: 390 }
  ];
  const relationLinks: RelationLink[] = [
    { source: 'milton', target: 'created', strong: true },
    { source: 'milton', target: 'creator' },
    { source: 'milton', target: 'creation', strong: true },
    { source: 'creator', target: 'created', strong: true },
    { source: 'creation', target: 'created' },
    { source: 'created', target: 'adam', strong: true },
    { source: 'created', target: 'responsibility' },
    { source: 'adam', target: 'shelley', strong: true },
    { source: 'angel', target: 'shelley', strong: true },
    { source: 'responsibility', target: 'shelley' },
    { source: 'responsibility', target: 'allusion' },
    { source: 'allusion', target: 'shelley' },
    { source: 'creation', target: 'adam' },
    { source: 'created', target: 'angel' }
  ];
  const simulation = forceSimulation<RelationNode>(relationNodes)
    .randomSource(randomLcg(.731))
    .force('link', forceLink<RelationNode, RelationLink>(relationLinks).id(node => node.id).distance(105).strength(.55))
    .force('charge', forceManyBody().strength(-380))
    .force('center', forceCenter(485, 270))
    .force('collide', forceCollide(42))
    .stop();
  for (let index = 0; index < 180; index += 1) simulation.tick();
  relationNodes.forEach(node => {
    node.x = Math.max(150, Math.min(810, node.x ?? 480));
    node.y = Math.max(115, Math.min(405, node.y ?? 270));
  });
  const drawLinks = relationLinks.map(link => ({
    source: link.source as RelationNode,
    target: link.target as RelationNode,
    strong: link.strong
  }));

  let observatory: HTMLElement;

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let context: { revert: () => void } | null = null;
    (async () => {
      const { default: gsap } = await import('gsap');
      if (cancelled) return;

      context = gsap.context(() => {
        const phaseLabels = Array.from(observatory.querySelectorAll<HTMLElement>('[data-phase]'));
        const toolGroups = Array.from(observatory.querySelectorAll<HTMLElement>('[data-tools]'));
        const points = Array.from(observatory.querySelectorAll<SVGCircleElement>('.word-point'));
        const selectedPoints = points.filter(point => point.classList.contains('selected'));
        const unselectedPoints = points.filter(point => !point.classList.contains('selected'));
        const rejectedPoints = selectedPoints.slice(-2);
        const activate = (timeline: gsap.core.Timeline, index: number, at: number) => {
          timeline.to(phaseLabels, { color: '#85858a', opacity: .48, duration: .22 }, at)
            .to(phaseLabels[index], { color: '#c9a46b', opacity: 1, duration: .22 }, at)
            .to(toolGroups, { autoAlpha: 0, duration: .18 }, at)
            .to(toolGroups[index], { autoAlpha: 1, duration: .28 }, at + .08);
        };

        const timeline = gsap.timeline({ repeat: -1, defaults: { ease: 'power2.inOut' } });
        timeline
          .set('.text-scene, .text-card', { autoAlpha: 0 })
          .set('.text-scene', { autoAlpha: 1 })
          .set('.text-card', { x: -70, y: 0, scale: .98 })
          .set('.semantic-camera', { x: 0, y: 0, scale: .9, transformOrigin: 'center' })
          .set('.depth-plane, .depth-strut, .embedding-link, .retrieval-path, .query-node, .cluster-boundary, .judge-link, .final-network, .final-copy', { autoAlpha: 0 })
          .set(points, { autoAlpha: 0, attr: { cx: (_index: number, element: SVGCircleElement) => element.dataset.sx, cy: (_index: number, element: SVGCircleElement) => element.dataset.sy } })
          .set(phaseLabels, { color: '#85858a', opacity: .48 })
          .set(toolGroups, { autoAlpha: 0 })
          .to('.text-card', { autoAlpha: 1, x: 0, duration: .72, stagger: .13 }, 0)
          .to('.text-card', { y: -3, duration: 1.1, stagger: .08 }, .78);
        activate(timeline, 0, 0);

        timeline
          .to('.text-card', { autoAlpha: .12, x: 46, scale: .94, duration: .9, stagger: .05 }, 2)
          .to('.depth-plane', { autoAlpha: 1, duration: .72, stagger: .1 }, 2.02)
          .to('.depth-strut', { autoAlpha: .52, duration: .65, stagger: .04 }, 2.16)
          .to('.semantic-camera', { scale: 1, duration: 1.35 }, 2.05)
          .to(points, {
            autoAlpha: .72,
            attr: { cx: (_index: number, element: SVGCircleElement) => element.dataset.tx, cy: (_index: number, element: SVGCircleElement) => element.dataset.ty },
            duration: 1.55,
            stagger: .008
          }, 2.08)
          .to('.text-scene', { autoAlpha: 0, duration: .55 }, 3.22)
          .to('.depth-plane', { autoAlpha: .58, duration: .45 }, 3.42);
        activate(timeline, 1, 2);

        timeline
          .to('.semantic-camera', { x: -20, y: 4, scale: 1.06, duration: 1.35 }, 4)
          .to('.embedding-link', { autoAlpha: .3, duration: .65, stagger: .006 }, 4)
          .to('.retrieval-path', { autoAlpha: .85, strokeDashoffset: 0, duration: .95, stagger: .08 }, 4.05)
          .to('.query-node', { autoAlpha: 1, scale: 1.35, transformOrigin: 'center', duration: .38 }, 4.08)
          .to(selectedPoints, { autoAlpha: 1, scale: 1.22, transformOrigin: 'center', duration: .45, stagger: .06 }, 4.52)
          .to('.depth-plane', { autoAlpha: .38, duration: .6 }, 5.25);
        activate(timeline, 2, 4);

        timeline
          .to('.semantic-camera', { x: -54, y: -9, scale: 1.16, duration: 1.25 }, 6)
          .to('.cluster-boundary', { autoAlpha: .68, duration: .68, stagger: .09 }, 6.02)
          .to('.embedding-link.weak', { autoAlpha: .025, duration: .75 }, 6.05)
          .to(unselectedPoints, { autoAlpha: .055, duration: .78 }, 6.08)
          .to(rejectedPoints, { autoAlpha: .18, scale: .72, transformOrigin: 'center', duration: .75, stagger: .08 }, 6.24)
          .to('.retrieval-path', { autoAlpha: .08, duration: .7 }, 6.18)
          .to('.judge-link', { autoAlpha: 1, strokeDashoffset: 0, duration: .9, stagger: .08 }, 6.45);
        activate(timeline, 3, 6);

        timeline
          .to('.semantic-camera', { x: -82, y: -18, scale: 1.26, autoAlpha: .1, duration: .88 }, 8)
          .fromTo('.final-network', { autoAlpha: 0, scale: .88, transformOrigin: 'center' }, { autoAlpha: 1, scale: 1, duration: 1.15 }, 8.08)
          .fromTo('.relation-link', { strokeDashoffset: 160 }, { strokeDashoffset: 0, duration: 1.05, stagger: .045 }, 8.12)
          .fromTo('.relation-node', { autoAlpha: 0, scale: .3, transformOrigin: 'center' }, { autoAlpha: 1, scale: 1, duration: .58, stagger: .055 }, 8.28);
        activate(timeline, 4, 8);

        timeline
          .to('.final-network', { x: -135, y: 8, scale: .72, transformOrigin: 'center', duration: .9 }, 9.85)
          .to('.final-copy', { autoAlpha: 1, y: 0, duration: .82 }, 10)
          .to('.final-network', { x: -132.5, y: 6.5, duration: 2.4, ease: 'sine.inOut' }, 10.75);
        activate(timeline, 5, 10);

        timeline
          .to('.final-network, .final-copy', { autoAlpha: 0, duration: .75 }, 13.25)
          .to(toolGroups, { autoAlpha: 0, duration: .35 }, 13.25)
          .to(phaseLabels, { opacity: .28, duration: .35 }, 13.25)
          .set({}, {}, 14.15);
      }, observatory);
    })();

    return () => {
      cancelled = true;
      context?.revert();
    };
  });
</script>

<section bind:this={observatory} class="observatory" aria-labelledby="observatory-title">
  <header>
    <p id="observatory-title">The semantic observatory</p>
    <h2>From text to relation.</h2>
  </header>

  <div class="observatory-frame">
    <div class="phase-rail" aria-hidden="true">
      {#each phases as phase, index}<span data-phase={phase.key}><i>0{index + 1}</i>{phase.label}</span>{/each}
    </div>

    <svg viewBox="0 0 960 540" role="img" aria-labelledby="observatory-svg-title observatory-svg-description">
      <title id="observatory-svg-title">Textual relations under transformation</title>
      <desc id="observatory-svg-description">An archival text becomes a semantic representation, candidate relations are retrieved and judged, and an interpretable Milton and Shelley relation map remains after wording changes.</desc>
      <defs>
        <linearGradient id="observatory-pane" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8d96d8" stop-opacity=".12"/><stop offset="1" stop-color="#141a27" stop-opacity=".26"/></linearGradient>
        <radialGradient id="observatory-amber"><stop offset="0" stop-color="#f3d99b"/><stop offset=".4" stop-color="#c9a46b"/><stop offset="1" stop-color="#c9a46b" stop-opacity="0"/></radialGradient>
        <filter id="observatory-glow" x="-250%" y="-250%" width="500%" height="500%"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <g class="field-grid" aria-hidden="true"><path d="M80 115H880M80 215H880M80 315H880M80 415H880M180 75V455M380 75V455M580 75V455M780 75V455"/></g>

      <g class="text-scene">
        <g transform="translate(105 145)">
          <g class="text-card primary">
            <rect width="390" height="145" rx="3"/>
            <text x="24" y="42"><tspan x="24">“Did I request thee, Maker, from my clay</tspan><tspan x="24" dy="30">To mould me Man...”</tspan></text>
          </g>
        </g>
        <g transform="translate(270 298)">
          <g class="text-card secondary">
            <rect width="285" height="118" rx="3"/>
            <text x="21" y="37"><tspan x="21">“I ought to be thy Adam,</tspan><tspan x="21" dy="28">but I am rather the fallen angel...”</tspan></text>
          </g>
        </g>
        <g transform="translate(90 330)"><g class="text-card distant"><rect width="150" height="82"/><path d="M18 24H120M18 40H132M18 56H96"/></g></g>
        <g transform="translate(460 115)"><g class="text-card distant"><rect width="150" height="82"/><path d="M18 24H120M18 40H92M18 56H130"/></g></g>
      </g>

      <g class="semantic-camera">
        <g class="representation-space">
          <polygon class="depth-plane depth-back" points="270,122 650,82 650,374 270,414"/>
          <polygon class="depth-plane depth-middle" points="315,142 695,105 695,395 315,432"/>
          <polygon class="depth-plane depth-front" points="360,162 740,129 740,416 360,449"/>
          <path class="depth-strut" d="M270 122L360 162M650 82L740 129M650 374L740 416M270 414L360 449"/>
        </g>

        <g class="word-field">
          {#each embeddingLinks as link}<line class:weak={link.weak} class="embedding-link" x1={link.source.tx} y1={link.source.ty} x2={link.target.tx} y2={link.target.ty}/>{/each}
          {#each wordPoints as point}
            <circle class:selected={point.selected} class:near={point.depth > .34} class:far={point.depth < -.34} class="word-point" data-sx={point.sx} data-sy={point.sy} data-tx={point.tx} data-ty={point.ty} cx={point.sx} cy={point.sy} r={point.radius}/>
          {/each}
        </g>

        <g class="retrieval-field">
          {#each queryPaths as path}<path class="retrieval-path" d={path} pathLength="100"/>{/each}
          <circle class="query-node" cx={queryPoint.tx} cy={queryPoint.ty} r="9"/>
        </g>

        <g class="judgement-field">
          {#each clusterGuides as guide}<ellipse class="cluster-boundary" cx={guide.x} cy={guide.y} rx={guide.radiusX} ry={guide.radiusY}/>{/each}
          {#each candidatePoints.slice(0, -1) as point, index}<line class="judge-link" x1={point.tx} y1={point.ty} x2={candidatePoints[index + 1].tx} y2={candidatePoints[index + 1].ty} pathLength="100"/>{/each}
        </g>
      </g>

      <g class="final-network">
        {#each drawLinks as link}<line class:strong={link.strong} class="relation-link" x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y} pathLength="160"/>{/each}
        {#each relationNodes as node}
          <g class:anchor={node.anchor} class="relation-node" transform={`translate(${node.x} ${node.y})`}>
            <circle r={node.anchor ? 8 : 5}/><text x="13" y="4">{node.label}</text>
          </g>
        {/each}
      </g>

      <g transform="translate(605 155)">
        <g class="final-copy">
          <text class="final-statement"><tspan x="0">Different words.</tspan><tspan x="0" dy="38">The same questions.</tspan><tspan x="0" dy="38">New ways to find them.</tspan></text>
          <path d="M0 150H78"/><text class="final-caption" x="94" y="154">TEXTUAL RELATIONS UNDER TRANSFORMATION</text>
        </g>
      </g>
    </svg>

    <div class="tool-readout" aria-hidden="true">
      <span>Active toolset</span>
      <div>{#each phases as phase}<p data-tools={phase.key}><strong>{phase.output}</strong>{phase.tools.join(' · ')}</p>{/each}</div>
    </div>
  </div>

  <ol class="sr-only">
    {#each phases as phase}<li>{phase.label}. {phase.output}. {phase.tools.join(', ')}.</li>{/each}
  </ol>
</section>

<style>
  .observatory { width: 100%; }
  header { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding-bottom: .7rem; border-bottom: 1px solid var(--rule); }
  header p, header h2 { margin: 0; font-family: var(--mono); font-size: .62rem; font-weight: 500; letter-spacing: .1em; line-height: 1.4; text-transform: uppercase; }
  header p { color: var(--amber); }
  header h2 { color: var(--paper-dim); }
  .observatory-frame { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border-bottom: 1px solid var(--rule); background: radial-gradient(circle at 52% 48%, rgba(37,44,68,.24), transparent 52%); }
  .observatory-frame::after { position: absolute; inset: 0; border: 1px solid rgba(141,150,216,.12); pointer-events: none; content: ''; }
  svg { display: block; width: 100%; height: 100%; }
  .field-grid path { fill: none; stroke: rgba(141,150,216,.055); stroke-width: 1; }
  .text-card rect { fill: rgba(13,17,27,.82); stroke: rgba(141,150,216,.46); stroke-width: 1.2; }
  .text-card text { fill: var(--paper); font-family: var(--serif); font-size: 21px; line-height: 1.35; }
  .text-card.secondary { opacity: .62; }
  .text-card.secondary text { fill: var(--paper-soft); font-size: 18px; }
  .text-card.distant { opacity: .3; }
  .text-card.distant path { fill: none; stroke: var(--paper-dim); stroke-width: 1.2; }
  .depth-plane { fill: url(#observatory-pane); stroke: rgba(141,150,216,.52); stroke-width: 1.1; }
  .depth-back { opacity: .28; }
  .depth-middle { opacity: .46; }
  .depth-front { opacity: .62; }
  .depth-strut { fill: none; stroke: rgba(141,150,216,.38); stroke-width: .9; }
  .embedding-link { stroke: rgba(141,150,216,.25); stroke-width: .8; }
  .word-point { fill: var(--indigo); filter: url(#observatory-glow); }
  .word-point.far { opacity: .48; }
  .word-point.near { stroke: rgba(209,214,255,.35); stroke-width: .8; }
  .word-point.selected { fill: var(--amber); }
  .retrieval-path { fill: none; stroke: rgba(201,164,107,.78); stroke-width: 1.6; stroke-dasharray: 100; stroke-dashoffset: 100; }
  .query-node { fill: url(#observatory-amber); filter: url(#observatory-glow); }
  .cluster-boundary { fill: rgba(141,150,216,.025); stroke: rgba(141,150,216,.52); stroke-width: 1; stroke-dasharray: 4 7; }
  .judge-link { stroke: var(--amber); stroke-width: 1.6; stroke-dasharray: 100; stroke-dashoffset: 100; }
  .relation-link { stroke: rgba(141,150,216,.5); stroke-width: 1.2; stroke-dasharray: 160; }
  .relation-link.strong { stroke: rgba(201,164,107,.8); stroke-width: 1.7; }
  .relation-node circle { fill: var(--indigo); stroke: var(--ink-0); stroke-width: 2; filter: url(#observatory-glow); }
  .relation-node.anchor circle { fill: var(--amber); }
  .relation-node text { fill: var(--paper-soft); font-family: var(--serif); font-size: 18px; }
  .final-copy { opacity: 1; }
  .final-statement { fill: var(--paper); font-family: var(--serif); font-size: 28px; font-style: italic; }
  .final-copy path { stroke: var(--amber); stroke-width: 2; }
  .final-caption { fill: var(--paper-dim); font-family: var(--mono); font-size: 9px; letter-spacing: 1.2px; }
  .phase-rail { position: absolute; top: 50%; left: .9rem; z-index: 2; display: grid; gap: .52rem; width: 7.4rem; transform: translateY(-50%); }
  .phase-rail span { display: grid; grid-template-columns: 1.45rem 1fr; gap: .35rem; color: var(--paper-dim); font-family: var(--mono); font-size: .52rem; letter-spacing: .055em; line-height: 1.25; opacity: .48; text-transform: uppercase; }
  .phase-rail i { color: var(--indigo); font-family: var(--serif); font-size: .78rem; font-style: italic; letter-spacing: 0; }
  .tool-readout { position: absolute; right: 1rem; bottom: .8rem; left: 8.9rem; z-index: 2; display: grid; grid-template-columns: 6.2rem minmax(0,1fr); gap: .7rem; align-items: center; min-height: 2rem; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); background: rgba(8,11,18,.62); }
  .tool-readout > span { color: var(--paper-dim); font-family: var(--mono); font-size: .47rem; letter-spacing: .06em; text-transform: uppercase; }
  .tool-readout > div { position: relative; min-width: 0; height: 1rem; }
  .tool-readout p { position: absolute; inset: 0; display: flex; gap: .7rem; align-items: center; margin: 0; overflow: hidden; color: var(--paper-soft); font-family: var(--mono); font-size: .5rem; letter-spacing: .02em; opacity: 0; text-overflow: ellipsis; white-space: nowrap; }
  .tool-readout p:last-child { opacity: 1; }
  .tool-readout strong { flex: 0 0 auto; color: var(--amber); font-size: inherit; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; }

  @media (max-width: 1180px) and (min-width: 801px) {
    .phase-rail { left: .55rem; gap: .38rem; width: 5.3rem; }
    .phase-rail span { grid-template-columns: 1rem 1fr; gap: .18rem; font-size: .44rem; }
    .phase-rail i { font-size: .65rem; }
    .tool-readout { right: .55rem; bottom: .5rem; left: 6.4rem; grid-template-columns: 4.4rem minmax(0,1fr); min-height: 1.65rem; }
    .tool-readout > span, .tool-readout p { font-size: .4rem; }
  }

  @media (max-width: 800px) {
    header { gap: .5rem; padding-bottom: .48rem; }
    header p, header h2 { font-size: .52rem; white-space: nowrap; }
    .observatory-frame { aspect-ratio: 16 / 9; }
    .phase-rail { top: .35rem; right: .4rem; left: .4rem; display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 0; width: auto; transform: none; }
    .phase-rail span { display: block; overflow: hidden; padding-left: .18rem; border-left: 1px solid var(--rule); font-size: clamp(.32rem,1.45vw,.39rem); text-align: center; text-overflow: ellipsis; white-space: nowrap; }
    .phase-rail i { display: none; }
    .tool-readout { right: .4rem; bottom: .35rem; left: .4rem; grid-template-columns: 3.9rem minmax(0,1fr); gap: .35rem; min-height: 1.4rem; }
    .tool-readout > span, .tool-readout p { font-size: clamp(.34rem,1.5vw,.4rem); }
    .tool-readout p { gap: .35rem; }
    .relation-node text { font-size: 22px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .text-scene, .semantic-camera { display: none; }
    .final-network { opacity: 1; transform: translate(-135px, 8px) scale(.72); transform-box: fill-box; transform-origin: center; }
    .final-copy { opacity: 1; }
    .phase-rail span { color: var(--paper-dim); opacity: 1; }
    .phase-rail span:last-child { color: var(--amber); }
    .tool-readout p { display: none; }
    .tool-readout p:last-child { display: flex; opacity: 1; }
  }
</style>
