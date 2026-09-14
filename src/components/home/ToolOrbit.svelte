<script lang="ts">
  import { scalePoint } from 'd3';

  const ringData = [
    { key: 'model', label: 'Language & retrieval', duration: 32, direction: 'forward', tools: ['Python', 'PyTorch', 'SBERT', 'spaCy'] },
    { key: 'analysis', label: 'Analysis & visualisation', duration: 46, direction: 'reverse', tools: ['BM25', 'DuckDB', 'D3', 'Plotly'] }
  ].map(ring => {
    const angle = scalePoint<string>().domain(ring.tools).range([0, 360]).padding(.5);
    return {
      ...ring,
      tools: ring.tools.map(tool => {
        const toolAngle = angle(tool) ?? 0;
        return { label: tool, angle: toolAngle, delay: -(toolAngle / 360) * ring.duration };
      })
    };
  });
</script>

<section class="tool-system" aria-labelledby="tool-system-title">
  <header>
    <p>Tools of the trade</p>
    <h2 id="tool-system-title">Research toolchain</h2>
  </header>

  <div class="orbit-field" aria-hidden="true">
    <span class="field-axis axis-x"></span>
    <span class="field-axis axis-y"></span>
    <div class="field-centre">
      <span>Represent</span><span>Retrieve</span><span>Judge</span><span>Explore</span>
    </div>
    {#each ringData as ring, ringIndex}
      <div class={`orbit orbit-${ring.key}`}>
        <span class="orbit-caption">{ring.label}</span>
        {#each ring.tools as tool}
          <div
            class={`tool-node ${ring.direction}`}
            style={`--angle:${tool.angle}deg;--counter:${-tool.angle}deg;--duration:${ring.duration}s;--delay:${tool.delay}s;--radius:${ringIndex === 0 ? '8.3rem' : '13.4rem'}`}
          >
            <span>{tool.label}</span>
          </div>
        {/each}
      </div>
    {/each}
  </div>

  <ul class="sr-only">
    {#each ringData as ring}{#each ring.tools as tool}<li>{tool.label}</li>{/each}{/each}
  </ul>
</section>

<style>
  .tool-system { position: relative; width: 100%; }
  header { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; padding-bottom: .7rem; border-bottom: 1px solid var(--rule); }
  header p, header h2 { margin: 0; font-family: var(--mono); font-size: .62rem; font-weight: 500; letter-spacing: .1em; line-height: 1.4; text-transform: uppercase; }
  header p { color: var(--amber); }
  header h2 { color: var(--paper-dim); }
  .orbit-field { position: relative; width: min(100%, 35rem); aspect-ratio: 1; margin: 0 auto; overflow: hidden; }
  .field-axis { position: absolute; top: 50%; left: 50%; background: linear-gradient(90deg, transparent, rgba(141,150,216,.18), transparent); transform: translate(-50%,-50%); }
  .axis-x { width: 88%; height: 1px; }
  .axis-y { width: 1px; height: 88%; background: linear-gradient(180deg, transparent, rgba(141,150,216,.18), transparent); }
  .field-centre { position: absolute; top: 50%; left: 50%; display: grid; grid-template-columns: repeat(2, auto); gap: .32rem .7rem; width: 9.5rem; padding: .75rem; border: 1px solid var(--rule-strong); background: rgba(8,11,18,.86); color: var(--paper-soft); font-family: var(--mono); font-size: .52rem; letter-spacing: .07em; text-align: center; text-transform: uppercase; transform: translate(-50%,-50%); }
  .field-centre::before { position: absolute; inset: -.45rem; border: 1px solid rgba(201,164,107,.24); content: ''; transform: rotate(45deg); }
  .orbit { position: absolute; top: 50%; left: 50%; border: 1px solid rgba(141,150,216,.28); border-radius: 50%; transform: translate(-50%,-50%); }
  .orbit-model { width: 16.6rem; height: 16.6rem; }
  .orbit-analysis { width: 26.8rem; height: 26.8rem; border-style: dashed; }
  .orbit-caption { position: absolute; top: 50%; left: 50%; color: var(--paper-dim); font-family: var(--mono); font-size: .48rem; letter-spacing: .07em; text-transform: uppercase; transform: translate(-50%,-50%) rotate(-72deg) translateX(calc(var(--caption-radius, 8.3rem) + .8rem)); }
  .orbit-analysis .orbit-caption { --caption-radius: 13.4rem; }
  .tool-node { position: absolute; top: 50%; left: 50%; animation: orbit-forward var(--duration) linear infinite; }
  .tool-node.reverse { animation-name: orbit-reverse; }
  .tool-node span { display: block; min-width: 4.8rem; padding: .42rem .55rem; border: 1px solid var(--rule-strong); background: rgba(13,17,27,.9); color: var(--paper); font-family: var(--mono); font-size: .59rem; letter-spacing: .05em; text-align: center; text-transform: uppercase; animation: counter-forward var(--duration) linear infinite; }
  .tool-node.reverse span { animation-name: counter-reverse; }
  .tool-node span::before { display: inline-block; width: .35rem; height: .35rem; margin-right: .42rem; border: 1px solid var(--amber); border-radius: 50%; content: ''; }
  @keyframes orbit-forward { from { transform: rotate(var(--angle)) translateX(var(--radius)); } to { transform: rotate(calc(var(--angle) + 360deg)) translateX(var(--radius)); } }
  @keyframes counter-forward { from { transform: translate(-50%,-50%) rotate(var(--counter)); } to { transform: translate(-50%,-50%) rotate(calc(var(--counter) - 360deg)); } }
  @keyframes orbit-reverse { from { transform: rotate(var(--angle)) translateX(var(--radius)); } to { transform: rotate(calc(var(--angle) - 360deg)) translateX(var(--radius)); } }
  @keyframes counter-reverse { from { transform: translate(-50%,-50%) rotate(var(--counter)); } to { transform: translate(-50%,-50%) rotate(calc(var(--counter) + 360deg)); } }
  @media (max-width: 800px) {
    header { padding-bottom: .5rem; }
    .orbit-field { width: 100%; height: 9.25rem; aspect-ratio: auto; }
    .field-axis { display: none; }
    .field-centre { top: 50%; display: flex; gap: .65rem; width: auto; padding: .35rem .6rem; font-size: .43rem; white-space: nowrap; }
    .field-centre::before { display: none; }
    .orbit { left: 0; width: 100%; height: 2.7rem; overflow: hidden; border: 0; border-top: 1px solid rgba(141,150,216,.2); border-bottom: 1px solid rgba(141,150,216,.2); border-radius: 0; transform: none; }
    .orbit-model { top: .65rem; }
    .orbit-analysis { top: 5.85rem; }
    .tool-node { top: 50%; left: 100%; animation: tool-track-forward var(--duration) linear infinite; animation-delay: var(--delay); }
    .tool-node.reverse { left: -4rem; animation-name: tool-track-reverse; }
    .tool-node span { min-width: 3.8rem; padding: .3rem .4rem; font-size: .5rem; animation: none; transform: translate(-50%,-50%); }
    .orbit-caption { display: none; }
    @keyframes tool-track-forward { from { transform: translate(0,-50%); } to { transform: translate(calc(-100vw - 8rem),-50%); } }
    @keyframes tool-track-reverse { from { transform: translate(0,-50%); } to { transform: translate(calc(100vw + 8rem),-50%); } }
  }
  @media (prefers-reduced-motion: reduce) {
    .tool-node, .tool-node span { animation: none; }
    .tool-node { transform: rotate(var(--angle)) translateX(var(--radius)); }
    .tool-node span { transform: translate(-50%,-50%) rotate(var(--counter)); }
  }
  @media (max-width: 800px) and (prefers-reduced-motion: reduce) {
    .orbit-field { display: grid; grid-template-rows: repeat(2, auto); gap: 2.2rem; height: auto; padding: 1rem 0; }
    .field-centre { display: none; }
    .orbit { position: static; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .35rem; width: 100%; height: auto; padding-block: .45rem; transform: none; }
    .tool-node, .tool-node.reverse { position: static; animation: none; transform: none; }
    .tool-node span { min-width: 0; transform: none; }
  }
</style>
