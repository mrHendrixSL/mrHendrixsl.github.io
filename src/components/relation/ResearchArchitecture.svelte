<script lang="ts">
  import { scalePoint, scaleLinear, line, curveBumpX, curveBumpY, cross, range, packSiblings } from 'd3';

  export let homepageChapter = false;

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
  const pipelineY = 25;
  const objects = researchObjects.map((object, index) => ({ ...object, index, x: objectPosition(object.key) ?? 10 }));
  const connector = line<[number, number]>().x(point => point[0]).y(point => point[1]).curve(curveBumpX);
  const connectors = objects.slice(0, -1).map((object, index) => connector([[object.x + 8, pipelineY], [objects[index + 1].x - 8, pipelineY]]) ?? '');
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

  type LayerPoint = { key: string; x: number; y: number };
  const fieldPoints: LayerPoint[] = [
    { key: 'p1', x: .14, y: .56 },
    { key: 'p2', x: .34, y: .34 },
    { key: 'p3', x: .51, y: .66 },
    { key: 'p4', x: .69, y: .76 },
    { key: 'p5', x: .82, y: .31 },
    { key: 'p6', x: .24, y: .82 }
  ];
  const mobilePointCount: Record<ObjectKind, number> = {
    texts: 6,
    representations: 6,
    candidates: 5,
    ranked: 4,
    evidence: 3,
    exploration: 5
  };
  const mobileActions = ['INPUT', 'REPRESENT', 'RETRIEVE', 'RANK / JUDGE', 'EVIDENCE', 'EXPLORE'];
  const mobileY = scalePoint<string>().domain(researchObjects.map(object => object.key)).range([320, 50]);
  const mobileWidth = scaleLinear().domain([0, researchObjects.length - 1]).range([258, 192]);
  const mobileDepth = scaleLinear().domain([0, researchObjects.length - 1]).range([24, 17]);
  const mobileCentreX = 145;
  const mobileLayers = researchObjects.map((object, index) => {
    const y = mobileY(object.key) ?? 320;
    const width = mobileWidth(index);
    const depth = mobileDepth(index);
    const xScale = scaleLinear().domain([0, 1]).range([mobileCentreX - width * .36, mobileCentreX + width * .36]);
    const yScale = scaleLinear().domain([0, 1]).range([y - depth * .5, y + depth * .5]);
    const points = fieldPoints.slice(0, mobilePointCount[object.kind]).map((point, pointIndex) => ({
      ...point,
      px: xScale(point.x),
      py: object.kind === 'ranked'
        ? yScale((pointIndex + 1) / 5)
        : yScale(point.y)
    }));
    return {
      ...object,
      index,
      y,
      width,
      depth,
      action: mobileActions[index],
      plane: `${mobileCentreX - width / 2},${y} ${mobileCentreX},${y - depth} ${mobileCentreX + width / 2},${y} ${mobileCentreX},${y + depth}`,
      points
    };
  });
  const mobileFlow = line<{ x: number; y: number }>()
    .x(point => point.x)
    .y(point => point.y)
    .curve(curveBumpY)(mobileLayers.map(layer => ({ x: mobileCentreX + layer.width / 2 + 12, y: layer.y }))) ?? '';

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

