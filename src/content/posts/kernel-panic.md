---
title: "Kernel Panic"
slug: "kernel-panic"
description: "A personal essay, two years in the making, about the day my mind ran out of resources and threw a kernel panic."
publishedAt: "2019-04-19T21:00:00.000Z"
updatedAt: "2025-10-24T17:19:23.000Z"
author: "Michael Stanclift"
tags: ["mentalhealth", "personal", "workplace", "career"]
draft: false
featured: false
ghostId: "01f8f79c-7f7b-412d-ac5f-b19e09b9d924"
---

I’ve been thinking for over two years about how to talk about this, how to talk about the day I couldn’t process anymore. The day where my bullshit buffers overflowed. The day of my internal kernel panic. When starved for resources, my brain finally threw up a PSOD, and quit.

```
vmstan 1.0 build 11091983
PCPU 0 locked up. Failed to ack.
frame=4C lbs=E1 age=21
VMK uptime: 9:15:33:45.014
No coredump target configured
```

If there were some predictive analytics running on me back then, it would have been evident that this was coming for a long time. Unbeknownst to anyone else, I knew that I couldn’t keep up and that I couldn’t go on forever in my degraded state. The warning signs were all there, but no one was reading the logs.

The root cause analysis would tell you: lousy code embedded on possibly flawed hardware. No permanent fix, but mitigations are available.

I have anxiety.

My crash that day was in part because I was pretending there wasn’t a problem. For years I would think to myself, “I should go to a therapist,” but you’d never catch me saying the words out loud to anyone. It was the result of repressing emotions for years, the consequence of not wanting to admit to anyone else that I could have a problem.

I was an anxious child. Even as far back as eight years old, I remember spending a lot of time in a state of worry, thinking about whether my family had enough money or fearing what would happen at school. It was around this time that I started to get bullied—teased continuously about how skinny I was, or about how I didn’t have an issue hanging out with girls on the playground. I had a “friend” who lived up the street, who’d do things like sucker-punch me in the stomach. I was, from an early age, an attractive target for people who wanted to make themselves feel better at my expense.

Getting to junior high school, around age 12, was a chance to reset. While the peer bullies didn’t completely disappear, I found a group of like-minded friends with a common interest. I immediately got involved with our school’s nascent computer club, and we did at the time what seemed crazy for a bunch of 12-year-olds in 1996 — we made a website for our school that won a grant from Microsoft for $20,000.

The grant enabled our club to purchase a 16-system Windows NT lab for our school. The members of the club built and ran the lab, and for nearly three years this was the real focus of my school day. The librarians would pull me out of class anytime there was an issue, of which there were many.

I was 13 and trying to manage NT security policies without any training, without Google to fall back on. What could go wrong?

My final year there, the advisors put an incredible amount of stress on me to keep the lab running. One of them was working on getting more technology-related grants for the school and district. They had to show off our lab, my lab, as a way they were using the new technology to benefit the educational process in the school. Their efforts were complicated when the lab didn’t work.

If I couldn’t do the job, they were going to let someone else handle it, or worse, give it to the school district IT department to manage. I took an immense amount of personal pride in this project, and while in hindsight I shouldn’t have been the only one responsible, at the time I felt a lot of ownership for it.

It all came to a head when I walked into a club meeting, to a sign posted by the adult sponsor that said: “fix the lab, or else.” — In front of the entire club I went on an angry tirade, but not in front of the sponsors who were, in that moment, hiding somewhere far away. Whatever the issues with the lab were, whatever their reasoning, it didn’t necessitate the behavior that was targeted at me by an adult. The damage to my psyche was there. Soon after my mother finally found out what was going on, and went all Momma Grizzly on them, they backed off.

I’d had my first moment of IT burnout.

I spent my high school years in the jazz and marching bands. I became the editor of my high school newspaper. Instead of the club, I’d organize LAN parties for my friends, and I had a side project that involved running a dedicated server for web hosting, with around 30 clients.

After working in retail while sporadically attending college, I landed my first real IT role working as a network analyst for a private university. I had supportive management who in hindsight let me do all kinds of crazy things. We didn’t have the money to hire professional services, so we implemented our own ESX clusters in 2007. Storage, backups, security, data center networking, campus wireless, we did it all.

I got to touch everything in the environment, and sometimes do things that would blow it up.

It was there that I would spearhead a virtual desktop project that ended up gaining notoriety, with case studies and awards. I was busy but incredibly proud of the work that I was doing. I found my job stressful but very satisfying. There were some personalities, like any place, but it was fulfilling. When I have dreams about going back to work at an old employer, this is the place. However, the pay was lacking and I was newly married and planning on starting a family.

