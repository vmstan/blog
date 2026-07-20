---
title: "Round Robin"
slug: "round-robin"
description: "So you want to set your datastores to Round Robin, but you’ve got multiple hosts, dozens of datastores, and very little time? Just fire up PowerCLI and run this script. Replace “VMCluster”…"
publishedAt: "2013-06-26T16:00:00.000Z"
updatedAt: "2026-06-20T19:43:46.000Z"
author: "Michael Stanclift"
tags: []
draft: false
featured: false
ghostId: "86a68fb8-ac27-4146-b43d-a99df179bd53"
---

So you want to set your datastores to Round Robin, but you’ve got multiple hosts, dozens of datastores, and very little time? Just fire up PowerCLI and run this script. Replace “VMCluster” with the name of your cluster. This will change the multi pathing policy on each datastore, on each host in the cluster.

```powershell
get-cluster “VMCluster” | Get-VMHost | Get-ScsiLun -LunType disk | Where-Object {$_.MultipathPolicy -ne “RoundRobin”} | Set-ScsiLun -MultipathPolicy “RoundRobin”
```

A great overview of Round Robin vs Fixed multipathing, specifically on vSphere 5.1 and EMC storage, and why you should be using it, can be found over at [vElemental](http://velemental.com/2012/09/07/fixedround-robin-in-5-1-and-a-simple-powercli-block-pathing-module/).
