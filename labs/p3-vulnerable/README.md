# P3 Vulnerable Cyber Range

A deliberately vulnerable, local-only training twin inspired by the real P3 Lending Protocol backend.

**DO NOT DEPLOY THIS APPLICATION TO THE PUBLIC INTERNET.**

It contains intentional vulnerabilities.

## What this lab mirrors

The real P3 backend uses Express/TypeScript and route families for users, loans, admin, payments, withdrawals, KYC/compliance, reputation, risk, developer access and events.

This training range keeps the same financial/lending flavor while replacing all production integrations with fake local data.

## Start

Requirements:

- Docker + Docker Compose, or
- Node.js 20+

### Docker

```bash
cd labs/p3-vulnerable
docker compose up --build
```

Open:

```text
http://127.0.0.1:31337
```

### Node

```bash
npm install
npm start
```

## Test users

| User | Password | Role |
|---|---|---|
| alice@p3.local | alice123 | user |
| bob@p3.local | bob123 | user |
| admin@p3.local | admin123 | admin |

These credentials are intentionally weak and are **training data only**.

## Rules

Only attack this local range or systems you explicitly own.

No real:

- customer data
- Stripe keys
- Supabase keys
- wallet keys
- API tokens
- bank information
- production databases

## Challenge map

The API intentionally contains:

1. information disclosure
2. IDOR / broken object authorization
3. trusting client-supplied balances
4. weak admin authorization
5. weak JWT signing secret
6. forged webhook acceptance
7. reflected XSS
8. user enumeration
9. excessive error detail
10. missing rate limiting
11. sensitive debug endpoint
12. replayable transfers

Flags are returned when you successfully demonstrate a vulnerability.

Try to find them without reading `SOLUTIONS.md`.

## Objective

For each flag:

1. exploit it in the local range
2. explain the root cause
3. fix the code
4. verify your exploit no longer works
5. add a regression test

That is the real exercise.
