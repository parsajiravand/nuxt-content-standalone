---
title: Home
fluid: true
navigation: false
---

:ellipsis{right=0px width=75% blur=150px}

::block-hero
---
cta:
  - Get started
  - /start/getting-started
secondary:
  - Open on GitHub →
  - https://github.com/parsajiravand/nuxt-content-standalone
---

#title
Nuxt Content Stand Docs

#description
Using UseContent Feature **without** Document Driven Development.
Easy to use in your main project.

#extra
  ::list
  - **Don't need to create project for your documentation.**
  - It has a sidebar, table of contents and more features.
  - +50 Components ready to build rich pages
  - Start from a README, scale to a framework documentation
  - Navigation and Table of Contents generation
  - Fully configurable design system
  - Leverages Typography and Elements
  - Used on Content Documentation
  - Powered by Nuxt Content
  - Easy to use in your main project.
  - tailwindcss support

  ::

#support
  ::terminal
  ---
  content:
  - npm i nuxt-content-stand
  - import NuxtContentStand  in nuxt.config.ts
  - 'extends: "nuxt-content-stand"'
  ---
  ::
::

::card-grid
#title
What's included

#root
:ellipsis{left=0px width=40rem top=10rem blur=140px}

#default
  ::card{icon=logos:nuxt-icon}
  #title
  Nuxt Architecture
  #description
  Harness the full power of [Nuxt 3](https://v3.nuxtjs.org) and its [modules](https://modules.nuxtjs.org) ecosystem.
  ::

  ::card{icon=IconNuxtStudio}
  #title
  Nuxt Studio ready
  #description
  Edit your theme content and appearance with live-preview within [Nuxt Studio](https://nuxt.studio).
  ::

  ::card{icon=logos:vue}
  #title
  Vue Components
  #description
  Use built-in components (or your own!) inside your content.
  ::

  ::card{icon=simple-icons:markdown}
  #title
  Write Markdown
  #description
  Enjoy the ease and simplicity of Markdown and discover [MDC syntax](https://content.nuxtjs.org/guide/writing/mdc).
  ::

  ::card{icon=noto:rocket}
  #title
  Deploy anywhere
  #description
  Zero config on [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Choose between static generation, on-demand rendering (Node) or edge-side rendering on [CloudFlare workers](https://workers.cloudflare.com).
  ::

  ::card{icon=noto:puzzle-piece}
  #title
  Extensible.
  #description
  Customize the whole design, or add components using slots - you can make Docus your own.
  ::
::
