<script lang="ts">
  import { onMount } from 'svelte';
  import { line, curveBumpX } from 'd3';
  const stages = [
    { key: 'REPRESENT', state: 'textual relation', x: 10, y: 52, description: 'Computational representations for relations that persist across paraphrase, adaptation, obfuscation, allusion, historical variation, and related transformations.' },
    { key: 'RETRIEVE', state: 'candidate space', x: 37, y: 30, description: 'Large-scale retrieval methods for identifying related passages when lexical overlap is weak or absent.' },
    { key: 'JUDGE', state: 'ranked relations', x: 63, y: 62, description: 'Ranking, benchmark construction, and evidence-based judgement across different degrees of transformation.' },
    { key: 'EXPLORE', state: 'evidence', x: 90, y: 38, description: 'Visual analytics for moving between corpus-scale relation spaces and close reading of individual connections.' }
  ];
  let active = 0;
  let paths = ['M10 52C20 52 27 30 37 30','M37 30C47 30 53 62 63 62','M63 62C73 62 80 38 90 38'];
  onMount(() => {
    const make = line<[number,number]>().x(d => d[0]).y(d => d[1]).curve(curveBumpX);
    paths = stages.slice(0,-1).map((stage,i) => make([[stage.x,stage.y],[stages[i+1].x,stages[i+1].y]]) ?? '');
  });
</script>

<div class="architecture">
  <svg viewBox="0 0 100 76" role="img" aria-labelledby="architecture-title architecture-description">
    <title id="architecture-title">Doctoral research architecture</title>
    <desc id="architecture-description">A connected trajectory from representing textual relation, through retrieval and judgement, to visual exploration.</desc>
    <g class="architecture-paths" aria-hidden="true">{#each paths as path}<path d={path}/>{/each}</g>
    <g class="architecture-nodes">
      {#each stages as stage, index}
        <g class:active={active === index} transform={`translate(${stage.x} ${stage.y})`} role="button" tabindex="0" aria-label={`${stage.key}: ${stage.description}`} aria-pressed={active === index} on:focus={() => active = index} on:mouseenter={() => active = index} on:click={() => active = index} on:keydown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); active = index; } }}>
          <circle r={active === index ? 2.1 : 1.35}/><text y="-5" text-anchor={index < 2 ? 'start' : 'end'}>{stage.key}</text><text class="state" y="4" text-anchor={index < 2 ? 'start' : 'end'}>{stage.state}</text>
        </g>
      {/each}
    </g>
  </svg>
  <div class="architecture-readout" aria-live="polite">
    <span class="eyebrow">0{active + 1} / {stages[active].key}</span>
    <p>{stages[active].description}</p>
  </div>
  <ol class="architecture-fallback">
    {#each stages as stage}<li><strong>{stage.key}</strong><span>{stage.state}</span><p>{stage.description}</p></li>{/each}
  </ol>
</div>

<style>
  .architecture { border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  svg { width: 100%; min-height: 30rem; }
  .architecture-paths path { fill: none; stroke: rgba(141,150,216,.45); stroke-width: .28; vector-effect: non-scaling-stroke; }
  .architecture-nodes g { cursor: pointer; outline: none; }
  .architecture-nodes circle { fill: var(--ink-0); stroke: var(--indigo); stroke-width: .3; transition: r .3s var(--ease), fill .3s; }
  .architecture-nodes g.active circle, .architecture-nodes g:focus-visible circle { fill: var(--amber); stroke: var(--amber); }
  .architecture-nodes text { fill: var(--paper); font-family: var(--mono); font-size: 2.2px; letter-spacing: .08em; }
  .architecture-nodes .state { fill: var(--paper-dim); font-size: 1.75px; letter-spacing: .04em; }
  .architecture-readout { display: grid; grid-template-columns: .7fr 1.6fr; gap: 2rem; max-width: 48rem; margin-left: auto; padding: 1.8rem 0; border-top: 1px solid var(--rule); }
  .architecture-readout p { margin: 0; color: var(--paper-soft); }
  .architecture-fallback { display: none; }
  @media (max-width: 650px) {
    svg, .architecture-readout { display: none; }
    .architecture-fallback { display: block; margin: 0; padding: 0; list-style: none; }
    .architecture-fallback li { display: grid; grid-template-columns: 6rem 1fr; gap: .4rem 1rem; padding: 1.6rem 0; border-top: 1px solid var(--rule); }
    .architecture-fallback strong, .architecture-fallback span { font-family: var(--mono); font-size: .7rem; letter-spacing: .08em; }
    .architecture-fallback strong { color: var(--paper); }
    .architecture-fallback span { color: var(--amber); }
    .architecture-fallback p { grid-column: 1 / -1; margin: .5rem 0 0; }
  }
</style>
