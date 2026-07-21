---
title: "Ghosted Again"
slug: "ghosted-again"
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

Using Codex, I wrote an importer for my Ghost export that converted its content into Markdown, carried over titles, dates, authors, tags, canonical URLs, and publication status, and translated Ghost's structured editor blocks into Astro. Some old image URLs were already returning errors by the time of the move, and were stripped away. A static site can make the future simpler, but it cannot go back in time and rescue a file that has already vanished from somebody else's server.

The new publishing process is deliberately uneventful. Posts are plain Markdown with a small amount of validated metadata at the top. A production build checks the content, generates the site, builds the search index, and then publishes the finished files to Cloudflare.

## Closing down the pub

There is one meaningful loss hidden inside all that simplicity: this version of the site does not speak ActivityPub. Calling it a loss alone, however, would be misleading. Ending that connection is also an intentional choice.

Astro generates files. It does not maintain an ActivityPub actor, accept follows, or deliver posts to other servers. The archive could make this move, but those follower relationships cannot. RSS remains, but anyone following the Ghost account through Mastodon or another Fediverse service will no longer receive new posts from the associated account.

That is a real tradeoff, and I do not want to bury it beneath a list of technical changes. It is also not an accidental casualty of changing software. The technical limitation and my personal decision happen to point in the same direction.

When I began shutting down [vmst.io](/deprecation-notice/) after nearly four years of running Mastodon, I migrated my personal account to Ghost. That migration brought my followers with me and briefly made the Notes feature of Ghost my home in the Fediverse. People who had followed me on vmst.io (and mastodon.technology before that) could keep following me without having to find me again somewhere else.

The decision to close vmst.io involved the cost, risk, and responsibility of operating a public social service. My decision to leave the Fediverse goes beyond that infrastructure. After four years as an administrator and a shorter time before that as a simple participant, it has run its course for me personally. I am ready to stop organizing part of my online life around federation and to end my participation intentionally, rather than searching for another server or another way to keep the connection alive.

My entire identity as a member of the Fediverse was centered around being a Mastodon administrator, contributor and advocate. Running the vmcrawl, updating Mastoreqs, running the latest code in production. In the absence of all that, I didn't have a lot to say.

There are also large sections of the Fediverse that I have always found quite toxic. It is often described as a kinder and more humane alternative to corporate social media, and in some communities it can be. But that has never been a universal experience, despite the insistence—and sometimes outright gaslighting—around its superiority as a platform.

Disagreements too easily become purity tests. Minor mistakes become evidence of someone's character, public correction becomes a performance, and pile-ons are excused as accountability. Necessary moderation tools such as blocks, domain suspensions, and defederation can also become weapons in personal or ideological disputes. A decentralized network is still perfectly capable of producing centralized social pressure.

Running a server made those dynamics impossible to ignore. Administrators are expected to make difficult decisions quickly, with incomplete information, for no compensation, while every action—or failure to act—can be interpreted as a political declaration. Suspend a server, leave it connected, remove a post, or decline to remove it: every choice satisfies one group and becomes proof of betrayal to another.

That role also changed how freely I felt I could speak for myself. Because my identity became so closely associated with vmst.io, a personal opinion could easily be treated as the position of the entire instance. I felt obligated to soften or withhold my own views—not only to protect myself, but to avoid causing reputational damage to people whose only involvement was choosing an account on a server I operated. They had not volunteered to become representatives of my opinions, and I did not want them paying a social price for something I said.

The Fediverse is full of thoughtful people who genuinely want to build better online communities. It is also full of the same cliques, grudges, moral absolutism, and bad-faith behavior found everywhere else. Federation distributes infrastructure; it does not distribute grace. I no longer want to pretend that choosing a protocol makes a community virtuous, or that a miserable experience becomes healthy simply because it is decentralized.

## A little more than a migration

Moving platforms was also an excuse to clean up the parts of the site that had accumulated around the writing.

There is also a new [search page](/search/), powered by [Pagefind](https://pagefind.app/). Its index is generated after Astro finishes building, which means full-text search works across the archive without adding a server or sending queries to a third party.

The [Whois page](/whois/) received the largest visible change. It is now a proper directory for contact information and the various places I exist online, organized by purpose instead of presented as one long list of icons. That feels especially useful after winding down my Mastodon server: profiles come and go, but this site remains the place I control where the current list can live.

Finally, the design got the usual collection of details that are easy to dismiss individually and impossible not to notice together: refreshed colors, better page spacing, an actual author photo, clearer article navigation.

## Still virtually benevolent

The technology changed, but the point of the site did not. This remains my corner of the web for longer thoughts, old stories, technical notes, and the occasional rant that does not belong in a social media text box.

The difference is that the archive now lives in a format I can read without special software, the entire site can be rebuilt from its source, and publishing is a commit instead of a ceremony.

After 16 years, that feels like a good foundation for whatever I write next.