In 2010, I started working for a software company which at the time was “the company” to work for in the area … and I was pretty miserable for the first few months.

In almost every way, the new company was a great place to be with more money and better benefits. It was a goal of mine to work for them for a long time. I intentionally bought my first house in proximity to their building and within a year had a job there as a systems administrator. The company had a lot of great people working for them, and it was a very relaxed workplace with lots of new technology coming in the door every month. We even had a regulation-sized dodgeball court down the hall from the data center. There was a slide between floors. And yet, I was uncomfortable.

As strange as this sounds, I missed my VDI environment.

Eventually, I started finding fulfillment in the new projects that I was assigned. I needed to show my new coworkers that I was worthy of sitting alongside them. I’m probably always harder on myself than others are on me, in this respect.

Very quickly, I started building some great relationships with my coworkers there, but my time in the role would be short-lived. The company was acquired, and it became apparent that the new owners were not interested in being in the IT business. Outsourcing firms did the hands-on administration in their corporate environment, and as a result, all our jobs were now in jeopardy.

Nothing bonds a small group of coworkers together like knowing upper management is out to get you. My direct manager did his best to shield us from this, and to set us up in positions that wouldn’t be as impacted, but he could only do so much and in the end, for his sanity, left to take an architecture role with a VAR. He was a big part of that team being successful, and we all wanted to follow him, and continue working with each other, so by the end of 2011, one-by-one we all got engineering roles at the same VAR.

“Value Added Reseller”

Now, if you’ve never worked for a VAR, I would suggest listening to the Datanauts podcast from April of last year, to help get an understanding of what VAR-life is. Being a post-sales engineer, you’re an essential part of the “value” the customer is purchasing. Initially, it took a lot of work to adjust to this life. At first, I thought it was because I missed having ownership of my infrastructure. For the first couple of years before walking into a client I’d never dealt with before, I’d sit in my car in a state of severe anxiety. Mostly afraid that customer would be the one to unmask me as a massive fraud. After repeatedly not being discovered, I decided my secret was safe.

But in hindsight I was never happy. I might have acted that way to customers and coworkers that I interacted with on projects, but inside there was something else growing.

I never felt like I belonged as an employee of the company. Other than the people I’d come into the job with from the previous employer, in many ways I felt out of place among my coworkers. I worked there, but I didn’t feel like I belonged there. Not to say I despised everyone I worked with, far from it. I was friendly with most everyone I worked with and spent my 4 o’clock hour on the phone daily with a couple of them to commiserate on the events of the day. But, not to dwell on the details, sometimes standards for professionalism and etiquette were not always in lockstep with the rest of the organization.

After a few years of toiling through grunt work, there were a few key technologies that I had worked myself up to “expert” status on, so customers, sales teams, and project managers would want me to work those implementations regardless of where in the Midwest they were located. I started traveling too much, but in some ways, it was the intended result of my goal to become so relied upon that I was the best or only choice, for my job security. So, I didn’t complain.

I rarely complained to management about anything there; I was more adept at just doing the work. I was making pretty good money and concerned that I couldn’t do better anywhere else, but most of all, I was subject to a restrictive non-compete agreement. I was already getting a lot of flak from my family for changing jobs as often as I did, despite knowing that it was pretty standard for people in this industry.

My father, in contrast, has had two jobs in 40 years, and if he wasn’t laid off from the first in the early 1990s, he might still be there.

After three years, I thought about leaving. After four, I looked around but got turned down in the final round for what at the time would have been my “dream job” — Even a few months after being turned down, when that company got acquired, and it was apparent that the “dream” would have been a nightmare, I still felt resentment. I’d never been turned down after making it through that many interviews, and I didn’t want to do it again. So, I turned down multiple opportunities to interview for positions with VMware shortly after that.

My customers were continually satisfied with my work, and I enjoyed the challenges presented in doing it. My boss put me in for substantial raises and bonuses each year, and so I collected an ever-increasing paycheck. I kept thinking it’d all get better soon. Despite all that, while I was still miserable, I stayed silent.

I thrived in darkness.

Meanwhile, the state of the world seems to be mirroring the darkness that I was feeling inside. By the fall of 2016, I’m a secretly broken person floating from day to day, hoping I’d wake up and eventually all the crap inside will go away and feel “normal” again … but it never does; it only gets worse. I’m now spending too much time on social media being angry at everything, and like swimming in the pink slime in Ghostbusters, I’m just feeding off the negative energy of everyone else.

