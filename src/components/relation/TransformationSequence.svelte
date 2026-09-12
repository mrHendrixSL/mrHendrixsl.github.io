<script lang="ts">
  import { onMount } from 'svelte';
  import {
    curveBumpX,
    hierarchy,
    line,
    scalePoint,
    symbol,
    symbolCircle,
    symbolCross,
    symbolDiamond,
    symbolSquare,
    symbolTriangle,
    tree
  } from 'd3';

  type ConceptId = 'being' | 'creator' | 'consent' | 'origin' | 'responsibility' | 'adam' | 'counterfigure';
  type EvidenceState = 'direct' | 'recast' | 'implicit' | 'literary' | 'dormant' | 'stable';
  type CueKey = 'surfaceOverlap' | 'transformation' | 'relationEvidence';
  type Token = { text: string; concept?: ConceptId; anchor?: boolean; breakAfter?: boolean };
  type TransformationState = {
    index: string;
    mode: string;
    kind: 'historical anchor' | 'constructed demonstration';
    summary: string;
    explanation: string;
    visible: string;
    changed: string;
    recovery: string;
    surfaceOverlap: string;
    transformation: string;
    relationEvidence: string;
    presence: Partial<Record<ConceptId, EvidenceState>>;
    tokens: Token[];
  };
  type TraceDatum = {
    id: string;
    label: string;
    allusion?: boolean;
    children?: TraceDatum[];
  };

  const states: TransformationState[] = [
    {
      index: '01', mode: 'QUOTATION', kind: 'historical anchor',
      summary: 'Most wording remains directly visible.',
      explanation: 'The relationship is easy to detect because the wording itself carries strong evidence.',
      visible: 'Direct address, Maker, clay, mould, Man, and darkness.',
      changed: 'Nothing: this state preserves the Milton passage.',
      recovery: 'A system can rely on the wording and its sequence as direct evidence.',
      surfaceOverlap: 'high', transformation: 'local', relationEvidence: 'direct',
      presence: { being: 'direct', creator: 'direct', consent: 'direct', origin: 'direct', responsibility: 'direct' },
      tokens: [
        { text: 'Did I request thee,', concept: 'consent', anchor: true },
        { text: 'Maker,', concept: 'creator', anchor: true },
        { text: 'from my', anchor: true },
        { text: 'clay', concept: 'origin', anchor: true, breakAfter: true },
        { text: 'To mould me Man,', concept: 'being', anchor: true },
        { text: 'did I solicit thee', concept: 'responsibility', anchor: true, breakAfter: true },
        { text: 'From darkness to promote me?', concept: 'origin', anchor: true }
      ]
    },
    {
      index: '02', mode: 'PARAPHRASE', kind: 'constructed demonstration',
      summary: 'Words reorder and substitute, but the relation remains explicit.',
      explanation: 'The same question survives in new language: a made being addresses the source of its existence.',
      visible: 'Creator, making, emergence into life, and the absence of a request.',
      changed: 'Milton’s syntax and characteristic nouns have been replaced.',
      recovery: 'Recognition shifts from copied wording to equivalent expressions and roles.',
      surfaceOverlap: 'medium', transformation: 'local', relationEvidence: 'distributed',
      presence: { being: 'recast', creator: 'recast', consent: 'recast', origin: 'recast', responsibility: 'implicit' },
      tokens: [
        { text: 'I never asked', concept: 'consent' },
        { text: 'my creator', concept: 'creator' },
        { text: 'to make me', concept: 'being' },
        { text: 'or to bring me out of nothing into life.', concept: 'origin' }
      ]
    },
    {
      index: '03', mode: 'ADAPTATION', kind: 'constructed demonstration',
      summary: 'Structure changes and wording shifts, but the conceptual relation remains strong.',
      explanation: 'The first-person appeal becomes an abstract scene of confrontation and imposed existence.',
      visible: 'A created being, a life-giver, confrontation, and creation without consent.',
      changed: 'Voice, sentence structure, and the order of the ideas have moved.',
      recovery: 'A system must align semantic roles rather than match a sentence pattern.',
      surfaceOverlap: 'low', transformation: 'structural', relationEvidence: 'distributed',
      presence: { being: 'recast', creator: 'recast', consent: 'recast', origin: 'recast', responsibility: 'recast' },
      tokens: [
        { text: 'A created being', concept: 'being' },
        { text: 'confronts', concept: 'responsibility' },
        { text: 'the one', concept: 'creator' },
        { text: 'who gave it life', concept: 'origin' },
        { text: 'and questions an existence imposed without consent.', concept: 'consent' }
      ]
    },
    {
      index: '04', mode: 'OBFUSCATION', kind: 'constructed demonstration',
      summary: 'Direct lexical anchors weaken; the relation must be reconstructed from dispersed cues.',
      explanation: 'The people and act of creation are no longer named directly, but their causal pattern remains.',
      visible: 'Existence, absent assent, origin, obligation, and accusation.',
      changed: 'Creator and created being have become implicit rather than named participants.',
      recovery: 'Separate clues must be assembled into a creator–creation grievance.',
      surfaceOverlap: 'minimal', transformation: 'structural', relationEvidence: 'inferential',
      presence: { being: 'recast', creator: 'implicit', consent: 'recast', origin: 'recast', responsibility: 'recast' },
      tokens: [
        { text: 'Existence', concept: 'being' },
        { text: 'became an obligation', concept: 'responsibility' },
        { text: 'before assent was possible,', concept: 'consent' },
        { text: 'leaving its origin', concept: 'origin' },
        { text: 'as the object of accusation.' }
      ]
    },
    {
      index: '05', mode: 'ALLUSION', kind: 'historical anchor',
      summary: 'The wording changes drastically, but literary and conceptual evidence re-establishes the relation.',
      explanation: 'Shelley’s Adam and fallen angel reframe the created being’s grievance through figures drawn from Milton.',
      visible: 'Adam, fallen angel, direct address, expectation, and disappointed relation.',
      changed: 'Milton’s question is replaced by a compressed literary comparison.',
      recovery: 'Recognition depends on literary knowledge and the persistent creator–created-being structure.',
      surfaceOverlap: 'minimal', transformation: 'distant', relationEvidence: 'inferential',
      presence: { being: 'literary', creator: 'recast', consent: 'implicit', origin: 'implicit', responsibility: 'literary', adam: 'literary', counterfigure: 'literary' },
      tokens: [
        { text: 'I ought to be', concept: 'responsibility' },
        { text: 'thy', concept: 'creator' },
        { text: 'Adam,', concept: 'being' },
        { text: 'but I am rather' },
        { text: 'the fallen angel...', concept: 'counterfigure' }
      ]
    }
  ];

  const coreConcepts: Array<{ id: ConceptId; label: string }> = [
    { id: 'being', label: 'created being' },
    { id: 'creator', label: 'creator / maker' },
    { id: 'consent', label: 'creation without consent' },
    { id: 'origin', label: 'origin / emergence' },
    { id: 'responsibility', label: 'responsibility / accusation' }
  ];

  const traceData: TraceDatum = {
    id: 'relation', label: 'creation relation', children: [
      { id: 'being', label: 'created being', children: [
        { id: 'origin', label: 'origin / emergence' },
        { id: 'consent', label: 'without consent' },
        { id: 'adam', label: 'Adam', allusion: true },
        { id: 'counterfigure', label: 'fallen angel', allusion: true }
      ] },
      { id: 'creator', label: 'creator / maker', children: [
        { id: 'responsibility', label: 'responsibility / accusation' }
      ] }
    ]
  };

  const traceRoot = tree<TraceDatum>().size([142, 158])(hierarchy(traceData));
  const traceNodes = traceRoot.descendants();
  const traceLine = line<[number, number]>()
    .x(point => point[0])
    .y(point => point[1])
    .curve(curveBumpX);
  const traceLinks = traceRoot.links().map(link => ({
    target: link.target.data.id,
    allusion: Boolean(link.target.data.allusion),
    path: traceLine([[link.source.y + 10, link.source.x + 12], [link.target.y + 10, link.target.x + 12]]) ?? ''
  }));

  const symbolTypes = {
    relation: symbolCircle,
    being: symbolCircle,
    creator: symbolDiamond,
    consent: symbolSquare,
    origin: symbolTriangle,
    responsibility: symbolCross,
    adam: symbolCircle,
    counterfigure: symbolTriangle
  };
  const symbolPath = (id: string) => symbol()
    .type(symbolTypes[id as keyof typeof symbolTypes] ?? symbolCircle)
    .size(id === 'relation' ? 38 : 28)() ?? '';

  const cueRows: Array<{ key: CueKey; label: string; question: string }> = [
    { key: 'surfaceOverlap', label: 'Surface wording', question: 'How much original phrasing is still visible?' },
    { key: 'transformation', label: 'Transformation distance', question: 'How far has the expression moved?' },
    { key: 'relationEvidence', label: 'Relation evidence', question: 'Where does recognition now come from?' }
  ];
  const cueDomains: Record<CueKey, string[]> = {
    surfaceOverlap: ['high', 'medium', 'low', 'minimal'],
    transformation: ['local', 'structural', 'distant'],
    relationEvidence: ['direct', 'distributed', 'inferential']
  };
  const cueScales: Record<CueKey, ReturnType<typeof scalePoint<string>>> = {
    surfaceOverlap: scalePoint<string>().domain(cueDomains.surfaceOverlap).range([4, 96]),
    transformation: scalePoint<string>().domain(cueDomains.transformation).range([4, 96]),
    relationEvidence: scalePoint<string>().domain(cueDomains.relationEvidence).range([4, 96])
  };

  const passageText = (state: TransformationState) => `“${state.tokens.map(token => token.text).join(' ')}”`;
  const tokenClass = (token: Token) => [
    token.concept ? 'concept-token' : '',
    token.concept ? `concept-${token.concept}` : '',
    token.anchor ? 'lexical-anchor' : ''
  ].filter(Boolean).join(' ');

  let active = 0;
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

  const traceStatus = (id: string): EvidenceState => {
    if (id === 'relation') return 'stable';
    return states[active].presence[id as ConceptId] ?? 'dormant';
  };
  const cueValue = (key: CueKey) => states[active][key];
  const cuePosition = (key: CueKey, value: string) => cueScales[key](value) ?? 4;

  function selectState(index: number) { changeState(index); }
  function handleStateKey(event: KeyboardEvent, index: number) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % states.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + states.length) % states.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = states.length - 1;
    else return;
    event.preventDefault();
    selectState(next);
    requestAnimationFrame(() => sequence.querySelectorAll<HTMLButtonElement>('[data-state-control]')[next]?.focus());
  }

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
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
          if (!concept) return;
          groups.set(concept, [...(groups.get(concept) ?? []), token]);
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
        layers.forEach((layer, layerIndex) => {
          if (layerIndex !== previousIndex && layerIndex !== nextIndex) gsap.set(layer, { autoAlpha: 0, visibility: 'hidden' });
        });
        gsap.set([outgoing, incoming], { clearProps: 'transform,opacity,filter' });
        gsap.set(nextLayer, { autoAlpha: 1, visibility: 'visible' });

        incoming.forEach((token, tokenIndex) => {
          const concept = token.dataset.concept;
          const conceptPeers = concept ? incomingByConcept.get(concept) ?? [] : [];
          const occurrence = conceptPeers.indexOf(token);
          const sources = concept ? outgoingByConcept.get(concept) ?? [] : [];
          const source = sources[Math.min(Math.max(occurrence, 0), sources.length - 1)];
          if (source) {
            const from = source.getBoundingClientRect();
            const to = token.getBoundingClientRect();
            const substituted = source.textContent?.trim().toLowerCase() !== token.textContent?.trim().toLowerCase();
            gsap.set(token, {
              x: from.left - to.left,
              y: from.top - to.top,
              opacity: substituted ? .08 : .42,
              filter: substituted ? 'blur(3px)' : 'blur(0px)'
            });
          } else {
            const reanchoring = nextIndex === states.length - 1;
            gsap.set(token, {
              x: reanchoring ? 18 : tokenIndex % 2 === 0 ? -12 : 12,
              y: reanchoring ? 0 : 10,
              opacity: 0,
              filter: 'blur(2px)'
            });
          }
        });

        active = nextIndex;
        const fragmenting = nextIndex === 3;
        currentTimeline = gsap.timeline({
          defaults: { duration: .58, ease: 'power2.inOut' },
          onComplete: () => {
            gsap.set(previousLayer, { autoAlpha: 0, visibility: 'hidden' });
            gsap.set(outgoing, { clearProps: 'transform,opacity,filter' });
          }
        });

        outgoing.forEach((token, tokenIndex) => {
          const concept = token.dataset.concept;
          const conceptPeers = concept ? outgoingByConcept.get(concept) ?? [] : [];
          const occurrence = conceptPeers.indexOf(token);
          const targets = concept ? incomingByConcept.get(concept) ?? [] : [];
          const target = targets[Math.min(Math.max(occurrence, 0), targets.length - 1)];
          if (target) {
            const from = token.getBoundingClientRect();
            const to = target.getBoundingClientRect();
            currentTimeline?.to(token, { x: to.left - from.left, y: to.top - from.top, opacity: .05 }, 0);
          } else {
            currentTimeline?.to(token, {
              x: (tokenIndex % 2 === 0 ? -1 : 1) * (fragmenting ? 22 : 11),
              y: fragmenting ? ((tokenIndex % 3) - 1) * 12 : -6,
              rotation: fragmenting ? (tokenIndex % 2 === 0 ? -5 : 5) : 0,
              opacity: 0,
              filter: fragmenting ? 'blur(4px)' : 'blur(2px)'
            }, 0);
          }
        });
        currentTimeline.to(incoming, { x: 0, y: 0, rotation: 0, opacity: 1, filter: 'blur(0px)', stagger: .02 }, .1);
      };
    })();

    return () => {
      cancelled = true;
      currentTimeline?.kill();
    };
  });
