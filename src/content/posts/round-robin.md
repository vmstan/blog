---
title: "Round Robin"
slug: "round-robin"
description: "A quick PowerCLI script to switch every datastore on every host in a vSphere cluster to Round Robin multipathing."
publishedAt: "2013-06-26T16:00:00.000Z"
updatedAt: "2026-09-05T20:13:49.664Z"
author: "Michael Stanclift"
draft: false
featured: false
---

So you want to set your datastores to Round Robin, but you’ve got multiple hosts, dozens of datastores, and very little time? Just fire up PowerCLI and run this script. Replace “VMCluster” with the name of your cluster. This will change the multipathing policy on each datastore, on each host in the cluster.

```powershell
get-cluster “VMCluster” | Get-VMHost | Get-ScsiLun -LunType disk | Where-Object {$_.MultipathPolicy -ne “RoundRobin”} | Set-ScsiLun -MultipathPolicy “RoundRobin”
```

A great overview of Round Robin vs Fixed multipathing, specifically on vSphere 5.1 and EMC storage, and why you should be using it, can be found over at [vElemental](http://velemental.com/2012/09/07/fixedround-robin-in-5-1-and-a-simple-powercli-block-pathing-module/).
