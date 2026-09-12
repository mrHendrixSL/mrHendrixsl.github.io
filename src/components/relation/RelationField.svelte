<script lang="ts">
  import { onMount } from 'svelte';
  import { scaleLinear, line, curveCatmullRom } from 'd3';

  type RelationNode = {
    id: string; label: string; x: number; y: number; depth: number;
    similarity: number; relation: number; note: string;
  };

  const nodes: RelationNode[] = [
    { id: 'quotation', label: 'quotation', x: 12, y: 66, depth: .1, similarity: .94, relation: .98, note: 'High lexical overlap; relation evidence remains visible at the surface.' },
    { id: 'paraphrase', label: 'paraphrase', x: 31, y: 42, depth: .25, similarity: .68, relation: .9, note: 'Wording changes while semantic and structural evidence remains.' },
    { id: 'adaptation', label: 'adaptation', x: 48, y: 22, depth: .45, similarity: .42, relation: .79, note: 'Larger transformation increases distance from the source form.' },
    { id: 'obfuscation', label: 'obfuscation', x: 66, y: 55, depth: .7, similarity: .2, relation: .7, note: 'Surface cues deteriorate; retrieval must depend on evidence beyond overlap.' },
    { id: 'allusion', label: 'allusion', x: 84, y: 30, depth: .9, similarity: .08, relation: .61, note: 'Minimal lexical overlap can still coexist with an interpretable relation.' }
  ];
  const edges = [[0,1],[1,2],[2,3],[3,4],[0,3],[1,4]];
  let active: RelationNode = nodes[0];
  let paths = edges.map(([a,b]) => `M ${nodes[a].x} ${nodes[a].y} C ${(nodes[a].x + nodes[b].x) / 2} ${nodes[a].y}, ${(nodes[a].x + nodes[b].x) / 2} ${nodes[b].y}, ${nodes[b].x} ${nodes[b].y}`);
  let field: HTMLDivElement;
  let webglHost: HTMLDivElement;

  function selectNode(node: RelationNode) { active = node; }
  function handleKey(event: KeyboardEvent, node: RelationNode) {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectNode(node); }
  }

  onMount(() => {
    let cleanupWebgl = () => {};
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 700px)').matches;

    function mapField() {
      if (cancelled) return;
      const x = scaleLinear().domain([0, 100]).range([0, 100]);
      const y = scaleLinear().domain([0, 100]).range([0, 100]);
      const curve = line<[number, number]>().x(d => x(d[0])).y(d => y(d[1])).curve(curveCatmullRom.alpha(.45));
      paths = edges.map(([a,b]) => curve([
        [nodes[a].x, nodes[a].y],
        [(nodes[a].x + nodes[b].x) / 2, nodes[a].y - 3],
        [(nodes[a].x + nodes[b].x) / 2, nodes[b].y + 3],
        [nodes[b].x, nodes[b].y]
      ]) ?? '');
    }

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
        const position = new Float32Array(nodes.flatMap(n => [((n.x / 100) - .5) * 5.6, (.5 - n.y / 100) * 3.5, -n.depth * 1.1]));
        const geometry = new Geometry(gl, { position: { size: 3, data: position } });
        const program = new Program(gl, {
          transparent: true,
          vertex: `attribute vec3 position; uniform mat4 modelViewMatrix; uniform mat4 projectionMatrix; void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_PointSize = 8.0; }`,
          fragment: `precision highp float; void main(){ vec2 p=gl_PointCoord-.5; float a=smoothstep(.5,.16,length(p)); gl_FragColor=vec4(.56,.60,.86,a*.28); }`
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
            camera.position.x = ((event.clientX - box.left) / box.width - .5) * .09;
            camera.position.y = -((event.clientY - box.top) / box.height - .5) * .06;
            renderer.render({ scene, camera });
          });
        };
        const observer = new ResizeObserver(resize);
        observer.observe(field);
        field.addEventListener('pointermove', pointer, { passive: true });
        resize();
        cleanupWebgl = () => {
          observer.disconnect(); field.removeEventListener('pointermove', pointer); cancelAnimationFrame(frame);
          gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove();
        };
      } catch { field?.classList.add('no-webgl'); }
    }

    mapField();
    addDepthLayer();
    return () => { cancelled = true; cleanupWebgl(); };
  });
</script>

