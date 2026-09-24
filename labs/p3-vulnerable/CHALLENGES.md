# P3 Range Challenges

Try these without opening `SOLUTIONS.md`.

## Level 1 — Recon

### 1. Oversharing health endpoint

Find a public endpoint that reveals implementation details.

**Flag format:** `FLAG{...}`

### 2. Account enumeration

Determine whether an account exists without knowing its password.

Then log in using one of the intentionally weak lab accounts.

---

## Level 2 — Broken authorization

### 3. Alice reads Bob's loan

Authenticate as Alice.

Find Alice's loan, then determine whether changing an object identifier exposes Bob's.

### 4. Rewrite a balance

Can an ordinary user change a balance the server should control?

Try both the authenticated user's ID and someone else's.

### 5. Become "admin" without becoming admin

Authenticate as Alice.

Can you influence authorization using information entirely controlled by the HTTP client?

---

## Level 3 — Transaction integrity

### 6. Forge a payment event

Find the payment webhook.

Can you submit a fake payment event without proving it came from the payment provider?

### 7. Replay a transfer

Create a transfer with a client-defined transfer identifier.

Send the identical request twice.

Does the API execute it twice?

---

## Level 4 — Web/API abuse

### 8. Reflected XSS

Find a search endpoint that places user input directly into HTML.

Demonstrate the bug locally.

### 9. Debug disclosure

Find a debug endpoint exposing configuration information.

Identify which disclosed values would be catastrophic if they were real.

### 10. Guessing without friction

Find a short PIN endpoint.

Determine whether the API imposes any meaningful attempt limit.

Do this only against this local range.

### 11. Verbose error handling

Trigger an application error and inspect the response.

What information belongs in server logs rather than client responses?

---

# Boss exercise — harden the range

Once you have the flags, fork your local working tree into a `hardened` branch.

Fix:

- object-level authorization
- role authorization
- balance ownership/source of truth
- webhook verification
- idempotency
- XSS encoding
- debug endpoints
- login enumeration
- rate limiting
- error responses
- JWT secret handling

Then attack it again.

The second round is the important one.
