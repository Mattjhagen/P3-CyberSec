# 07 — P3 Hacking Challenges

This is the dopamine section.

Every challenge should be run against an intentionally vulnerable local target, a disposable VM/container, or infrastructure you explicitly own.

The rule is:

> **Break it → explain why it broke → fix it → prove the fix works.**

## Challenge board

| Level | Challenge | Goal |
|---|---|---|
| 1 | Find My Ports | identify unnecessary exposure |
| 1 | Banner Hunter | identify version leakage |
| 1 | Secret Hunter | detect a committed fake secret |
| 2 | Broken Access Control | access another lab user's object |
| 2 | SQL Injection Lab | exploit then parameterize |
| 2 | XSS Lab | trigger then eliminate unsafe rendering |
| 2 | Session Lab | identify weak session behavior |
| 3 | Juice Shop | complete OWASP challenges |
| 3 | WebGoat | work through guided web vulns |
| 3 | DVWA | practice classic web vulnerabilities |
| 3 | Detection Duel | attack your lab, detect yourself |
| 4 | P3 Mini Red Team | attack a disposable P3-like stack |

---

# Challenge 1 — Find My Ports

On an Ubuntu VM you own, start a couple of harmless temporary services.

Example:

```bash
python3 -m http.server 8000
```

From Kali:

```bash
nmap -sT -sV <LAB_IP>
```

### Win condition

Identify:

- each listening port
- owning service
- whether it needs network exposure

Then stop the unnecessary service or firewall it.

Run the scan again. Your second scan should prove the attack surface shrank.

---

# Challenge 2 — Banner Hunter

Run:

```bash
curl -I http://<LAB_IP>:8000
nmap -sV <LAB_IP>
```

### Goal

Find information that helps fingerprint the service.

### Fix

Reduce unnecessary version/header disclosure where your stack supports it, then retest.

---

# Challenge 3 — Secret Hunter

Create a **fake** credential in a disposable branch:

```text
STRIPE_SECRET_KEY=sk_test_FAKE_P3_TRAINING_ONLY
```

Use a secret scanner such as Gitleaks or GitHub secret scanning.

### Win condition

The scanner catches it.

Delete the fake secret and verify the scanner goes clean.

Never use a real credential for this challenge.

---

# Challenge 4 — OWASP Juice Shop

OWASP Juice Shop is an intentionally vulnerable web application designed for security training.

Run it locally with Docker:

```bash
docker run --rm -p 3000:3000 bkimminich/juice-shop
```

Then browse:

```text
http://127.0.0.1:3000
```

Start with beginner challenges around:

- information disclosure
- broken access control
- input validation
- authentication
- XSS

### Rule

Keep the container bound to localhost unless you specifically need another lab machine to reach it.

### Win condition

Complete a challenge, write down:

1. vulnerability class
2. root cause
3. exploit path
4. defensive control
5. how you would test that control in P3

---

# Challenge 5 — WebGoat

WebGoat provides guided lessons for common web vulnerabilities.

Use the project's official container/instructions and expose it only inside your lab.

Good modules for P3:

- authentication
- access control
- SQL injection
- JWT
- insecure direct object references
- request forgery

The important part is translating every lesson into a P3 test case.

---

# Challenge 6 — DVWA

Damn Vulnerable Web Application is useful for seeing the same bug at different security levels.

Focus on:

- SQL injection
- command injection
- XSS
- CSRF
- file upload

### Win condition

Exploit the vulnerable setting, then inspect the hardened setting and explain exactly what changed.

---

# Challenge 7 — Detection Duel

This one is especially valuable.

1. Put an Ubuntu VM behind your lab network.
2. Enable logging.
3. From Kali, scan it.
4. Attempt several failed SSH logins using accounts you own.
5. Generate unusual HTTP requests against your local test app.
6. Find your own activity in logs.

### Score

- 1 point: detect the source IP
- 1 point: identify the destination port
- 1 point: identify timestamp
- 1 point: identify username/path
- 2 points: alert automatically
- 3 points: block or contain without breaking legitimate traffic

---

# Challenge 8 — Broken Object Authorization

Build a tiny lab API with two fake users:

```text
Alice -> loan 1001
Bob   -> loan 1002
```

Alice requests:

```text
GET /loans/1001
```

Now change only the ID to 1002.

### Vulnerable result

Alice receives Bob's object.

### Correct result

```text
403 Forbidden
```

or a non-disclosing equivalent.

### P3 lesson

Never authorize based only on possession of an object ID.

---

# Challenge 9 — Local SQL Injection Lab

Use Juice Shop, WebGoat, DVWA, or another intentionally vulnerable local app rather than attacking a real site.

### Learning objective

Understand the difference between unsafe SQL string construction and parameterized queries.

Unsafe concept:

```text
"SELECT * FROM users WHERE email = '" + input + "'"
```

Safer concept:

```text
SELECT * FROM users WHERE email = ?
```

with the value supplied separately by the database library.

### Win condition

Demonstrate the vulnerability in the lab, fix/raise the security control, and show the same malicious input no longer changes query structure.

---

# Challenge 10 — P3 Mini Red Team

Once the earlier labs feel comfortable, build a disposable P3-like environment containing:

- web frontend
- API
- Postgres
- two test users
- fake balances
- fake loan objects
- admin role
- fake webhook endpoint

Do **not** use production credentials or real customer data.

Try to answer:

- can user A access user B's loan?
- can a user alter a balance?
- can a webhook be forged?
- can a normal user call an admin route?
- do rate limits work?
- can you replay a transaction?
- does a password reset invalidate old sessions?
- are secrets visible client-side?
- is the database reachable directly?

This becomes the rehearsal environment for P3 security testing.

---

# Recommended progression

Do not chase exotic exploits first.

The highest-value order for P3 is:

```text
asset exposure
    ↓
authentication
    ↓
authorization
    ↓
secrets
    ↓
transaction integrity
    ↓
injection/input validation
    ↓
logging/detection
    ↓
infrastructure hardening
```

Fancy hacking is fun.

Finding that one ordinary authorization bug before production is far more valuable.
