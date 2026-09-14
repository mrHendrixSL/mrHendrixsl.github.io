<script lang="ts">
  import { onMount } from 'svelte';
  import {
    curveBumpX,
    hierarchy,
    line,
    symbol,
    symbolCircle,
    symbolCross,
    symbolDiamond,
    symbolSquare,
    symbolTriangle,
    tree
  } from 'd3';

  export let chapterIndex: string | undefined = undefined;
  export let homepageChapter = false;

  type ConceptFamily = 'being' | 'creator' | 'origin' | 'grievance';
  type ConceptState = 'visible' | 'equivalent' | 'conceptual' | 'implicit' | 'literary';
  type Token = { text: string; concept?: ConceptFamily; direct?: boolean; breakAfter?: boolean };
  type TransformationState = {
    index: string;
    mode: string;
    kind: 'historical anchor' | 'constructed demonstration';
    explanation: string;
    relationLabel: string;
    surfaceWording: 'high' | 'medium' | 'low' | 'minimal';
    evidenceFrom: 'direct wording' | 'equivalent expression' | 'conceptual structure' | 'inferential or literary evidence';
    transformationDistance: 'local' | 'structural' | 'distant';
    relationEvidence: 'direct' | 'distributed' | 'inferential';
    concepts: Record<ConceptFamily, ConceptState>;
    tokens: Token[];
  };
  type TraceDatum = { id: string; label: string; allusion?: boolean; children?: TraceDatum[] };

  const states: TransformationState[] = [
    {
      index: '01', mode: 'QUOTATION', kind: 'historical anchor',
      explanation: 'The relationship is easy to recognise because Milton’s wording is still present.',
      relationLabel: 'Relation persists',
      surfaceWording: 'high', evidenceFrom: 'direct wording', transformationDistance: 'local', relationEvidence: 'direct',
      concepts: { being: 'visible', creator: 'visible', origin: 'visible', grievance: 'visible' },
      tokens: [
        { text: 'Did I request thee,', concept: 'grievance', direct: true },
        { text: 'Maker,', concept: 'creator', direct: true },
        { text: 'from my', direct: true },
        { text: 'clay', concept: 'origin', direct: true, breakAfter: true },
        { text: 'To mould me Man,', concept: 'being', direct: true },
        { text: 'did I solicit thee', concept: 'grievance', direct: true, breakAfter: true },
        { text: 'From darkness to promote me?', concept: 'origin', direct: true }
      ]
    },
    {
      index: '02', mode: 'PARAPHRASE', kind: 'constructed demonstration',
      explanation: 'The same roles remain, although characteristic words have been replaced.',
      relationLabel: 'Same conceptual roles',
      surfaceWording: 'medium', evidenceFrom: 'equivalent expression', transformationDistance: 'local', relationEvidence: 'distributed',
      concepts: { being: 'equivalent', creator: 'equivalent', origin: 'equivalent', grievance: 'equivalent' },
      tokens: [
        { text: 'I never asked', concept: 'grievance' },
        { text: 'my creator', concept: 'creator' },
        { text: 'to make me', concept: 'being' },
        { text: 'or to bring me into life.', concept: 'origin' }
      ]
    },
    {
      index: '03', mode: 'ADAPTATION', kind: 'constructed demonstration',
      explanation: 'The situation survives, but its wording and structure have been reorganised.',
      relationLabel: 'Same situation',
      surfaceWording: 'low', evidenceFrom: 'conceptual structure', transformationDistance: 'structural', relationEvidence: 'distributed',
      concepts: { being: 'conceptual', creator: 'conceptual', origin: 'conceptual', grievance: 'conceptual' },
      tokens: [
        { text: 'A created being', concept: 'being' },
        { text: 'confronts', concept: 'grievance' },
        { text: 'the one', concept: 'creator' },
        { text: 'who gave it life', concept: 'origin' },
        { text: 'and questions an existence imposed without consent.', concept: 'grievance' }
      ]
    },
    {
      index: '04', mode: 'OBFUSCATION', kind: 'constructed demonstration',
      explanation: 'The people and act of creation are no longer named directly; the relation must be reconstructed from dispersed clues.',
      relationLabel: 'Relation must be inferred',
      surfaceWording: 'minimal', evidenceFrom: 'conceptual structure', transformationDistance: 'structural', relationEvidence: 'inferential',
      concepts: { being: 'conceptual', creator: 'implicit', origin: 'conceptual', grievance: 'conceptual' },
      tokens: [
        { text: 'Existence', concept: 'being' },
        { text: 'became an obligation', concept: 'grievance' },
        { text: 'before assent was possible,', concept: 'grievance' },
        { text: 'leaving its origin', concept: 'origin' },
        { text: 'as the object of accusation.' }
      ]
    },
    {
      index: '05', mode: 'ALLUSION', kind: 'historical anchor',
      explanation: 'Recognition now depends on literary knowledge: Adam and the fallen angel reconnect Shelley’s creature to Milton’s creation narrative.',
      relationLabel: 'Intertextual relation',
      surfaceWording: 'minimal', evidenceFrom: 'inferential or literary evidence', transformationDistance: 'distant', relationEvidence: 'inferential',
      concepts: { being: 'literary', creator: 'literary', origin: 'literary', grievance: 'literary' },
      tokens: [
        { text: 'I ought to be', concept: 'grievance' },
        { text: 'thy', concept: 'creator' },
        { text: 'Adam,', concept: 'being' },
        { text: 'but I am rather' },
        { text: 'the fallen angel...', concept: 'origin' }
      ]
    }
  ];

  const conceptFamilies: Array<{ id: ConceptFamily; label: string; description: string }> = [
    { id: 'being', label: 'created being', description: 'The speaker as a created entity' },
    { id: 'creator', label: 'creator / maker', description: 'The agent who creates' },
    { id: 'origin', label: 'creation / origin', description: 'Being brought into existence' },
    { id: 'grievance', label: 'consent / grievance', description: 'A question or lack of consent' }
  ];

  const traceData: TraceDatum = {
    id: 'relation', label: 'creation relation', children: [
      { id: 'being', label: 'created being', children: [
        { id: 'origin', label: 'origin / emergence' },
        { id: 'consent', label: 'without consent' },
        { id: 'adam', label: 'Adam', allusion: true },
        { id: 'fall', label: 'fallen angel', allusion: true }
      ] },
      { id: 'creator', label: 'creator / maker', children: [
        { id: 'responsibility', label: 'responsibility / accusation' }
      ] }
    ]
  };
  const traceRoot = tree<TraceDatum>().size([142, 158])(hierarchy(traceData));
  const traceNodes = traceRoot.descendants();
  const traceLine = line<[number, number]>().x(point => point[0]).y(point => point[1]).curve(curveBumpX);
  const traceLinks = traceRoot.links().map(link => ({
    target: link.target.data.id,
    path: traceLine([[link.source.y + 10, link.source.x + 12], [link.target.y + 10, link.target.x + 12]]) ?? ''
  }));
  const symbolTypes = {
    relation: symbolCircle,
    being: symbolCircle,
    creator: symbolDiamond,
    origin: symbolTriangle,
    consent: symbolSquare,
    responsibility: symbolCross,
    adam: symbolCircle,
    fall: symbolTriangle
  };
  const symbolPath = (id: string) => symbol()
    .type(symbolTypes[id as keyof typeof symbolTypes] ?? symbolCircle)
    .size(id === 'relation' ? 38 : 28)() ?? '';

  const passageText = (state: TransformationState) => `“${state.tokens.map(token => token.text).join(' ')}”`;
  const tokenClass = (token: Token) => [
    token.concept ? 'concept-token' : '',
    token.concept ? `concept-${token.concept}` : '',
    token.direct ? 'direct-wording' : ''
  ].filter(Boolean).join(' ');
  const titleCase = (value: string) => value.charAt(0) + value.slice(1).toLowerCase();

  let active = homepageChapter ? 1 : 0;
  let sequence: HTMLElement;
  let staticMode = false;
  let changeState = (nextIndex: number) => {
    active = nextIndex;
    if (!sequence) return;
    sequence.querySelectorAll<HTMLElement>('[data-passage]').forEach((layer, index) => {
      layer.style.visibility = index === nextIndex ? 'visible' : 'hidden';
      layer.style.opacity = index === nextIndex ? '1' : '0';
    });
  };

  const graphFamily = (id: string): ConceptFamily | null => {
    if (id === 'being' || id === 'adam') return 'being';
    if (id === 'creator') return 'creator';
    if (id === 'origin' || id === 'fall') return 'origin';
    if (id === 'consent' || id === 'responsibility') return 'grievance';
    return null;
  };
  const graphStatus = (id: string) => {
    if (id === 'relation') return 'stable';
    if ((id === 'adam' || id === 'fall') && active !== states.length - 1) return 'dormant';
    const family = graphFamily(id);
    return family ? states[active].concepts[family] : 'dormant';
  };

  function selectState(index: number) { changeState(index); }
  function handleStateKey(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % states.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + states.length) % states.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = states.length - 1;
    else return;
    event.preventDefault();
    selectState(next);
    requestAnimationFrame(() => sequence.querySelectorAll<HTMLButtonElement>('[data-state-control]')[next]?.focus());
  }

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      staticMode = true;
      return;
    }

    let cancelled = false;
    let currentTimeline: { kill: () => void } | null = null;
    (async () => {
      const { default: gsap } = await import('gsap');
      if (cancelled) return;
      const layers = Array.from(sequence.querySelectorAll<HTMLElement>('[data-passage]'));
      gsap.set(layers, { autoAlpha: 0, visibility: 'hidden' });
      gsap.set(layers[active], { autoAlpha: 1, visibility: 'visible' });

      const collectConcepts = (tokens: HTMLElement[]) => {
        const groups = new Map<string, HTMLElement[]>();
        tokens.forEach(token => {
          const concept = token.dataset.concept;
          if (concept) groups.set(concept, [...(groups.get(concept) ?? []), token]);
        });
        return groups;
      };

      changeState = (nextIndex: number) => {
        if (nextIndex === active || !layers[nextIndex]) return;
        const previousIndex = active;
        const previousLayer = layers[previousIndex];
        const nextLayer = layers[nextIndex];
        const outgoing = Array.from(previousLayer.querySelectorAll<HTMLElement>('[data-token]'));
        const incoming = Array.from(nextLayer.querySelectorAll<HTMLElement>('[data-token]'));
        const outgoingByConcept = collectConcepts(outgoing);
        const incomingByConcept = collectConcepts(incoming);

        currentTimeline?.kill();
        layers.forEach((layer, index) => {
          if (index !== previousIndex && index !== nextIndex) gsap.set(layer, { autoAlpha: 0, visibility: 'hidden' });
        });
        gsap.set([outgoing, incoming], { clearProps: 'transform,opacity,filter' });
        gsap.set(nextLayer, { autoAlpha: 1, visibility: 'visible' });

        incoming.forEach((token, tokenIndex) => {
          const concept = token.dataset.concept;
          const peers = concept ? incomingByConcept.get(concept) ?? [] : [];
          const occurrence = peers.indexOf(token);
          const sources = concept ? outgoingByConcept.get(concept) ?? [] : [];
          const source = sources[Math.min(Math.max(occurrence, 0), sources.length - 1)];
          if (source) {
            const from = source.getBoundingClientRect();
            const to = token.getBoundingClientRect();
            const substituted = source.textContent?.trim().toLowerCase() !== token.textContent?.trim().toLowerCase();
            gsap.set(token, { x: from.left - to.left, y: from.top - to.top, opacity: substituted ? .08 : .4, filter: substituted ? 'blur(3px)' : 'blur(0px)' });
          } else {
            gsap.set(token, { x: nextIndex === states.length - 1 ? 16 : tokenIndex % 2 === 0 ? -10 : 10, y: nextIndex === states.length - 1 ? 0 : 8, opacity: 0, filter: 'blur(2px)' });
          }
        });

        active = nextIndex;
        const fragmenting = nextIndex === 3;
        currentTimeline = gsap.timeline({
          defaults: { duration: .56, ease: 'power2.inOut' },
          onComplete: () => {
            gsap.set(previousLayer, { autoAlpha: 0, visibility: 'hidden' });
            gsap.set(outgoing, { clearProps: 'transform,opacity,filter' });
          }
        });
        outgoing.forEach((token, tokenIndex) => {
          const concept = token.dataset.concept;
          const peers = concept ? outgoingByConcept.get(concept) ?? [] : [];
          const occurrence = peers.indexOf(token);
          const targets = concept ? incomingByConcept.get(concept) ?? [] : [];
          const target = targets[Math.min(Math.max(occurrence, 0), targets.length - 1)];
          if (target) {
            const from = token.getBoundingClientRect();
            const to = target.getBoundingClientRect();
            currentTimeline?.to(token, { x: to.left - from.left, y: to.top - from.top, opacity: .05 }, 0);
          } else {
            currentTimeline?.to(token, {
              x: (tokenIndex % 2 === 0 ? -1 : 1) * (fragmenting ? 20 : 10),
              y: fragmenting ? ((tokenIndex % 3) - 1) * 10 : -5,
              rotation: fragmenting ? (tokenIndex % 2 === 0 ? -4 : 4) : 0,
              opacity: 0,
              filter: fragmenting ? 'blur(4px)' : 'blur(2px)'
            }, 0);
          }
        });
        currentTimeline.to(incoming, { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', stagger: .02 }, .1);
      };
    })();

    return () => { cancelled = true; currentTimeline?.kill(); };
  });
