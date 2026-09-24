# 02 — Ubuntu Host Hardening

Use this for Ubuntu servers supporting P3 or your lab.

## 1. Patch

```bash
sudo apt update
sudo apt upgrade
```

Check whether a reboot is required:

```bash
test -f /var/run/reboot-required && cat /var/run/reboot-required
```

## 2. Inventory listeners

```bash
sudo ss -tulpn
```

For each service ask:

- Who owns it?
- Why is it running?
- Why is it listening on that address?
- Does another machine need access?
- Is it supported/current?

Prefer `127.0.0.1` or a private interface when public binding is unnecessary.

## 3. Firewall

Inspect first:

```bash
sudo ufw status verbose
```

A basic public web host might eventually use:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

Do not alter firewall rules blindly on a remote host. Confirm you have a recovery/admin path before enabling rules.

## 4. SSH

Inspect effective configuration:

```bash
sudo sshd -T
```

Controls worth evaluating:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

Only disable password login after proving key login works in a separate session.

Prefer Tailscale/VPN/private management access over globally exposed SSH where practical.

## 5. Least privilege

Avoid running application services as root.

Users with interactive shells:

```bash
awk -F: '$7 !~ /(nologin|false)$/ {print $1,$7}' /etc/passwd
```

Current sudo access:

```bash
sudo -l
```

## 6. Security updates

Check unattended upgrades:

```bash
systemctl status unattended-upgrades
```

Install if appropriate:

```bash
sudo apt install unattended-upgrades
```

## 7. Fail2ban

For supported public services:

```bash
sudo apt install fail2ban
sudo systemctl enable --now fail2ban
```

Useful layer; not a substitute for eliminating unnecessary exposure.

## 8. Logs

```bash
sudo journalctl -u ssh --since today
sudo journalctl -p warning --since today
```

## 9. Permissions

Never store production credentials in shell history, public repositories, screenshots, README files, or world-readable files.

Check world-writable files inside an app directory:

```bash
find /path/to/app -type f -perm -0002 -print
```

## 10. Backups

For production P3 data:

- encrypt backups
- isolate at least one backup from production credentials
- define retention
- test restoration
- document RPO/RTO

A backup you have never restored is an assumption.

## Challenge — Harden and prove it

1. Run `scripts/p3-host-audit.sh`.
2. Scan the VM from Kali.
3. Pick one unnecessary service.
4. Disable/restrict it safely.
5. Scan again.
6. Save before/after output.

The challenge is complete only when you can explain why the second result is safer.
