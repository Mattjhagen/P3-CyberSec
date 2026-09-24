# 04 — Logging, Detection & Monitoring

Security without visibility is guesswork.

## What to log

At minimum record:

- authentication successes/failures
- MFA changes
- password/email changes
- new API keys/tokens
- admin actions
- loan-state changes
- transfer creation/cancellation
- payout destination changes
- permission changes
- webhook failures
- rate-limit events
- unexpected 4xx/5xx spikes

Never log passwords, private keys, full access tokens, or sensitive financial data unnecessarily.

## Ubuntu quick checks

Recent SSH events:

```bash
sudo journalctl -u ssh --since "24 hours ago"
```

Listening services:

```bash
sudo ss -tulpn
```

Recent errors:

```bash
sudo journalctl -p warning --since today
```

## Useful defensive tools

For a home lab, explore:

- Wazuh — endpoint/security monitoring
- Suricata — network IDS/IPS
- Zeek — network telemetry
- Grafana/Loki — log visualization
- Falco — runtime/container detection

Start small. One useful alert is better than 500 noisy ones.

## First P3 alerts

Create high-priority alerts for:

1. admin login from a new source
2. repeated failed authentication
3. privilege changes
4. payout/bank destination changes
5. large or unusual transfer velocity
6. secret-scanner findings
7. new public ports
8. production configuration changes

## Detection challenge

After setting up a lab SSH server, intentionally fail login several times from a machine you own.

Then find the attempts in the logs and document:

- source IP
- username attempted
- timestamp
- whether your alert fired

The win condition is not the failed login. It is proving you can **see** it.
