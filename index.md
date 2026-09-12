---
layout: default
title: Home
description: "MSCA Doctoral Researcher at University College Cork studying textual relations under transformation."
---

<section class="hero" aria-labelledby="hero-heading">
  <div class="hero-copy">
    <p class="eyebrow">MSCA Doctoral Researcher · University College Cork</p>
    <h1 class="hero-name" id="hero-heading">Rasika<br>Edirisinghe</h1>
    <p class="hero-thesis">Textual relations<br><em>under transformation.</em></p>
    <p class="hero-question">How can relationships between texts be recovered when the words that once made them visible have changed?</p>

    <nav class="hero-links" aria-label="Profile and contact links">
      <a href="mailto:rasika.edirisinghe@ucc.ie">UCC email</a>
      <a href="https://orcid.org/0009-0008-4673-0259" target="_blank" rel="noopener noreferrer">ORCID</a>
      <a href="https://scholar.google.com/citations?user=o_7ZjgMAAAAJ&amp;hl=en" target="_blank" rel="noopener noreferrer">Scholar</a>
      <a href="https://github.com/mrHendrixSL/" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://www.linkedin.com/in/rasikaedirisinghe/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="{{ '/assets/Rasika_Edirisinghe-CV.pdf' | relative_url }}" target="_blank" rel="noopener noreferrer">CV</a>
      <a href="{{ '/blog/' | relative_url }}">Notes</a>
    </nav>
  </div>

  <div class="hero-field">
    <svg class="relation-map" viewBox="0 0 640 500" role="img" aria-labelledby="relation-map-title relation-map-description">
      <title id="relation-map-title">A map of textual relations under transformation</title>
      <desc id="relation-map-description">Quotation, paraphrase, adaptation, obfuscation, and allusion form a connected field around a persistent relation.</desc>
      <defs>
        <linearGradient id="relation-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="currentColor" stop-opacity="0.12"></stop>
          <stop offset="0.52" stop-color="currentColor" stop-opacity="0.7"></stop>
          <stop offset="1" stop-color="currentColor" stop-opacity="0.18"></stop>
        </linearGradient>
      </defs>
      <g class="map-grid">
        <path d="M40 118H600M40 250H600M40 382H600"></path>
        <path d="M126 45V455M320 45V455M514 45V455"></path>
      </g>
      <g class="map-relations">
        <path d="M112 344C176 280 196 140 291 136S425 238 527 166"></path>
        <path d="M112 344C236 404 362 405 532 335"></path>
        <path d="M291 136C330 214 382 267 532 335"></path>
        <path d="M206 253C287 257 381 239 438 271"></path>
      </g>
      <g class="map-trace">
        <path d="M82 344 100 344M123 344H185M218 253H286M302 136H366M450 271H500M544 335H584"></path>
      </g>
      <g class="map-points">
        <circle cx="112" cy="344" r="7"></circle>
        <circle cx="206" cy="253" r="5"></circle>
        <circle cx="291" cy="136" r="7"></circle>
        <circle cx="438" cy="271" r="5"></circle>
        <circle cx="527" cy="166" r="7"></circle>
        <circle cx="532" cy="335" r="7"></circle>
      </g>
      <g class="map-labels">
        <text x="77" y="373">quotation</text>
        <text x="166" y="237">paraphrase</text>
        <text x="253" y="109">adaptation</text>
        <text x="398" y="301">obfuscation</text>
        <text x="497" y="141">allusion</text>
        <text class="map-anchor-label" x="473" y="365">relation persists</text>
      </g>
    </svg>

    <div class="hero-portrait">
      <img src="{{ '/assets/img/headshot-240.jpg' | relative_url }}"
           srcset="{{ '/assets/img/headshot-240.jpg' | relative_url }} 240w, {{ '/assets/img/headshot-480.jpg' | relative_url }} 480w"
           sizes="(max-width: 700px) 84px, 104px"
           width="240" height="240" alt="Portrait of Rasika Edirisinghe" decoding="async" fetchpriority="high">
      <span>UCC · Cork, Ireland</span>
    </div>
  </div>
</section>

<section class="editorial-section about-section" aria-labelledby="about-heading">
  <header class="section-aside">
    <span class="section-number">01</span>
    <p class="section-kicker">Research position</p>
  </header>
  <div class="section-body">
    <h2 id="about-heading">About the work</h2>
    <div class="about-copy">
      <p class="lead-paragraph">I am a doctoral researcher in Computer Science at University College Cork, funded through the <a href="https://www.horizoncascade.net/">CASCADE</a> Horizon Europe Marie Skłodowska-Curie Doctoral Network. My research focuses on the <strong>computational representation and retrieval of textual relations under transformation</strong>, with particular attention to cases in which lexical similarity is weakened or lost through paraphrase, adaptation, obfuscation, allusion, historical variation, and other forms of textual change.</p>

      <p>My current work examines how such relations can be encoded, retrieved, ranked, and evaluated at scale across large textual collections. This includes research on semantic retrieval, parallel-text modelling, relation judgement, benchmark construction, and visual analytics. A central concern is how computational methods can recover evidence of textual relatedness across different degrees and forms of transformation.</p>

      <p>Prior to my doctoral research, I worked for more than four years in data analytics and implementation engineering, developing business intelligence systems, automation pipelines, and real-time analytical platforms.</p>

      <p>From April to July 2026, I completed a research secondment at Nimbus Research Centre, MTU, on the <a href="https://nimbuscentre.ie/project/intrusted/">inTrusted</a> project, investigating grounding and trust in agentic cyber-physical systems. The work examined how conversational AI failures can propagate from language understanding through planning and tool use into physical robotic action.</p>
    </div>
  </div>
