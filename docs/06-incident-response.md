# 06 — Incident Response

When something looks wrong, speed matters less than preserving evidence and avoiding panic-driven changes.

## First-response checklist

1. record what you observed
2. note timestamps and affected accounts/systems
3. preserve relevant logs
4. contain access where necessary
5. rotate compromised credentials
6. identify the initial access path
7. determine what data/actions were affected
8. patch the root cause
9. monitor for recurrence
10. document lessons and controls

## Do not immediately destroy evidence

Before rebuilding a compromised lab/host, preserve useful artifacts when practical:

```bash
date -Is
who
w
last
sudo ss -tulpn
ps aux
sudo journalctl --since "24 hours ago"
```

Store outputs somewhere separate and trusted.

## Credential compromise

If a production secret leaks:

- revoke/rotate it
- search logs for use of the old credential
- identify where it was exposed
- remove it from code/history where appropriate
- rotate dependent credentials when needed

Deleting a secret from the latest Git commit does not make an already-published secret safe.

## P3 incident drills

Practice these scenarios in the lab:

- leaked API token
- compromised developer laptop
- malicious dependency
- public database/admin interface
- stolen user session
- unexpected privileged transaction

For each scenario, answer:

**detect → contain → eradicate → recover → prevent recurrence**
