<script lang="ts">
  import { scalePoint, scaleLinear, line, curveBumpX, cross, range, packSiblings } from 'd3';

  type ObjectKind = 'texts' | 'representations' | 'candidates' | 'ranked' | 'evidence' | 'exploration';
  type ResearchObject = { key: string; label: string; kind: ObjectKind; description: string };

  const researchObjects: ResearchObject[] = [
    { key: 'texts', label: 'TEXTS', kind: 'texts', description: 'Source and target passages enter the pipeline as texts situated in context.' },
    { key: 'representations', label: 'REPRESENTATIONS', kind: 'representations', description: 'Texts become computational representations that preserve signals relevant to relation.' },
    { key: 'candidates', label: 'CANDIDATE SPACE', kind: 'candidates', description: 'Retrieval narrows a large collection to passages that may warrant comparison.' },
    { key: 'ranked', label: 'RANKED RELATIONS', kind: 'ranked', description: 'Candidate relations are ordered for closer assessment rather than treated as equivalent.' },
    { key: 'evidence', label: 'EVIDENCE', kind: 'evidence', description: 'Judgement returns to the textual evidence that supports or complicates a relation.' },
    { key: 'exploration', label: 'VISUAL EXPLORATION', kind: 'exploration', description: 'The resulting evidence can be explored across a corpus and returned to close reading.' }
  ];

  const operations = [
    { key: 'REPRESENT', start: 0, end: 1, description: 'Computational representations for relations that persist across paraphrase, adaptation, obfuscation, allusion, historical variation, and related transformations.' },
    { key: 'RETRIEVE', start: 1, end: 2, description: 'Large-scale retrieval methods for identifying related passages when lexical overlap is weak or absent.' },
    { key: 'JUDGE', start: 2, end: 4, description: 'Ranking, benchmark construction, and evidence-based judgement across different degrees of transformation.' },
    { key: 'EXPLORE', start: 4, end: 5, description: 'Visual analytics for moving between corpus-scale relation spaces and close reading of individual connections.' }
  ];

  const objectPosition = scalePoint<string>().domain(researchObjects.map(object => object.key)).range([10, 110]);
  const objects = researchObjects.map((object, index) => ({ ...object, index, x: objectPosition(object.key) ?? 10 }));
  const connector = line<[number, number]>().x(point => point[0]).y(point => point[1]).curve(curveBumpX);
  const connectors = objects.slice(0, -1).map((object, index) => connector([[object.x + 8, 34], [objects[index + 1].x - 8, 34]]) ?? '');
  const operationSpans = operations.map(operation => ({
    ...operation,
    x1: objects[operation.start].x,
    x2: objects[operation.end].x,
    centre: (objects[operation.start].x + objects[operation.end].x) / 2
  }));

  const matrixCells = cross(range(3), range(3)).map(([column, row]) => ({ x: column * 2.35 - 2.35, y: row * 2.35 - 2.35 }));
  const candidatePoints = packSiblings(range(7).map(() => ({ r: 1.05 })));
  const rankLength = scaleLinear().domain([0, 3]).range([6, 2.8]);
  const rankBars = range(4).map(index => ({ y: index * 2.15 - 3.2, width: rankLength(index) }));
  const explorationPoints: [number, number][] = [[-5, 2], [-2, -3], [1, 1], [4, -2], [5, 3]];
  const explorationPath = line<[number, number]>().x(point => point[0]).y(point => point[1]).curve(curveBumpX)(explorationPoints) ?? '';

  let active = 0;
  const operationForObject = (index: number) => operations.find(operation => index >= operation.start && index <= operation.end) ?? operations[operations.length - 1];

  function selectObject(index: number) { active = index; }
  function handleKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectObject(index);
    }
  }
</script>

