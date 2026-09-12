<script lang="ts">
  import { onMount } from 'svelte';

  type Token = { text: string; concept?: string; anchor?: boolean };
  type TransformationState = {
    index: string;
    mode: string;
    summary: string;
    surfaceOverlap: string;
    transformation: string;
    relationEvidence: string;
    trace: string;
    tokens: Token[];
  };

  const states: TransformationState[] = [
    {
      index: '01', mode: 'QUOTATION', summary: 'Most words remain.', surfaceOverlap: 'high', transformation: 'local', relationEvidence: 'direct',
      trace: 'time · keeper · blue record · place · recording · opening',
      tokens: [
        { text: 'At', anchor: true }, { text: 'dusk,', concept: 'time', anchor: true }, { text: 'the', anchor: true }, { text: 'archivist', concept: 'keeper', anchor: true }, { text: 'carried', anchor: true }, { text: 'a', anchor: true }, { text: 'blue', concept: 'blue', anchor: true }, { text: 'notebook', concept: 'record', anchor: true }, { text: 'across', anchor: true }, { text: 'the', anchor: true }, { text: 'quiet', anchor: true }, { text: 'courtyard', concept: 'place', anchor: true }, { text: 'and', anchor: true }, { text: 'marked', concept: 'recording', anchor: true }, { text: 'the', anchor: true }, { text: 'open gate.', concept: 'opening', anchor: true }
      ]
    },
    {
      index: '02', mode: 'PARAPHRASE', summary: 'Words reorder and substitute.', surfaceOverlap: 'medium', transformation: 'local', relationEvidence: 'distributed',
      trace: 'time · keeper · blue record · place · recording · opening',
      tokens: [
        { text: 'At' }, { text: 'twilight,', concept: 'time' }, { text: 'a' }, { text: 'record keeper', concept: 'keeper' }, { text: 'took' }, { text: 'the' }, { text: 'blue', concept: 'blue', anchor: true }, { text: 'journal', concept: 'record' }, { text: 'through' }, { text: 'the' }, { text: 'silent' }, { text: 'courtyard', concept: 'place', anchor: true }, { text: 'and' }, { text: 'noted', concept: 'recording' }, { text: 'that' }, { text: 'the gate remained open.', concept: 'opening', anchor: true }
      ]
    },
    {
      index: '03', mode: 'ADAPTATION', summary: 'Sentence structure changes; semantic units move.', surfaceOverlap: 'low', transformation: 'structural', relationEvidence: 'distributed',
      trace: 'opening · place · time · keeper · recording · blue record',
      tokens: [
        { text: 'The gate stood open.', concept: 'opening', anchor: true }, { text: 'Crossing' }, { text: 'the' }, { text: 'courtyard', concept: 'place', anchor: true }, { text: 'at' }, { text: 'evening,', concept: 'time' }, { text: 'the' }, { text: 'record keeper', concept: 'keeper' }, { text: 'entered', concept: 'recording' }, { text: 'the observation' }, { text: 'in' }, { text: 'a' }, { text: 'blue', concept: 'blue', anchor: true }, { text: 'book.', concept: 'record' }
      ]
    },
    {
      index: '04', mode: 'OBFUSCATION', summary: 'Lexical anchors fragment and disappear.', surfaceOverlap: 'minimal', transformation: 'structural', relationEvidence: 'inferential',
      trace: 'blue record · time · place · keeper · recording · opening',
      tokens: [
        { text: 'Blue', concept: 'blue', anchor: true }, { text: 'at the margin;', concept: 'record' }, { text: 'evening', concept: 'time' }, { text: 'crossed' }, { text: 'stone.', concept: 'place' }, { text: 'A' }, { text: 'keeper', concept: 'keeper' }, { text: 'recorded', concept: 'recording' }, { text: 'the breach where' }, { text: 'the boundary did not close.', concept: 'opening' }
      ]
    },
    {
      index: '05', mode: 'ALLUSION', summary: 'Only sparse conceptual traces remain.', surfaceOverlap: 'minimal', transformation: 'distant', relationEvidence: 'inferential',
      trace: 'time · blue record · recording · opening',
      tokens: [
        { text: 'After light thinned,', concept: 'time' }, { text: 'a' }, { text: 'blue', concept: 'blue', anchor: true }, { text: 'trace', concept: 'record' }, { text: 'remembered', concept: 'recording' }, { text: 'an opening.', concept: 'opening' }
      ]
    }
  ];

  const sourcePassage = states[0].tokens.map(token => token.text).join(' ');
  const passageText = (state: TransformationState) => state.tokens.map(token => token.text).join(' ');
  let active = 0;
  let sequence: HTMLElement;
  let staticMode = false;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      staticMode = true;
      return;
    }

    let cancelled = false;
    let triggers: Array<{ kill: () => void }> = [];
    let currentTimeline: { kill: () => void } | null = null;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const layers = Array.from(sequence.querySelectorAll<HTMLElement>('[data-passage]'));
      const traceLine = sequence.querySelector<HTMLElement>('[data-trace-line]');
      gsap.set(layers, { autoAlpha: 0, visibility: 'hidden' });
      gsap.set(layers[0], { autoAlpha: 1, visibility: 'visible' });

      const transformTo = (nextIndex: number) => {
        if (nextIndex === active || !layers[nextIndex]) return;
        const previousIndex = active;
        const previousLayer = layers[previousIndex];
        const nextLayer = layers[nextIndex];
        const outgoing = Array.from(previousLayer.querySelectorAll<HTMLElement>('[data-token]'));
        const incoming = Array.from(nextLayer.querySelectorAll<HTMLElement>('[data-token]'));
        const outgoingByConcept = new Map<string, HTMLElement>();
        const incomingByConcept = new Map<string, HTMLElement>();
        outgoing.forEach(token => { if (token.dataset.concept) outgoingByConcept.set(token.dataset.concept, token); });
        incoming.forEach(token => { if (token.dataset.concept) incomingByConcept.set(token.dataset.concept, token); });

        currentTimeline?.kill();
        layers.forEach((layer, layerIndex) => {
          if (layerIndex !== previousIndex && layerIndex !== nextIndex) gsap.set(layer, { autoAlpha: 0, visibility: 'hidden' });
        });
        gsap.set([outgoing, incoming], { clearProps: 'transform,opacity,filter' });
        gsap.set(nextLayer, { autoAlpha: 1, visibility: 'visible' });

        incoming.forEach((token, tokenIndex) => {
          const source = token.dataset.concept ? outgoingByConcept.get(token.dataset.concept) : undefined;
          if (source) {
            const from = source.getBoundingClientRect();
            const to = token.getBoundingClientRect();
            const substituted = source.textContent?.trim().toLowerCase() !== token.textContent?.trim().toLowerCase();
            gsap.set(token, { x: from.left - to.left, y: from.top - to.top, opacity: substituted ? .08 : .42, filter: substituted ? 'blur(3px)' : 'blur(0px)' });
          } else {
            gsap.set(token, { x: tokenIndex % 2 === 0 ? -14 : 14, y: 12, opacity: 0, filter: 'blur(2px)' });
          }
        });

        active = nextIndex;
        const fragments = nextIndex >= 3;
        currentTimeline = gsap.timeline({
          defaults: { duration: .62, ease: 'power2.inOut' },
          onComplete: () => {
            gsap.set(previousLayer, { autoAlpha: 0, visibility: 'hidden' });
            gsap.set(outgoing, { clearProps: 'transform,opacity,filter' });
          }
        });

        outgoing.forEach((token, tokenIndex) => {
          const target = token.dataset.concept ? incomingByConcept.get(token.dataset.concept) : undefined;
          if (target) {
            const from = token.getBoundingClientRect();
            const to = target.getBoundingClientRect();
            currentTimeline?.to(token, { x: to.left - from.left, y: to.top - from.top, opacity: .06 }, 0);
          } else {
            currentTimeline?.to(token, {
              x: (tokenIndex % 2 === 0 ? -1 : 1) * (fragments ? 28 : 14),
              y: fragments ? ((tokenIndex % 3) - 1) * 16 : -8,
              rotation: fragments ? (tokenIndex % 2 === 0 ? -7 : 7) : 0,
              opacity: 0,
              filter: fragments ? 'blur(4px)' : 'blur(2px)'
            }, 0);
          }
        });
        currentTimeline.to(incoming, { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', stagger: .018 }, .12);
        if (traceLine) currentTimeline.fromTo(traceLine, { scaleX: .22, transformOrigin: 'left center' }, { scaleX: 1, duration: .72 }, .16);
      };

      const entries = Array.from(sequence.querySelectorAll<HTMLElement>('[data-state]'));
      triggers = entries.map((entry, index) => ScrollTrigger.create({
        trigger: entry,
        start: 'top 66%',
        end: 'bottom 34%',
        onEnter: () => transformTo(index),
        onEnterBack: () => transformTo(index)
      }));
    })();

    return () => {
      cancelled = true;
      currentTimeline?.kill();
      triggers.forEach(trigger => trigger.kill());
    };
  });
