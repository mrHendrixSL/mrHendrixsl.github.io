<script lang="ts">
  import { onMount } from 'svelte';
  import { scalePoint, line, curveCatmullRom } from 'd3';

  type SurfaceOverlap = 'high' | 'medium' | 'low' | 'minimal';
  type TransformationDistance = 'local' | 'structural' | 'distant';
  type RelationEvidence = 'direct' | 'distributed' | 'inferential';
  type RelationConcept = {
    id: string;
    label: string;
    surfaceOverlap: SurfaceOverlap;
    transformation: TransformationDistance;
    relationEvidence: RelationEvidence;
    note: string;
  };

  const concepts: RelationConcept[] = [
    { id: 'quotation', label: 'quotation', surfaceOverlap: 'high', transformation: 'local', relationEvidence: 'direct', note: 'Most wording and sequence remain available as direct evidence of relation.' },
    { id: 'paraphrase', label: 'paraphrase', surfaceOverlap: 'medium', transformation: 'local', relationEvidence: 'distributed', note: 'Substitution and reordering spread the evidence across wording and meaning.' },
    { id: 'adaptation', label: 'adaptation', surfaceOverlap: 'low', transformation: 'structural', relationEvidence: 'distributed', note: 'Semantic units persist after sentence structure and narrative order change.' },
    { id: 'obfuscation', label: 'obfuscation', surfaceOverlap: 'minimal', transformation: 'structural', relationEvidence: 'inferential', note: 'Lexical anchors fragment, so the relation must be assembled from dispersed cues.' },
    { id: 'allusion', label: 'allusion', surfaceOverlap: 'minimal', transformation: 'distant', relationEvidence: 'inferential', note: 'Sparse conceptual traces can remain interpretable after surface resemblance recedes.' }
  ];

  const surfaceLevels: SurfaceOverlap[] = ['high', 'medium', 'low', 'minimal'];
  const transformationLevels: TransformationDistance[] = ['local', 'structural', 'distant'];
  const xPosition = scalePoint<SurfaceOverlap>().domain(surfaceLevels).range([13, 87]);
  const yPosition = scalePoint<TransformationDistance>().domain(transformationLevels).range([66, 16]);
  const nodes = concepts.map(concept => ({
    ...concept,
    x: xPosition(concept.surfaceOverlap) ?? 50,
    y: yPosition(concept.transformation) ?? 41
  }));
  const edges = [
    { source: 0, target: 1, evidence: 'direct' },
    { source: 1, target: 2, evidence: 'distributed' },
    { source: 2, target: 3, evidence: 'distributed' },
    { source: 3, target: 4, evidence: 'inferential' }
  ] as const;
  const makePath = line<[number, number]>()
    .x(point => point[0])
    .y(point => point[1])
    .curve(curveCatmullRom.alpha(.45));
  const paths = edges.map(({ source, target }) => {
    const start = nodes[source];
    const end = nodes[target];
    const middle = (start.x + end.x) / 2;
    return makePath([[start.x, start.y], [middle, start.y], [middle, end.y], [end.x, end.y]]) ?? '';
  });

  let active = nodes[0];
  let field: HTMLDivElement;
  let webglHost: HTMLDivElement;

  function selectNode(node: typeof nodes[number]) { active = node; }
  function handleKey(event: KeyboardEvent, node: typeof nodes[number]) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectNode(node);
    }
  }

  onMount(() => {
    let cleanupWebgl = () => {};
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 700px)').matches;

    async function addDepthLayer() {
      if (reduced || compact || !webglHost) return;
      try {
        const { Renderer, Camera, Transform, Program, Mesh, Geometry } = await import('ogl');
        if (cancelled) return;
        const renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(devicePixelRatio, 1.5) });
        const gl = renderer.gl;
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.setAttribute('aria-hidden', 'true');
        webglHost.appendChild(canvas);
        const camera = new Camera(gl, { fov: 40 });
        camera.position.z = 5;
        const scene = new Transform();
        const position = new Float32Array(nodes.flatMap(node => [
          ((node.x / 100) - .5) * 5.6,
          (.5 - node.y / 100) * 3.5,
          ((node.y - 41) / 50) * .7
        ]));
        const geometry = new Geometry(gl, { position: { size: 3, data: position } });
        const program = new Program(gl, {
          transparent: true,
          vertex: `attribute vec3 position; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 7.0; }`,
          fragment: `precision highp float; void main(){ vec2 p=gl_PointCoord-.5; float a=smoothstep(.5,.16,length(p)); gl_FragColor=vec4(.56,.60,.86,a*.2); }`
        });
        const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
        mesh.setParent(scene);
        const resize = () => {
          const box = field.getBoundingClientRect();
          renderer.setSize(box.width, box.height);
          camera.perspective({ aspect: box.width / Math.max(box.height, 1) });
          renderer.render({ scene, camera });
        };
        let frame = 0;
        const pointer = (event: PointerEvent) => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(() => {
            const box = field.getBoundingClientRect();
            camera.position.x = ((event.clientX - box.left) / box.width - .5) * .07;
            camera.position.y = -((event.clientY - box.top) / box.height - .5) * .05;
            renderer.render({ scene, camera });
          });
        };
        const observer = new ResizeObserver(resize);
        observer.observe(field);
        field.addEventListener('pointermove', pointer, { passive: true });
        resize();
        cleanupWebgl = () => {
          observer.disconnect();
          field.removeEventListener('pointermove', pointer);
          cancelAnimationFrame(frame);
          gl.getExtension('WEBGL_lose_context')?.loseContext();
          canvas.remove();
        };
      } catch {
        field?.classList.add('no-webgl');
      }
    }

    addDepthLayer();
    return () => { cancelled = true; cleanupWebgl(); };
  });
