---
title: What breaks when you build distributed tracing yourself
date: 2026-04-10
summary: Building TraceLens taught me that the hard part of tracing isn't collecting spans — it's stitching them back together when services disagree about time and causality.
tags: tracing, observability, backend
---

I've been building [TraceLens](/projects/tracelens), a distributed tracing platform that ingests OpenTelemetry spans and reconstructs full request paths across microservices. Going in, I assumed the hard part would be volume. It wasn't. The hard part is that the data lies to you in small, structural ways.

## Clock skew ruins naive timelines

Spans carry timestamps from the machine that emitted them, and machines disagree about what time it is. Sort spans by timestamp across services and you'll produce timelines where the response arrives before the request was sent. You can't fully fix this — you have to build the request path from parent/child span relationships and treat timestamps as decoration, not ground truth.

## Async boundaries break parent/child linking

Synchronous HTTP calls propagate trace context cleanly. The moment a request crosses a queue or fires an event, the context either gets dropped or the "parent" span has long since finished by the time the consumer starts. Reconstructing causality across those boundaries is where most of my pipeline complexity lives — it's graph stitching, not log parsing.

## Instrumentation overhead is a real tax

Span generation isn't free, and the places you most want visibility — hot paths — are exactly the places where per-request overhead hurts most. That constraint shaped the whole ingestion design: do as little as possible at collection time, and push the expensive reconstruction work into the backend where it doesn't slow anyone's request down.

## Tracing a real app instead of a toy

I run TraceLens against a demo storefront so the traces come from actual HTTP traffic — checkouts, product lookups, cache misses. Every one of the problems above showed up within days of pointing it at real traffic, and none of them showed up in my synthetic tests. If you're building observability tooling, get real traffic flowing through it as early as you can.