</script>

<section class="transformation-sequence" class:homepage={homepageChapter} class:static={staticMode} bind:this={sequence} aria-labelledby="transformation-heading">
  <header class="sequence-intro">
    {#if homepageChapter}
      <p class="section-kicker">{chapterIndex ? `${chapterIndex} · ` : ''}Relation under transformation</p>
      <h1 id="transformation-heading">Relation under <em>transformation.</em></h1>
      <p class="chapter-deck">Explore how a relation persists as the wording changes.</p>
    {:else}
      <p class="section-kicker">Intertextual transformation · demonstration</p>
      <h2 id="transformation-heading">Watch lexical evidence recede while a relation trace remains.</h2>
      <p class="historical-note">Milton and Shelley are the historical anchors; intermediate stages are constructed to illustrate changing recognition conditions.</p>
    {/if}
  </header>

  <div class="text-comparison">
    <article class="text-panel source-text" aria-labelledby="milton-heading">
      <header><div>{#if homepageChapter}<span class="panel-label">Historical source</span>{/if}<h3 id="milton-heading">John Milton</h3></div><p><cite>Paradise Lost</cite> · Book X</p></header>
      <blockquote>
        <span>“<mark class="concept-grievance">Did I request thee</mark>, <mark class="concept-creator">Maker</mark>, from my <mark class="concept-origin">clay</mark></span>
        <span>To <mark class="concept-being">mould me Man</mark>, did I solicit thee</span>
        <span>From <mark class="concept-origin">darkness to promote me</mark>?”</span>
      </blockquote>
    </article>

    <div class="comparison-arrow" aria-hidden="true"><span>wording changes</span><i>→</i></div>

    <article class="text-panel active-text" id="active-passage" aria-live="polite" aria-labelledby="active-text-heading">
      <header>
        <div>
          {#if homepageChapter}<span class="panel-label">Current textual state</span>{/if}
          {#if active === states.length - 1}<h3 id="active-text-heading">Mary Shelley</h3>{:else}<h3 id="active-text-heading">{homepageChapter ? titleCase(states[active].mode) : states[active].mode}</h3>{/if}
        </div>
        {#if active === states.length - 1}<p><cite>Frankenstein</cite></p>{:else}<p>{active === 0 ? 'Milton quotation' : homepageChapter ? 'Constructed demonstration · same relation, different wording' : 'Constructed demonstration'}</p>{/if}
      </header>
      <div class="token-stage" aria-hidden="true">
        {#each states as state, stateIndex}
          <blockquote class="passage-layer" data-passage={stateIndex}>
            <span class="quote-mark">“</span>
            {#each state.tokens as token}
              <span data-token data-concept={token.concept} class={tokenClass(token)}>{token.text}</span>
              {#if token.breakAfter}<span class="line-break"></span>{/if}
            {/each}
            <span class="quote-mark">”</span>
          </blockquote>
        {/each}
      </div>
      <p class="sr-only">{passageText(states[active])}</p>
    </article>
  </div>

  <ol class="static-sequence" aria-label="Static transformation sequence">
    {#each states as state}
      <li><header><span>{state.index}</span><h3>{state.mode}</h3><small>{state.kind}</small></header><blockquote>{passageText(state)}</blockquote><p>{state.explanation}</p></li>
    {/each}
  </ol>

  <div class="destination-path" aria-label="Path from Milton through transformation to Shelley"><span>Milton</span><i></i><span>transformation path</span><i></i><span>Shelley</span></div>

  <section class="relation-spine" aria-labelledby="relation-spine-heading">
    <div class="spine-heading"><p id="relation-spine-heading">What still connects them</p><strong>{states[active].relationLabel}</strong></div>
    <ol>
      {#each conceptFamilies as concept}
        <li class={`concept-${concept.id} status-${states[active].concepts[concept.id]}`}><span></span><strong>{concept.label}</strong>{#if homepageChapter}<em>{concept.description}</em>{/if}</li>
      {/each}
    </ol>
    <div class="literary-reveal" class:revealed={active === states.length - 1}>
      <span><strong>Adam</strong> → created being</span>
      <span><strong>Fallen angel</strong> → Miltonic creation / fall</span>
    </div>
  </section>

  <div class="explanation-strip" aria-live="polite">
    <p class="plain-explanation">{states[active].explanation}</p>
    <dl class="primary-status">
      <div><dt>Surface wording</dt><dd>{states[active].surfaceWording}</dd></div>
      <div><dt>Evidence comes from</dt><dd>{states[active].evidenceFrom}</dd></div>
    </dl>
  </div>

  <nav class="stage-navigation" aria-label="Transformation stages">
    <p>Choose a stage to transform the passage.</p>
    <ol>
      {#each states as state, index}
        <li class:active={active === index}>
          <button type="button" data-state-control aria-controls="active-passage" aria-pressed={active === index} on:click={() => selectState(index)} on:focus={() => selectState(index)} on:keydown={(event) => handleStateKey(event, index)}>
            <span>{state.index}</span><strong>{homepageChapter ? titleCase(state.mode) : state.mode}</strong>
          </button>
        </li>
      {/each}
    </ol>
  </nav>

  <details class="advanced-model">
    <summary>Explore the relation model</summary>
    <div class="advanced-grid">
      <div><h3>Computational relation view</h3><p>The fuller model separates conceptual roles and the evidence used to connect them.</p></div>
      <svg viewBox="0 0 252 166" role="img" aria-labelledby="advanced-title advanced-description">
        <title id="advanced-title">Concept graph for the active transformation state</title>
        <desc id="advanced-description">The creator, created being, origin, consent, and responsibility remain structurally connected; Adam and the fallen angel appear at the allusion stage.</desc>
        <g class="trace-links" aria-hidden="true">{#each traceLinks as link}<path d={link.path} class={`status-${graphStatus(link.target)}`} />{/each}</g>
        <g class="trace-nodes" aria-hidden="true">
          {#each traceNodes as node}
            <g transform={`translate(${node.y + 10} ${node.x + 12})`} class={`status-${graphStatus(node.data.id)}`}><path d={symbolPath(node.data.id)} /><text x="6" y="2.3">{node.data.label}</text></g>
          {/each}
        </g>
      </svg>
      <dl class="advanced-status">
        <div><dt>Surface wording</dt><dd>{states[active].surfaceWording}</dd></div>
        <div><dt>Transformation distance</dt><dd>{states[active].transformationDistance}</dd></div>
        <div><dt>Relation evidence</dt><dd>{states[active].relationEvidence}</dd></div>
      </dl>
    </div>
  </details>
</section>

<style>
  .transformation-sequence { padding: var(--space-section) 0; border-top: 1px solid var(--rule); }
  .sequence-intro { max-width: 58rem; margin-bottom: clamp(2.5rem, 5vw, 3.5rem); }
  .sequence-intro :is(h1, h2) { max-width: 24ch; margin-top: .7rem; }
  .sequence-intro h1 em { color: var(--indigo); font-weight: 350; }
  .chapter-deck { margin: .8rem 0 0; color: var(--paper-soft); font-family: var(--serif); font-size: clamp(1.25rem, 2vw, 1.65rem); line-height: 1.35; }
  .historical-note { max-width: 48rem; margin: 1.2rem 0 0; color: var(--paper-dim); font-size: .82rem; line-height: 1.6; }
  .text-comparison { display: grid; grid-template-columns: minmax(0,1fr) 3.5rem minmax(0,1fr); gap: clamp(1rem, 2.5vw, 2rem); align-items: stretch; }
  .text-panel { min-width: 0; min-height: 24rem; padding: clamp(1.4rem, 3vw, 2.3rem); border-top: 1px solid var(--rule-strong); border-bottom: 1px solid var(--rule); background: rgba(13,17,27,.42); }
  .text-panel header { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; }
  .text-panel header h3 { font-family: var(--mono); font-size: .72rem; font-weight: 500; letter-spacing: .09em; text-transform: uppercase; }
  .text-panel header p { margin: 0; color: var(--paper-dim); font-family: var(--mono); font-size: .62rem; letter-spacing: .05em; text-transform: uppercase; }
  .panel-label { display: block; margin-bottom: .45rem; color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .09em; text-transform: uppercase; }
  .text-panel cite { color: var(--amber); font-style: normal; }
  .text-panel blockquote { color: var(--paper); font-family: var(--serif); font-size: clamp(1.65rem, 2.8vw, 2.55rem); line-height: 1.24; }
  .source-text blockquote { margin: clamp(2.5rem, 5vw, 4.5rem) 0 0; }
  .source-text blockquote > span { display: block; }
  mark { padding: 0; background: transparent; color: inherit; }
  .concept-being { border-bottom: 1px solid var(--indigo); }
  .concept-creator { border-bottom: 3px double var(--amber); }
  .concept-origin { border-bottom: 1px dashed var(--indigo); }
  .concept-grievance { box-shadow: inset 2px 0 var(--amber); padding-left: .16em; }
  .comparison-arrow { display: grid; place-content: center; gap: .45rem; color: var(--paper-dim); text-align: center; }
  .comparison-arrow span { font-family: var(--mono); font-size: .52rem; letter-spacing: .05em; writing-mode: vertical-rl; text-transform: uppercase; }
  .comparison-arrow i { color: var(--amber); font-family: var(--serif); font-size: 1.5rem; font-style: normal; }
  .token-stage { position: relative; min-height: 15rem; margin-top: clamp(2.5rem, 5vw, 4.5rem); }
  .passage-layer { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-content: flex-start; gap: .12em .28em; margin: 0; color: var(--paper-dim) !important; visibility: hidden; }
  .passage-layer:first-child { visibility: visible; }
  .passage-layer [data-token] { display: inline-block; will-change: transform, opacity, filter; }
  .passage-layer .concept-token { color: var(--paper-soft); }
  .passage-layer .direct-wording { color: var(--paper); }
  .line-break { width: 100%; height: 0; }
  .quote-mark { color: var(--paper-dim); }
  .static-sequence { display: none; }
  .destination-path { display: grid; grid-template-columns: auto 1fr auto 1fr auto; gap: .7rem; align-items: center; margin: 2rem 0 1.4rem; color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .07em; text-transform: uppercase; }
  .destination-path i { height: 1px; background: linear-gradient(90deg, var(--rule-strong), var(--indigo)); }
  .relation-spine { padding: 1.3rem 0 1.6rem; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .spine-heading { display: flex; justify-content: space-between; gap: 1rem; align-items: baseline; }
  .spine-heading p { margin: 0; color: var(--paper-dim); font-family: var(--mono); font-size: .61rem; letter-spacing: .08em; text-transform: uppercase; }
  .spine-heading strong { color: var(--amber); font-family: var(--mono); font-size: .66rem; font-weight: 500; letter-spacing: .06em; text-transform: uppercase; }
  .relation-spine ol { display: grid; grid-template-columns: repeat(4,1fr); gap: 2rem; margin: 1.3rem 0 0; padding: 0; list-style: none; }
  .relation-spine li { position: relative; display: grid; grid-template-columns: .8rem 1fr; gap: .55rem; align-items: center; color: var(--paper-soft); font-family: var(--mono); font-size: .65rem; letter-spacing: .04em; text-transform: uppercase; transition: opacity .35s ease; }
  .relation-spine li em { font-family: var(--serif); font-size: .92rem; font-weight: 350; letter-spacing: 0; line-height: 1.3; text-transform: none; }
  .relation-spine li:not(:last-child)::after { position: absolute; right: -1.3rem; color: var(--paper-dim); content: '→'; }
  .relation-spine li > span { width: .55rem; height: .55rem; border: 1px solid var(--indigo); border-radius: 50%; }
  .relation-spine li.concept-creator > span { border-color: var(--amber); border-radius: 0; transform: rotate(45deg); }
  .relation-spine li.concept-origin > span { border-style: dashed; border-radius: 0; }
  .relation-spine li.concept-grievance > span { border-color: var(--amber); border-radius: 0; box-shadow: inset 2px 0 var(--amber); }
  .relation-spine li.status-implicit { opacity: .42; }
  .relation-spine li.status-literary > span { background: rgba(201,164,107,.15); }
  .literary-reveal { display: flex; flex-wrap: wrap; justify-content: center; gap: .65rem 2.5rem; max-height: 0; margin: 0; overflow: hidden; opacity: 0; color: var(--paper-soft); font-family: var(--mono); font-size: .64rem; letter-spacing: .04em; text-transform: uppercase; transition: max-height .4s var(--ease), margin .4s var(--ease), opacity .3s ease; }
  .literary-reveal.revealed { max-height: 4rem; margin-top: 1.4rem; opacity: 1; }
  .literary-reveal strong { color: var(--amber); font-weight: 500; }
  .stage-navigation { margin-top: 1.8rem; }
  .stage-navigation > p { margin: 0 0 .9rem; color: var(--paper-dim); font-size: .75rem; }
  .stage-navigation ol { display: grid; grid-template-columns: repeat(5,1fr); margin: 0; padding: 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); list-style: none; }
  .stage-navigation li + li { border-left: 1px solid var(--rule); }
  .stage-navigation button { display: grid; gap: .35rem; width: 100%; min-height: 5.2rem; padding: 1rem; border: 0; border-bottom: 2px solid transparent; background: transparent; color: var(--paper-dim); text-align: left; cursor: pointer; }
  .stage-navigation button span, .stage-navigation button strong { font-family: var(--mono); font-size: .63rem; letter-spacing: .07em; }
  .stage-navigation button strong { color: var(--paper-soft); font-weight: 500; }
  .stage-navigation li.active button { border-bottom-color: var(--amber); background: rgba(201,164,107,.045); }
  .stage-navigation li.active button span { color: var(--amber); }
  .stage-navigation li.active button strong, .stage-navigation button:hover strong { color: var(--paper); }
  .explanation-strip { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(20rem, 1fr); gap: clamp(1.5rem, 4vw, 4rem); align-items: center; padding: 1.8rem 0; border-bottom: 1px solid var(--rule); }
  .plain-explanation { margin: 0; color: var(--paper); font-size: clamp(1.15rem, 1.7vw, 1.45rem); line-height: 1.45; }
  .primary-status { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem; margin: 0; }
  .primary-status div { display: grid; grid-template-columns: 1fr auto; gap: 1rem; padding-bottom: .5rem; border-bottom: 1px solid var(--rule); }
  dt { color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .07em; text-transform: uppercase; }
  dd { margin: 0; color: var(--amber); font-family: var(--mono); font-size: .62rem; text-align: right; text-transform: uppercase; }
  .advanced-model { border-bottom: 1px solid var(--rule); }
  .advanced-model summary { padding: 1.2rem 0; color: var(--paper-soft); font-family: var(--mono); font-size: .65rem; letter-spacing: .06em; text-transform: uppercase; cursor: pointer; }
  .advanced-model summary::marker { color: var(--amber); }
  .advanced-grid { display: grid; grid-template-columns: .7fr 1.25fr .65fr; gap: clamp(1.5rem, 4vw, 4rem); align-items: center; padding: 1.5rem 0 2.5rem; }
  .advanced-grid h3 { font-family: var(--mono); font-size: .72rem; font-weight: 500; letter-spacing: .07em; text-transform: uppercase; }
  .advanced-grid > div > p { margin: .7rem 0 0; color: var(--paper-dim); font-size: .75rem; line-height: 1.55; }
  .advanced-grid svg { width: 100%; max-height: 15rem; overflow: visible; }
  .trace-links path { fill: none; stroke: rgba(141,150,216,.4); stroke-width: .7; vector-effect: non-scaling-stroke; }
  .trace-nodes g, .trace-links path { transition: opacity .3s ease; }
  .trace-nodes path { fill: var(--ink-1); stroke: var(--indigo); stroke-width: .75; vector-effect: non-scaling-stroke; }
  .trace-nodes text { fill: var(--paper-soft); font-family: var(--mono); font-size: 6px; }
  .trace-nodes .status-visible path, .trace-links .status-visible, .trace-nodes .status-literary path, .trace-links .status-literary { stroke: var(--amber); }
  .trace-nodes .status-implicit, .trace-links .status-implicit { opacity: .4; stroke-dasharray: 2 2; }
  .trace-nodes .status-dormant, .trace-links .status-dormant { opacity: .1; }
  .advanced-status { display: grid; gap: .8rem; margin: 0; }
  .advanced-status div { padding-bottom: .55rem; border-bottom: 1px solid var(--rule); }
  .advanced-status dd { margin-top: .25rem; text-align: left; }
  .homepage { padding: clamp(2rem, 4vh, 3rem) 0 0; }
  .homepage .sequence-intro { max-width: none; margin-bottom: 1.5rem; }
  .homepage .sequence-intro :is(h1, h2) { max-width: none; font-size: clamp(2.9rem, 4vw, 3.75rem); }
  .homepage .text-comparison { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.75rem; }
  .homepage .comparison-arrow { display: none; }
  .homepage .text-panel { min-height: 17.5rem; padding: clamp(1.5rem, 2vw, 2rem); border: 1px solid var(--rule-strong); }
  .homepage .text-panel header h3 { margin-top: .1rem; font-family: var(--serif); font-size: clamp(1.4rem, 1.7vw, 1.7rem); font-weight: 420; letter-spacing: -.02em; text-transform: none; }
  .homepage .text-panel blockquote { font-size: clamp(1.35rem, 1.75vw, 1.65rem); }
  .homepage .source-text blockquote, .homepage .token-stage { margin-top: 1.5rem; }
  .homepage .token-stage { min-height: 9rem; }
  .homepage .destination-path { display: none; }
  .homepage .relation-spine { padding: 1.25rem 0 1.5rem; border-top: 0; }
  .homepage .spine-heading p { color: var(--paper); font-family: var(--serif); font-size: clamp(1.4rem, 1.65vw, 1.65rem); letter-spacing: -.02em; text-transform: none; }
  .homepage .spine-heading strong { display: none; }
  .homepage .relation-spine ol { gap: 1.5rem; margin-top: 1.25rem; }
  .homepage .relation-spine li { grid-template-columns: 1.2rem 1fr; grid-template-rows: auto auto; gap: .45rem .65rem; align-items: center; }
  .homepage .relation-spine li::before { grid-column: 1 / -1; grid-row: 1; height: 1px; background: var(--rule-strong); content: ''; }
  .homepage .relation-spine li::after { display: none; }
  .homepage .relation-spine li > span { grid-column: 1; grid-row: 1; z-index: 1; background: var(--ink-0); }
  .homepage .relation-spine li > strong { grid-column: 2; grid-row: 2; }
  .homepage .relation-spine li > em { grid-column: 2; grid-row: 3; color: var(--paper-dim); }
  .homepage .explanation-strip { grid-template-columns: minmax(0, 1.8fr) minmax(24rem, 1fr); gap: 0; padding: 1.2rem 0; border-bottom: 1px solid var(--rule); }
  .homepage .plain-explanation { padding-right: 2rem; font-family: var(--serif); font-size: clamp(1.1rem, 1.35vw, 1.3rem); }
  .homepage .primary-status { gap: 0; }
  .homepage .primary-status div { display: block; min-height: 3.6rem; padding: .1rem 1.5rem; border-bottom: 0; border-left: 1px solid var(--rule-strong); }
  .homepage .primary-status dd { margin-top: .25rem; color: var(--paper); font-family: var(--serif); font-size: 1.15rem; text-align: left; text-transform: none; }
  .homepage .stage-navigation { margin-top: 0; }
  .homepage .stage-navigation > p { display: block; margin-bottom: .35rem; font-family: var(--mono); font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; }
  .homepage .stage-navigation ol { display: flex; gap: 0; border-top: 0; }
  .homepage .stage-navigation li { position: relative; flex: 1; }
  .homepage .stage-navigation li + li { border-left: 0; }
  .homepage .stage-navigation li:not(:last-child)::after { position: absolute; top: 50%; right: 0; width: 2.5rem; height: 1px; background: var(--rule-strong); content: ''; transform: translate(50%, -50%); }
  .homepage .stage-navigation button { display: flex; gap: .7rem; align-items: center; min-height: 4.1rem; padding: .5rem 0; border-bottom: 0; }
  .homepage .stage-navigation button::before { width: .68rem; height: .68rem; border: 1px solid var(--paper-dim); border-radius: 50%; content: ''; }
  .homepage .stage-navigation li.active button { border-bottom-color: transparent; background: transparent; }
  .homepage .stage-navigation li.active button::before { border-color: var(--amber); box-shadow: inset 0 0 0 3px var(--ink-0), inset 0 0 0 6px var(--amber); }
  .homepage .stage-navigation button strong { font-family: var(--serif); font-size: .95rem; letter-spacing: 0; }
  .homepage .advanced-model { display: none; }
  @media (max-width: 900px) {
    .text-comparison { grid-template-columns: minmax(0,1fr) 2rem minmax(0,1fr); }
    .text-panel { min-height: 26rem; }
    .relation-spine ol { gap: 1rem; }
    .relation-spine li:not(:last-child)::after { right: -.75rem; }
    .explanation-strip { grid-template-columns: 1fr; }
    .advanced-grid { grid-template-columns: 1fr 1.5fr; }
    .advanced-status { grid-column: 1 / -1; grid-template-columns: repeat(3,1fr); }
  }
  @media (max-width: 680px) {
    .text-comparison, .homepage .text-comparison { grid-template-columns: 1fr; }
    .homepage { padding-top: 2rem; }
    .homepage .sequence-intro { margin-bottom: 1.25rem; }
    .homepage .sequence-intro :is(h1, h2) { font-size: clamp(2.85rem, 12vw, 3.5rem); }
    .homepage .text-panel { min-height: auto; padding: 1.25rem; }
    .homepage .source-text blockquote, .homepage .token-stage { margin-top: 1.2rem; }
    .homepage .token-stage { min-height: 8rem; }
    .text-panel { min-height: 22rem; }
    .comparison-arrow { display: flex; justify-content: center; align-items: center; }
    .comparison-arrow span { writing-mode: horizontal-tb; }
    .comparison-arrow i { transform: rotate(90deg); }
    .relation-spine ol { grid-template-columns: 1fr 1fr; gap: 1rem 1.5rem; }
    .homepage .relation-spine { padding-block: 1rem; }
    .homepage .spine-heading p { font-size: 1.45rem; }
    .homepage .relation-spine ol { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .6rem; }
    .homepage .relation-spine li { grid-template-columns: .75rem 1fr; gap: .35rem; }
    .homepage .relation-spine li > strong { grid-column: 1 / -1; font-size: .5rem; line-height: 1.35; text-align: center; }
    .homepage .relation-spine li > em { display: none; }
    .relation-spine li:nth-child(2)::after { display: none; }
    .stage-navigation { overflow: hidden; }
    .stage-navigation ol { grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: minmax(7.6rem, 42%); overflow-x: auto; scroll-snap-type: x proximity; }
    .stage-navigation li { scroll-snap-align: start; }
    .explanation-strip, .homepage .explanation-strip { grid-template-columns: 1fr; }
    .homepage .plain-explanation { padding: 0 0 .9rem; font-size: 1.1rem; }
    .homepage .primary-status { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .homepage .primary-status div { padding: .75rem 0; border-top: 1px solid var(--rule); border-left: 0; }
    .homepage .primary-status div + div { padding-left: 1rem; border-left: 1px solid var(--rule); }
    .homepage .primary-status dd { font-size: 1rem; }
    .homepage .stage-navigation { overflow: hidden; }
    .homepage .stage-navigation ol { display: grid; grid-template-columns: none; grid-auto-flow: column; grid-auto-columns: minmax(8.8rem, 48%); overflow-x: auto; scroll-snap-type: x proximity; }
    .homepage .stage-navigation li:not(:last-child)::after { display: none; }
    .homepage .stage-navigation button { padding-right: .75rem; }
    .primary-status { grid-template-columns: 1fr; gap: .75rem; }
    .advanced-grid { grid-template-columns: 1fr; }
    .advanced-status { grid-column: auto; grid-template-columns: 1fr; }
  }
  @media (max-width: 420px) {
    .text-panel { min-height: 24rem; padding: 1.25rem; }
    .text-panel header { display: block; }
    .text-panel header p { margin-top: .35rem; }
    .text-panel blockquote { font-size: 1.55rem; }
    .token-stage { min-height: 16rem; }
    .spine-heading { display: block; }
    .spine-heading strong { display: block; margin-top: .45rem; }
    .relation-spine ol { grid-template-columns: 1fr; }
    .homepage .relation-spine ol { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .relation-spine li::after { display: none; }
    .literary-reveal { justify-content: flex-start; }
    .panel-label, dt { font-size: .62rem; }
  }
  @media (max-width: 680px) {
    .homepage {
      display: flex;
      flex-direction: column;
      padding-top: .8rem;
    }
    .homepage .sequence-intro { order: 1; margin-bottom: .75rem; }
    .homepage .sequence-intro .section-kicker {
      font-size: .56rem;
      letter-spacing: .1em;
    }
    .homepage .sequence-intro :is(h1, h2) {
      margin-top: .35rem;
      font-size: clamp(1.9rem, 8vw, 2.2rem);
      line-height: 1;
    }
    .homepage .chapter-deck {
      margin-top: .45rem;
      font-size: .95rem;
      line-height: 1.2;
    }
    .homepage .text-comparison { order: 2; gap: .55rem; }
    .homepage .text-panel {
      min-height: 0;
      overflow: hidden;
      padding: .7rem .85rem;
    }
    .homepage .text-panel header {
      display: flex;
      gap: .75rem;
      align-items: end;
    }
    .homepage .panel-label {
      margin-bottom: .15rem;
      font-size: .55rem;
    }
    .homepage .text-panel header h3 {
      margin: 0;
      font-size: 1.12rem;
      line-height: 1;
    }
    .homepage .text-panel header p {
      margin: 0;
      font-size: .52rem;
      text-align: right;
    }
    .homepage .active-text header > p { display: none; }
    .homepage .text-panel blockquote {
      margin-bottom: 0;
      font-size: 1rem;
      line-height: 1.2;
    }
    .homepage .source-text blockquote,
    .homepage .token-stage { margin-top: .55rem; }
    .homepage .source-text blockquote > span { display: inline; }
    .homepage .token-stage { min-height: 4.6rem; }
    .homepage .relation-spine,
    .homepage .primary-status { display: none; }
    .homepage .stage-navigation {
      order: 3;
      margin-top: .55rem;
      overflow: visible;
    }
    .homepage .stage-navigation ol {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      grid-auto-flow: row;
      grid-auto-columns: auto;
      min-height: 5rem;
      padding: .25rem 0 0;
      overflow: visible;
      border-top: 1px solid var(--rule);
      border-bottom: 1px solid var(--rule);
      scroll-snap-type: none;
    }
    .homepage .stage-navigation li {
      min-width: 0;
      overflow: visible;
      scroll-snap-align: none;
    }
    .homepage .stage-navigation button {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: .8rem 3.7rem;
      gap: 0 .25rem;
      justify-content: center;
      align-content: start;
      min-height: 5rem;
      padding: .2rem 0 0;
    }
    .homepage .stage-navigation button::before {
      grid-column: 1;
      grid-row: 1;
      width: .5rem;
      height: .5rem;
    }
    .homepage .stage-navigation button span {
      grid-column: 2;
      grid-row: 1;
      font-size: .56rem;
    }
    .homepage .stage-navigation button strong {
      grid-column: 1 / -1;
      grid-row: 2;
      align-self: center;
      font-size: .72rem;
      white-space: nowrap;
      transform: rotate(-45deg);
    }
    .homepage .stage-navigation li.active button {
      background: rgba(201,164,107,.06);
    }
    .homepage .explanation-strip {
      order: 4;
      padding: .65rem 0 0;
      border-bottom: 0;
    }
    .homepage .plain-explanation {
      padding: 0;
      font-size: 1rem;
      line-height: 1.25;
    }
  }
  .static .text-comparison { display: block; }
  .static .active-text, .static .comparison-arrow, .static .stage-navigation { display: none; }
  .static .static-sequence { display: grid; gap: 1rem; margin: 1rem 0 0; padding: 0; list-style: none; }
  .static .static-sequence li { padding: 1.25rem 0; border-bottom: 1px solid var(--rule); }
  .static .static-sequence header { display: flex; gap: .8rem; align-items: baseline; }
  .static .static-sequence header span, .static .static-sequence header small { color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .06em; text-transform: uppercase; }
  .static .static-sequence h3 { font-family: var(--mono); font-size: .7rem; letter-spacing: .07em; }
  .static .static-sequence blockquote { margin: .8rem 0; color: var(--paper); font-family: var(--serif); font-size: 1.2rem; line-height: 1.4; }
  .static .static-sequence p { margin: 0; color: var(--paper-soft); font-size: .75rem; }
  .static .literary-reveal { max-height: 4rem; margin-top: 1.4rem; opacity: 1; }
  @media (prefers-reduced-motion: reduce) {
    .text-comparison, .homepage .text-comparison { display: block; }
    .active-text, .comparison-arrow, .stage-navigation { display: none; }
    .static-sequence { display: grid; gap: 1rem; margin: 1rem 0 0; padding: 0; list-style: none; }
    .static-sequence li { padding: 1.25rem 0; border-bottom: 1px solid var(--rule); }
    .static-sequence header { display: flex; gap: .8rem; align-items: baseline; }
    .static-sequence header span, .static-sequence header small { color: var(--paper-dim); font-family: var(--mono); font-size: .58rem; letter-spacing: .06em; text-transform: uppercase; }
    .static-sequence h3 { font-family: var(--mono); font-size: .7rem; letter-spacing: .07em; }
    .static-sequence blockquote { margin: .8rem 0; color: var(--paper); font-family: var(--serif); font-size: 1.2rem; line-height: 1.4; }
    .static-sequence p { margin: 0; color: var(--paper-soft); font-size: .75rem; }
    .literary-reveal { max-height: 4rem; margin-top: 1.4rem; opacity: 1; }
    .relation-spine li, .literary-reveal, .trace-nodes g, .trace-links path { transition: none; }
  }
</style>
