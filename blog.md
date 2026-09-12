---
layout: default
title: Notes
permalink: /blog/
description: "Occasional notes on research, computational language work, academia, and related topics."
---

# Notes

Occasional notes on research, computational language work, academia, and related topics.

## Latest Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url | relative_url }}) — {{ post.date | date: "%-d %B %Y" }}
{% endfor %}
