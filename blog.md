---
layout: default
title: Notes
permalink: /blog/
description: "Occasional notes on research, computational language work, academia, and related topics."
---

# Notes

<p class="page-deck">Occasional essays and reflections on research, computational language work, academia, and the stranger edges of meaning.</p>

<div class="notes-index">
{% for post in site.posts %}
  <article class="note-entry">
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%d.%m.%Y" }}</time>
    <div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      {% if post.description %}<p>{{ post.description }}</p>{% endif %}
    </div>
    <span aria-hidden="true">↗</span>
  </article>
{% endfor %}
</div>
