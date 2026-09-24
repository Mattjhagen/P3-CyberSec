# P3 CyberSec

A practical defensive-security and hands-on learning playbook for **P3 Lending Protocol**.

This repo is for a solo founder/developer who wants to build security into a financial/crypto platform from day one—and learn by actually breaking disposable lab systems, fixing them, and proving the fix.

## Authorization rule

Use the labs and commands here only on:

- systems you own,
- systems you administer,
- networks you control,
- intentionally vulnerable training targets,
- or systems for which you have explicit authorization.

Never use production customer data or production secrets in a hacking lab.

## Your lab

This course works well with:

- Ubuntu
- Kali Linux
- macOS
- Windows
- Cockpit / VMs
- monitor-mode capable Wi-Fi adapter

## Learning path

1. [Internet Exposure & Search Engines](docs/01-internet-exposure.md)
2. [Ubuntu Host Hardening](docs/02-ubuntu-hardening.md)
3. [P3 Application Security](docs/03-p3-application-security.md)
4. [Logging, Detection & Monitoring](docs/04-monitoring-detection.md)
5. [Authorized Wi-Fi Security Lab](docs/05-wifi-lab.md)
6. [Incident Response](docs/06-incident-response.md)
7. [Hands-On Hacking Challenges](docs/07-hacking-challenges.md)

## Quick start

```bash
git clone https://github.com/Mattjhagen/P3-CyberSec.git
cd P3-CyberSec
chmod +x scripts/p3-host-audit.sh
./scripts/p3-host-audit.sh
```

The audit script is read-only. It checks common exposure and hardening indicators without changing the server.

## The challenge loop

Every hands-on lab follows the same loop:

```text
DISCOVER → BREAK → EXPLAIN → FIX → VERIFY → DETECT
```

That last step matters. A secure system should not only resist abuse; you should know when someone is trying.

## P3 security priorities

For a lending/transfer platform:

1. No secrets in source control
2. MFA/passkeys on critical accounts
3. Admin interfaces are not public by default
4. Only required ports are internet-facing
5. Database access is private/restricted
6. TLS everywhere
7. Least-privilege service accounts
8. Server/application audit logs are retained
9. Dependencies and source are continuously scanned
10. Backups are encrypted and restoration is tested
11. Transaction-changing actions receive stronger controls
12. Authorization is tested for every sensitive object/action
13. Production never doubles as the pentest lab

## Threat model starter

| Asset | Example risk |
|---|---|
| User accounts | account takeover |
| Loan/transfer records | unauthorized modification |
| API/service credentials | theft or misuse |
| Database | data theft or alteration |
| Admin panel | privilege escalation |
| Cloud account | infrastructure takeover |
| GitHub | malicious code insertion |
| CI/CD | poisoned build/deployment |
| Backups | ransomware/data destruction |
| Webhooks | forged transaction state |
| Sessions | replay or theft |

## Rule of thumb

If an interface does not need to be public, **do not solve that with a password alone**. Remove it from the public internet and place it behind private networking, VPN, or identity-aware access.

## First milestone

Before advanced pentesting:

- [ ] inventory every P3 service
- [ ] identify every public IP/domain
- [ ] record every open port
- [ ] verify firewall policy
- [ ] rotate exposed or old credentials
- [ ] enable MFA/passkeys on critical accounts
- [ ] scan code and dependencies
- [ ] centralize security-relevant logs
- [ ] create tested backups
- [ ] document incident response
- [ ] finish the beginner challenge set

Then move into controlled adversarial testing.
