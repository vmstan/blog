---
title: "View Borked"
slug: "view-borked"
description: "I’ve been on a View 5.1 deployment with a customer all week, and part of the project involved deploying VMware vCenter Operations Manager (vCOPS) for View, version 1.01. I’ve done this a…"
publishedAt: "2013-01-18T18:00:00.000Z"
updatedAt: "2026-06-21T16:01:41.000Z"
author: "Michael Stanclift"
tags: ["vmware", "desktop", "troubleshooting", "software"]
draft: false
featured: false
ghostId: "576d644e-8cfe-4a84-9fa3-2069d751a976"
---

I’ve been on a View 5.1 deployment with a customer all week, and part of the project involved deploying VMware vCenter Operations Manager (vCOPS) for View, version 1.01. I’ve done this a couple times before, and had no issues getting the Linux OVA base vApp configured. Then when I went to install the View adapter into a Windows VM, I got a strange message about how this installer was a 32-bit application and not able to run on a 64-bit system.

Two things wrong with this:

1. Normally 32-bit apps run on 64-bit operating systems, unless they’re specifically configured not to.
2. vCOPS for View is a 64-bit application, with a 64-bit installer. The system requirements state it can only run on Windows 2008 R2 or Windows 2003 R2 64-bit.

After playing around with the 1.01 installer, and attempting to download and start the installer for 1.0 just fine on the same system, I notice that the published file size on VMware.com is 22MB, but the 1.01 installer I was downloading was only 16MB. I ran an MD5 checksum on this file and it didn’t match the published checksum on the website either. The file creation date shows sometime in late December, while the published file date is somewhere in early October.

Eventually I was able to find a copy of a previously used 1.01 installer on another system, ran a checksum on it, and it matched the published checksum. Installed the adapter using this file and it worked just fine. Customer vCOPS environment is up and running.

I have a support case in with VMware right now letting them know about this issue, hopefully they get it corrected soon. I realize it’s not a particularly popular product compared to something like vSphere or even a View Connection Broker, but it’s hard to see how this could have gone on for a while (nearly a month) without someone else noticing?

**TL;DR** vCOPS for View 1.01 installer on vmware.com is screwed up, I’m working with VMware to get it fixed.
