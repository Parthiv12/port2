---
title: Lessons from putting a filesystem on top of S3
date: 2025-12-15
summary: For my OS course I built a FUSE3 filesystem in C++ that mounts S3 locally and encrypts everything before upload. POSIX and object storage disagree about almost everything.
tags: systems, fuse, c++, security
---

My operating systems project this semester was a FUSE3 filesystem in C++ that makes an AWS S3 bucket behave like a local directory — with AES encryption applied before anything leaves the machine, so S3 only ever stores ciphertext. It sounds like a plumbing exercise. It was actually a crash course in how much the kernel normally does for you.

## POSIX and S3 are different religions

`read()` and `write()` think in offsets and partial updates. S3 thinks in whole immutable objects over REST. There is no "write 4KB at offset 1MB" in S3 — you rewrite the object. Every POSIX operation FUSE hands you has to be translated into that world, and the translation is where all the design decisions live: what do you cache, when do you flush, what does `fsync` even mean here.

## The file descriptor cache was the key insight

Encrypting "before upload" sounds simple until you ask *where exactly* in the write path that happens. My answer was to intercept the file descriptor cache and insert the encryption step right before data hit the network — writes stay fast and local until the file actually needs to be persisted, then it's encrypted in one pass on the way out. Getting that hook right was the single most important decision in the project.

## Integrity checking is not optional

Once your storage is remote and encrypted, "the read succeeded" tells you almost nothing. I added a SHA-256 hashing pipeline so every object gets verified on the way back in — a corrupted or tampered object fails loudly instead of decrypting into silent garbage. The first time it caught a mismatch during testing, it paid for itself.

## Partial writes are evil

The bug that ate the most hours: assuming a `write()` call maps to one complete logical update. It doesn't. The kernel splits writes, applications write files in weird orders, and your encryption chunking has to survive all of it. If I did it again, I'd design the chunk boundaries first and the happy path second.
