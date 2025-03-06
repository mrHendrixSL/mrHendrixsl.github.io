---
layout: default
title: Rasika Edirisinghe - Blog
permalink: /blog/
---

# 📝 Personal Blog

Welcome to my personal monologue space. Here, I share my thoughts on research, NLP, academia, and life.

## 📌 Latest Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%B %d, %Y" }}
{% endfor %}
