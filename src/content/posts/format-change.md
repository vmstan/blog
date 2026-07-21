---
title: "Format Change"
slug: "format-change"
description: "Virtually Benevolent has moved from Ghost to Astro, trading ActivityPub and a database-backed publishing system for Markdown, static files, and a simpler path to publishing."
publishedAt: "2026-07-21T17:00:00.000Z"
updatedAt: "2026-07-21T17:00:00.000Z"
author: "Michael Stanclift"
tags: ["astro", "ghost", "mastodon", "hosting", "migration"]
draft: false
featured: false
---

If you have visited this site before, it probably looks familiar enough. There is still a big gradient, a long archive of infrequent opinions, and my name attached to all of it. Underneath, though, it is entirely different. The rendering engine has moved from [Ghost Pro](https://ghost.org/pricing) to [Astro](https://astro.build/).

This blog dates back to December 2009 (a little before I adopted the moniker "vmstan") and has lived through more than one platform. In fact, I've lost count of how many times I've done this dance between Ghost, Wordpress, Ghost Pro, Jekyll, Hugo, micro.blog, and back again.

## The boring machinery

Using Codex, I wrote an importer for my Ghost export that converted its content into Markdown and translated Ghost's structured editor blocks into Astro. Some old image URLs were already returning errors by the time of the move, and were stripped away. A static site can make the future simpler, but it cannot go back in time and rescue a file that has already vanished from somebody else's server.

The new publishing process is deliberately uneventful. Posts are plain Markdown with a small amount of validated metadata at the top. A production build checks the content, generates the site, builds the search index, and then publishes the finished files to Cloudflare.

There is one meaningful loss hidden inside all that simplicity: this version of the site does not speak ActivityPub. Calling it a loss alone, however, would be misleading. Ending that connection is also an intentional choice, not an accidental casualty of changing software.

## Closing down the pub

When I began shutting down [vmst.io](/deprecation-notice/), I wanted an independent place continue communicating with impacted members so I migrated the followers of my Mastodon account to Ghost as `@vmstan@vmstan.com`. That migration made the Notes feature of Ghost my home in the Fediverse. People who had followed me on vmst.io and [mastodon.technology](https://ashfurrow.com/blog/mastodon-technology-shutdown/) before that could keep following me.

The decision to close vmst.io involved the cost, risk, and responsibility of operating a public social service. My decision to leave the Fediverse goes beyond those considerations. After four years as an administrator it has run its course for me personally. My entire identity as a member of the Fediverse was centered around being a Mastodon administrator, contributor and advocate. In the absence of all that, I don't find myself with a lot to say.

There are also large sections of the Fediverse that I have always found quite toxic. It is often described as a kinder and more humane alternative to corporate social media, and in some communities it can be. But that has never been a universal experience, despite the insistence (and sometimes outright gaslighting) around its superiority as a platform.

Disagreements too easily become purity tests. Minor mistakes become evidence of someone's character, public correction becomes a performance, and pile-ons are excused as accountability. Necessary moderation tools such as blocks, domain suspensions, and defederation can also become weapons in personal or ideological disputes. A decentralized network is still perfectly capable of producing centralized social pressure.

Running a server made those dynamics impossible to ignore. Administrators are expected to make difficult decisions quickly, with incomplete information, for no compensation, while every action—or failure to act—can be interpreted as a political declaration. Suspend a server, leave it connected, remove a post, or decline to remove it: every choice satisfies one group and becomes proof of betrayal to another.

There was perhaps no better example of that to me personally than when I decided to abruptly shutdown the instance. For all the reasons I had listed publicly, there were a set of personal reasons that I shared privately with some folks. My own members were largely understanding, but it was other administrators and indeed many seemingly random Internet commentators who were just aghast at my decision to shutdown the site on an accelerated timeframe.

That role also changed how freely I felt I could speak for myself. Because my identity became so closely associated with vmst.io, a personal opinion could easily be treated as the position of the entire instance. I felt obligated to soften or withhold my own views—not only to protect myself, but to avoid causing reputational damage to people whose only involvement was choosing an account on a server I operated. They had not volunteered to become representatives of my opinions, and I did not want them paying a social price for something I said.

The Fediverse is full of thoughtful people who genuinely want to build better online communities. It is also full of the same cliques, grudges, moral absolutism, and bad-faith behavior found everywhere else. Federation distributes infrastructure; it does not distribute grace. I no longer want to pretend that choosing a protocol makes a community virtuous, or that a miserable experience becomes healthy simply because it is decentralized.

## A little more than a migration

Moving platforms was also an excuse to clean up the parts of the site that had accumulated around the writing.

The [Whois page](/whois/) received the largest visible change. It is now a proper directory for contact information and the various places I exist online, organized by purpose instead of presented as one long list of icons. That feels especially useful after winding down my Mastodon server: profiles come and go, but this site remains the place I control where the current list can live.

## Still virtually benevolent

The technology changed, but the point of the site did not. This remains my corner of the web for longer thoughts, old stories, technical notes, and the occasional rant that does not belong in a social media text box.