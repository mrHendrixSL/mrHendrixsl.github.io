<script lang="ts">
  import { onMount } from 'svelte';
  const states = [
    { index: '01', mode: 'QUOTATION', overlap: 'high surface overlap', trace: 'relationships between texts · words remain visible', evidence: 96 },
    { index: '02', mode: 'PARAPHRASE', overlap: 'lexical structure begins to change', trace: 'connections among passages · wording is altered', evidence: 72 },
    { index: '03', mode: 'ADAPTATION', overlap: 'larger structural transformation', trace: 'a relation carried into a different form', evidence: 49 },
    { index: '04', mode: 'OBFUSCATION', overlap: 'surface cues deteriorate', trace: 'scattered signals · relation requires retrieval', evidence: 24 },
    { index: '05', mode: 'ALLUSION', overlap: 'surface overlap may be minimal', trace: 'an echo at distance · interpretable relation persists', evidence: 8 }
  ];
  let active = 0;
  let sequence: HTMLElement;
  let staticMode = false;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { staticMode = true; return; }
    let contexts: Array<{ revert: () => void }> = [];
    let triggers: Array<{ kill: () => void }> = [];
    let cancelled = false;
    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      sequence.querySelectorAll<HTMLElement>('[data-state]').forEach((entry, index) => {
        const context = gsap.context(() => {
          gsap.fromTo(entry, { y: 18 }, {
            y: 0, duration: .55, ease: 'power2.out',
            scrollTrigger: {
              trigger: entry, start: 'top 68%', end: 'bottom 38%', toggleActions: 'play reverse play reverse',
              onEnter: () => active = index, onEnterBack: () => active = index
            }
          });
        }, sequence);
        contexts.push(context);
      });
      triggers = ScrollTrigger.getAll();
    })();
    return () => { cancelled = true; contexts.forEach(c => c.revert()); triggers.forEach(t => t.kill()); };
  });
</script>

<section class="transformation-sequence" class:static={staticMode} bind:this={sequence} aria-labelledby="transformation-heading">
  <div class="sequence-intro">
    <p class="section-kicker">Transformation sequence · illustrative model</p>
    <h2 id="transformation-heading">As lexical evidence weakens, the relation becomes harder to see.</h2>
  </div>
  <div class="sequence-layout">
    <ol class="states">
      {#each states as state, index}
        <li data-state class:active={active === index}>
          <span class="state-index">{state.index}</span>
          <div><h3>{state.mode}</h3><p>{state.overlap}</p></div>
          <span class="evidence-number">{state.evidence}%</span>
        </li>
      {/each}
    </ol>
    <div class="trace-panel" aria-live="polite">
      <p class="label">Visible lexical trace</p>
      <p class="trace-text">{states[active].trace}</p>
      <div class="meter" role="progressbar" aria-label="Illustrative surface evidence" aria-valuemin="0" aria-valuemax="100" aria-valuenow={states[active].evidence}><i style={`width:${states[active].evidence}%`}></i></div>
      <dl><div><dt>surface evidence</dt><dd>{states[active].evidence / 100}</dd></div><div><dt>relation state</dt><dd>represented</dd></div></dl>
    </div>
  </div>
  <p class="sequence-conclusion">Relation persists after similarity fails.</p>
</section>

<style>
  .transformation-sequence { padding: var(--space-section) 0; border-top: 1px solid var(--rule); }
  .sequence-intro { display: grid; grid-template-columns: .65fr 1.6fr; gap: 3rem; margin-bottom: clamp(3rem, 8vw, 7rem); }
  .sequence-intro h2 { max-width: 13ch; }
  .sequence-layout { display: grid; grid-template-columns: 1.1fr .9fr; gap: clamp(3rem, 8vw, 8rem); align-items: start; }
  .states { margin: 0; padding: 0; list-style: none; }
  .states li { position: relative; display: grid; grid-template-columns: 3.2rem 1fr auto; gap: 1rem; align-items: baseline; min-height: 10rem; padding: 2rem 0; border-top: 1px solid var(--rule); }
  .states li:last-child { border-bottom: 1px solid var(--rule); }
  .states li.active::before { position: absolute; top: 0; bottom: 0; left: -1rem; width: 1px; background: var(--amber); content: ''; }
  .state-index, .evidence-number { color: var(--paper-dim); font-family: var(--mono); font-size: .65rem; letter-spacing: .08em; }
  .states h3 { font-family: var(--mono); font-size: clamp(.9rem, 1.3vw, 1.1rem); font-weight: 500; letter-spacing: .13em; }
  .states p { margin: .6rem 0 0; color: var(--paper-dim); font-size: .86rem; }
  .trace-panel { position: sticky; top: 8rem; min-height: 24rem; padding: 2rem; border: 1px solid rgba(141,150,216,.24); background: var(--ink-1); }
  .trace-text { min-height: 8rem; margin: 3.6rem 0 2rem; color: var(--paper); font-family: var(--serif); font-size: clamp(1.8rem, 3.8vw, 3rem); line-height: 1.12; }
  .meter { height: 1px; background: var(--rule); }
  .meter i { display: block; height: 1px; background: var(--amber); transition: width .7s var(--ease); }
  dl { display: flex; justify-content: space-between; gap: 2rem; margin: 1.4rem 0 0; }
  dt { color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .08em; text-transform: uppercase; }
  dd { margin: .3rem 0 0; color: var(--paper); font-family: var(--mono); font-size: .72rem; }
  .sequence-conclusion { margin: clamp(5rem, 11vw, 10rem) 0 0; color: var(--paper); font-family: var(--serif); font-size: clamp(2.4rem, 6vw, 6rem); line-height: .95; text-align: center; text-transform: uppercase; }
  .static .states li { opacity: 1; transform: none; }
  @media (max-width: 760px) {
    .sequence-intro, .sequence-layout { grid-template-columns: 1fr; }
    .trace-panel { position: static; min-height: 20rem; order: -1; }
    .states li { min-height: 8rem; }
  }
</style>
