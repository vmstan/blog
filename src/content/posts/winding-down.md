---
title: "Winding Down"
slug: "winding-down"
description: "The final days of the vmst.io Mastodon instance, including what happens when it enters federation self-destruct mode on June 30, 2026."
publishedAt: "2026-06-22T17:58:55.000Z"
updatedAt: "2026-06-22T17:58:55.000Z"
author: "Michael Stanclift"
tags: ["mastodon", "fediverse", "socialmedia", "hosting", "migration"]
draft: false
featured: false
ghostId: "63b78532-e8c6-40d4-a9ba-be49da09ef41"
---

As [previously noticed](/deprecation-notice/), vmst.io will be decommissioned on June 30, 2026.

**Starting at 17:00 UTC (noon central US) the instance will enter [self-destruct](https://docs.joinmastodon.org/admin/tootctl/#self-destruct) mode.** This process will erase vmst.io from the federation by broadcasting account `Delete` activities to all known other servers.

**Users should be advised to make sure their migrations have started before this weekend.** While the majority of account follower transfers happen very quickly, other servers may be slow to respond. Migrations will continue to process until the self-destruct mode begins.

While vmst.io is in self-destruct mode, users may still log in and download their personal account data (posts, media, filters, lists) but no other actions may be performed. **You will not be able to initiate account migrations during the self-destruct process.**

The length of time that vmst.io will be in self-destruct mode is dependent on how long the process takes.
