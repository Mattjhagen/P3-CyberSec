# 05 — Authorized Wi-Fi Security Lab

Use this only with access points and clients you own or have explicit authorization to test.

A monitor-mode adapter is excellent for learning how wireless networks actually behave.

## Safe lab layout

Use a spare router or hotspot that is not carrying sensitive traffic.

```text
Kali + Wi-Fi adapter
       |
   test access point
       |
 test phone/laptop
```

Do not practice disruptive techniques on neighboring networks.

## Identify the adapter

```bash
ip link
iw dev
```

Check capabilities:

```bash
iw list
```

Look for monitor-mode support under supported interface modes.

## Passive observation

Capture traffic from your own lab AP with Wireshark or tcpdump.

Useful learning goals:

- identify 802.11 management frames
- distinguish beacon/probe/data traffic
- understand channels and BSSIDs
- observe DNS and TLS metadata
- see why encrypted application traffic is different from open plaintext protocols

## Wireshark exercise

Start Wireshark on the monitor interface and filter:

```text
wlan.fc.type == 0
```

These are management frames.

Try:

```text
wlan.fc.type_subtype == 8
```

to inspect beacon frames.

Document your AP:

- SSID
- BSSID
- channel
- security mode
- supported rates

## Packet-injection verification

If your adapter/driver supports injection, test it only against your isolated lab setup using the driver's normal verification tooling.

The learning objective is simply to confirm that the adapter can transmit crafted 802.11 frames in your own lab; do not use this to interfere with third-party networks.

## Challenge

Configure your spare AP three ways and compare what you can observe:

1. open network
2. WPA2
3. WPA3, if supported

Write down what becomes protected and what metadata remains visible.

Then harden the AP:

- WPA2-AES or WPA3
- strong unique passphrase
- WPS disabled
- current firmware
- guest/device isolation where useful

Breaking the lab is only half the exercise. Finish by making the hardened configuration boring to attack.