</script>

<div class="relation-field" bind:this={field}>
  <div class="webgl-layer" bind:this={webglHost} aria-hidden="true"></div>
  <svg viewBox="0 0 100 82" role="img" aria-labelledby="field-title field-description" preserveAspectRatio="xMidYMid meet">
    <title id="field-title">Conceptual relation space for textual transformations</title>
    <desc id="field-description">Quotation, paraphrase, adaptation, obfuscation, and allusion are positioned by qualitative lexical persistence and transformation distance.</desc>
    <g class="grid" aria-hidden="true">
      {#each surfaceLevels as level}<path d={`M${xPosition(level)} 11V70`} />{/each}
      {#each transformationLevels as level}<path d={`M8 ${yPosition(level)}H92`} />{/each}
    </g>
    <g class="edges" aria-hidden="true">
      {#each paths as path, index}<path d={path} class:evidence-inferential={edges[index].evidence === 'inferential'} />{/each}
    </g>
    <g class="nodes">
      {#each nodes as node}
        <g class:active={active.id === node.id} role="button" tabindex="0" aria-label={`${node.label}: ${node.note}`} aria-pressed={active.id === node.id} transform={`translate(${node.x} ${node.y})`} on:mouseenter={() => selectNode(node)} on:focus={() => selectNode(node)} on:click={() => selectNode(node)} on:keydown={(event) => handleKey(event, node)}>
          <circle r={active.id === node.id ? 2.2 : 1.45} />
          <text y="5" text-anchor="middle">{node.label}</text>
        </g>
      {/each}
    </g>
    <g class="axis horizontal" aria-hidden="true">
      <path d="M9 74H91" />
      <text x="9" y="79">lexical persistence · high</text>
      <text x="91" y="79" text-anchor="end">minimal</text>
    </g>
    <g class="axis vertical" aria-hidden="true">
      <text x="4" y="14">transformation distance · distant</text>
      <text x="4" y="69">local</text>
    </g>
  </svg>
  <div class="field-readout" aria-live="polite">
    <p class="label">Conceptual state / {active.label}</p>
    <p>{active.note}</p>
    <dl>
      <div><dt>Surface overlap</dt><dd>{active.surfaceOverlap}</dd></div>
      <div><dt>Transformation</dt><dd>{active.transformation}</dd></div>
      <div><dt>Relation evidence</dt><dd>{active.relationEvidence}</dd></div>
    </dl>
  </div>
</div>

<style>
  .relation-field { position: relative; min-height: 34rem; border: 1px solid rgba(141,150,216,.2); background: rgba(13,17,27,.52); overflow: hidden; isolation: isolate; }
  .relation-field::after { position: absolute; inset: 0; z-index: -1; background: linear-gradient(120deg, transparent 35%, rgba(141,150,216,.045), transparent 68%); content: ''; }
  .webgl-layer { position: absolute; inset: 0; z-index: -1; opacity: .65; pointer-events: none; }
  .webgl-layer :global(canvas) { width: 100%; height: 100%; }
  svg { width: 100%; min-height: 28rem; padding: 1.5rem 1.5rem 7rem; overflow: visible; }
  .grid path { fill: none; stroke: rgba(232,227,216,.045); stroke-width: .15; }
  .edges path { fill: none; stroke: rgba(141,150,216,.44); stroke-width: .28; vector-effect: non-scaling-stroke; }
  .edges path.evidence-inferential { stroke-dasharray: 1.2 1.2; }
  .nodes g { cursor: pointer; outline: none; }
  .nodes circle { fill: var(--ink-0); stroke: var(--indigo); stroke-width: .3; transition: r .3s var(--ease), fill .3s ease, stroke .3s ease; }
  .nodes text { fill: var(--paper-soft); font-family: var(--mono); font-size: 2px; letter-spacing: .06em; }
  .nodes g.active circle, .nodes g:focus-visible circle { fill: var(--amber); stroke: var(--amber); }
  .nodes g.active text, .nodes g:focus-visible text { fill: var(--paper); }
  .axis path { fill: none; stroke: rgba(232,227,216,.25); stroke-width: .2; }
  .axis text { fill: var(--paper-dim); font-family: var(--mono); font-size: 1.5px; letter-spacing: .05em; text-transform: uppercase; }
  .vertical text { writing-mode: vertical-rl; }
  .field-readout { position: absolute; right: 7.2rem; bottom: 1.4rem; left: 1.6rem; display: grid; grid-template-columns: .8fr 1.7fr; gap: .75rem 1.4rem; align-items: start; padding-top: 1rem; border-top: 1px solid var(--rule); }
  .field-readout p { margin: 0; font-size: .8rem; line-height: 1.55; }
  .field-readout dl { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(3,1fr); gap: .75rem; margin: 0; }
  .field-readout dl div { min-width: 0; }
  dt { color: var(--paper-dim); font-family: var(--mono); font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; }
  dd { margin: .2rem 0 0; color: var(--paper); font-family: var(--mono); font-size: .72rem; text-transform: capitalize; }
  @media (max-width: 700px) {
    .relation-field { min-height: 0; }
    svg { min-height: 23rem; padding: 1rem .2rem 2rem; }
    .field-readout { position: relative; right: auto; bottom: auto; left: auto; grid-template-columns: 1fr; gap: .55rem; margin: 0 1.4rem; padding: 1rem 0 6rem; }
    .field-readout dl { grid-column: auto; }
    .field-readout dl { max-width: 23rem; }
    .nodes text { font-size: 2.5px; }
    .axis text { font-size: 1.75px; }
  }
</style>
