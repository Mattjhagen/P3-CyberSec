# 01 — Internet Exposure & Commercial Search Engines

The first question is:

> **What can a stranger on the internet discover about P3 without logging in?**

Commercial internet-search engines continuously index public services.

Examples include:

- Shodan
- Censys
- ZoomEye
- FOFA
- Netlas

They commonly catalog ports, service banners, certificates, HTTP responses, product fingerprints, and related internet-facing metadata.

## 1. Build an asset inventory

List every P3-related asset:

```text
p3lending.space
api.p3lending.space
admin/dev/staging hostnames
public server IPs
Render services
Netlify sites
Supabase endpoints
Cloudflare resources
GitHub repositories
mail providers
monitoring endpoints
```

Do not rely on memory.

## 2. Resolve domains you own

```bash
dig p3lending.space
dig api.p3lending.space
```

or:

```bash
nslookup p3lending.space
```

Record the provider and expected destination.

## 3. Inspect TLS

```bash
openssl s_client -connect p3lending.space:443 -servername p3lending.space </dev/null
```

Review:

- issuer
- expiration
- subject alternative names
- TLS negotiation
- unexpected hostnames

Certificate-transparency databases can reveal old or forgotten subdomains.

## 4. Scan your own public host

From outside the server's local network:

```bash
nmap -Pn -sT -p 22,80,443 YOUR_PUBLIC_IP
```

For a broader but still modest inventory of your own host:

```bash
nmap -Pn -sT --top-ports 100 YOUR_PUBLIC_IP
```

For many web deployments the intended public surface may be only:

```text
80/tcp   redirect to HTTPS
443/tcp  HTTPS
```

Administrative services should preferably use private networking/VPN rather than global exposure.

## 5. Search for yourself

In Shodan/Censys/other asset search tools, start only with assets you own:

- your public IPs
- owned domains
- your certificates/hostnames

Investigate:

- unexpected ports
- stale hosts
- version banners
- forgotten admin panels
- dev/staging systems
- databases
- dashboards
- old TLS certificates

If a search engine can index it, assume attackers can discover it too.

## 6. Local-vs-internet reality check

On the server:

```bash
sudo ss -tulpn
```

From another host:

```bash
nmap -sT -sV YOUR_SERVER_IP
```

Compare both results.

A process listening on `127.0.0.1` is different from one listening on `0.0.0.0`.

## 7. Inspect HTTP headers

```bash
curl -I https://p3lending.space
```

Review appropriate use of:

- Strict-Transport-Security
- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

Do not blindly paste a Content Security Policy; build it around the application.

## 8. Repeat this

Re-run exposure discovery:

- before production launch
- after infrastructure changes
- after opening ports
- after DNS changes
- after hosting migrations
- after security incidents

The lesson:

**You cannot protect something you forgot was exposed.**

## Challenge

Start a harmless service on a disposable Ubuntu VM:

```bash
python3 -m http.server 8000
```

Find it from Kali:

```bash
nmap -sT -sV LAB_IP
```

Then stop it and scan again.

Your first security win is making a port disappear intentionally.
