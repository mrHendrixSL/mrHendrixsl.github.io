<script lang="ts">
  import { Delaunay, curveBasis, line, randomLcg, scaleLinear, scalePoint } from 'd3';

  type Stage = {
    key: string;
    title: string;
    description: string;
    output: string;
    tools: string[];
    x: number;
  };

  type Point = { x: number; y: number };

  const stageSource = [
    { key: 'texts', title: 'Texts', description: 'Sources and targets in context.', output: 'Text / corpus', tools: ['TEI / XML', 'JSONL', 'Parquet'] },
    { key: 'represent', title: 'Represent', description: 'Text becomes computational form.', output: 'Embeddings', tools: ['Python', 'spaCy', 'SentenceTransformers', 'PyTorch'] },
    { key: 'retrieve', title: 'Retrieve', description: 'Find candidates across collections.', output: 'Candidates', tools: ['BM25', 'FAISS', 'ANN search', 'DuckDB'] },
    { key: 'judge', title: 'Judge', description: 'Assess and rank potential relations.', output: 'Ranked relations', tools: ['scikit-learn', 'LLMs', 'Benchmark design'] },
    { key: 'explore', title: 'Explore', description: 'Interpret, visualise, investigate.', output: 'Relation space', tools: ['D3', 'Plotly', 'UMAP', 'Streamlit'] }
  ];

  const stagePosition = scalePoint<string>()
    .domain(stageSource.map(stage => stage.key))
    .range([15, 85])
    .padding(.08);

  const stages: Stage[] = stageSource.map(stage => ({ ...stage, x: stagePosition(stage.key) ?? 8 }));
  const seeded = randomLcg(.2741);
  const vertical = scaleLinear().domain([0, 1]).range([4.2, 19.2]);

  const embeddingPoints = Array.from({ length: 42 }, (_, index) => {
    const radius = Math.sqrt(seeded());
    const angle = seeded() * Math.PI * 2;
    return {
      x: stages[1].x + Math.cos(angle) * radius * 6.3,
      y: 11.7 + Math.sin(angle) * radius * 7.2,
      radius: .16 + seeded() * .28,
      delay: `${-(index * .19)}s`
    };
  });

  const candidatePoints = Array.from({ length: 17 }, (_, index) => ({
    x: stages[2].x + (seeded() - .5) * 12.5,
    y: vertical(seeded()),
    radius: index < 4 ? .58 : .25 + seeded() * .22,
    anchor: index < 4,
    delay: `${-(index * .31)}s`
  }));

  const candidateDelaunay = Delaunay.from(candidatePoints, point => point.x, point => point.y);
  const candidateLinks: Array<{ source: Point; target: Point }> = [];
  candidatePoints.forEach((point, index) => {
    for (const neighbour of candidateDelaunay.neighbors(index)) {
      if (neighbour > index && candidateLinks.length < 28) {
        candidateLinks.push({ source: point, target: candidatePoints[neighbour] });
      }
    }
  });

  const rankedY = scaleLinear().domain([0, 7]).range([4.8, 19]);
  const rankedPoints = Array.from({ length: 8 }, (_, index) => ({
    x: stages[3].x + (index % 2 === 0 ? -2.1 : 2.1),
    y: rankedY(index),
    radius: .62 - index * .045,
    selected: index < 3
  }));

  const relationPoints = [
    { key: 'source', label: 'SOURCE', x: stages[4].x - 5.2, y: 6.1, anchor: true },
    { key: 'concept', label: 'CONCEPT', x: stages[4].x + .3, y: 11.7, anchor: true },
    { key: 'evidence', label: 'EVIDENCE', x: stages[4].x + 5.4, y: 5.2, anchor: false },
    { key: 'transform', label: 'TRANSFORM', x: stages[4].x - 4.3, y: 17.8, anchor: false },
    { key: 'relation', label: 'RELATION', x: stages[4].x + 5.5, y: 18.5, anchor: true },
    { key: 'trace', label: '', x: stages[4].x + 1.7, y: 4.1, anchor: false },
    { key: 'context', label: '', x: stages[4].x - 1.6, y: 19.2, anchor: false }
  ];
  const relationPairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[1,4],[1,5],[1,6],[2,4],[3,4],[3,6],[4,5]];

  const streamLine = line<Point>().x(point => point.x).y(point => point.y).curve(curveBasis);
  const streamPaths = Array.from({ length: 11 }, (_, index) => {
    const spread = (index - 5) * 1.25;
    const points = [
      { x: stages[0].x - 5.8, y: 11.8 + spread },
      { x: (stages[0].x + stages[1].x) / 2, y: 11.8 + spread * .08 },
      { x: stages[1].x, y: 11.8 + spread * .9 },
      { x: stages[2].x, y: 11.8 + Math.sin(index * 1.37) * 6.1 },
      { x: (stages[2].x + stages[3].x) / 2, y: 11.8 + spread * .06 },
      { x: stages[3].x, y: 11.8 + spread * .22 },
      { x: (stages[3].x + stages[4].x) / 2, y: 11.8 + spread * .12 },
      { x: stages[4].x + 5.8, y: 11.8 + spread }
    ];
    return { path: streamLine(points) ?? '', delay: `${-(index * .67)}s`, accent: index === 3 || index === 7 };
  });
  const travellers = Array.from({ length: 22 }, (_, index) => {
    const stream = streamPaths[index % streamPaths.length];
    const duration = 8.5 + (index % 6) * .72;
    return {
      path: stream.path,
      duration: `${duration}s`,
      begin: `${-((index * 1.17) % duration)}s`,
      radius: index % 5 === 0 ? .48 : .25 + (index % 3) * .06,
      accent: index % 5 === 0 || stream.accent
    };
  });
  const queryPath = streamPaths[5].path;
