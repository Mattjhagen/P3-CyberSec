#!/usr/bin/env bash
set -u

echo "=== P3 Defensive Host Audit ==="
echo "Read-only checks. No configuration will be changed."
echo

echo "## Host"
hostnamectl 2>/dev/null || uname -a
echo

echo "## Current user"
id
echo

echo "## Listening TCP/UDP services"
ss -tulpn 2>/dev/null || true
echo

echo "## Firewall status"
if command -v ufw >/dev/null 2>&1; then
  sudo ufw status verbose 2>/dev/null || ufw status verbose 2>/dev/null || true
else
  echo "ufw not installed"
fi
echo

echo "## Failed systemd units"
systemctl --failed --no-pager 2>/dev/null || true
echo

echo "## Pending package updates"
if command -v apt >/dev/null 2>&1; then
  apt list --upgradable 2>/dev/null | sed -n '1,30p'
fi
echo

echo "## Reboot required?"
if [ -f /var/run/reboot-required ]; then
  cat /var/run/reboot-required
else
  echo "No reboot-required marker found."
fi
echo

echo "## Docker containers"
if command -v docker >/dev/null 2>&1; then
  docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}' 2>/dev/null || true
else
  echo "docker not installed"
fi
echo

echo "## SSH effective settings (selected)"
if command -v sshd >/dev/null 2>&1; then
  sudo sshd -T 2>/dev/null | grep -E '^(permitrootlogin|passwordauthentication|pubkeyauthentication|x11forwarding|maxauthtries) ' || true
else
  echo "sshd not installed"
fi
echo

echo "=== Audit complete ==="
