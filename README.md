# bngr

Use your custom bangs with your search engine of choice.

It allows you to set the default search engine with the url itself.

Idea and some parts were taken from [Theo's unduck](https://github.com/t3dotgg/unduck) and adapted.

## Stack
- ~Bun~ (Bundling with tailwind does not work...)
- Vite
- Tailwind

## What does it do
- Allows you to set the default search engine with the url itself.
- You can add a `|` (pipe operator) in front of the search query to pass it directly to the default search engine.
- Supports most of [DuckDuckGo bangs](https://duckduckgo.com/bangs) and some custom ones (if you need one just open a pr).
- I own it so I get to add / change bangs to my liking.
- Heavy caching to keep loadtimes minimal.
- Using some HTML hacks to run redirects faster.
- (Hopefully) no flashbang when loading.
- Serving as a fun exercise.

## Raycast Extension

You can find the raycast extension here: [bngr search](https://github.com/raphaelluethy/bngr-search).
I will publish it when I have more time.

## Status
[![Netlify Status](https://api.netlify.com/api/v1/badges/4674f8c0-e457-4848-8b6a-f08c84dee299/deploy-status)](https://app.netlify.com/sites/bngr/deploys)
