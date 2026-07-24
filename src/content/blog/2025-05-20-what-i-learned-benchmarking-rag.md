---
title: What I learned benchmarking RAG pipelines for a semester
date: 2025-05-20
summary: I spent five months implementing DPR, ColBERT, and SELF-RAG and benchmarking them on MS MARCO. Some of what I believed going in did not survive contact with the data.
tags: rag, llms, retrieval, research
---

For my research study this spring I implemented three retrieval architectures — DPR, ColBERT, and SELF-RAG — and benchmarked them against plain LLM-only generation on MS MARCO. I built the retrieval layer myself (chunking, indexing, embedding search) specifically so I could change one variable at a time.

Here's what actually stuck with me.

## Retrieval quality is the whole game

Everyone talks about hallucination like it's a generation problem. In my benchmarks, most of the garbage output traced back to garbage context. When retrieval surfaced the right passage, even modest models answered well. When it didn't, no amount of prompt engineering saved it. If your RAG system is hallucinating, look at what you're feeding it before you blame the model.

## Chunking strategy matters more than architecture choice

I expected the fancy architectures to dominate. What I found instead: the difference between good and bad chunk overlap settings was often bigger than the difference between retrieval architectures. Bad chunking splits the answer across two chunks, and then nothing downstream can recover it.

## Hybrid search earns its complexity

Pure vector search kept failing on exactly the queries technical users write: exact function names, error codes, version numbers. Embeddings smear those into "semantically similar" neighbors, which is the opposite of what you want when someone searches a specific identifier. Keyword + semantic hybrid search fixed a whole class of failures that vector search alone couldn't touch.

## The boring baseline is mandatory

Benchmarking RAG against LLM-only generation felt like a formality. It wasn't — it's how I caught cases where retrieval actively *hurt*, by injecting plausible-but-wrong context that the model trusted over its own knowledge. If you never run the no-retrieval baseline, you'll never see those.

The full methodology and numbers are in [the paper](/research) if you want the details.