<div class="architecture">
  <svg viewBox="0 0 120 60" role="img" aria-labelledby="architecture-title architecture-description">
    <title id="architecture-title">Doctoral research object pipeline</title>
    <desc id="architecture-description">Texts become representations, a candidate space, ranked relations, evidence, and visual exploration through the operations represent, retrieve, judge, and explore.</desc>
    <defs>
      <marker id="pipeline-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L6 3L0 6Z" /></marker>
    </defs>
    <g class="operation-spans" aria-hidden="true">
      {#each operationSpans as operation}
        <path d={`M${operation.x1} 14V17H${operation.x2}V14`} />
        <text x={operation.centre} y="11" text-anchor="middle">{operation.key}</text>
      {/each}
    </g>
    <g class="object-connectors" aria-hidden="true">
      {#each connectors as path}<path d={path} marker-end="url(#pipeline-arrow)" />{/each}
    </g>
    <g class="research-objects">
      {#each objects as object, index}
        <g class:active={active === index} transform={`translate(${object.x} 34)`} role="button" tabindex="0" aria-label={`${object.label}: ${object.description}`} aria-pressed={active === index} on:focus={() => selectObject(index)} on:mouseenter={() => selectObject(index)} on:click={() => selectObject(index)} on:keydown={(event) => handleKey(event, index)}>
          <rect class="object-frame" x="-8" y="-10" width="16" height="20" rx=".7" />
          <g class="object-glyph" aria-hidden="true">
            {#if object.kind === 'texts'}
              <path d="M-5-4H4M-5-1H5M-5 2H2M-5 5H4" />
            {:else if object.kind === 'representations'}
              {#each matrixCells as cell}<rect x={cell.x - .75} y={cell.y - .75} width="1.5" height="1.5" />{/each}
            {:else if object.kind === 'candidates'}
              {#each candidatePoints as point}<circle cx={point.x} cy={point.y} r={point.r * .72} />{/each}
            {:else if object.kind === 'ranked'}
              {#each rankBars as bar}<path d={`M-5 ${bar.y}H${-5 + bar.width}`} /><circle cx="4.6" cy={bar.y} r=".45" />{/each}
            {:else if object.kind === 'evidence'}
              <path d="M-5-4H4M-5-1H1M-5 3H5M-5 6H2" /><path class="evidence-link" d="M0-1C3 0 2 3 0 3" />
            {:else}
              <path class="exploration-link" d={explorationPath} />
              {#each explorationPoints as point}<circle cx={point[0]} cy={point[1]} r=".8" />{/each}
            {/if}
          </g>
          <text class="object-label" y="15" text-anchor="middle">{object.label}</text>
        </g>
      {/each}
    </g>
  </svg>
  <div class="architecture-readout" aria-live="polite">
    <span class="eyebrow">Object 0{active + 1} / {objects[active].label}</span>
    <div>
      <p>{objects[active].description}</p>
      <span class="operation-context">Within {operationForObject(active).key}: {operationForObject(active).description}</span>
    </div>
  </div>
  <ol class="architecture-fallback">
    {#each objects as object, index}
      <li>
        {#if index > 0}<span class="fallback-operation">{operationForObject(index).key}</span>{/if}
        <strong>{object.label}</strong>
        <p>{object.description}</p>
      </li>
    {/each}
  </ol>
</div>

<style>
  .architecture { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  svg { width: 100%; min-height: 30rem; overflow: visible; }
  .operation-spans path { fill: none; stroke: rgba(141,150,216,.5); stroke-width: .22; vector-effect: non-scaling-stroke; }
  .operation-spans text { fill: var(--paper-soft); font-family: var(--mono); font-size: 1.6px; letter-spacing: .1em; }
  .object-connectors path { fill: none; stroke: rgba(232,227,216,.28); stroke-width: .24; vector-effect: non-scaling-stroke; }
  marker path { fill: var(--paper-dim); }
  .research-objects > g { cursor: pointer; outline: none; }
  .object-frame { fill: rgba(13,17,27,.72); stroke: rgba(141,150,216,.38); stroke-width: .25; transition: fill .3s ease, stroke .3s ease; }
  .research-objects > g.active .object-frame, .research-objects > g:focus-visible .object-frame { fill: rgba(141,150,216,.1); stroke: var(--amber); }
  .object-glyph path, .object-glyph rect, .object-glyph circle { fill: none; stroke: var(--paper-dim); stroke-width: .35; vector-effect: non-scaling-stroke; }
  .object-glyph rect, .object-glyph circle { fill: rgba(141,150,216,.2); }
  .object-glyph .evidence-link, .object-glyph .exploration-link { stroke: var(--amber); }
  .research-objects > g.active .object-glyph path, .research-objects > g.active .object-glyph rect, .research-objects > g.active .object-glyph circle { stroke: var(--paper); }
  .object-label { fill: var(--paper-soft); font-family: var(--mono); font-size: 1.35px; letter-spacing: .04em; }
  .research-objects > g.active .object-label, .research-objects > g:focus-visible .object-label { fill: var(--paper); }
  .architecture-readout { display: grid; grid-template-columns: .72fr 1.6fr; gap: 2rem; max-width: 54rem; margin-left: auto; padding: 1.8rem 0; border-top: 1px solid var(--rule); }
  .architecture-readout p { margin: 0; color: var(--paper-soft); }
  .operation-context { display: block; margin-top: .8rem; color: var(--paper-dim); font-family: var(--mono); font-size: .62rem; line-height: 1.6; letter-spacing: .03em; }
  .architecture-fallback { display: none; }
  @media (max-width: 760px) {
    svg, .architecture-readout { display: none; }
    .architecture-fallback { display: block; margin: 0; padding: 0; list-style: none; }
    .architecture-fallback li { display: grid; grid-template-columns: minmax(7.5rem,.45fr) 1fr; gap: .45rem 1rem; padding: 1.6rem 0; border-top: 1px solid var(--rule); }
    .architecture-fallback li:first-child { border-top: 0; }
    .architecture-fallback strong, .fallback-operation { font-family: var(--mono); font-size: .68rem; letter-spacing: .07em; }
    .architecture-fallback strong { color: var(--paper); }
    .fallback-operation { grid-column: 1 / -1; color: var(--amber); }
    .fallback-operation::before { content: '↓ '; }
    .architecture-fallback p { grid-column: 2; margin: 0; }
  }
</style>