I began feeling paranoid about the world around me. It would start the moment that I woke up in the morning, and last until the night came as I sat in my children’s bedrooms, worried that someone was going to break into the house, and take them away. I always thought about all the terrible things that could happen to my family or me. I’d think about the danger lurking behind every corner, about all the terrible people in the world. When I would be out of town for work, as I was frequently, I’d be mostly unable to sleep.

I’m thankful that I’ve never really had much of a taste for alcohol, but I’d eat terrible meals while traveling and continue to gain weight. My back hurt and I’d have headaches all the time, something that I’ve had to deal with ever since I was a teenager.

But of course, I told this to no one. I’d have my yearly physical and during the mental health screening, lie-lie-lie through the whole thing. I knew what the doctor wanted to hear because I’d been telling the same lies my entire life. If the doctor couldn’t find it, I wasn’t going to volunteer the information.

It’s not as if I thought that by being honest in my answers, they’d send me away to an asylum. It was that everyone would discover my weakness. It was something else that someone could direct against me, or maybe worse when everyone else found out they’d feel sorry for me: “Poor Michael, he’s not tough enough.”

I’d be in the system as having a problem. It didn’t matter that these doctors were the same people who would prescribe me antibiotics for my chronic sinus infections, and that never seemed to bother me — now we’re talking about being marked as having a mental health issue.

Then at age 33, I was bullied, again.

I knew it was going to be a problem almost as soon as it started, and I remember the moment it began. Sitting in a Zaxby’s restaurant in Hopkinsville, Kentucky, just checking Twitter — as I all too frequently do — I’d just flown in on a Sunday afternoon for a week-long project. I’d never been to Zaxby’s before, so I was looking forward to trying something new, but instead, this was the lunch when everything went from bad to awful. Now the harassment started, and later that night is when my Twitter impersonator first appeared.

When you’re worried about people in the world coming after you, it doesn’t help matters when they do.

I fought back the harassment by effectively doing nothing, hoping they’d give up by not getting a reaction out of me, but there it was every time I’d open Twitter. I’d see some shitty comment about me or something about my wife. Maybe something about the things that I was passionate about or someone from the community being targeted, with my name and likeness. When I thought it would help, I’d play whack-a-mole with Twitter to get accounts closed for impersonation or abuse, but they’d just come back.

The harassment went on for a little over a month, and then finally, around 3 pm on a Friday, I’d come home from a particularly complicated customer site and opened Twitter to find another shitty comment. Another fucking tweet. At that moment, I crashed.

I make analogies to a server crashing, because in hindsight that’s what it felt like. I couldn’t think, I just started crying, and I nearly threw up. My stomach had been in knots for weeks up to this point, but it felt like everything was coming undone. My body was still moving, but for some time I wasn’t in control. I remember very clearly everything that day leading up to that moment, but very little during the event. What wasn’t de-staged from the cache when the controller died is gone.

I didn’t have to tell my wife. It was impossible for her not to know; she was there when the crash happened and immediately went into action to get me help. I knew something like this was coming, so I’d been trying to reach out to a therapist in the days prior, but could never get our schedules synchronized. By chance, the therapist called me that afternoon in the middle of my panic, and I let it all go to her over the phone, having never met with her previously. She could tell just by the tone of my voice, my breathing, that I needed immediate care. Off to the emergency room, I went.

For the first night in a long while, I felt a little better.

I got sent home with a temporary prescription for Xanax, and a directive to talk to my doctor. The strange thing is that while I felt better because I finally let my secret out, I spent the weekend an absolute wreck. The floodgates of emotion had opened, and I had a backlog of questions to address. I also knew that there was no going back and that I would be forced to tackle even more issues and make some significant changes in my life.

For a while, what transpired in the aftermath of that night left me feeling betrayed by some people that I thought I could trust, and feeling helpless. Like so many times in life before, I was told by those who had the power to stop what was going on, that there was nothing they were willing to do, that this was my problem, and that I was to blame. My pain was always my fault. It’s never the responsibility of the people who were inflicting it.

I don’t know what exactly motivates people to be so cruel to others. It’s unfortunate, but in the end, we are all flawed individuals. Even the bullies are coping. It doesn’t matter if they’re a kid in school or adults who act like children. It could be a teacher who is supposed to be looking out for the kids, and not their self-serving interests. I might cope with my issues by becoming withdrawn from others. They might deal by lashing out, by letting the demons inside them come out and feed the beast hiding in others.

