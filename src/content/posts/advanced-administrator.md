---
title: "Advanced Administrator"
slug: "advanced-administrator"
description: "Reflections on sitting the VMware VCAP5-DCA, an entirely lab-based exam unlike any other in the VMware certification portfolio."
publishedAt: "2014-02-13T16:21:00.000Z"
updatedAt: "2025-10-24T17:52:35.000Z"
author: "Michael Stanclift"
tags: ["vmware", "certification", "career", "datacenter"]
draft: false
featured: false
ghostId: "6c512333-c030-419e-8bab-dfb4c305ad30"
---

On Friday, February 7, I sat for the VMware Certified Advanced Professional, Data Center Administration (VCAP5-DCA) exam. Thinking about how I performed has consumed most of my idle hours, so after some reflection over the last week I've decided to document a bit of my perspective. I'll say as much as I can without breaking NDA. I can't imagine anything listed here isn't something covered in the official exam blueprint or any of the numerous articles or training for the exam.

I actually thought the test was a lot of fun. For the uninitiated, the test is unlike any other exam in the VMware portfolio, and unlike any other exam I've taken for any other certification. It is 100% lab based. You have remote access to a VMware vSphere 5.0 environment, with a vCenter, two hosts, a collection of virtual machines, and pre-provisoned EMC storage.

In other VMware exams, you're given 60–70 multiple choice questions to regurgitate anwsers to. In the VCAP, you are given 26 different "projects" you have work your way though. I say projects because each of the 26 will vary in length and have multiple component problems to solve. Some may be straight foward, some far less so. For example, one question might be something to the effect of:

> Create a Distributed Switch called LabDSwitch and a port group called LabPortGroup that has two uplinks, then assign hosts 1 and 2 to this Distributed Switch.

There would generally be more to it then that, but basically, you're given a roadmap of what to do, what the examiners are looking for is that you know where to go and what processes to follow to do the task so that all of the network connectivity to your environment isn't lost. More on that later.

Something that might be less intutitive may be a problem that states a specific virtual machine is not performing as expected, and directs you to investigate why that would be the case. You're given a target but very little direction from the question as to what to look for or change. You're expected to draw on your own knowledge of VMware best practices and real word experience to correct the issue.

In many cases, the questions are a mix of both. It's a series of complex and interconnected word problems. You're told to do something direct, but with an occasional hint dropped that you may need to read more into what they're saying to be succesful and achieve all the points for that project.

My advice for the future candidates would be to do as much as possible within each section that lets you move on to the next piece, note what you may have missed, and then come back when you have more time (or possibly must complete it to finish other sections of the exam.)

There were a couple of sections where I did struggle, especially for things like Auto Deploy where I've never used it in a production setting so I had very little to draw from. Everything on the blueprint though is fair game and I think nearly all of vSphere got touched in some way during my exam.

The exam itself is 3.5 hours. Normally I test at the Pearson Vue testing center at Johnson County Community College because it's close to my house. I've done enough certification exams in the last three years of being a consultant that I've come to know the ladies who proctor the exams at this site pretty well. (Actually after my CCNA-DC exam last month I stood around and chatted with one of them about her son's upcoming driving test and then a bit about lawn care for over an hour.)

However, the VCAP is what Pearson considers a "Professional" exam, so it must be done at one of their more low-key and higher security sites. Scheduling the exam gives a lot fewer options than your normal tests do. The number of days and timeslots are few and far between compared to a relaitive free for all of 15 minute increments on the normal exams. Arriving at the testing center, the people are friendly but it's all business. While sitting in the waiting room before I was even checked in, I was chastized for checking my iPhone for just a few seconds. Apparently, once you enter their facility, just pretend you're waiting to be interviewed by members the FBI and be on your best behavior.

After running through the process of getting checked in, it was time to test. As soon as you start, you're given a quick survey from VMware about your perceived knowledge about their technologies. I'm not sure it has any bearing on the difficulty of the question you receive in the test, but I doubt it. The survey is off the clock, but as soon as you submit that, the 3.5 hour timer starts. There is some information about the test that you could waste time reading, and I started to until I realized it was all pretty much knowledge gained through training. Looking at the clock and I'd lost three minutes already. Time to get cracking.

