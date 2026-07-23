---
title: "Local Admin"
slug: "local-admin"
description: "The perennial IT debate over giving users local administrator rights, and the two schools of thought that never quite agree."
publishedAt: "2009-12-08T00:00:00.000Z"
updatedAt: "2026-07-23"
author: "Michael Stanclift"
tags: ["security", "administration", "workplace", "microsoft", "opinion"]
draft: false
featured: false
ghostId: "f4cf03fa-4a2c-439e-acd1-06bf7cc2f90e"
---

A recent email discussion over an educational security listserv got me thinking about the topic of giving users administrator rights to their local machines. This is a common discussion that comes up about once every month or so, whenever someone new joins the group. The discussion usually starts by asking for methods of removing administrator access in environments where rights have already been given, and then nosedives into a long discussion about the ethical and practical reasoning behind it.

There seem to be two schools of thought about all of this.

1. Lock the user out of everything that would prevent malware from being installed or the user installing software they’re not supposed to, at the expense of user frustration and IT time spent approving and installing software requested by users.
   _Basically, the users are stupid and cannot be trusted. IT will have to monitor them._
2. Give the user access to everything and let them install whatever they want, at the expense of user frustration and IT time spent removing software they’re not supposed to have and malware that has been installed as a result.
   _Basically, trust the users and clean up after their messes when they don’t understand what they’re doing._

In an educational setting, specifically in higher education, you have a lot of competing interests. You’re a business, selling a product (education) and have to compete with other businesses (schools) to gain more customers (students)—therefore, security like what you’d have at any enterprise is necessary. However, you have a group of highly educated and often times very ego-centric individuals called faculty that feel they have a right to gain access to anything and everything in order for them to independently do their job without interruption from IT, or having to ask them for assistance. I would imagine it’s something like working with engineers, but in this case 95% of the people have no idea how to use a computer. Last but not least, the university is an ISP, providing Internet access to students and employees on their personal machines. But that’s a topic for a future entry.

The idea that users need administrative access to their computer or that they somehow have a right to it is wrong in my opinion. When I go into my office, I have services provided to me by other departments on campus that I do not have full control over. If I need a light bulb replaced in my office, do I have a key to go do it myself or do I just call Physical Plant and have them come over? Sure it’d be faster and probably easier for plant to just go take care of it myself. Just because you can give someone full access to a machine, and they’re used to it at home, doesn’t mean they should have that access at work.

I have full access to the thermostat at home (well, I take that back… my wife does… I’m just a user there too) but I can’t just go adjusting the HVAC system at work how I want.

We make as much software as possible that we’ve preapproved user-installable through Group Policy Software Deployment and soon through System Center once we have that up and running. Our staff maintains a repository of approved software installs that require us to do it, so when the user cannot do it themselves it only takes us a few minutes. If a user walks up to our support center, we can usually get the software installed on their laptop right away. We’ve given our Help Desk very easy-to-use remote access software and can usually get stuff installed for them within 24 hours, if not as soon as they call in or email.

Does malware still get installed on systems where users lack administrative access? Yes. Which brings me to another point.

You also need to look at the amount of damage that can be done in the time period where a user with administrative access disables anti-virus to install something, or even where the AV client doesn’t detect it and the user isn’t aware enough to see what has happened. A few years ago, the malware was about annoying the user or deleting files, but as it has changed to becoming a security breach where data can be stolen often without the user even seeing they’ve been infected.

My wife works for a multinational accounting services firm, where she and her co-workers have access to information that would probably make any hacker wet their pants with excitement. Yet, they have administrative access to their company issued laptops, since they spend most of their time outside of the corporate office. In one case, she told me where one of her co-workers went weeks with a system she knew was infected with porn-popups, yet was “too busy” to do anything about it, like take it into the office and let IT look at the system. Did she know better? Despite required company IT education and training, probably not. Did my wife? You betcha.

That infection may have been harmless, or just designed to generate traffic to your friendly neighborhood porn site, but would the next one be so lucky? Sure, you may put good AV on systems and monitor them daily, but they can’t catch everything. It seems like we should be fighting to do everything in our power to prevent this from happening, even if it means it’s more difficult for the user and IT. The risk of not doing so outweighs the ease of use.

Do your users have administrative rights? Why or why not?