</script>

<section class="method-system" aria-labelledby="method-system-title">
  <header>
    <p>Tools of the trade</p>
    <h2 id="method-system-title">Research instrument</h2>
  </header>

  <div class="instrument-body">
    <div class="stage-headings" aria-hidden="true">
      {#each stages as stage, index}
        <div class="stage-heading" style={`--stage-delay:${index * 3.6}s`}>
          <span>0{index + 1}</span>
          <strong>{stage.title}</strong>
          <small>{stage.description}</small>
        </div>
      {/each}
    </div>

    <div class="flow-stage">
      <p class="query-cue"><span>A query in motion</span><strong>Relation persists as wording changes.</strong></p>

      <svg class="pipeline-canvas" viewBox="0 0 100 24" role="img" aria-labelledby="pipeline-title pipeline-description">
    <title id="pipeline-title">Textual-relation research workflow</title>
    <desc id="pipeline-description">Text and corpus material becomes computational representations, candidate relations, ranked evidence, and an explorable relation space.</desc>
    <defs>
      <linearGradient id="pane-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#8d96d8" stop-opacity=".08" />
        <stop offset="1" stop-color="#141a27" stop-opacity=".18" />
      </linearGradient>
      <filter id="pipeline-glow" x="-200%" y="-200%" width="400%" height="400%">
        <feGaussianBlur stdDeviation=".55" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>

    <g class="stage-panes" aria-hidden="true">
      {#each stages as stage, index}
        <g class="stage-pane">
          <path d={`M${stage.x - 4.2} 4.2L${stage.x + 4.2} 2.6V20.4L${stage.x - 4.2} 21.8Z`} />
          <line x1={stage.x + 4.8} y1="2.5" x2={stage.x + 4.8} y2="21.9" />
        </g>
      {/each}
    </g>

    <g class="flow-field" aria-hidden="true">
      {#each streamPaths as stream}
        <path class:accent={stream.accent} d={stream.path} style={`--flow-delay:${stream.delay}`} />
      {/each}
    </g>

    <g class="travelling-evidence" aria-hidden="true">
      {#each travellers as traveller}
        <circle class:accent={traveller.accent} r={traveller.radius}>
          <animateMotion path={traveller.path} dur={traveller.duration} begin={traveller.begin} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.9;1" dur={traveller.duration} begin={traveller.begin} repeatCount="indefinite" />
        </circle>
      {/each}
      <circle class="query-core" r=".68">
        <animateMotion path={queryPath} dur="18s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.05;.95;1" dur="18s" repeatCount="indefinite" />
      </circle>
    </g>

    <g class="source-glyph" aria-hidden="true">
      {#each [0, 1, 2, 3] as layer}
        <g transform={`translate(${stages[0].x - 5.8 + layer * .9} ${4.8 + layer * .65})`} style={`--source-delay:${layer * .8}s`}>
          <rect width="10.5" height="13.2" />
          <path d="M1.5 3H8.2M1.5 5.2H9M1.5 7.4H7.2M1.5 9.6H8.6" />
        </g>
      {/each}
    </g>

    <g class="embedding-cloud" aria-hidden="true">
      {#each embeddingPoints as point}
        <circle cx={point.x} cy={point.y} r={point.radius} style={`--point-delay:${point.delay}`} />
      {/each}
    </g>

    <g class="candidate-network" aria-hidden="true">
      {#each candidateLinks as link}
        <line x1={link.source.x} y1={link.source.y} x2={link.target.x} y2={link.target.y} />
      {/each}
      {#each candidatePoints as point}
        <circle class:anchor={point.anchor} cx={point.x} cy={point.y} r={point.radius} style={`--point-delay:${point.delay}`} />
      {/each}
    </g>

    <g class="ranked-field" aria-hidden="true">
      <path class="rank-trace" d={streamLine(rankedPoints.slice(0, 4)) ?? ''} />
      {#each rankedPoints as point}
        <circle class:selected={point.selected} cx={point.x} cy={point.y} r={point.radius} />
      {/each}
    </g>

    <g class="relation-map" aria-hidden="true">
      {#each relationPairs as pair}
        <line x1={relationPoints[pair[0]].x} y1={relationPoints[pair[0]].y} x2={relationPoints[pair[1]].x} y2={relationPoints[pair[1]].y} />
      {/each}
      {#each relationPoints as point}
        <g class:anchor={point.anchor}>
          <circle cx={point.x} cy={point.y} r={point.anchor ? .68 : .42} />
          {#if point.label}<text x={point.x + .9} y={point.y - .55}>{point.label}</text>{/if}
        </g>
      {/each}
    </g>
      </svg>

      <div class="tool-readout" aria-hidden="true">
        <span>Active toolset</span>
        <div>
          {#each stages as stage, index}
            <p style={`--stage-delay:${index * 3.6}s`}><strong>{stage.output}</strong>{stage.tools.join(' · ')}</p>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <ol class="sr-only">
    {#each stages as stage}
      <li>{stage.title}: {stage.description} Output: {stage.output}. Tools: {stage.tools.join(', ')}.</li>
    {/each}
  </ol>
</section>

<style>
  .method-system { position: relative; width: 100%; }
  header { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding-bottom: .7rem; border-bottom: 1px solid var(--rule); }
  header p, header h2 { margin: 0; font-family: var(--mono); font-size: .62rem; font-weight: 500; letter-spacing: .1em; line-height: 1.4; text-transform: uppercase; }
  header p { color: var(--amber); }
  header h2 { color: var(--paper-dim); }
  .instrument-body { display: grid; grid-template-columns: 8.2rem minmax(0, 1fr); gap: 1.15rem; padding-top: 1rem; }
  .stage-headings { display: grid; grid-template-rows: repeat(5, 1fr); border-right: 1px solid var(--rule); }
  .stage-heading { display: grid; grid-template-columns: 1.6rem 1fr; align-content: center; min-width: 0; padding: .45rem .65rem .45rem 0; color: var(--paper-dim); animation: stage-progress 18s linear infinite; animation-delay: var(--stage-delay); }
  .stage-heading span { grid-row: 1 / 3; color: var(--indigo); font-family: var(--serif); font-size: 1rem; font-style: italic; }
  .stage-heading strong { color: inherit; font-family: var(--mono); font-size: .61rem; font-weight: 500; letter-spacing: .08em; text-transform: uppercase; }
  .stage-heading small { display: block; margin-top: .14rem; color: inherit; font-family: var(--serif); font-size: .68rem; line-height: 1.12; }
  .flow-stage { min-width: 0; }
  .query-cue { display: flex; justify-content: space-between; gap: 1rem; margin: 0 0 .45rem; color: var(--paper-dim); font-family: var(--mono); font-size: .53rem; letter-spacing: .05em; text-transform: uppercase; }
  .query-cue span { color: var(--amber); }
  .query-cue strong { overflow: hidden; font-weight: 400; text-overflow: ellipsis; white-space: nowrap; }
  .pipeline-canvas { display: block; width: 100%; height: auto; overflow: visible; }
  .stage-pane path { fill: url(#pane-fill); stroke: rgba(141,150,216,.38); stroke-width: .18; vector-effect: non-scaling-stroke; }
  .stage-pane line { stroke: rgba(232,227,216,.09); stroke-width: .15; vector-effect: non-scaling-stroke; }
  .flow-field path { fill: none; stroke: rgba(141,150,216,.22); stroke-width: .2; vector-effect: non-scaling-stroke; }
  .flow-field path.accent { stroke: rgba(201,164,107,.48); stroke-width: .28; filter: url(#pipeline-glow); }
  .travelling-evidence circle { fill: var(--indigo); opacity: 0; filter: url(#pipeline-glow); }
  .travelling-evidence circle.accent { fill: var(--amber); }
  .travelling-evidence circle.query-core { fill: var(--paper); stroke: var(--amber); stroke-width: .22; }
  .source-glyph g { animation: source-shift 8s ease-in-out infinite alternate; animation-delay: var(--source-delay); }
  .source-glyph rect { fill: rgba(13,17,27,.74); stroke: rgba(141,150,216,.38); stroke-width: .18; vector-effect: non-scaling-stroke; }
  .source-glyph path { fill: none; stroke: rgba(232,227,216,.34); stroke-width: .18; vector-effect: non-scaling-stroke; }
  .embedding-cloud circle { fill: var(--indigo); opacity: .56; filter: url(#pipeline-glow); animation: point-breathe 5s ease-in-out infinite; animation-delay: var(--point-delay); }
  .candidate-network line, .relation-map line { stroke: rgba(141,150,216,.28); stroke-width: .16; vector-effect: non-scaling-stroke; }
  .candidate-network circle, .ranked-field circle, .relation-map circle { fill: var(--paper-dim); stroke: var(--ink-0); stroke-width: .12; vector-effect: non-scaling-stroke; }
  .candidate-network circle { animation: point-breathe 5s ease-in-out infinite; animation-delay: var(--point-delay); }
  .candidate-network circle.anchor, .ranked-field circle.selected, .relation-map .anchor circle { fill: var(--amber); filter: url(#pipeline-glow); }
  .rank-trace { fill: none; stroke: var(--amber); stroke-width: .22; vector-effect: non-scaling-stroke; animation: rank-resolve 7s ease-in-out infinite; }
  .ranked-field circle:not(.selected) { opacity: .36; }
  .relation-map line { stroke-dasharray: .7 .55; animation: relation-current 8s linear infinite; }
  .relation-map text { fill: var(--paper-soft); font-family: var(--mono); font-size: 1.05px; letter-spacing: .04em; }
  .tool-readout { display: grid; grid-template-columns: 6.2rem minmax(0, 1fr); gap: .7rem; align-items: center; min-height: 2rem; margin-top: .45rem; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .tool-readout > span { color: var(--paper-dim); font-family: var(--mono); font-size: .48rem; letter-spacing: .06em; text-transform: uppercase; }
  .tool-readout > div { position: relative; min-width: 0; height: 1rem; }
  .tool-readout p { position: absolute; inset: 0; display: flex; gap: .75rem; align-items: center; margin: 0; overflow: hidden; color: var(--paper-soft); font-family: var(--mono); font-size: .52rem; letter-spacing: .025em; opacity: 0; text-overflow: ellipsis; white-space: nowrap; animation: tool-stage 18s linear infinite; animation-delay: var(--stage-delay); }
  .tool-readout strong { flex: 0 0 auto; color: var(--amber); font-size: inherit; font-weight: 500; letter-spacing: .04em; text-transform: uppercase; }
  @keyframes stage-progress { 0%, 22% { color: var(--paper); } 25%, 100% { color: var(--paper-dim); } }
  @keyframes tool-stage { 0%, 22% { opacity: 1; } 25%, 100% { opacity: 0; } }
  @keyframes point-breathe { 0%, 100% { opacity: .3; } 50% { opacity: .9; } }
  @keyframes source-shift { to { transform: translate(.7px,-.25px); } }
  @keyframes rank-resolve { 0%, 100% { opacity: .32; } 45%, 70% { opacity: 1; } }
  @keyframes relation-current { to { stroke-dashoffset: -8; } }

  @media (max-width: 1180px) and (min-width: 801px) {
    .instrument-body { grid-template-columns: 5.5rem minmax(0, 1fr); gap: .65rem; }
    .stage-heading { grid-template-columns: 1.25rem 1fr; padding-right: .3rem; }
    .stage-heading span { font-size: .78rem; }
    .stage-heading small { display: none; }
    .tool-readout { grid-template-columns: 4.7rem minmax(0, 1fr); }
    .tool-readout p { font-size: .47rem; }
  }

  @media (max-width: 800px) {
    header { padding-bottom: .48rem; }
    .instrument-body { display: block; padding-top: .48rem; }
    .stage-headings { grid-template-columns: repeat(5, minmax(0, 1fr)); grid-template-rows: none; border-right: 0; }
    .stage-heading { display: block; padding: 0 .2rem .18rem; border-left: 1px solid var(--rule); text-align: center; }
    .stage-heading span, .stage-heading small { display: none; }
    .stage-heading strong { font-size: clamp(.4rem, 1.8vw, .48rem); letter-spacing: .035em; }
    .query-cue { display: none; }
    .pipeline-canvas { height: 5.4rem; }
    .tool-readout { grid-template-columns: 4.25rem minmax(0, 1fr); gap: .35rem; min-height: 1.55rem; margin-top: 0; }
    .tool-readout > span, .tool-readout p { font-size: clamp(.39rem, 1.7vw, .45rem); }
    .tool-readout p { gap: .38rem; }
    .relation-map text { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .stage-heading, .source-glyph g, .embedding-cloud circle, .candidate-network circle, .rank-trace, .relation-map line, .tool-readout p { animation: none; }
    .stage-heading { color: var(--paper-soft); }
    .tool-readout p { display: none; }
    .tool-readout p:first-child { display: flex; opacity: 1; }
    .travelling-evidence { display: none; }
  }
</style>
