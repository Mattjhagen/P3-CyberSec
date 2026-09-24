# 03 — P3 Application Security

P3 moves money and evaluates lending relationships. That raises the security bar substantially compared with a normal brochure site.

## Core principle

Treat every client—web, Android, iOS, CLI—as **untrusted**. Authorization must be enforced server-side.

## 1. Authentication

Require strong authentication, secure recovery, MFA for administrators, rate limits, session expiration, and session visibility where practical.

Never allow a client to decide its own privilege level.

## 2. Authorization

For every object request such as:

```text
GET /loans/78321
```

the API must verify that the authenticated user may access **that exact object**.

Do not rely on unpredictable IDs. Test for BOLA/IDOR issues using isolated test accounts you own.

## 3. Transaction integrity

For transfers and loan-state changes consider:

- re-authentication for sensitive actions
- short-lived transaction authorization
- idempotency keys
- replay protection
- immutable audit events
- server-side amount/fee calculations
- velocity limits
- anomaly alerts

Never let the client be the source of truth for balances.

## 4. Secrets

Never commit live secrets. This includes database service keys, Stripe secrets, signing keys, SMTP credentials, Supabase service-role keys, Twilio credentials, cloud tokens, and wallet private material.

Use managed environment variables or a secret manager.

```gitignore
.env
.env.*
!.env.example
```

## 5. GitHub security

Your GitHub identity is part of the production perimeter.

Enable:

- MFA/passkeys
- branch protection
- required CI checks
- secret scanning
- dependency alerts
- minimal third-party app permissions

## 6. Dependencies and static analysis

Node:

```bash
npm audit
npm outdated
```

Useful automated layers:

- CodeQL
- Semgrep
- dependency scanning
- secret scanning
- language-specific linters

Scanners reduce risk; they do not prove security.

## 7. Supabase/Postgres

- use Row Level Security where appropriate
- keep service-role credentials server-side
- test policies with multiple users
- separate admin/service/end-user privileges
- restrict direct database access
- log privileged operations

A public client must never receive a service-role key.

## 8. Payments

Verify webhook signatures server-side. Never trust amounts or payment state sent by the client. Prefer provider-issued identifiers and server-to-server verification.

## 9. API basics

For production APIs:

- validate input
- parameterize SQL
- enforce authz on every sensitive route
- rate-limit high-risk endpoints
- return minimal error detail
- use TLS only
- constrain CORS
- set body-size limits
- protect file uploads
- log security-relevant events without logging secrets

## 10. Abuse cases to model

Ask:

- Can Alice read Bob's loan?
- Can Alice modify Bob's payment destination?
- Can a user replay a transfer?
- Can a client change its own balance?
- Can a leaked user token become admin?
- Can a stale session survive a password reset?
- Can an attacker enumerate users?
- Can a webhook be forged?

Each one should eventually become an automated test.