</section>

<section class="recent-section" aria-labelledby="recent-heading">
  <header class="recent-header">
    <p class="section-kicker">Field notes</p>
    <h2 id="recent-heading">Recent</h2>
  </header>
  <ol class="news-list">
    <li class="news-item">
      <time class="news-date" datetime="2026-09">Sep 2026</time>
      <p>Presented <a href="https://www.dhi.ac.uk/dhc/2026/paper/320" target="_blank" rel="noopener noreferrer"><em>Evaluating Lexical Extraction in Hiberno-English: Rule-Based and LLM-Assisted Approaches</em></a> at <strong>Digital Humanities Congress 2026</strong>, University of Sheffield.</p>
    </li>
    <li class="news-item">
      <time class="news-date" datetime="2026-08">Aug 2026</time>
      <p>Accepted to participate in the Digital History Autumn School, <em>From Data Acquisition to Data Publication: Quality Control, Tool Assessment, and Methodological Challenges in Digital History</em>, at the <strong>Herder Institute</strong> in Marburg, Germany (28 Sep–2 Oct 2026).</p>
    </li>
    <li class="news-item">
      <time class="news-date" datetime="2026-07">Jul 2026</time>
      <p>Completed a research secondment at <a href="https://nimbuscentre.ie/project/intrusted/" target="_blank" rel="noopener noreferrer">Nimbus Research Centre, MTU</a>, working on grounding and trust in agentic cyber-physical systems within the <strong>inTrusted</strong> project.</p>
    </li>
    <li class="news-item">
      <time class="news-date" datetime="2026-01-28">Jan 2026</time>
      <p>Published and presented the abstract <a href="https://www.horizoncascade.net/wp-content/uploads/sites/42/2026/01/CASCADExMECANO_Convention1_ShortAbstracts-Jan-2026.pdf" target="_blank" rel="noopener noreferrer"><em>Modeling Parallel Text: A Multidimensional Typology of Authorship and Transformation</em></a> at <strong>CASCADE × MECANO Convention 1</strong> on 28 January 2026.</p>
    </li>
    <li class="news-item">
      <time class="news-date" datetime="2025-07">Jul 2025</time>
      <p>Published and presented the conference abstract <a href="https://doi.org/10.5281/zenodo.18340803" target="_blank" rel="noopener noreferrer"><em>Rewriting Tradition: Quantifying Change in Lady Gregory's Irish Legends</em></a> at <strong>DH2025</strong> in Lisbon.</p>
    </li>
  </ol>
</section>

<section class="research-programme" aria-labelledby="programme-heading">
  <header class="programme-header">
    <div>
      <span class="section-number">02</span>
      <p class="section-kicker">Doctoral research architecture</p>
    </div>
    <h2 id="programme-heading">A programme for recovering relation beyond surface similarity</h2>
  </header>

  <div class="programme-spine">
    <article class="programme-step">
      <span class="step-number">01</span>
      <div><p class="step-mode">Representation</p><h3>Representation of Textual Relations</h3><p>Computational representations for textual relations that persist across paraphrase, adaptation, obfuscation, allusion, historical variation, and related forms of transformation.</p></div>
    </article>
    <article class="programme-step">
      <span class="step-number">02</span>
      <div><p class="step-mode">Retrieval</p><h3>Retrieval under Transformation</h3><p>Large-scale retrieval methods for identifying related passages when lexical overlap is weak or absent.</p></div>
    </article>
    <article class="programme-step">
      <span class="step-number">03</span>
      <div><p class="step-mode">Evaluation</p><h3>Relation Judgement &amp; Evaluation</h3><p>Ranking, benchmark construction, and evidence-based judgement of candidate textual relations across different degrees of transformation.</p></div>
    </article>
    <article class="programme-step">
      <span class="step-number">04</span>
      <div><p class="step-mode">Interpretation</p><h3>Visual Analytics for Parallel Text</h3><p>Interactive methods for moving between corpus-scale relation spaces and close reading of individual textual connections.</p></div>
    </article>
  </div>
</section>

<aside class="secondary-strand" aria-labelledby="secondary-heading">
  <div class="secondary-marker" aria-hidden="true"><span></span><span></span><span></span></div>
  <div>
    <p class="section-kicker">Additional research experience · Apr–Jul 2026</p>
    <h2 id="secondary-heading">Grounding and Trust in Agentic Cyber-Physical Systems</h2>
    <p class="secondary-meta">Nimbus Research Centre · Munster Technological University</p>
    <p>Research conducted during the <a href="https://nimbuscentre.ie/project/intrusted/" target="_blank" rel="noopener noreferrer">inTrusted project</a> secondment on how failures in conversational AI can propagate through planning and tool use into physical action.</p>
  </div>
</aside>
