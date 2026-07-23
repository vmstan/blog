---
title: "Gravity Sync"
slug: "gravity-sync"
description: "How a quick hack to keep two Pi-hole instances in sync grew into Gravity Sync, a small tool for high-availability Pi-hole setups."
publishedAt: "2020-05-20T19:01:22.000Z"
updatedAt: "2025-07-18T16:43:56.000Z"
author: "Michael Stanclift"
tags: ["networking", "automation", "software", "hosting"]
draft: false
featured: false
ghostId: "26e1f4be-9bb3-4c38-86fa-bd866a1028d9"
---

I just got on the Pi-hole bandwagon a few weeks ago, and boy do I love it. Really, who doesn't love DNS? And what is better than a Pi-hole? Two Pi-holes!

With the release of Pi-hole 5.0, I wanted to rig up a quick and dirty way to accomplish keeping my Pi-hole HA instances in sync, but it has quickly escalated to more than just dirty and has now become a little more elaborate.

Originally I posted the installation documentation on this blog, but as it gained more brain time, I have moved it over to the README file of the GitHub repo where the script now lives.

The script assumes you have one "primary" PH as the place you make all your configuration changes through the Web UI, doing things such as manual whitelisting, adding blocklists, device/group management, and other list settings. The script will pull the configuration of the primary PH to the secondary.

After the script executes, it will copy the gravity.db from the master to any secondary nodes you configure it to run on. In theory, they should be “exact” replicas every 30 minutes (default timing of the cronjob).

If you ever make any blocklist changes to the secondary Pihole, it’ll just overwrite them when the synchronization script kicks off. However, it should not overwrite any settings specific to the configuration of the secondary Pihole such as upstream resolvers, networking, query log, admin passwords, etc. Only the "Gravity" settings that FTLDNS (Pihole) uses to determine what to block and what to allow are carried over.

Generally speaking, I don't foresee any issues with this unless your master Pihole is down for an extended period of time, in which case you can specify that you'd like to "push" the configuration from the secondary back over to the primary node. Only do this if you make list changes during a failover and want them back in production.

Disclaimer: I've tested this on two Piholes running 5.0 GA in HA configuration, not as DHCP servers, on my network. Your mileage may vary. It shouldn't do anything nasty, but if it blows up your Pihole, sorry.

The actual method of overwriting is what the Pihole developers have suggested doing over at /r/pihole, and apparently is safe. It might be a little more aggressive than it needs to be about running every 30 minutes (defined by the crontab setting), but I figure the way I have mine set up the second one isn’t really doing anything other than watching for the HA address to failover, so it shouldn’t disrupt users during the reload. Plus, the database itself isn't that big, and according to the Pihole team, the database file isn’t locked unless you’re making a change to it on the master (it’s just reading) so there shouldn’t be any disruption to the primary to make a remote copy.

I want to note that the initial release (1.0) had no error handling or real logic other than executing exactly what it's told to do. If you set it up exactly it'll just work.

I've since posted 1.1 and higher with some additional arguments and features. If you deployed the script previously, I suggest upgrading and adjusting your crontab to include the "pull" argument.

I've also moved the script to GitHub, which should allow you to keep an updated copy on your system more easily. The script can even update itself if you set it up for that.

Enjoy!
