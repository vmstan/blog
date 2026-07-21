---
title: "Little Megabits"
slug: "little-megabits"
description: "1. You really should never use 100mb networking with VMware for much of anything. I’m not even sure 100mb networking has any place in a modern datacenter, except maybe cheap connectivity to…"
publishedAt: "2013-02-01T18:00:00.000Z"
updatedAt: "2026-06-21T16:04:30.000Z"
author: "Michael Stanclift"
tags: ["vmware", "networking", "datacenter", "infrastructure", "opinion"]
draft: false
featured: false
ghostId: "8790011d-248d-48e0-8ec9-6182a5810098"
---

1. You really should never use 100mb networking with VMware for much of anything. I’m not even sure 100mb networking has any place in a modern datacenter, except maybe cheap connectivity to something like an iLO/DRAC.
2. You should avoid using a single vNIC for any vSwitch, unless you just don’t care about things like load balancing or network redundancy.
3. Not seen in the image, but Service Console/Management Network should not be on the same vSwitch as your VM Network port group. Good luck accessing your ESX host when all the bandwidth on your 100mb connection is used up by virtual machine traffic.
4. The particular host in question did not have any vMotion setup, and/because there was no shared storage for the hosts in the “cluster” — term used loosely.
5. Any combination of the above is grounds for removal of virtualization  _privileges._