</script>

<section class="transformation-sequence" class:static={staticMode} bind:this={sequence} aria-labelledby="transformation-heading">
  <header class="sequence-intro">
    <div>
      <p class="section-kicker">Intertextual transformation · demonstration</p>
      <h2 id="transformation-heading">Watch lexical evidence recede while a relation trace remains.</h2>
      <p class="sequence-deck">One path through transformation space, anchored in a real intertextual relation between Milton’s <em>Paradise Lost</em> and Shelley’s <em>Frankenstein</em>.</p>
    </div>
    <p class="model-note"><strong>Demonstration model.</strong> The Milton–Shelley relation is historical; the intermediate transformations below are constructed to illustrate changing retrieval conditions. This is one illustrative path, not a universal linear taxonomy.</p>
  </header>

  <div class="demonstration-grid">
    <aside class="source-panel panel" aria-labelledby="source-anchor-heading">
      <header class="panel-heading">
        <span class="panel-index">A</span>
        <div><p>Historical source anchor</p><h3 id="source-anchor-heading">Milton</h3></div>
      </header>
      <figure class="source-body">
        <blockquote>
          <span>“<mark class="concept-consent">Did I request thee</mark>, <mark class="concept-creator">Maker</mark>, from my <mark class="concept-origin">clay</mark></span>
          <span>To <mark class="concept-being">mould me Man</mark>, <mark class="concept-responsibility">did I solicit thee</mark></span>
          <span>From <mark class="concept-origin">darkness to promote me</mark>?”</span>
        </blockquote>
        <p class="anchor-note">The source frames creation as a question from a made being to its maker.</p>
        <figcaption><strong>John Milton</strong><cite>Paradise Lost</cite><span>Book X</span></figcaption>
      </figure>
      <div class="concept-key" aria-labelledby="concept-key-heading">
        <p id="concept-key-heading">Concept key</p>
        <ul>
          {#each coreConcepts as concept}
            <li class={`concept-${concept.id}`}><svg viewBox="-5 -5 10 10" aria-hidden="true"><path d={symbolPath(concept.id)} /></svg><span>{concept.label}</span></li>
          {/each}
        </ul>
      </div>
    </aside>

    <div class="transformation-panel panel" aria-labelledby="path-heading">
      <header class="panel-heading">
        <span class="panel-index">B</span>
        <div><p>Transformation path</p><h3 id="path-heading">Active textual state</h3></div>
      </header>

      <div class="active-stage" id="active-passage" role="region" aria-live="polite" aria-label={`Active state: ${states[active].mode}`}>
        <div class="active-stage-heading"><span>{states[active].kind}</span><strong>{states[active].mode}</strong></div>
        <div class="token-stage" aria-hidden="true">
          {#each states as state, stateIndex}
            <p class="passage-layer" data-passage={stateIndex}>
              <span class="quote-mark">“</span>
              {#each state.tokens as token}
                <span data-token data-concept={token.concept} class={tokenClass(token)}>{token.text}</span>
                {#if token.breakAfter}<span class="line-break"></span>{/if}
              {/each}
              <span class="quote-mark">”</span>
            </p>
          {/each}
        </div>
        <p class="sr-only">{passageText(states[active])}</p>
        <p class="stage-explanation">{states[active].explanation}</p>
        <dl class="stage-observation">
          <div><dt>What remains visible</dt><dd>{states[active].visible}</dd></div>
          <div><dt>What has changed</dt><dd>{states[active].changed}</dd></div>
        </dl>
      </div>

      <ol class="state-controls" aria-label="Transformation states">
        {#each states as state, index}
          <li class:active={active === index}>
            <button type="button" data-state-control aria-controls="active-passage" aria-pressed={active === index} on:click={() => selectState(index)} on:focus={() => selectState(index)} on:keydown={(event) => handleStateKey(event, index)}>
              <span>{state.index}</span><strong>{state.mode}</strong><small>{state.summary}</small>
            </button>
            <div class="static-state">
              <p>{passageText(state)}</p>
              <span>{state.explanation}</span>
            </div>
          </li>
        {/each}
      </ol>
    </div>

    <aside class="relation-panel panel" aria-labelledby="relation-trace-heading">
      <header class="panel-heading">
        <span class="panel-index">C</span>
        <div><p>Persistent relation trace</p><h3 id="relation-trace-heading">What still connects the texts</h3></div>
      </header>

      <svg class="trace-map" viewBox="0 0 252 166" role="img" aria-labelledby="trace-map-title trace-map-description">
        <title id="trace-map-title">Conceptual structure of the Milton–Shelley relation</title>
        <desc id="trace-map-description">A created being, creator, origin, lack of consent, and responsibility remain connected. At the allusion state, Adam and the fallen angel re-anchor the relation.</desc>
        <g class="trace-links" aria-hidden="true">
          {#each traceLinks as link}<path d={link.path} class={`status-${traceStatus(link.target)}`} data-allusion-node={link.allusion ? '' : undefined} />{/each}
        </g>
        <g class="trace-nodes" aria-hidden="true">
          {#each traceNodes as node}
            <g transform={`translate(${node.y + 10} ${node.x + 12})`} class={`trace-node status-${traceStatus(node.data.id)}`} data-allusion-node={node.data.allusion ? '' : undefined}>
              <path class="node-symbol" d={symbolPath(node.data.id)} />
              <text x="6" y="2.3">{node.data.label}</text>
            </g>
          {/each}
        </g>
      </svg>

      <div class="recovery-readout">
        <p>How a system might recover the relation</p>
        <strong>{states[active].recovery}</strong>
      </div>

      <div class="evidence-profile" aria-label={`Qualitative evidence profile: surface wording ${states[active].surfaceOverlap}, transformation distance ${states[active].transformation}, relation evidence ${states[active].relationEvidence}`}>
        <p class="profile-heading">Qualitative evidence profile <span>categories, not measurements</span></p>
        {#each cueRows as cue}
          <div class="cue-row">
            <div><span>{cue.label}</span><strong>{cueValue(cue.key)}</strong></div>
            <small>{cue.question}</small>
            <div class="cue-track" aria-hidden="true">
              {#each cueDomains[cue.key] as category}<i style={`left:${cuePosition(cue.key, category)}%`}></i>{/each}
              <b style={`left:${cuePosition(cue.key, cueValue(cue.key))}%`}></b>
            </div>
            <div class="cue-extrema" aria-hidden="true"><span>{cueDomains[cue.key][0]}</span><span>{cueDomains[cue.key].at(-1)}</span></div>
          </div>
        {/each}
      </div>

      <figure class="destination-anchor" class:active-anchor={active === states.length - 1}>
        <p>Historical destination anchor</p>
        <blockquote>“I ought to be thy <mark class="concept-being">Adam</mark>, but I am rather the <mark class="concept-counterfigure">fallen angel</mark>...”</blockquote>
        <span>{active === states.length - 1 ? 'Literary figures re-anchor the relation.' : 'Re-enters the path at stage 05.'}</span>
        <figcaption><strong>Mary Shelley</strong><cite>Frankenstein</cite></figcaption>
      </figure>
    </aside>
  </div>

  <p class="sequence-conclusion">Relation persists after similarity fails.</p>
</section>

<style>
  .transformation-sequence { padding: var(--space-section) 0; border-top: 1px solid var(--rule); }
  .sequence-intro { display: grid; grid-template-columns: 1.35fr .65fr; gap: clamp(2.5rem, 7vw, 7rem); align-items: end; margin-bottom: clamp(3rem, 7vw, 6rem); }
  .sequence-intro h2 { max-width: 14ch; margin-top: .7rem; }
  .sequence-deck { max-width: 45rem; margin: 1.5rem 0 0; color: var(--paper-soft); font-family: var(--serif); font-size: clamp(1.1rem, 2vw, 1.45rem); line-height: 1.4; }
  .model-note { margin: 0; padding-left: 1.2rem; border-left: 1px solid var(--amber); color: var(--paper-dim); font-size: .78rem; line-height: 1.65; }
  .model-note strong { color: var(--paper); font-family: var(--mono); font-size: .65rem; letter-spacing: .06em; text-transform: uppercase; }
  .demonstration-grid { display: grid; grid-template-columns: minmax(0,.92fr) minmax(0,1.18fr) minmax(0,1fr); gap: clamp(1rem, 2.3vw, 2rem); align-items: start; }
  .panel { min-width: 0; padding: 1.35rem; border: 1px solid rgba(141,150,216,.2); background: rgba(13,17,27,.6); }
  .panel-heading { display: grid; grid-template-columns: 1.7rem 1fr; gap: .7rem; align-items: start; min-height: 3.8rem; padding-bottom: 1rem; border-bottom: 1px solid var(--rule); }
  .panel-heading p, .concept-key > p, .recovery-readout > p, .profile-heading, .destination-anchor > p { margin: 0 0 .25rem; color: var(--paper-dim); font-family: var(--mono); font-size: .55rem; letter-spacing: .08em; line-height: 1.5; text-transform: uppercase; }
  .panel-heading h3 { font-family: var(--mono); font-size: .76rem; font-weight: 500; letter-spacing: .07em; line-height: 1.35; text-transform: uppercase; }
  .panel-index { color: var(--amber); font-family: var(--serif); font-size: 1.45rem; font-style: italic; line-height: 1; }
  .source-body { margin: 0; }
  .source-body blockquote { margin: 1.8rem 0 1.25rem; color: var(--paper); font-family: var(--serif); font-size: clamp(1.2rem, 1.7vw, 1.5rem); line-height: 1.35; }
  .source-body blockquote > span { display: block; }
  mark { padding: 0; background: transparent; color: inherit; }
  .concept-being { border-bottom: 1px solid var(--indigo); }
  .concept-creator { border-bottom: 3px double var(--amber); }
  .concept-consent { border-bottom: 1px dotted var(--paper-soft); }
  .concept-origin { border-bottom: 1px dashed var(--indigo); }
  .concept-responsibility { box-shadow: inset 2px 0 var(--amber); padding-left: .2em; }
  .concept-counterfigure { border-bottom: 1px dashed var(--amber); }
  .source-body figcaption, .destination-anchor figcaption { display: flex; flex-wrap: wrap; gap: .3rem .7rem; color: var(--paper-dim); font-family: var(--mono); font-size: .59rem; letter-spacing: .05em; text-transform: uppercase; }
  .source-body figcaption strong, .destination-anchor figcaption strong { color: var(--paper); font-weight: 500; }
  .source-body figcaption cite, .destination-anchor figcaption cite { color: var(--amber); font-style: normal; }
  .anchor-note { margin: 1.2rem 0 0; color: var(--paper-dim); font-size: .75rem; line-height: 1.55; }
  .concept-key { margin-top: 1.8rem; padding-top: 1.2rem; border-top: 1px solid var(--rule); }
  .concept-key ul { display: grid; gap: .55rem; margin: .8rem 0 0; padding: 0; list-style: none; }
  .concept-key li { display: grid; grid-template-columns: 1rem 1fr; gap: .55rem; align-items: center; color: var(--paper-soft); font-family: var(--mono); font-size: .6rem; letter-spacing: .03em; }
  .concept-key svg { width: .8rem; height: .8rem; overflow: visible; }
  .concept-key path { fill: var(--ink-1); stroke: var(--indigo); stroke-width: .6; }
  .concept-key .concept-creator path, .concept-key .concept-responsibility path { stroke: var(--amber); }
  .active-stage { padding: 1.35rem 0; border-bottom: 1px solid var(--rule); }
  .active-stage-heading { display: flex; justify-content: space-between; gap: 1rem; color: var(--paper-dim); font-family: var(--mono); font-size: .57rem; letter-spacing: .07em; text-transform: uppercase; }
  .active-stage-heading strong { color: var(--amber); font-weight: 500; }
  .token-stage { position: relative; min-height: 10.7rem; margin: 1.35rem 0 .8rem; }
  .passage-layer { position: absolute; inset: 0; display: flex; flex-wrap: wrap; align-content: flex-start; gap: .12em .28em; margin: 0; color: var(--paper-dim); font-family: var(--serif); font-size: clamp(1.35rem, 2.2vw, 1.8rem); line-height: 1.28; visibility: hidden; }
  .passage-layer:first-child { visibility: visible; }
  .passage-layer span { display: inline-block; }
  .passage-layer [data-token] { will-change: transform, opacity, filter; }
  .passage-layer .concept-token { color: var(--paper-soft); }
  .passage-layer .lexical-anchor { color: var(--paper); }
  .line-break { width: 100%; height: 0; }
  .quote-mark { color: var(--paper-dim); }
  .stage-explanation { min-height: 3.9rem; margin: 0; color: var(--paper-soft); font-size: .76rem; line-height: 1.55; }
  .stage-observation { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0 0; padding-top: 1rem; border-top: 1px solid var(--rule); }
  .stage-observation dt { color: var(--paper-dim); font-family: var(--mono); font-size: .51rem; letter-spacing: .07em; text-transform: uppercase; }
  .stage-observation dd { margin: .35rem 0 0; color: var(--paper-soft); font-size: .68rem; line-height: 1.5; }
  .state-controls { display: grid; gap: 0; margin: 1rem 0 0; padding: 0; list-style: none; }
  .state-controls li { position: relative; border-top: 1px solid var(--rule); }
  .state-controls li:first-child { border-top: 0; }
  .state-controls li.active::before { position: absolute; top: .6rem; bottom: .6rem; left: -.45rem; width: 1px; background: var(--amber); content: ''; }
  .state-controls button { display: grid; grid-template-columns: 1.7rem 5.8rem 1fr; gap: .6rem; align-items: baseline; width: 100%; padding: .7rem 0; border: 0; background: transparent; color: var(--paper-dim); text-align: left; cursor: pointer; }
  .state-controls button > span, .state-controls button > strong { font-family: var(--mono); font-size: .58rem; letter-spacing: .06em; }
  .state-controls button > strong { color: var(--paper-soft); font-weight: 500; }
  .state-controls button > small { font-size: .62rem; line-height: 1.4; }
  .state-controls li.active button > strong, .state-controls button:hover > strong { color: var(--paper); }
  .state-controls li.active button > span { color: var(--amber); }
  .static-state { display: none; }
  .trace-map { width: 100%; min-height: 11.2rem; margin: 1rem 0; overflow: visible; }
  .trace-links path { fill: none; stroke: rgba(141,150,216,.38); stroke-width: .7; vector-effect: non-scaling-stroke; transition: opacity .35s ease, stroke .35s ease; }
  .trace-node { transition: opacity .35s ease; }
  .trace-node .node-symbol { fill: var(--ink-1); stroke: var(--indigo); stroke-width: .75; vector-effect: non-scaling-stroke; }
  .trace-node text { fill: var(--paper-soft); font-family: var(--mono); font-size: 6px; letter-spacing: .02em; }
  .trace-node.status-direct .node-symbol, .trace-links .status-direct { stroke: var(--amber); }
  .trace-node.status-recast .node-symbol, .trace-links .status-recast { stroke: var(--indigo); }
  .trace-node.status-implicit .node-symbol, .trace-links .status-implicit { stroke-dasharray: 2 2; opacity: .55; }
  .trace-node.status-literary .node-symbol, .trace-links .status-literary { fill: rgba(201,164,107,.15); stroke: var(--amber); }
  .trace-node.status-dormant, .trace-links .status-dormant { opacity: .1; }
  .recovery-readout { min-height: 5.6rem; padding: 1rem 0; border-top: 1px solid var(--rule); border-bottom: 1px solid var(--rule); }
  .recovery-readout strong { display: block; color: var(--paper-soft); font-size: .73rem; font-weight: 400; line-height: 1.55; }
  .evidence-profile { padding: 1rem 0; border-bottom: 1px solid var(--rule); }
  .profile-heading { display: flex; justify-content: space-between; gap: 1rem; }
  .profile-heading span { color: var(--amber); letter-spacing: .02em; text-transform: none; }
  .cue-row { margin-top: .8rem; }
  .cue-row > div:first-child { display: flex; justify-content: space-between; gap: 1rem; color: var(--paper-soft); font-family: var(--mono); font-size: .57rem; }
  .cue-row > div:first-child strong { color: var(--paper); font-weight: 500; text-transform: uppercase; }
  .cue-row > small { display: block; margin-top: .15rem; color: var(--paper-dim); font-size: .57rem; line-height: 1.35; }
  .cue-track { position: relative; height: 1px; margin: .65rem .15rem .3rem; background: var(--rule-strong); }
  .cue-track i, .cue-track b { position: absolute; top: 50%; border-radius: 50%; transform: translate(-50%,-50%); }
  .cue-track i { width: 4px; height: 4px; background: var(--paper-dim); }
  .cue-track b { width: 9px; height: 9px; border: 2px solid var(--ink-1); background: var(--amber); box-shadow: 0 0 0 1px var(--amber); transition: left .45s var(--ease); }
  .cue-extrema { display: flex; justify-content: space-between; color: var(--paper-dim); font-family: var(--mono); font-size: .47rem; letter-spacing: .04em; text-transform: uppercase; }
  .destination-anchor { margin: 1rem 0 0; padding: 1rem; border: 1px solid var(--rule); transition: border-color .35s ease, background .35s ease; }
  .destination-anchor blockquote { margin: .7rem 0 .8rem; color: var(--paper-soft); font-family: var(--serif); font-size: 1rem; line-height: 1.35; }
  .destination-anchor > span { display: block; margin-top: .7rem; color: var(--paper-dim); font-size: .62rem; line-height: 1.4; }
  .destination-anchor.active-anchor { border-color: rgba(201,164,107,.55); background: rgba(201,164,107,.04); }
  .destination-anchor.active-anchor > span { color: var(--amber); }
  .sequence-conclusion { margin: clamp(5rem, 10vw, 9rem) 0 0; color: var(--paper); font-family: var(--serif); font-size: clamp(2.4rem, 6vw, 6rem); line-height: .95; text-align: center; text-transform: uppercase; }
  @media (max-width: 1050px) {
    .demonstration-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
    .source-panel { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 0 2.5rem; }
    .source-panel .panel-heading { grid-column: 1 / -1; }
    .source-panel .concept-key { margin-top: 1.8rem; }
  }
  @media (max-width: 760px) {
    .sequence-intro, .demonstration-grid { grid-template-columns: 1fr; }
    .source-panel { grid-column: auto; display: block; }
    .state-controls button { grid-template-columns: 1.7rem 5.8rem 1fr; }
    .sequence-conclusion { text-align: left; }
  }
  @media (max-width: 440px) {
    .panel { padding: 1.1rem; }
    .state-controls button { grid-template-columns: 1.6rem 1fr; }
    .state-controls button > small { grid-column: 2; }
    .stage-observation { grid-template-columns: 1fr; }
    .token-stage { min-height: 12.5rem; }
    .passage-layer { font-size: 1.3rem; }
  }
  .static .active-stage { display: none; }
  .static .static-state { display: block; padding: 0 0 1rem 2.3rem; }
  .static .static-state p { margin: 0; color: var(--paper); font-family: var(--serif); font-size: .95rem; line-height: 1.45; }
  .static .static-state span { display: block; margin-top: .45rem; color: var(--paper-dim); font-size: .65rem; line-height: 1.5; }
  @media (prefers-reduced-motion: reduce) {
    .active-stage { display: none; }
    .static-state { display: block; padding: 0 0 1rem 2.3rem; }
    .static-state p { margin: 0; color: var(--paper); font-family: var(--serif); font-size: .95rem; line-height: 1.45; }
    .static-state span { display: block; margin-top: .45rem; color: var(--paper-dim); font-size: .65rem; line-height: 1.5; }
    .trace-node, .trace-links path, .cue-track b, .destination-anchor { transition: none; }
  }
</style>