<div class="relation-field" bind:this={field}>
  <div class="webgl-layer" bind:this={webglHost} aria-hidden="true"></div>
  <svg viewBox="0 0 100 82" role="img" aria-labelledby="field-title field-description" preserveAspectRatio="xMidYMid meet">
    <title id="field-title">Transformation space for textual relations</title>
    <desc id="field-description">Five connected text states move from quotation to allusion as lexical similarity decreases while relation strength persists.</desc>
    <g class="grid" aria-hidden="true">
      <path d="M5 18H95M5 41H95M5 64H95M20 6V76M50 6V76M80 6V76" />
    </g>
    <g class="edges" aria-hidden="true">
      {#each paths as path, i}
        <path d={path} style={`--strength:${(nodes[edges[i][1]].relation * .72).toFixed(2)}`} />
      {/each}
    </g>
    <g class="nodes">
      {#each nodes as node}
        <g class:active={active.id === node.id} role="button" tabindex="0" aria-label={`${node.label}: similarity ${Math.round(node.similarity * 100)} percent; relation strength ${Math.round(node.relation * 100)} percent`} aria-pressed={active.id === node.id} transform={`translate(${node.x} ${node.y})`} on:mouseenter={() => selectNode(node)} on:focus={() => selectNode(node)} on:click={() => selectNode(node)} on:keydown={(event) => handleKey(event, node)}>
          <circle r={active.id === node.id ? 2.2 : 1.45} />
          <text y="5" text-anchor="middle">{node.label}</text>
        </g>
      {/each}
    </g>
    <g class="axis" aria-hidden="true">
      <path d="M9 77H89"/><path d="m87 75 2 2-2 2"/>
      <text x="9" y="81">surface similarity</text><text x="89" y="81" text-anchor="end">weakens</text>
    </g>
  </svg>
  <div class="field-readout" aria-live="polite">
    <p class="label">Relation state / {active.label}</p>
    <p>{active.note}</p>
    <dl>
      <div><dt>Similarity</dt><dd>{active.similarity.toFixed(2)}</dd></div>
      <div><dt>Relation</dt><dd>{active.relation.toFixed(2)}</dd></div>
      <div><dt>Depth</dt><dd>{active.depth.toFixed(2)}</dd></div>
    </dl>
  </div>
</div>

<style>
  .relation-field { position: relative; min-height: 34rem; border: 1px solid rgba(141,150,216,.2); background: rgba(13,17,27,.52); overflow: hidden; isolation: isolate; }
  .relation-field::after { position: absolute; inset: 0; z-index: -1; background: linear-gradient(120deg, transparent 35%, rgba(141,150,216,.045), transparent 68%); content: ''; }
  .webgl-layer { position: absolute; inset: 0; z-index: -1; opacity: .8; pointer-events: none; }
  .webgl-layer :global(canvas) { width: 100%; height: 100%; }
  svg { width: 100%; min-height: 28rem; padding: 1.5rem 1.5rem 7rem; overflow: visible; }
  .grid path { fill: none; stroke: rgba(232,227,216,.05); stroke-width: .15; }
  .edges path { fill: none; stroke: rgba(141,150,216,var(--strength)); stroke-width: .28; vector-effect: non-scaling-stroke; }
  .nodes g { cursor: pointer; outline: none; }
  .nodes circle { fill: var(--ink-0); stroke: var(--indigo); stroke-width: .3; transition: r .3s var(--ease), fill .3s ease, stroke .3s ease; }
  .nodes text { fill: var(--paper-soft); font-family: var(--mono); font-size: 2px; letter-spacing: .06em; }
  .nodes g.active circle, .nodes g:focus-visible circle { fill: var(--amber); stroke: var(--amber); }
  .nodes g.active text, .nodes g:focus-visible text { fill: var(--paper); }
  .axis path { fill: none; stroke: rgba(232,227,216,.25); stroke-width: .2; }
  .axis text { fill: var(--paper-dim); font-family: var(--mono); font-size: 1.55px; letter-spacing: .07em; text-transform: uppercase; }
  .field-readout { position: absolute; right: 1.6rem; bottom: 1.4rem; left: 1.6rem; display: grid; grid-template-columns: 1fr 1.8fr 1fr; gap: 1.4rem; align-items: end; padding-top: 1rem; border-top: 1px solid var(--rule); }
  .field-readout p { margin: 0; font-size: .8rem; line-height: 1.55; }
  .field-readout dl { display: grid; grid-template-columns: repeat(3,1fr); gap: .75rem; margin: 0; }
  .field-readout dl div { min-width: 0; }
  dt { color: var(--paper-dim); font-family: var(--mono); font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; }
  dd { margin: .2rem 0 0; color: var(--paper); font-family: var(--mono); font-size: .72rem; }
  @media (max-width: 700px) {
    .relation-field { min-height: 30rem; }
    svg { min-height: 23rem; padding: 1rem 0 8rem; }
    .field-readout { grid-template-columns: 1fr; gap: .55rem; }
    .field-readout dl { max-width: 18rem; }
    .nodes text { font-size: 2.5px; }
  }
</style>
