---
title: "16GB Problems"
slug: "16gb-problems"
description: "Apple finally killed the 16GB storage floor, then shipped a new MacBook Pro capped at 16GB of memory. A look at why Skylake forced that tradeoff."
publishedAt: "2016-10-28T15:58:00.000Z"
updatedAt: "2026-07-23"
author: "Michael Stanclift"
tags: ["apple", "hardware", "mobile", "opinion"]
draft: false
featured: false
ghostId: "9e9d1049-63f7-4206-910d-f05a03561187"
---

For many years, 16GB devices have been an issue for Apple and its users. However, Apple fixed this in September, bumping up to 32GB of storage as the new minimum capacity in the iPhone 7, and then going as far as to rev-up the existing iPad line to this new minimum.

16GB problem, gone.

Yesterday, Apple announced a revamped MacBook Pro. Thinner, USB-C / ThunderBolt 3 all over the place, P3 display, Intel Skylake CPUs, and a new dedicated T1 chip powering [a watchOS-enabled Touch Bar](https://www.macstories.net/mac/new-macbook-pro-touch-bar-t1-chip-run-on-a-variant-of-watchos/), including a Touch ID sensor in a non-iOS device for the first time.

Great stuff. One small problem.

Intel’s Skylake processors and chipsets that Apple is using are able to support more than 16GB of memory. For instance, the [i7–6920HQ](http://ark.intel.com/products/88972), which based on Apple’s advertised clock speeds looks to be what is utilized in the maxed-out 15” model, says it can do up to 64GB. Apple is a company that makes amazing products that create and redefine entire categories. But they’re bound to some limitations.

I figured this wasn’t something that Apple did “just because” … if there was a way they could sell me more memory, at a premium, I’d think they’d do it. There’s a tradeoff being made here.

On the Intel page for the Skylake chips, it indicated that the maximum size was dependent on memory type. Apple is using LPDDR3 chips, which from what I can gather based on the 2133MHz speed, are either made by Micron or Samsung, as they appear to be the only two vendors producing them. Based on past relationships, that makes a lot of sense.

In both cases, what I’ve been reading is that 16GB is the maximum size available in this class of chip. LPDDR3 has a lot of advantages when it comes to power consumption, running at a much lower voltage of 1.2V, and only using 10% of the power during standby compared to regular DDR3 or DDR4 memory.

Given that the people who’d really take advantage of the additional memory are people like me who want to run multiple virtual machines, containerized applications, etc., and these tasks are probably better suited to systems not running off batteries, a trade-off of limiting the maximums in order to reduce power consumption makes a lot of sense.

If the decision here was something like “We can use LPDDR3 and get 10 hours of battery life but we’re limited to 16GB, or use DDR4 and get 8 hours, but support 32GB,” I’d rather get 10 hours of battery.

I’d probably use those two hours in the field a lot more than the extra RAM, right now.

All this appears to be backed up by Dan Frakes, who confirmed the limitation with Apple.

Apple told me MBP maxes out at 16GB RAM because LPDDR3 limit is 16GB/chip; Apple uses it because of performance/energy ratio. — Dan Frakes, October 27, 2016

I was already going to sit out upgrading my Late-2013 Retina MacBook Pro 15” since it does everything I currently need and has 16GB of DDR3 RAM already.

It also doesn’t require me to replace every cable, dongle, adapter, and power brick that I currently own.