</script>

<section class="transformation-sequence" class:static={staticMode} bind:this={sequence} aria-labelledby="transformation-heading">
  <div class="sequence-intro">
    <div>
      <p class="section-kicker">Transformation sequence · demonstration</p>
      <p class="source-label">Original passage written for this site</p>
      <p class="source-passage">“{sourcePassage}”</p>
    </div>
    <h2 id="transformation-heading">Watch lexical evidence recede while a relation trace remains.</h2>
  </div>
  <div class="sequence-layout">
    <ol class="states">
      {#each states as state, index}
        <li data-state class:active={active === index}>
          <span class="state-index">{state.index}</span>
          <div>
            <h3>{state.mode}</h3>
            <p>{state.summary}</p>
            <p class="static-passage">“{passageText(state)}”</p>
          </div>
          <span class="state-evidence">{state.relationEvidence} evidence</span>
        </li>
      {/each}
    </ol>
    <div class="trace-panel">
      <div class="trace-heading">
        <p class="label">{states[active].mode}</p>
        <p>{states[active].summary}</p>
      </div>
      <div class="token-stage" aria-hidden="true">
        {#each states as state, stateIndex}
          <p class="passage-layer" data-passage={stateIndex}>
            {#each state.tokens as token}
              <span data-token data-concept={token.concept} class:lexical-anchor={token.anchor}>{token.text}</span>
            {/each}
          </p>
        {/each}
      </div>
      <p class="sr-only" aria-live="polite">{states[active].mode}: {passageText(states[active])}</p>
      <div class="relation-trace">
        <i data-trace-line></i>
        <span>Persistent relation trace</span>
        <strong>{states[active].trace}</strong>
      </div>
      <dl>
        <div><dt>Surface overlap</dt><dd>{states[active].surfaceOverlap}</dd></div>
        <div><dt>Transformation</dt><dd>{states[active].transformation}</dd></div>
        <div><dt>Relation evidence</dt><dd>{states[active].relationEvidence}</dd></div>
      </dl>
    </div>
  </div>
  <p class="sequence-conclusion">Relation persists after similarity fails.</p>
</section>

<style>
  .transformation-sequence { padding: var(--space-section) 0; border-top: 1px solid var(--rule); }
  .sequence-intro { display: grid; grid-template-columns: .85fr 1.35fr; gap: clamp(2rem, 7vw, 7rem); margin-bottom: clamp(3rem, 8vw, 7rem); }
  .sequence-intro h2 { max-width: 13ch; }
  .source-label { margin: 2rem 0 .6rem; color: var(--paper-dim); font-family: var(--mono); font-size: .6rem; letter-spacing: .08em; text-transform: uppercase; }
  .source-passage { max-width: 35rem; margin: 0; color: var(--paper-soft); font-family: var(--serif); font-size: 1.15rem; line-height: 1.45; }
  .sequence-layout { display: grid; grid-template-columns: 1.03fr .97fr; gap: clamp(3rem, 7vw, 7rem); align-items: start; }
  .states { margin: 0; padding: 0; list-style: none; }
  .states li { position: relative; display: grid; grid-template-columns: 3.2rem minmax(0,1fr) auto; gap: 1rem; align-items: baseline; min-height: 10rem; padding: 2rem 0; border-top: 1px solid var(--rule); }
  .states li:last-child { border-bottom: 1px solid var(--rule); }
  .states li.active::before { position: absolute; top: 0; bottom: 0; left: -1rem; width: 1px; background: var(--amber); content: ''; }
  .state-index, .state-evidence { color: var(--paper-dim); font-family: var(--mono); font-size: .61rem; letter-spacing: .07em; text-transform: uppercase; }
  .states li.active .state-evidence { color: var(--amber); }
  .states h3 { font-family: var(--mono); font-size: clamp(.9rem, 1.3vw, 1.1rem); font-weight: 500; letter-spacing: .13em; }
  .states p { margin: .6rem 0 0; color: var(--paper-dim); font-size: .86rem; }
  .static-passage { display: none; }
  .trace-panel { position: sticky; top: 7rem; min-height: 28rem; padding: 2rem; border: 1px solid rgba(141,150,216,.24); background: var(--ink-1); overflow: hidden; }
  .trace-heading { display: flex; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--rule); }
  .trace-heading p { margin: 0; color: var(--paper-dim); font-size: .72rem; }
  .trace-heading .label { color: var(--paper); }
  .token-stage { position: relative; min-height: 12.5rem; margin: 2.6rem 0 1.4rem; }
  .passage-layer { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-content: flex-start; gap: .16em .3em; margin: 0; color: var(--paper-dim); font-family: var(--serif); font-size: clamp(1.65rem, 3.2vw, 2.7rem); line-height: 1.18; visibility: hidden; }
  .passage-layer:first-child { visibility: visible; }
  .passage-layer span { display: inline-block; will-change: transform, opacity, filter; }
  .passage-layer .lexical-anchor { color: var(--paper); text-decoration: underline; text-decoration-color: var(--amber); text-decoration-thickness: 1px; text-underline-offset: .18em; }
  .relation-trace { display: grid; grid-template-columns: 1fr; gap: .35rem; }
  .relation-trace i { display: block; height: 1px; margin-bottom: .55rem; background: linear-gradient(90deg, var(--amber), var(--indigo)); }
  .relation-trace span { color: var(--paper-dim); font-family: var(--mono); font-size: .56rem; letter-spacing: .08em; text-transform: uppercase; }
  .relation-trace strong { color: var(--paper-soft); font-family: var(--mono); font-size: .67rem; font-weight: 400; letter-spacing: .04em; }
  dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; margin: 1.5rem 0 0; }
  dt { color: var(--paper-dim); font-family: var(--mono); font-size: .55rem; letter-spacing: .08em; text-transform: uppercase; }
  dd { margin: .3rem 0 0; color: var(--paper); font-family: var(--mono); font-size: .7rem; text-transform: capitalize; }
  .sequence-conclusion { margin: clamp(5rem, 11vw, 10rem) 0 0; color: var(--paper); font-family: var(--serif); font-size: clamp(2.4rem, 6vw, 6rem); line-height: .95; text-align: center; text-transform: uppercase; }
  .static .sequence-layout { display: block; }
  .static .states li { min-height: 0; opacity: 1; transform: none; }
  .static .states li::before { display: none; }
  .static .static-passage { display: block; max-width: 48rem; margin-top: 1rem; color: var(--paper-soft); font-family: var(--serif); font-size: 1.05rem; line-height: 1.5; }
  .static .trace-panel { display: none; }
  @media (max-width: 760px) {
    .sequence-intro, .sequence-layout { grid-template-columns: 1fr; }
    .trace-panel { position: static; min-height: 25rem; order: -1; }
    .states li { grid-template-columns: 2.5rem minmax(0,1fr); min-height: 8rem; }
    .state-evidence { grid-column: 2; }
    .token-stage { min-height: 11rem; }
    dl { gap: .65rem; }
  }
  @media (max-width: 440px) {
    .trace-panel { padding: 1.35rem; }
    .passage-layer { font-size: 1.55rem; }
    .token-stage { min-height: 12.5rem; }
    dl { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sequence-layout { display: block; }
    .states li { min-height: 0; opacity: 1; transform: none; }
    .states li::before { display: none; }
    .static-passage { display: block; max-width: 48rem; margin-top: 1rem; color: var(--paper-soft); font-family: var(--serif); font-size: 1.05rem; line-height: 1.5; }
    .trace-panel { display: none; }
  }
</style>