You will alternate between windows that show your task lists for each section, and an RDP session that gives you access to your lab environment. You have a vSphere Client, access to the Microsoft RDP application, Putty and Adobe Reader. Opening Adobe Reader will get you access to any of the VMware documentation PDFs that you'd want to reference during the exam. You also have access to command line utilities like PowerCLI and the vMA running within various virtual machines.

I would limit your time looking through the PDF files, unless you're looking for a specific command or advanced option. They are there as a reference, and you really have to know what you're looking for to get anything from them. There is simply no time to waste browsing.

Now, I'm a animated person. If I'm engaged in a project, or a complex troubleshooting session, I'm usually moving around a lot. I might be hitting the whiteboards, walking around the room or down the hall, thinking, grabbing a drink, even talking to myself to walk through steps I'd take to implement a solution. Doing any of that here will get you disqualified and kicked out. This was perhaps the hardest thing for me to do for nearly 4 hours. Sit still, be quiet.

In hindsight as a result of that, I'd wear more comfortable clothes if I had to do this again. Not that my work clothes aren't generally comfortable, but they're not the most comfortable things I own.

Depending on the network connection from the testing center back to the environment of the lab, you may experience some latency. It was not a factor in my ability to complete the exam, but it was frustrating at times waiting for the screen to redraw if I asked too much of it at once. However, I've heard stories from others who have taken this exam outside of the United States where the experience was unbearable. The less time you spend trying to flip back and forth between the questions and the remote session the better off you'll be.

Also remember that everything you do in the lab can potentially impact your ability to complete further problems. If you reboot your vCenter VM, or detach it's network card, or do something that causes your hosts to become unresponsive, you either have to fix it or possibly end the exam right there.

I did have an issue where the function keys on the keyboard wouldn't pass through the RDP session into the VMware console, making my ability to use say F6 impossible. If my score is such that I failed by one point, I'm going to argue on this point, but for now I'm not worried.

In terms of training for the exam, I relied heavily on Jason Nash's video training at [Pluralsight](http://www.pluralsight.com/training) (previously Trainsignal.) Being a vExpert has some perks, and one of them is a free year of access to their video library. They have a lot of great virtualization and data center related topics and it's well worth the cost, even if you subscribe for just a month, if you can't get access for free. I also reviewed the "Unofficial VCAP-DCA Guide" by Jason Langer and Josh Coen. It's [available for free](http://go.veeam.com/vcp-vcap-study-guide-sponsorship.html) through a sponsorship by Veeam.

Overall, if you're a VMware consultant who gets to play with the vSphere product on a regular basis for implementation and troubleshooting, there shouldn't be too much that is so difficult you want to cry. However, I could see where your regular everyday system administrator would struggle unless they're in environments where Enterprise Plus licensing is in place and they're taking advantage of all the features they can. Even then it would be tough. That said, it's probably the case that anyone who is considering going to the VCAP level is probably one of those two things already. SMB administrators probably have a hard enough time getting the expense of the required VCP training paid, and are probably pretty well served by the level of knowledge obtained by it if they obtain it.

Unlike most every other certification exam, when you hit submit on the final problem of the VCAP, instead of the familar "Congratulations" or "Sorry" — you're told you will need to wait up to 15 business days for your results while they're manually tabulated by VMware. My thinking is that it will probably be at the extreme of that timeline or possibly longer considering VMware Partner Exchange is going on and a lot of people are testing this week. Although it could mean more resources dedicated to grading, and I would be at the front of the line.

Either way, it's now just a matter of waiting to see how I did. Out of 500 points a passing score requires at least a 300. I went in with the expectation of needing to run through the test once for the practice, and then taking it again to pass. I won't be disappointed if I don't, but I feel confident enough that I won't be surprised if I do. The day I get my results, if they're not positive I'll be back on the Pearson website scheduling my next exam date.

**Update:** I passed!