I quickly began looking for a new job, far away from the life I was leading. No travel. Regular hours. I wasn’t even sure if I wanted to stay in the same realm of IT. These events are why I spent a year at a customer in a role that I was utterly dispassionate about; it was a place to hide and regroup. Even though I was physically in a different situation, I was still a mess of a human being inside. If you worked with me there, you don’t even know the real me. It was a period of my life when I’m not even sure I knew who the real me was. I’d wonder that every day, and it still crosses my mind. I told almost no one there about what had happened — no one on my team, or my boss. Truthfully, I was ashamed.

My brain needed to heal.

I now take medication for something I acknowledge is both an internal and an environmental condition. Every one of us is a collection of biology and experiences that got us to this point in our lives. Great athletes can be physically superior to others, but neglect the gray matter between their ears, too.

Since that fateful day:

- I have gone to therapy to discuss my issues with bullies, and other factors that contribute to my anxiety and depression.
- I try to listen to my body and recognize both the internal and the external factors that get me worked up, and avoid them to get centered and calm my brain.
- I have more routines that help me regulate how I keep myself organized.
- When I go to the doctor, I tell her what is wrong.

The awareness that I have now about myself makes this much more manageable. But this is a daily, sometimes hourly, practice. Even in doing all of these things though, this isn’t something you just beat; you can have things under control and still have struggles.

Even in moments of achievement, I can be prone to feeling depressed. I don’t have to have a bully or be in a bad situation. Brains are funny like that. When VMware hired me in April of last year, I felt as if I’d reached a high point in my career and celebrated the realization of a decade-long goal. Almost instantly after signing my offer, I started to worry.

Imposter syndrome began to kick in.

What would happen to me if this didn’t go well? How soon would it be before everyone I’d respected up to this point found out that I was a massive fraud? Where would I work, what would I do, how would I feed my family!? I was having heartburn, trouble sleeping, and always worried that it would all come crashing down. The dark side of my brain was back, trying to sabotage me again.

But you know what helped this? Doing the work, having a positive and supportive management team, but mostly just talking to my teammates and others about their struggles. To quit being afraid of “getting caught” and freely admit what I know and what I don’t. Realizing that this is the most fabulous job I’ve ever had, in the company of some of the smartest and kindest people I’ve ever met. A year later I wake up, get dressed and wonder how this happened. Sharing my thoughts and opening up to let them do the same. We all had the same fears. We were not alone.

Every single person you meet is dealing with their devil inside. You don’t have to be to the point where you’re contemplating the end of your life. Your best friend can appear to you to have things rightly figured out, yet be suffering in total silence, never showing any outward sign of the struggles they’re going through. Nothing can be “wrong,” and yet they can be in pain. The jerk in line at the coffee shop may always be a jerk, or you possibly caught them on a bad day. Your coworker can be fighting to keep his kids while his ex-wife tries to move them across the country, and every extra hour at work is just a distraction to keep his mind off the fight.

This story has sat in my drafts folder for over a year. What started as a rambling journal that was never planned to see the light of day has been evolving as I get more perspective on my recovery from that life. As I’ve contemplated my journey, I noticed something else happening. People I knew and respected were now becoming vocal about their similar issues. Whereas previously I felt as if I was the only one, I now see where I am one of many.

Eric Lee, who I’d known both as a co-worker, client, and community leader for many years, posted his story. The parallels were striking, especially in the overlap of where we’d worked and what we’d done in our careers. The next day I took him out to lunch and shared my story. I would watch his presentations about what he calls “IT Burnout” at VMUG and other settings. I’d contemplate how I needed to tell my story, but I was still scared.

More and more people would start to tell their stories, and I’d privately share mine with more people. Aaron Buley started sharing his struggles on his YouTube channel. He posted a video called “All Humans Struggle – Depression” which calls it for what it is. Cody De Arkland talks about carrying baggage, Erik Shanks talks about the dark side of stress, and Al Rasheed quoted Paul Simon. Even the CTO of Citrix has a story to tell.

I call them out as examples from the Greater Virtualization Community, but it’s not just them. Dwayne “The Rock” Johnson has talked about his struggles. Jon “Mad Men” Hamm has as well. Here are two people who play tough guys on TV, yet struggle in real life. We see these people and realize they’re actors playing a part, but it’s not far off from the persona that we share with the public and the one inside of each of us.

Then there are “real people” like Jason Kander. Someone who has served in Missouri state office, then ran for the U.S. Senate and later led a nationwide voting rights organization. He was in the process of running for mayor of Kansas City when he abruptly brought his campaign to a halt to declare that, he too, was broken — struggling with depression as a result of PTSD from his time as an Army intelligence officer in Afghanistan.

It is in those moments that I remember: we all have struggles.

And I’m done being quiet about mine.
