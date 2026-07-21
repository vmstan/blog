---
title: "VCSA Migration"
slug: "vcsa-migration"
description: "My first Windows-to-appliance vCenter migration using the 6.0 U2M tool, including the step upgrades needed to get there from 5.1 GA."
publishedAt: "2016-12-02T20:21:00.000Z"
updatedAt: "2025-07-18T17:16:50.000Z"
author: "Michael Stanclift"
tags: ["vmware", "troubleshooting", "datacenter", "migration"]
draft: false
featured: false
ghostId: "654aaee8-5d65-4045-85e3-b7b69692c68b"
---

Last night I did my first customer migration from a Windows-based vCenter to the VMware vCenter Server Appliance (VCSA) using the new 6.0 U2M utility.

The customer was previously running vCenter 5.1 GA on a Windows Server 2008 R2 based physical HP host. In order to migrate to the VCSA, we first had to do two in-place upgrades of vCenter from 5.1 GA to 5.1 U3, and then from 5.1 U3 to 5.5 U3d. After that, onto the VCSA migration.

Given the length of time the system was running on 5.1 GA code (ouch) and the number of step upgrades required just to get things cleaned up, there was some cause for nervousness.

I admit, even though I’d read up on it, tested it in a lab, and heard other success stories, I still expected my first try to be kind of a mess.

But, it was not. The entire migration process took around 30 minutes and was nearly flawless.

This was my first customer VCSA migration. That utility is really amazeballs. No more old and busted physical Windows vCenter!

I had more issues with the upgrade from 5.1 to 5.5 than anything else during this process. Somewhere during that 5.5 upgrade, the main vCenter component quit communicating with the SSO and inventory service. There were no errors presented during the upgrade, but it resulted in not being able to login at all through the C# client, and numerous errors after eventually logging in as [administrator@vsphere.local](mailto:administrator@vsphere.local) to the Web Client.

I tried to run through the [KB2093876](https://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2093876) workarounds, but was not successful. I ended up needing to uninstall the vCenter Server component, remove the Microsoft ADAM feature from the server, and then reinstall vCenter connected to the previous SQL database. Success.

Given those issues, I was nervous about the migration running into further issues, mostly from the old vCenter.

But again, it worked as advertised.

After the migration, I did notice the customer’s domain authentication wasn’t working using the integrated Active Directory computer account. After adjusting the identity provider to use LDAP, it worked fine. I’ve had this happen randomly enough on fresh VCSA installs to think it's something to do with the customer environment, but I was under the wire to get things back up and felt there was no shame in LDAP.

Great to hear Michael! The Engineers worked really hard to make #migrate2vcsa a breeze. — William Lam

I’ve done too many new deployments of the VCSA since 5.x to count, and at this point was already pretty well convinced there was no reason for most of my customers to deploy new Windows-based vCenters. I’d also done a fair bit of forklift upgrades with old vCenters where we ditch everything to deploy a new VCSA, which isn’t elegant, but it works for my smaller customers that still don’t yet have anything like View, vRA, SRM, integrated backups/replication, etc.

Now I’m confident that any existing vCenter can be successfully migrated.

**Windows vCenters, physical and virtual: I’m coming for you.**
