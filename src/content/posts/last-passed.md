---
title: "Last Passed"
slug: "last-passed"
description: "If the recent Gawker password breach (re)taught us anything, it’s the old and valued lesson of “don’t use the same password everywhere” — but as often as I repeat that phrase and cringe a…"
publishedAt: "2010-12-29T00:00:00.000Z"
updatedAt: "2026-06-21T15:10:39.000Z"
author: "Michael Stanclift"
tags: []
draft: false
featured: false
ghostId: "2ed3d2f1-0436-42e3-9719-9be6ebf31855"
---

If the recent Gawker password breach (re)taught us anything, it’s the old and valued lesson of “don’t use the same password everywhere” — but as often as I repeat that phrase and cringe a little bit when I find out someone else did it, I’ve been just as guilty of this cardinal sin of network security myself… from time to time. It’s hard not to.

When you’re as active on the Internet as I am, it’s impossible to resist the urge to duplicate passwords, especially if you’re against writing them down. So you’re left to memorize them all, hope you don’t forget, and hope that you can later rely on the splendid password reset via email later on.

All of the Gawker fun also taught (or should have taught) website administrators like myself to take better care of their users. Gawker fouled up in a huge way (beyond simply exposing user data) by not taking proper steps to secure the information in their database once it was exposed. Gawker used an easily crackable cipher system (DES) which was depreciated by a new industry standard (AES) long ago.

Since the launch of this site, we’ve relied on third parties to act as the gatekeepers for user interaction. (First using JS-Kit/Echo and now Disqus) For you it has the benefit of not having to remember yet another password or create another account just to comment here. On the back end it allows us to focus on delivering content and less on keeping a database of user information secured. We’re relying on people with bigger and better security resources (Disqus, Open ID, Twitter or Facebook) to secure your presence on our site.

But what about every other site (or even the four mentioned above) … where you have to register a username, create a password, and keep it safe and secure. Remembering unique passwords for every site is impossible, using the same one is a no-no, writing them down and keeping them in your desk drawer isn’t practical or secure. What do you do with those passwords?

**Password Management**