<div class="architecture" class:homepage={homepageChapter}>
  <svg viewBox="0 0 120 42" role="img" aria-labelledby="architecture-title architecture-description">
    <title id="architecture-title">Doctoral research object pipeline</title>
    <desc id="architecture-description">Texts become representations, a candidate space, ranked relations, evidence, and visual exploration through the operations represent, retrieve, judge, and explore.</desc>
    <defs>
      <marker id="pipeline-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L6 3L0 6Z" /></marker>
    </defs>
    <g class="operation-spans" aria-hidden="true">
      {#each operationSpans as operation}
        <path d={`M${operation.x1} 8V11H${operation.x2}V8`} />
        <text x={operation.centre} y="5" text-anchor="middle">{operation.key}</text>
      {/each}
    </g>
    <g class="object-connectors" aria-hidden="true">
      {#each connectors as path}<path d={path} marker-end="url(#pipeline-arrow)" />{/each}
    </g>
    <g class="research-objects">
      {#each objects as object, index}
        <g class:active={active === index} transform={`translate(${object.x} ${pipelineY})`} role="button" tabindex="0" aria-label={`${object.label}: ${object.description}`} aria-pressed={active === index} on:focus={() => selectObject(index)} on:mouseenter={() => selectObject(index)} on:click={() => selectObject(index)} on:keydown={(event) => handleKey(event, index)}>
          <rect class="object-frame" x="-8" y="-8" width="16" height="16" rx=".7" />
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
          <text class="object-label" y={object.label.includes(' ') ? 11 : 12} text-anchor="middle">
            {#each object.label.split(' ') as word, lineIndex}<tspan x="0" dy={lineIndex === 0 ? 0 : 2.1}>{word}</tspan>{/each}
          </text>
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
  <div class="mobile-architecture">
    <svg viewBox="0 0 360 370" role="img" aria-labelledby="mobile-architecture-title mobile-architecture-description">
      <title id="mobile-architecture-title">Layered textual-relation research pipeline</title>
      <desc id="mobile-architecture-description">Research objects move upward through texts, embedding representations, candidate retrieval, ranked relations, evidence, and visual exploration.</desc>
      <defs>
        <marker id="mobile-flow-arrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L6 3L0 6Z" /></marker>
        <filter id="point-glow" x="-200%" y="-200%" width="400%" height="400%"><feGaussianBlur stdDeviation="1.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path class="mobile-flow" d={mobileFlow} marker-end="url(#mobile-flow-arrow)" />
      <g class="mobile-layers">
        {#each mobileLayers as layer, index}
          <g
            class:active={active === index}
            class="mobile-layer"
            style={`--layer-delay:${index * 75}ms`}
            role="button"
            tabindex="0"
            aria-label={`${layer.label}: ${layer.description}`}
            aria-pressed={active === index}
            on:focus={() => selectObject(index)}
            on:click={() => selectObject(index)}
            on:keydown={(event) => handleKey(event, index)}
          >
            <polygon points={layer.plane} />
            <path class="plane-axis" d={`M${mobileCentreX - layer.width / 2} ${layer.y}H${mobileCentreX + layer.width / 2}M${mobileCentreX} ${layer.y - layer.depth}V${layer.y + layer.depth}`} />
            {#if layer.kind === 'candidates'}
              <ellipse class="candidate-neighbourhood" cx={mobileCentreX + 17} cy={layer.y} rx={layer.width * .27} ry={layer.depth * .72} />
            {/if}
            {#if layer.kind === 'evidence'}
              <path class="evidence-trace" d={`M${layer.points[0].px} ${layer.points[0].py}L${layer.points[1].px} ${layer.points[1].py}L${layer.points[2].px} ${layer.points[2].py}`} />
            {/if}
            {#if layer.kind === 'exploration'}
              <path class="evidence-trace" d={line<{ px: number; py: number }>().x(point => point.px).y(point => point.py).curve(curveBumpX)(layer.points) ?? ''} />
            {/if}
            {#each layer.points as point, pointIndex}
              <g class:anchor={pointIndex === 0} class="layer-point" transform={`translate(${point.px} ${point.py})`}>
                <circle r={layer.kind === 'ranked' ? 3.2 - pointIndex * .25 : 2.35} />
              </g>
            {/each}
            <path class="label-leader" d={`M${mobileCentreX + layer.width / 2} ${layer.y}H282`} />
            <text class="layer-action" x="286" y={layer.y - 7}>{layer.action}</text>
            <text class="layer-label" x="286" y={layer.y + 5}>
              {#each layer.label.split(' ') as word, lineIndex}<tspan x="286" dy={lineIndex === 0 ? 0 : 9}>{word}</tspan>{/each}
            </text>
          </g>
        {/each}
      </g>
    </svg>
    <div class="mobile-readout" aria-live="polite">
      <span class="eyebrow">Layer 0{active + 1} / {objects[active].label}</span>
      <p>{objects[active].description}</p>
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
  .homepage svg { min-height: 23rem; }
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
  .homepage .architecture-readout { padding: 1.2rem 0; }
  .architecture-readout p { margin: 0; color: var(--paper-soft); }
  .operation-context { display: block; margin-top: .8rem; color: var(--paper-dim); font-family: var(--mono); font-size: .62rem; line-height: 1.6; letter-spacing: .03em; }
  .architecture-fallback { display: none; }
  .mobile-architecture { display: none; }
  @media (max-width: 800px) {
    .architecture > svg, .architecture-readout, .architecture-fallback { display: none; }
    .mobile-architecture { display: block; padding: 0; }
    .mobile-architecture > svg { display: block; width: 100%; min-height: 0; overflow: visible; }
    .mobile-flow { fill: none; stroke: rgba(201,164,107,.55); stroke-width: .75; stroke-dasharray: 2 3; vector-effect: non-scaling-stroke; }
    #mobile-flow-arrow path { fill: var(--amber); }
    .mobile-layer {
      cursor: pointer;
      opacity: 0;
      animation: layer-rise .65s var(--ease) forwards;
      animation-delay: var(--layer-delay);
      outline: none;
      transform: translateY(24px);
    }
    .mobile-layer polygon { fill: rgba(13,17,27,.58); stroke: rgba(141,150,216,.46); stroke-width: .85; vector-effect: non-scaling-stroke; transition: fill .25s ease, stroke .25s ease; }
    .mobile-layer.active polygon, .mobile-layer:focus-visible polygon { fill: rgba(141,150,216,.09); stroke: var(--amber); }
    .plane-axis { fill: none; stroke: rgba(141,150,216,.14); stroke-width: .5; stroke-dasharray: 2 4; vector-effect: non-scaling-stroke; }
    .candidate-neighbourhood { fill: rgba(141,150,216,.04); stroke: var(--indigo); stroke-width: .6; stroke-dasharray: 2 2; vector-effect: non-scaling-stroke; }
    .evidence-trace { fill: none; stroke: rgba(201,164,107,.62); stroke-width: .7; vector-effect: non-scaling-stroke; }
    .layer-point circle { fill: var(--indigo); stroke: var(--ink-0); stroke-width: 1; vector-effect: non-scaling-stroke; }
    .layer-point.anchor circle { fill: var(--amber); filter: url(#point-glow); }
    .label-leader { fill: none; stroke: rgba(232,227,216,.2); stroke-width: .6; vector-effect: non-scaling-stroke; }
    .layer-action { fill: var(--amber); font-family: var(--mono); font-size: 5.5px; letter-spacing: .08em; }
    .layer-label { fill: var(--paper-soft); font-family: var(--mono); font-size: 6.5px; letter-spacing: .04em; }
    .mobile-layer.active .layer-label { fill: var(--paper); }
    .mobile-readout { display: grid; grid-template-columns: 7.5rem 1fr; gap: 1rem; align-items: start; padding: .65rem 0; border-top: 1px solid var(--rule); }
    .mobile-readout p { margin: 0; color: var(--paper-soft); font-size: .78rem; line-height: 1.4; }
    @keyframes layer-rise { to { opacity: 1; transform: translateY(0); } }
  }
  @media (prefers-reduced-motion: reduce) {
    .mobile-layer { opacity: 1; animation: none; transform: none; }
  }
</style>
