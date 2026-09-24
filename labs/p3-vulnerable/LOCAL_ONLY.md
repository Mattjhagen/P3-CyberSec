# Keep This Range Local

The vulnerable range binds Docker's host port to:

```text
127.0.0.1:31337
```

That means the Docker-published service is reachable from the host itself, not every interface.

## Verify

On the Ubuntu host:

```bash
ss -lntp | grep 31337
```

Expected host binding:

```text
127.0.0.1:31337
```

Do not change it to:

```text
0.0.0.0:31337
```

unless you have intentionally placed the entire lab on an isolated network.

## Testing from Kali VM

If Kali must reach the target, use an isolated host-only/internal virtual network and change the bind only for that isolated interface.

Do not:

- port-forward it from your router
- create a Cloudflare Tunnel to it
- expose it through Tailscale Funnel
- deploy it to Render/Netlify/Vercel
- put real secrets into it
- connect it to the real P3 database

The range is disposable by design.