![4ac55-0wjxujndhlgbmzg1y](https://vmstan.micro.blog/uploads/2023/c9e000d403.jpg)

Who hasn’t seen the Internet Explorer password prompt at least 10,000 times in their lives? Or the similar prompts from Firefox, Safari, Chrome, Opera, etc. Almost every browser created in this decade has included some sort of password manager, and almost anyone who has used them will tell you they’re all crap.

For one thing, they only work with one browser. For another, they’re almost as secure as the previously mentioned notebook of passwords. Last, they’re not really designed to keep you secure, they’re designed to be a convenient way to re-access commonly used websites.

Most of the time, I turned the feature off. The idea of using a password manager, until recently, seemed less secure than trying to just remember them all myself. That all changed recently.

**LastPass**

After previously being quite inefficient about password management for the past… well, ever… I decided it was time to get serious about securing my online life and in turn taking the burden of remembering all of the passwords myself. I started using LastPass a few months ago (before the Gawker breakdown) and had slowly begun the process of migrating my passwords into it. Originally I wanted to give it a chance to earn my trust before jumping feet first into the pool of letting someone else get all my passwords.

I selected LastPass after evaluating many alternatives. KeePass, 1Password, Roboform were among some of the ones I looked at. All great options, but not the one I went with in the end. Here’s why:

1. LastPass runs on anything, everything, and it syncs all of the resources together. Windows, Mac, Linux, Internet Explorer, Firefox, Safari, Chrome, iPhone, Android, Blackberry, Windows Mobile, Windows Phone (just announced), even Symbian. Basically anything I could touch, had to give me the ability to access my passwords. LastPass has their competition beat there. Noticeably absent is Opera from the supported list. I don’t use Opera myself, but my guess is now that they have true plugin support the LastPass crew will probably add them to the list shortly.
2. No password manager is perfect, but LastPass is close. It’s excellent about knowing what to fill in, what to save, what not to save, and when to step in and help.
3. It’s free, for 95% of the service. However, as I usually do, I suggest shelling out the  _ridiculous_  $12 a year to get the premium version. Why? Because you get my next two important points…
4. Mobile access. LastPass will work in any browser for free, but if you want to run it on your iPhone, Android, etc, you’re going to need the premium account. The app itself though, is free.
5. Multifactor authentication through YubiKey. The free version will allow you to build your own key for multifactor, but if you really want to get serious about security you’re going to want to do it through a YubiKey. (Of course that key will also set you back $25)

**Browser Integration**

Having tested LastPass in both Google Chrome (10) and Mozilla Firefox (4), I can say that the Firefox version is superior, but not by much. When I initially tested LastPass, I did so through Google Chrome. The installer rounded up all of the passwords stored in the default password managers of Internet Explorer, Firefox and Google Chrome that were installed on my system and put them into LastPass. This made the initial learning curve very easy as I didn’t have to go through and train it for every single one I was already allowing the browsers to remember.

After my desktop, when I setup LastPass on my laptop it also sucked up the local cache and avoided duplicates of already integrated passwords.

There are a few key benefits that LastPass does that none of the integrated password managers will do, to save you time.

1. When I create new accounts, LastPass will automatically detect it and offer to generate a random password for me based on my complexity requirements. It automatically fills in the data and saves it for future use. This works 99% of the time and normally requires little input or assistance from me.
2. When ever I change my password on a website, LastPass will not only know my old password, offer a new password, it automatically saves the change in it’s cache.
3. It syncs all the data across multiple browsers. It’s no longer a massive headache to test new browsers. Moving from Chrome to Firefox to IE and back again is painless (well, except for using Internet Explorer itself) — changes made in one browser migrate to all the other browsers.

**Security**

But putting all this data into the cloud must be insecure! And if may be… if you were using another provider.

LastPass, despite syncing all this information into the cloud, actually stores the password database itself on your local system. What LastPass has on its servers are one-way salted hashes, with all your real data stored locally in an AES-256 encrypted database. Your passwords are encrypted and decrypted on your local machine, not on their servers. What all this means is if someone were to hack LastPass and get your salted hashes, they’d be about as useful as a pile of salted meat. Without computing horsepower beyond what the top government security agencies of the world have, and a limitless amount of free time, it’s all worthless without your _master password._

Which by the way, LastPass doesn’t have any idea what your master password is because they never have it. If you change it on your account, LastPass has to re-encrypt all the data and resend the hashes to their servers.

They also use SSL to further encrypt all of the already AES encrypted traffic between your system and their servers. However, the amount of data being sent back and forth is so small that there is little if any performance loss in your browser and your system hardly notices what’s going on.

Once the salted hashes of your password reaches their servers, when they go to back it up (which they do daily to Amazon’s S3 service) and store it offsite they further encrypt that data using GPG.

So make your master password strong, but something you can remember. A great website for coming up with new passwords is [howsecureismypassword.net](http://howsecureismypassword.net) — it will literally tell you how long it would take someone with a desktop computer to brute force your master password. This is all assuming they gain access to your local database, etc. Want to know my master password? Too bad. I will tell you though, it would take you 564 billion years to crack it.

But, computing horsepower gets more powerful all the time. Brilliant programmers, hackers, and engineers come up with new ways to make them faster, string them together and take that 564 billion year number down a notch. Even with all this advanced encryption an enterprising hacker could still manage to get a key logger on your system and record your master password.

So what is a paranoid person like myself going to do to even the odds? Multifactor authentication.

**YubiKey**

_Something you know, and something you have._

There are a lot of multifactor authentication methods out there. I won’t get into all of them, because in this case, LastPass really works best with only one. The YubiKey by Yubico.

The YubiKey is a small USB token about the size of a door key. It comes in any color you want as long as it’s black, or white, and there is just a one time cost of $25 for Yubico to send you the token. It’s tough, and easy to use. It’s crush proof and water proof, has no battery or moving parts. Just plug it into any USB slot on your computer and it’ll be recognized as a USB Input Device. Because of this there are no drivers required and it works on Windows, Mac or Linux automatically.

Once you receive your YubiKey the process of associating it with your LastPass account is straight forward and simple. When you load your browser, after entering your master password you get the prompt for your YubiKey. Touch the green button and away you go. It only adds a second to the authentication process and infinitely decreases your chances of having your account compromised.

But what about key loggers? Since this is just a fancy keyboard with only one key, can’t they log that? Sure. Here’s the problem.

YubiKey generates a random 44 character one time passcode that changes every time you generate it.

Each generated passcode is actually a AES-128 bit block containing an obfuscated unique secret ID for your YubiKey, a session counter, time stamp, session token, random values and a CRC-16 checksum. To sum it all up, a bunch of random stuff further encrypted into more random stuff.

What it amounts to, is that without both your master password and your YubiKey, no one is getting access to your accounts.

**Strong Passwords per Site**

But all this work is futile if you continue to use the same passwords as before, or allow the same passwords to be used on multiple websites or systems. Thankfully, LastPass provides an interesting tool called the Security Challenge that will locally decrypt and analyze your passwords, look for weak passwords and let you know what duplicates exist. I was shocked the first time I ran the analyzer, but now I work to squeak out every last bit to raise my score each week.

At this point I’m regularly generating 12–16 character random and complex passwords for every site I have accounts on. According to the latest score I’m among the top 1000 users of the tool ranking 942nd overall. Look out 941, I’m R\*HaVn87V@aefzw@-ing for you.

The point is that I don’t know what any of my site passwords are, but each is unique and almost impossible to brute force in a reasonable amount of time (3 quadrillion years for the one mentioned above) — while it doesn’t make the chances of my Facebook account being compromised impossible, it significantly reduces the risk of such an event taking place. By the time someone tried it only a few times, Facebook would (should) lock them out and the chances they’ll guess correctly on the first try even knowing all the exact complexity requirements used is almost infinitesimal.

**Conclusion**

Is your LastPass master password truly the last password you’ll ever need? No. Your system password is still important to have and keep strong, I encourage people to encrypt their local disks (especially laptops) and use a unique and long passcode/PIN for decryption along with a TPM or USB key using something like BitLocker (which I’ll be covering in a future article) — this way to even get to your database the number of steps required are so many and complex I’d venture to say it’s bulletproof.

But if I can use LastPass to narrow down the number of passwords I’m required to recall on a daily basis down from the hundreds to around 5, and make the ones I don’t even want to remember anymore so complex that I couldn’t even if I tried, then I think it’s more than worth it.

**Further Reading & Downloading**

- [LastPass](http://)
- [YubiKey](http://www.yubico.com/yubikey)
- [How Secure Is My Password](http://howsecureismypassword.net/)
- [AES — Advanced Encryption Standard](http://en.wikipedia.org/wiki/Advanced_Encryption_Standard) (Wikipedia)
- [DES — Data Encryption Standard](http://en.wikipedia.org/wiki/Data_Encryption_Standard) (Wikipedia)
- [GNU Privacy Guard](http://en.wikipedia.org/wiki/GNU_Privacy_Guard)  (Wikipedia)
- [Salted Hashes](http://en.wikipedia.org/wiki/Salt_%28cryptography%29)  (Wikipedia)
- [One Time Passwords](http://en.wikipedia.org/wiki/One-time_password)  (Wikipedia)

**After Thought**

Last night I stumbled [on a deal where you can get a Yubikey and one year of LastPass for only $30](https://store.yubico.com/store/catalog/index.php?cPath=6), this normally would be $37. Nice little chunk of change. The [even better deal is you can get two Yubikey and one year of LastPass for only $45](https://store.yubico.com/store/catalog/index.php?cPath=6). This is a $62 value. You can associate multiple Yubikeys with your account and then in the event your primary one is lost or stolen, you can dig your reserve key out of a safe location and remove the lost key, and then later replace the key.

Frank also pointed out to me last night something I neglected to mention. You can also deactivate the Yubikey requirement from a trusted computer such as your primary system that is in a secure location. A trusted system would obviously be one you’ve configured to bypass all of the security checks for your account. Right now I don’t have any systems where I bypass all of the checks, so I forgot to talk about it.

Something else I forgot to say, was that you can also disable the Yubikey through an email verification, but if your email password is protected by LastPass that may be harder to do. My LastPass account is on my iPhone as well so I could go that route to gain access to my passwords in the event of a failure. Again I forgot to mention it in the article but since you obviously can’t hook a LastPass USB token into an iPhone, you can setup pre-authenticated mobile devices to only require a passcode to unlock. Combined with a security lock on the phone, the phone itself becomes a sort of “token” you have to have to get in.

There are also other ways to perform multifactor against LastPass that don’t involve a YubiKey, including your own preconfigured key like what I mentioned, as well as a paper card you create that is unique to your account. I just think the YubiKey is the easiest and more secure way to go.
