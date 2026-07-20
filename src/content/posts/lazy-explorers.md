---
title: "Lazy Explorers"
slug: "lazy-explorers"
description: "The number of businesses still using Internet Explorer 6 is painful to see. Coupled with the fact that all of them are on Windows XP or Windows 2000, it turns from pain into terror,…"
publishedAt: "2010-01-16T00:00:00.000Z"
updatedAt: "2026-06-20T16:59:22.000Z"
author: "Michael Stanclift"
tags: []
draft: false
featured: false
ghostId: "6ac03945-caa5-4b76-b549-5d55b92dfab2"
---

The number of businesses still using Internet Explorer 6 is painful to see. Coupled with the fact that all of them are on Windows XP or Windows 2000, it turns from pain into terror, especially when it comes to security.

For a lot of system administrators, the reasons to stay outweigh the reasons to upgrade. Websites that break, plugins that won’t load, old software that isn’t updated anymore. Trust me, I’ve been there. However, a lot of it boils down to lazy and poor practices of system administration.

Yes, you’re lazy and you’re bad at your job. Internet Explorer 6 was released in 2001. Yes, 2001, most of us don’t even drive cars that old, let alone unleash people on the “information superhighway” with a browser that old. It was designed at a time when security was not the issue it is today. It was designed to work on operating systems like **Windows 98 and Windows ME.** Would you let people use Windows ME on your network? No! So why are you letting them use a browser that was built for it?!

“But it’s not our fault, we don’t write the bad software, or the non-compliant websites.”

You’re right, you don’t. But you have the responsibility and the power to keep your network, and the rest of the Internet safe.

The replacement for IE6 has been out now for just under 4 years. Actually, the replacement for it’s replacement has been out almost a year. Meaning all you lazy administrators had **two chances** to migrate your systems over to an updated browser. Yes, you’re lazy. If you have applications that “require” Internet Explorer 6, the decision should have been made to dump them or upgrade them long ago. A line in the sand should have been drawn that said you were not willing to support such an old and insecure piece of software.

Why is this such a big deal? Because security threats targeting users of Internet Explorer 6 continue to threaten the security of the Internet, and of your own network. Just this week, Microsoft admitted that IE6 was one of the vectors used to attack companies like Google. Why is Google still using Internet Explorer 6? Or I guess a better question is, why is Google even using Internet Explorer at all, when they develop Chrome? Either way, it’s disappointing to see that a company like Google, who tends to be on the bleeding edge of updates, is doing something stupid like running a almost decade old browser.

The most recent threat, has no effect on users of Internet Explorer 7 or 8, even on Windows XP. Actually, Jonathan Ness over at [MSRC Engineering](http://blogs.technet.com/srd/archive/2010/01/15/assessing-risk-of-ie-0day-vulnerability.aspx) put together a nice little chart explaining what browsers and operating systems are at risk with the latest attack vector.

The short of it, if you’re still running Windows 2000 on workstations, you should be fired. If you’re running Windows XP and Internet Explorer 6, you should march into your CIO’s office on Monday and demand that you _at least_ figure out how to migrate to Internet Explorer 7 ASAP, meanwhile worry that your network isn’t the next one to be attacked by these unpatched exploits. If you’re running Internet Explorer 7, you should turn DEP on to prevent future threats, or see if migrating to Internet Explorer 8 is possible.

But really, for the small group who has already migrated to Windows Vista or Windows 7, enjoy your weekend.

To all my fellow sysadmins out there: **Stop being lazy, and start securing your networks.**
